import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createBookmark, deleteBookmark, getUserBookmarks } from "@/lib/bookmark-utils"; 

export async function GET(request: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const bookmarks = await getUserBookmarks(userId);
        return NextResponse.json(bookmarks, { status: 200  });
    }
    catch (error) {
        console.error("Error fetching bookmarks", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    
    }
}

export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const body = await request.json();
        const { url, title, notes } = body;
        if (!url || !title) {
            return NextResponse.json({ error: "URL and title are required" }, { status: 400 });
        }
        const bookmark = await createBookmark(userId, { url, title, notes });
        return NextResponse.json(bookmark, { status: 201 });
    }
    catch (error) {
        console.error("Error creating bookmark", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}