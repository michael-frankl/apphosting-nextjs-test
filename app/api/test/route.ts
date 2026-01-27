import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "API route is working!",
    timestamp: new Date().toISOString(),
    method: "GET",
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  return NextResponse.json({
    success: true,
    message: "POST request received",
    timestamp: new Date().toISOString(),
    method: "POST",
    receivedData: body,
  });
}
