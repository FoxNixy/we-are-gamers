import { db } from "../config/sequelizeClient";
import type { RouteHandler } from "../types/routeHandler";

/**
 * Obtener todos los productos
 */
export const getProducts: RouteHandler = async (req, res, next) => {
  try {
    const products = await db.Product.findAll();
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ error: "Ocurrió un error al obtener los productos" });
  }
};

export const getCurrentProduct: RouteHandler = async (req, res, next) => {
  console.log(req.params.id)
    try {
    const id = req.params.id;
    const product = await db.Product.findByPk(id);
        if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ error: "Ocurrió un error al obtener los productos" });
  }
}

/**
 * Crear un nuevo producto
 */
export const createProduct: RouteHandler = async (req, res, next) => {
  try {
    const { name, description, price, available } = req.body;
    if (!name || price == null) {
      return res.status(400).json({ error: "El nombre y el precio son obligatorios" });
    }

    const newProduct = await db.Product.create({
      name,
      description,
      price: parseFloat(price),
      available: available === 'on' ? true : false
    });
    const products = await db.Product.findAll();

    return res.status(201).json(products);
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ error: "Ocurrió un error al crear el producto" });
  }
};

/**
 * Actualizar un producto existente
 */
export const updateProduct: RouteHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, description, price, available } = req.body;

    const product = await db.Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const updated = await product.update({
      name: name ?? product.name,
      description: description ?? product.description,
      price: price != null ? parseFloat(price) : product.price,
      available: available === 'on' ? true : false
    });

    return res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ error: "Ocurrió un error al actualizar el producto" });
  }
};

/**
 * Eliminar un producto
 */
export const deleteProduct: RouteHandler = async (req, res, next) => {
  console.log(req.params)
  try {
    const id = req.params.id;

    const product = await db.Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    await product.destroy();
    const products = await db.Product.findAll();

    return res.status(200).json(products)
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ error: "Ocurrió un error al eliminar el producto" });
  }
};
