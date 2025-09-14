'use client'
import { CreateBookmarkData } from '@/types/bookmark'
import { useState } from 'react';

interface BookmarkFormProps{
    onSubmit: (data: CreateBookmarkData) => void;
    initialData? : Partial<CreateBookmarkData>;
    isSubmitting: boolean;
}

export default function BookmarkForm({onSubmit, initialData, isSubmitting=false}:BookmarkFormProps){
    const [formData, setFormData] = useState<CreateBookmarkData>({
        url: initialData?.url || '',
        title: initialData?.title || '',
        notes: initialData?.notes || '',
    })
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if(!formData.url.trim()|| !formData.title.trim()||isSubmitting){
            return
        }
        onSubmit(formData)
    }

  return (
    <>
    <form onSubmit={handleSubmit} className='form'>
        <h2 className='form-title'>
            Add new bookmark
        </h2>
        <div className='form-group'>
            <label htmlFor='url' className='form-label'>URL *</label>
            <input 
                type='url'
                id='url'
                onChange={(e)=>setFormData((prev)=>({...prev, url: e.target.value}))}
                className='form-input'
                placeholder='https://example.com'
                required
                disabled={isSubmitting}
            />
        </div>
        <div className='form-group'>
            <label htmlFor='title' className='form-label'>Title </label>
            <input 
                type='title'
                id='title'
                onChange={(e)=>setFormData((prev)=>({...prev, title: e.target.value}))}
                className='form-input'
                placeholder='Enter title'
                required
                disabled={isSubmitting}
            />
        </div>
        <div className='form-group'>
            <label htmlFor='notes' className='form-label'>Notes</label>
            <textarea 
                id='notes'
                onChange={(e)=>setFormData((prev)=>({...prev, notes: e.target.value}))}
                className='form-input form-textarea'
                placeholder='Enter notes (optional)'
                disabled={isSubmitting}
                rows={4}
            />
        </div>

        <button type='submit' className='btn btn-primary' disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Bookmark"}
        </button>
    </form>
    </>
  )
}


