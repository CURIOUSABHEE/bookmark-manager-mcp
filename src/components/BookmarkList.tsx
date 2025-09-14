'use client'

import { Bookmark } from "@/types/bookmark";
import BookmarkCard from "./BookmarkCard";

interface BookmarkListProps{
    bookmarks: Bookmark[];
    onDelete: (id: string) => void;
}

export default function BookmarkList({bookmarks, onDelete}: BookmarkListProps){
    if(bookmarks.length === 0){
        return (
            <div className="empty-state"> 
                <div className="empty-icon">📚</div>
                <h3 >No bookmarks found</h3>
                <div className="empty-text">Add a bookmark to get started</div>
            </div>
        )
    }
    return (
        <div className="bookmark-list">
            {bookmarks.map((bookmark) => (
                <BookmarkCard key={bookmark.id} bookmark={bookmark} onDelete={()=> onDelete(bookmark.id)} />
            ))}
        </div>
    )
}