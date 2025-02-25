import { NextResponse } from "next/server";
import { generateCopyWrite } from "@/app/lib/actions/generateCopyWrite";
import { z } from "zod";

// Define a schema for request validation
const requestSchema = z.object({
  type: z.string().min(1, "Type is required"),
  blog: z.string().min(3, "Blog content must be at least 3 characters long").max(1000, "Blog content is too long")
});

export async function POST(request: Request) {
  try {
    // Parse and validate the request body
    const body = await request.json();
    
    // Validate against the schema
    const result = requestSchema.safeParse(body);
    
    if (!result.success) {
      // Return validation errors
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }
    
    // Extract validated data
    const { type, blog } = result.data;
    
    // Rate limiting check (implement a proper rate limiter in production)
    // This is a simplified example
    const clientIp = request.headers.get("x-forwarded-for") || "unknown";
    
    // Generate content with validated inputs
    const generatedContent = await generateCopyWrite(type, blog);
    
    return NextResponse.json({ content: generatedContent });
  } catch (error) {
    console.error("COPYWRITE_GENERATION_ERROR", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
