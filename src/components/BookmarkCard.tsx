"use client"
import { Bookmark } from "@/types/bookmark"
import { useState, useEffect } from "react"

interface BookmarkCardProps{
    bookmark: Bookmark,
    onDelete: (id:String)=> void 
}

export default function BookmarkCard ({bookmark, onDelete}: BookmarkCardProps){
    const [mounted, setMounted] = useState(false)
    
    useEffect(() => {
        setMounted(true)
    }, [])
    
    const formatDate = (dateString: string)=>{
        // Use a consistent format that doesn't depend on locale
        const d = new Date(dateString)
        const year = d.getFullYear()
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const month = monthNames[d.getMonth()]
        const day = d.getDate()
        return `${month} ${day}, ${year}`
    }
    
    const getDomain = (url:string)=>{
        try{
            const domain = new URL(url).hostname;
            return domain.replace("www.", "")   
        } catch(e){
            return "Invalid URL"
        }
    }

    if (!mounted) {
        return (
            <div className="bookmark-card">
                <div className="bookmark-actions">
                    <button className="action-btn delete" disabled>
                        🗑️
                    </button>
                </div>
                <h3 className="bookmark-title">
                    {bookmark.title}
                </h3>
                <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="bookmark-url">
                    {bookmark.url}
                </a>
                <p className="bookmark-meta">
                    Loading...
                </p>
                {bookmark.notes && (
                    <div className="notes-section">
                        <p className="notes-content">
                            {bookmark.notes}
                        </p>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="bookmark-card">
            <div className="bookmark-actions">
                <button onClick={()=> onDelete(bookmark.id)} className="action-btn delete" title="Delete Bookmark">
                    🗑️
                </button>
            </div>
            <h3 className="bookmark-title">
                {bookmark.title}
            </h3>
            <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="bookmark-url">
                {bookmark.url}
            </a>
            <p className="bookmark-meta">
                {getDomain(bookmark.url)} - {formatDate(bookmark.createdAt)}
            </p>
            {bookmark.notes && (
                <div className="notes-section">
                    <p className="notes-content">
                        {bookmark.notes}
                    </p>
                </div>
            )}
        </div>
    )
}