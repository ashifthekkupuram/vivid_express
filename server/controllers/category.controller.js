import Category from '../models/category.model.js'

export const get_categories = async (req, res, next) => {
    try {

        const categories = await Category.find({})

        return res.json({
            success: true,
            message: 'Categories retrieved',
            categories
        })

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const create_category = async (req, res, next) => {
    try {

        const { category } = req.body

        if(!category || !category.length > 4){
            return res.status(400).json({
                success: false,
                message: 'Category name required',
            })
        }

        const newCategory = new Category({ name: category })

        await newCategory.save()

        return res.json({
            success: true,
            message: 'Category created',
        })

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}