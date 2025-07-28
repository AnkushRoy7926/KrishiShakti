// app/api/weather/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = parseFloat(searchParams.get('lat') || '');
    const lon = parseFloat(searchParams.get('lon') || '');

    if (Number.isNaN(lat) || Number.isNaN(lon)) {
      return NextResponse.json(
        { error: 'Please provide valid lat and lon query parameters.' },
        { status: 400 }
      );
    }

    // ─── Current Weather (OpenWeatherMap) ─────────────────────────────────────
    const owKey = process.env.WEATHER_API_KEY;
    if (!owKey) throw new Error('Missing WEATHER_API_KEY env var');

    const currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${owKey}`
    );
    if (!currentRes.ok) {
      const err = await currentRes.json();
      return NextResponse.json(
        { error: err.message || 'OpenWeatherMap API error' },
        { status: currentRes.status }
      );
    }
    const current = await currentRes.json();
    const temp = current.main.temp;
    const humidity = current.main.humidity;
    const rainLastHour = current.rain?.['1h'] ?? 0;

    // ─── Annual Rainfall (Open‑Meteo Archive) ────────────────────────────────
    const now = new Date();
    const end = now.toISOString().slice(0, 10); // YYYY‑MM‑DD today
    const past = new Date(now);
    past.setFullYear(now.getFullYear() - 1);
    const start = past.toISOString().slice(0, 10);

    const archiveUrl = new URL('https://archive-api.open-meteo.com/v1/archive');
    archiveUrl.searchParams.set('latitude', String(lat));
    archiveUrl.searchParams.set('longitude', String(lon));
    archiveUrl.searchParams.set('start_date', start);
    archiveUrl.searchParams.set('end_date', end);
    archiveUrl.searchParams.set('daily', 'precipitation_sum');
    archiveUrl.searchParams.set('timezone', 'UTC');

    const archiveRes = await fetch(archiveUrl.toString());
    if (!archiveRes.ok) {
      const err = await archiveRes.json();
      return NextResponse.json(
        { error: err.reason || 'Open-Meteo Archive API error' },
        { status: archiveRes.status }
      );
    }
    const archive = (await archiveRes.json()) as {
      daily: { time: string[]; precipitation_sum: number[] };
    };

    const dailySums = archive.daily.precipitation_sum;
    const totalAnnualRain = dailySums.reduce((sum, v) => sum + v, 0);
    const averageDailyRain = totalAnnualRain / dailySums.length;

    // ─── Combined Response ───────────────────────────────────────────────────
    const avgAnnualRain_cm = totalAnnualRain / 10; // convert mm → cm

    return NextResponse.json({
      temp,
      humidity,
      avgRainfall: Number(avgAnnualRain_cm.toFixed(2)),
    });
  } catch (err: any) {
    console.error('Weather API error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
