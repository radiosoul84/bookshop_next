import { NextResponse } from "next/server";
import { API_KEY } from "../../../components/config";
import { DEFAULT_MAX_RESULTS_BOOKS_LOADING } from "../../../components/config";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const subject: string | null = searchParams.get("q");
  let maxResults: string | null | number = searchParams.get("maxResults");
  let startIndex:  string | null | number = searchParams.get("startIndex");

  if (!maxResults) {
    maxResults = DEFAULT_MAX_RESULTS_BOOKS_LOADING;
  }

  if (!startIndex) {startIndex = 0}

  const gbooksReqParams = new URLSearchParams({
    q: `Subject:${subject}`,
    key: API_KEY,
    printType: "books",
    startIndex: startIndex.toString(),
    maxResults: maxResults.toString(),
    langRestrict: "en",
  });

  if (!searchParams) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?${gbooksReqParams.toString()}`
    );

    if (!response.ok) {
      console.error("Google Books API error response:", await response.json());
      throw new Error(`Google Books API error: ${response.statusText}`);
    }

    const booksData = await response.json();
    return NextResponse.json(booksData, { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
  }
}
