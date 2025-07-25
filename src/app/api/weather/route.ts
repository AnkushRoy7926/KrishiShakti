// app/api/weather/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return NextResponse.json({ error: "lat and lon are required" }, { status: 400 });
    }

    const key = process.env.WEATHER_API_KEY;
    if (!key) {
      throw new Error("Missing OPENWEATHERMAP_API_KEY env var");
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
    const res = await fetch(url);
    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json({ error: err.message || "API error" }, { status: res.status });
    }

    const data = await res.json();

    const temp = data.main?.temp;
    const rain = data.rain ? data.rain["1h"] ?? data.rain["3h"] : 0;
    const snow = data.snow ? data.snow["1h"] ?? data.snow["3h"] : 0;

    return NextResponse.json({ temp, rain, snow });
  } catch (err: any) {
    console.error("Weather API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
