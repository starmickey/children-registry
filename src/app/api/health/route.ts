import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // never cache a health check

export async function GET() {
  try {
    // check database
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json(
      {
        status: "OK",
        database: "Connected",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );

  } catch (err) {
    return NextResponse.json(
      { status: "unhealthy", database: "Disconnected", error: String(err) },
      { status: 503 },
    );
  }
}
