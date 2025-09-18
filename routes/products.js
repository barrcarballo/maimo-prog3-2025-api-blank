import express from "express";
const router = express.Router();
import Product from "../models/products.js";

const findAllProducts = async (req, res) => {
    try {
        const products = await Product.find().select("_id name categories")
        return res.status(200).send({message: "todos los productos", products:products});
    } catch (error) {
        return res.status(501).send({message: "Hubo un error", error});
    }
};

const findOneProduct = async (req, res) => {
    const {id} = req.params;
    try{
        const product = await Product.findOne({_id: id}).select('_id name');
        return res.status(200).send({message: "producto encontrado", product});
    } catch (error){
         return res.status(501).send({message: "Hubo un error", error});
    }
}

const addProduct = async (req, res) => {
    const {name, category, description,format, price, tags, fileUrl, imageUrl} = req.body;
    try{
        const product = new Product({name});
        await product.save();
        return res.status(200).send({message: "producto creado", product});
    }catch (error){
        return res.status(501).send({message: "Hubo un error", error});
    }
}

const deleteProduct = async (req, res) => {
    const {id} = req.params;
    try{
        const productToDelete = await Product.findOne({_id: id});
        
        if(!productToDelete){
            return res.status(404).send({message: "El producto no existe", _id: id});
        }
        
        await Product.deleteOne({_id:id});
        return res.status(200).send({message: "producto eliminado", product:productToDelete});
    } catch (error){
         return res.status(501).send({message: "Hubo un error", error});
    }
}

const updateProduct = async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    const {category} = req.body;
    const {description} = req.body;
    const {format} = req.body;
    const {price} = req.body;
    const {tags} = req.body;
    const {fileUrl} = req.body;
    const {imageUrl} = req.body;        
    try{
        const productToUpdate = await Product.findOne({_id: id});
        
        if(!productToUpdate){
            return res.status(404).send({message: "El producto no existe", _id: id});
        }
        
        // valores a actualizar
        productToUpdate.name = name;
        productToUpdate.category = category;
        productToUpdate.description = description;
        productToUpdate.format = format;
        productToUpdate.price = price;
        productToUpdate.tags = tags;
        productToUpdate.fileUrl = fileUrl;
        productToUpdate.imageUrl = imageUrl;

        await productToUpdate.save();
        return res.status(200).send({message: "producto actualizado", product:productToUpdate});
    } catch (error){
         return res.status(501).send({message: "Hubo un error", error});
    }
}

//CRUD endpoints
router.get("/", findAllProducts); // .post, .put, .delete 
router.get("/:id", findOneProduct); 
router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

export default router;
