import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const start = performance.now();

  // Simulate some processing
  await new Promise((resolve) => setTimeout(resolve, 10));

  const processingTime = performance.now() - start;

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    serverTime: Date.now(),
    processingTimeMs: Math.round(processingTime * 100) / 100,
  });
}
