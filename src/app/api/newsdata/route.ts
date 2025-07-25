// src/app/api/newsdata/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || "agriculture";
    const page = searchParams.get("page") || undefined;

    const API_KEY = process.env.NEWSDATA_API;
    if (!API_KEY) {
      console.error("Missing NEWSDATA_API environment variable");
      return NextResponse.json(
        {
          error: "API configuration error",
          articles: [],
        },
        { status: 500 }
      );
    }

    console.log("🌾 Fetching farmer news with query:", category);

    // Build the NewsData.io API URL
    const url = new URL("https://newsdata.io/api/1/latest");
    url.searchParams.set("apikey", API_KEY);

    // Agriculture-focused search queries
    const agricultureQueries = {
      agriculture:
        "agriculture OR farming OR crops OR harvest OR irrigation OR seeds OR fertilizer OR pesticide",
      farming:
        "farming OR agricultural practices OR crop cultivation OR farm technology",
      crops:
        "crop production OR harvest OR yield OR grain OR cereals OR vegetables OR fruits",
      livestock: "livestock OR cattle OR dairy OR poultry OR animal husbandry",
      irrigation:
        "irrigation OR water management OR drip irrigation OR farm water",
      fertilizer: "fertilizer OR organic farming OR soil health OR nutrients",
      weather:
        "weather OR monsoon OR rainfall OR drought OR climate agriculture",
      market:
        "mandi prices OR crop prices OR agricultural market OR farm income",
      technology:
        "farm technology OR agricultural innovation OR smart farming OR drones",
      policy:
        "agricultural policy OR farm laws OR subsidies OR MSP OR minimum support price",
    };

    // Use search query instead of category for agriculture
    if (agricultureQueries[category as keyof typeof agricultureQueries]) {
      url.searchParams.set(
        "q",
        agricultureQueries[category as keyof typeof agricultureQueries]
      );
    } else if (category.includes("OR")) {
      // For custom complex queries
      url.searchParams.set("q", category);
    } else {
      // Default agriculture search for any other category
      url.searchParams.set("q", "agriculture OR farming OR crops OR harvest");
    }

    url.searchParams.set("country", "in");
    url.searchParams.set("language", "en");
    url.searchParams.set("size", "10");

    if (page) {
      url.searchParams.set("page", page);
    }

    console.log("📡 API URL:", url.toString().replace(API_KEY, "HIDDEN_KEY"));

    const apiRes = await fetch(url.toString(), {
      headers: {
        "User-Agent": "FarmerNewsApp/1.0",
      },
    });

    const body = await apiRes.text();
    console.log("📄 Response status:", apiRes.status);

    if (!apiRes.ok) {
      console.error("🗞️ NewsData API error:", apiRes.status, body);

      if (apiRes.status === 429) {
        return NextResponse.json(
          {
            error: "Rate limit exceeded. Please try again later.",
            articles: [],
          },
          { status: 429 }
        );
      }

      if (apiRes.status === 401) {
        return NextResponse.json(
          {
            error: "Invalid API key",
            articles: [],
          },
          { status: 401 }
        );
      }

      return NextResponse.json(
        {
          error: `NewsData API error: ${apiRes.status}`,
          articles: [],
        },
        { status: 502 }
      );
    }

    let data;
    try {
      data = JSON.parse(body);
    } catch (parseError) {
      console.error("Failed to parse API response:", parseError);
      return NextResponse.json(
        {
          error: "Invalid response from news service",
          articles: [],
        },
        { status: 502 }
      );
    }

    console.log("📊 Raw data structure:", {
      status: data.status,
      totalResults: data.totalResults,
      resultsCount: data.results?.length || 0,
      nextPage: data.nextPage,
    });

    const results = data.results || [];

    const articles = results
      .filter((r: any) => {
        // Filter for agriculture-relevant content
        const title = (r.title || "").toLowerCase();
        const description = (r.description || "").toLowerCase();

        const agricultureKeywords = [
          "agriculture",
          "farming",
          "crop",
          "harvest",
          "farm",
          "farmer",
          "irrigation",
          "seed",
          "fertilizer",
          "pesticide",
          "livestock",
          "cattle",
          "dairy",
          "poultry",
          "grain",
          "wheat",
          "rice",
          "maize",
          "vegetables",
          "fruits",
          "mandi",
          "kisan",
          "agricultural",
          "cultivation",
          "yield",
          "soil",
          "organic",
          "monsoon",
        ];

        const isRelevant = agricultureKeywords.some(
          (keyword) => title.includes(keyword) || description.includes(keyword)
        );

        return (
          r.title &&
          r.title !== "[Removed]" &&
          r.link &&
          r.description &&
          isRelevant
        );
      })
      .map((r: any) => ({
        title: r.title || "No Title",
        description: r.description || "No description available",
        url: r.link,
        urlToImage: r.image_url || null,
        publishedAt: r.pubDate || new Date().toISOString(),
        source: {
          name: r.source_id || "Unknown Source",
        },
      }));

    console.log("✅ Processed agriculture articles:", articles.length);

    return NextResponse.json({
      status: "success",
      totalResults: data.totalResults || articles.length,
      nextPage: data.nextPage || null,
      articles,
    });
  } catch (e: any) {
    console.error("🔥 /api/newsdata unexpected error:", e);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: process.env.NODE_ENV === "development" ? e.message : undefined,
        articles: [],
      },
      { status: 500 }
    );
  }
}
