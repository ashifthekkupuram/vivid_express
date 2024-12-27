import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CKEditor } from 'ckeditor4-react'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import useUpdateBlog from '../hooks/useUpdateBlog'
import useAuth from '../state/useAuth'
import api from '../api/axios'

const editorConfig = {
    toolbar: [
        { name: 'document', items: ['Source', '-', 'Save', 'NewPage', 'Preview', 'Print'] },
        { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', '-', 'Undo', 'Redo'] },
        { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll'] },
        '/',
        { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike'] },
        { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Blockquote'] },
        { name: 'links', items: ['Link', 'Unlink'] },
        { name: 'insert', items: ['Image', 'Table', 'HorizontalRule', 'SpecialChar'] },
    ],
    removePlugins: 'elementspath',
    resize_enabled: false,
    height: 343
}

const UpdateBlog = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [editorInstance, setEditorInstance] = useState(null)

    const [loading, update_blog] = useUpdateBlog()
    const UserData = useAuth()

    const navigate = useNavigate()
    const { blogId } = useParams()

    const { data: blog, isLoading } = useQuery({
        queryKey: ['blog', blogId],
        queryFn: async () => {
            const response = await api.get(`/blog/${blogId}`)
            return response.data.blog
        },
        onError: (err) => {
            // navigate('/')
            toast.error(err.response?.data?.message || 'Internal Server Error')
        }
    })

   useEffect(() => {
    if(blog){
        if(blog.author._id !== UserData._id){
            setTitle(blog.title)
            setContent(blog.content)
            if(editorInstance){
                editorInstance.setData(blog.content)
            }
        }else{
            navigate('/')
            toast.error('Forbidden')
        }
    }
   },[blogId, blog, UserData._id, navigate, editorInstance])

    const disabled = isLoading || loading || !title || !content

    return (
        <div className='flex flex-col gap-2 p-2 md:px-32 w-full h-full bg-secondary-variant'>
            <div className='flex flex-col justify-start items-start gap-2 p-4 h-full bg-white rounded-2xl '>
                <div className='flex flex-row w-full justify-between items-center mb-4'>
                    <h1 className='text-4xl font-semibold self-center italic'>Update Blog</h1>
                    <button disabled={disabled} className='primary-btn' onClick={() => update_blog(blogId, title, content)}>Update</button>
                </div>
                <div className="mb-3 w-full">
                    <input value={title} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight text-lg focus:outline-none focus:shadow-outline`} id="title" type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mb-4 w-full">
                    <CKEditor data={content} name='blog-content' id='blog-content' config={editorConfig} onInstanceReady={(e) => setEditorInstance(e.editor)} onChange={(event) => setContent(event.editor.getData())} />
                </div>
            </div>
        </div>
    )
}

export default UpdateBlog
