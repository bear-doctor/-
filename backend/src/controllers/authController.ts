import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

type CompanyRole = 'sales' | 'developer';
const validCompanyIds: Record<CompanyRole, string> = {
  sales: 'SALES_COMPANY_ID',
  developer: 'DEV_COMPANY_ID'
};

export const register = async (req: Request, res: Response) => {
  const { username, password, email, role, companyId } = req.body;

  try {
    if (!username || !password || !email || (role !== 'user' && !companyId)) {
      return res.status(400).json({ message: '请填写所有必填项' });
    }

    if ((role === 'sales' || role === 'developer') && companyId !== validCompanyIds[role as CompanyRole]) {
      return res.status(400).json({ message: 'Invalid company ID for the role' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      role
    });

    console.log('User registered:', user);
    res.status(201).json({ message: '注册成功', user });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: '注册时出错', error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password, role, companyId } = req.body;

  try {
    const user = await User.findOne({ where: { username, role } });

    if (!user) {
      return res.status(401).json({ message: '您还未注册' });
    }

    if ((role === 'sales' || role === 'developer') && companyId !== validCompanyIds[role as CompanyRole]) {
      return res.status(400).json({ message: 'Invalid company ID for the role' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: '密码输入错误' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.json({ message: '登录成功', token });
  } catch (error) {
    res.status(500).json({ message: '登录失败', error });
  }
}; 