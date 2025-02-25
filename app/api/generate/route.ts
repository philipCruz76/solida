import { NextResponse } from "next/server";
import { generateCopyWrite } from "@/app/lib/actions/generateCopyWrite";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, blog } = body;
    const result = await generateCopyWrite(type, blog);
    return NextResponse.json(result);
  } catch (error) {
    console.error("COPYWRITE_GENERATION_ERROR", error);
    return new NextResponse("COPYWRITE_GENERATION_ERROR", { status: 500 });
  }
}
