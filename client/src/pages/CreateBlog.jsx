import React, { useState } from 'react'
import { CKEditor } from 'ckeditor4-react'
import { useQuery } from '@tanstack/react-query'
import { AiOutlineClose } from "react-icons/ai"

import useCreateBlog from '../hooks/useCreateBlog'
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
    height: 270
}

const CreateBlog = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [selectedCategories, setSelectedCategories] = useState([])

    const [loading, create_blog] = useCreateBlog()

    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await api.get('/category')
            return response.data.categories
        }
    })

    const onChangeCategory = (e) => {
        const value = e.target.value
        setSelectedCategories((prev) =>
            prev.includes(value) ? prev.filter((id) => id !== value) : [...prev, value]
        )
    }

    const onRemoveSelectedCategory = (e) => {
        const categoryId = e.currentTarget.getAttribute('data-id')
        setSelectedCategories(prev => prev.filter((cat) => cat !== categoryId))
    }

    const disabled = loading || !title || !content

    return (
        <div className='flex flex-col gap-2 p-2 md:px-32 w-full h-full bg-secondary-variant'>
            <div className='flex flex-col justify-start items-start gap-2 p-4 h-full bg-white rounded-2xl '>
                <div className='flex flex-row w-full justify-between items-center mb-4'>
                    <h1 className='text-4xl font-semibold self-center italic'>Write Blog</h1>
                    <button disabled={disabled} className='primary-btn' onClick={() => create_blog(title, content, selectedCategories)}>Write</button>
                </div>
                <div className="mb-3 w-full">
                    <input value={title} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight text-lg focus:outline-none focus:shadow-outline`} id="title" type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='mb-3 flex flex-row items-center gap-2 w-full overflow-auto scroll-container'>
                    <select className='shadow appearance-none border rounded p-1' name="categories" id="categories" onChange={onChangeCategory}>
                        {categories && categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                    </select>
                    {selectedCategories && selectedCategories.map((seleCat) => {
                        const category = categories.find((cat) => cat._id === seleCat)
                        return <div className='selected-category' data-id={seleCat} onClick={onRemoveSelectedCategory} ><AiOutlineClose className='text-xs font-medium mr-1' /> {category.name}</div>
                    })}
                </div>
                <div className="mb-4 w-full">
                    <CKEditor value={content} name='blog' config={editorConfig} onChange={(event) => setContent(event.editor.getData())} />
                </div>
            </div>
        </div>
    )
}

export default CreateBlog
