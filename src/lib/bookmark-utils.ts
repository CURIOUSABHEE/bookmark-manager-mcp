import { PrismaClient, Bookmark } from "../generated/prisma";
import { CreateBookmarkData } from "@/types/bookmark";

const prisma = new PrismaClient();

export async function getUserBookmarks(userId: string):Promise<Bookmark[]> {
    try {
        const bookmarks = await prisma.bookmark.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return bookmarks;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to get bookmarks");
    }
}

export async function createBookmark(userId: string, data: CreateBookmarkData):Promise<Bookmark> {
    try {
        if (!userId || !data.url || !data.title) {
            throw new Error("Invalid data");
        }
        const bookmark = await prisma.bookmark.create({
            data: {
                url: data.url,
                title: data.title,
                notes: data.notes || "",
                userId,
            },
        }); 
        return bookmark;        
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create bookmark");
    }
}

export async function deleteBookmark(userId: string, bookmarkId: string):Promise<Boolean> {
    try {
        const bookmark = await prisma.bookmark.findFirst({
            where: { id: bookmarkId, userId },
        });
        if (!bookmark) {
            throw new Error("Bookmark not found");
        }
        await prisma.bookmark.delete({
            where: { id: bookmarkId, userId },
        });
        return true;
    }
    catch (error) {
        console.error(error);
        throw new Error("Failed to delete bookmark");
    }
}

