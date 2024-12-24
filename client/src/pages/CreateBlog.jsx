import React, { useState } from 'react'
import { CKEditor} from 'ckeditor4-react'

import useCreateBlog from '../hooks/useCreateBlog'

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
    height: 255
}

const CreateBlog = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const [ loading, create_blog ] = useCreateBlog()

    const disabled = loading || !title || !content

    return (
        <div className='flex flex-col gap-2 p-2 md:px-32 w-full h-full bg-secondary-variant'>
            <div className='flex flex-col justify-start items-start gap-2 p-4 h-full bg-white rounded-2xl '>
                <div className='flex flex-row w-full justify-between items-center mb-4'>
                    <h1 className='text-4xl font-semibold self-center italic'>Write Blog</h1>
                    <button disabled={disabled} className='primary-btn' onClick={() => create_blog(title, content)}>Write</button>
                </div>
                <div className="mb-3 w-full">
                    <label className="block text-gray-700 text-3xl font-bold mb-2" htmlFor="title">
                        Title :
                    </label>
                    <input value={title} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight text-lg focus:outline-none focus:shadow-outline`} id="title" type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mb-4 w-full">
                    <label className="block text-gray-700 text-3xl font-bold mb-2" htmlFor="content">
                        Content :
                    </label>
                    <CKEditor value={content} name='blog' config={editorConfig} onChange={(event) => setContent(event.editor.getData())}  />
                </div>
            </div>
        </div>
    )
}

export default CreateBlog
