import { Request, Response } from 'express';
import { News } from '../models/News';

export const createNews = async (req: Request, res: Response) => {
  try {
    const news = await News.create(req.body);
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error creating news', error });
  }
}; 