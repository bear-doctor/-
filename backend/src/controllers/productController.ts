import { Product } from '../models/Product';
import { Request, Response } from 'express';

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.update(req.body as any, { where: { id: req.params.id } });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
}; 