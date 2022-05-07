const path = require('path')
const fileSystem = require('fs')
const cloudinary = require('cloudinary').v2

cloudinary.config(process.env.CLOUDINARY_URL)

const { request, response } = require('express');

const { fileUploadHelper } = require('../helpers');

const { Usuario, Producto } = require('../models')

const loadFile = async (req = request, res = response) => {

    try {
        // txt, md
        // const nombre = await fileUploadHelper(req.files, ['text/plain', 'text/markdown'], 'textos')

        // Imágenes
        const nombre = await fileUploadHelper(req.files, undefined, 'Imgs')

        res.json({ nombre })

    } catch (msg) {
        res.status(400).json({ msg })
    }
}


const updateImage = async (req = request, res = response) => {

    const { collection, id } = req.params

    let model

    switch (collection) {
        case 'usuarios':
            model = await Usuario.findById(id)

            if (!model) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }

            break;

        case 'productos':
            model = await Producto.findById(id)

            if (!model) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }

            break;

        default:
            return res.status(500).json({
                msg: 'Esto no está validado'
            })
    }

    try {
        // Limpiar imágenes previas
        if (model.img) {
            // Borrar la imagen del servidor
            const pathImage = path.join(__dirname, '../uploads', collection, model.img)
            if (fileSystem.existsSync(pathImage)) {
                fileSystem.unlinkSync(pathImage)
            }
        }
    } catch (error) {
        console.log(error)
    }

    const nameFile = await fileUploadHelper(req.files, undefined, collection)

    model.img = nameFile

    await model.save()

    res.json({ model })
}


const updateImageCloudinary = async (req = request, res = response) => {

    const { collection, id } = req.params

    let model

    switch (collection) {
        case 'usuarios':
            model = await Usuario.findById(id)

            if (!model) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }

            break;

        case 'productos':
            model = await Producto.findById(id)

            if (!model) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }

            break;

        default:
            return res.status(500).json({
                msg: 'Esto no está validado'
            })
    }

    try {
        // Limpiar imágenes previas de Cloudinary
        if (model.img) {
            const arrayName = model.img.split('/')
            const name = arrayName.pop()
            const [public_id] = name.split('.')
            cloudinary.uploader.destroy(`CURSO_NODE/${collection}/${public_id}`)
        }
    } catch (error) {
        console.log(error)
    }

    // Guardar en cloudinary
    const { tempFilePath } = req.files.file

    const { secure_url } = await cloudinary.uploader.upload(tempFilePath, { folder: `CURSO_NODE/${collection}` })

    model.img = secure_url

    await model.save()

    res.json({ model })
}


const showImage = async (req = request, res = response) => {

    const { collection, id } = req.params

    let model

    switch (collection) {
        case 'usuarios':
            model = await Usuario.findById(id)

            if (!model) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }

            break;

        case 'productos':
            model = await Producto.findById(id)

            if (!model) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }

            break;

        default:
            return res.status(500).json({
                msg: 'Esto no está validado'
            })
    }

    try {
        if (model.img) {
            const pathImage = path.join(__dirname, '../uploads', collection, model.img)

            // Retornar la imagen
            if (fileSystem.existsSync(pathImage)) {
                return res.sendFile(pathImage)
            }
        } else {
            pathImage = path.join(__dirname, '../assets/no-image.jpg')
            res.sendFile(pathImage)
        }
    } catch (error) {
        res.status(500).json({ message: 'Ha ocurrido un error' })
        throw (error)
    }
}


module.exports = {
    loadFile,
    showImage,
    updateImage,
    updateImageCloudinary
}