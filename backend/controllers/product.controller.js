import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({success: true, data: products})
    } catch(error) {
        console.log("Error in fetching products:", error.message)
        res.status(500).json({success: false, message: "Server Error"})
    }
}

export const createProduct = async (req,res) => {
    const product = req.body;

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: "Please provide all fields"})
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct})
    } catch(error) {
        console.error("Error in Create product", error.message)
        res.status(500).json({success:false, message: "Server Error"})
    }
}

export const updateProduct = async (req,res) => {
    const { id } = req.params;
    const product = req.body;

    // Vérification si l'ID est valide
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }

    try {
        // Mise à jour du produit
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });

        // Si le produit n'est pas trouvé après mise à jour
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Retourner le produit mis à jour
        res.status(200).json({ success: true, data: updatedProduct });

    } catch (error) {
        console.log("Error in updating products:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product deleted" });

    } catch (error) {
        console.log("Error in deleting products:", error.message)
        res.status(500).json({ success: false, message: "Server Error" });
    }
}