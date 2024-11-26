import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyRole = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: '未授权' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    if (!roles.includes(decoded.role)) {
      return res.status(403).json({ message: '无权限' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: '无效的令牌' });
  }
}; 