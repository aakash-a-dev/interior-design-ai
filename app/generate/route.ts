import { Ratelimit } from "@upstash/ratelimit";
import redis from "../../utils/redis";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

// Create a new ratelimiter, that allows 5 requests per 24 hours
const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.fixedWindow(5, "1440 m"),
      analytics: true,
    })
  : undefined;

export async function POST(request: Request) {
  // Rate Limiter Code
  if (ratelimit) {
    const headersList = headers();
    const ipIdentifier = headersList.get("x-real-ip");

    const result = await ratelimit.limit(ipIdentifier ?? "");

    if (!result.success) {
      return new Response(
        "Too many uploads in 1 day. Please try again in a 24 hours.",
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": result.limit,
            "X-RateLimit-Remaining": result.remaining,
          } as any,
        }
      );
    }
  }

  const { imageUrl, theme, room } = await request.json();

  try {
    // POST request to Replicate to start the image restoration generation process
    let startResponse = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + process.env.REPLICATE_API_KEY,
      },
      body: JSON.stringify({
        version:
          "854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b",
        input: {
          image: imageUrl,
          prompt:
            room === "Gaming Room"
              ? "a room for gaming with gaming computers, gaming consoles, and gaming chairs"
              : `a ${theme.toLowerCase()} ${room.toLowerCase()}`,
          a_prompt:
            "best quality, extremely detailed, photo from Pinterest, interior, cinematic photo, ultra-detailed, ultra-realistic, award-winning",
          n_prompt:
            "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
        },
      }),
    });

    if (!startResponse.ok) {
      console.error("Replicate API error:", await startResponse.text());
      return NextResponse.json({ error: "Failed to start image generation" }, { status: 500 });
    }

    let jsonStartResponse = await startResponse.json();

    if (!jsonStartResponse.urls?.get) {
      console.error("Invalid response from Replicate:", jsonStartResponse);
      return NextResponse.json({ error: "Invalid response from image generation API" }, { status: 500 });
    }

    let endpointUrl = jsonStartResponse.urls.get;

    // GET request to get the status of the image restoration process & return the result when it's ready
    let restoredImage: string | null = null;
    let attempts = 0;
    const maxAttempts = 30; // Maximum 30 seconds of polling

    while (!restoredImage && attempts < maxAttempts) {
      attempts++;
      console.log(`Polling for result... Attempt ${attempts}/${maxAttempts}`);
      
      let finalResponse = await fetch(endpointUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + process.env.REPLICATE_API_KEY,
        },
      });

      if (!finalResponse.ok) {
        console.error("Error polling result:", await finalResponse.text());
        return NextResponse.json({ error: "Failed to check generation status" }, { status: 500 });
      }

      let jsonFinalResponse = await finalResponse.json();

      if (jsonFinalResponse.status === "succeeded") {
        restoredImage = jsonFinalResponse.output;
        break;
      } else if (jsonFinalResponse.status === "failed") {
        console.error("Generation failed:", jsonFinalResponse);
        return NextResponse.json({ error: "Image generation failed" }, { status: 500 });
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    if (!restoredImage) {
      console.error("Generation timed out after", maxAttempts, "seconds");
      return NextResponse.json({ error: "Image generation timed out" }, { status: 500 });
    }

    return NextResponse.json({ output: restoredImage });
  } catch (error) {
    console.error("Unexpected error during image generation:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
