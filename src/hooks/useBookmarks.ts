'use client'

import { useEffect, useState} from 'react'
import { Bookmark, CreateBookmarkData } from '@/types/bookmark'


export function useBookmarks() {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
    const [loading, setloading] = useState(true)
    const [error, setError] = useState<string|null>(null)

    useEffect(()=>{
        fetchBookmarks()
    }, [])

    const fetchBookmarks = async () =>{ 
        try {
            setError(null)
            const response = await fetch("/api/bookmarks")
            if (!response.ok){
                throw new Error("Failed to fetch data")
            }
            const data = await response.json()
            setBookmarks(data)
             
        }
        catch(err){
            setError( err instanceof Error? err.message: "An Error occured")
        } finally{
            setloading(false)
        }
    }

    const addBookmark = async (data: CreateBookmarkData) =>{
        try{
            setError(null)
            const response = await fetch("/api/bookmarks",{
                method: 'POST',
                headers:{
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(data)
            })
            if (!response.ok){
                throw new Error("Failed to fetch data")
            }
            const newBookmark = await response.json()
            setBookmarks((prev)=> [newBookmark, ...prev])
            return newBookmark;
        } catch (err){
            const errorMessage = err instanceof Error? err.message: "An Error Occurred"
            setError(errorMessage)
        }

    }

    const deleteBookmark = async (id: string) =>{
        try{
            setError(null)
            const response = await fetch(`/api/bookmarks/${id}`,{
                method: 'DELETE',
            })
            if (!response.ok){
                throw new Error("Failed to fetch data")
            }
            setBookmarks((prev)=> prev.filter((bookmark)=>{
                bookmark.id !== id
            }))
        } catch (err){
            const errorMessage = err instanceof Error? err.message: "An Error Occurred"
            setError(errorMessage)
        }

    }


    return {
        bookmarks,
        loading,
        error,
        addBookmark,
        deleteBookmark,
        refetch : fetchBookmarks

    }

}
