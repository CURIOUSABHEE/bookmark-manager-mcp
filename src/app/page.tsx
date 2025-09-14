'use client'

import {
  SignedIn , SignedOut
} from '@clerk/nextjs'
import { useBookmarks } from '@/hooks/useBookmarks';
import { CreateBookmarkData } from '@/types/bookmark';
import { useState, useEffect } from 'react';
import styles from "./page.module.css";
import BookmarkForm from '@/components/BookmarkForm';
import BookmarkList from '@/components/BookmarkList';

export default function Home() {
  const {
    bookmarks,
    loading,
    error,
    addBookmark,
    deleteBookmark,
    refetch
} = useBookmarks()

const [showAddForm, setShowAddForm] = useState(false)
const [isSubmitting, setIsSubmitting] = useState(false)
const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
}, [])

const handleAddBookmark = async(data:CreateBookmarkData) =>{
  try {
    setIsSubmitting(true)
    await addBookmark(data)
    setShowAddForm(false)
  } catch(e){
    console.log(e)
  } finally{
    setIsSubmitting(false )
  }
}

const handleDeleteBookmark = async(id : string) =>{
  if(confirm("Are you sure you want to delete?"))
  try {
    await deleteBookmark(id)
    setShowAddForm(false)
  } catch(e){
    console.log("Failed to delete the bookmark", e)
  }
}

if(loading || !mounted){
  return <div className={styles['loading-container']}>
    <div  className={styles['loading-content']}>
      <div  className={styles['loading-spinner']}>
        <p>loading bookmarks....</p>
      </div>
    </div>
  </div>
}

  return (
    <div>
      <SignedIn>
        <div className='container'>
          <div className={styles['page-header']}>
            <div className={styles['header-content']}>
              <div className={styles['header-text']}>
                <h1>Bookmark Manager</h1>
                <p>Organise your Bookmarks</p>
              </div>
              <div className={styles['header-button']}>
                <button className='btn btn-primary' onClick={()=> setShowAddForm(!showAddForm)}>
                  {showAddForm ? "Cancel" : "Add Bookmark"}
                </button>
              </div>
            </div>
          </div>
          
          {error && (
            <div className={styles['error-message']}>
              <p>Error: {error}</p>
              <button onClick={refetch} className='btn btn-secondary'>
                Retry
              </button>
            </div>
          )}
          
          {showAddForm && (
            <div className={styles['form-section']}>
              <BookmarkForm onSubmit={handleAddBookmark} isSubmitting={isSubmitting} />
            </div>
          )}
          
          <BookmarkList bookmarks={bookmarks} onDelete={handleDeleteBookmark} />
        </div>
      </SignedIn>
      <SignedOut>
        <div className={styles['signout-container']}>
          <div className={styles['signout-content']}>
            <div className={styles['signout-text']}>
              Please signin to manage your Bookmarks
            </div>
          </div>
        </div>
      </SignedOut>
    </div>
  );
}
