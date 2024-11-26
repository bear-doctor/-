import express from 'express';
import { connectDB } from './config/db';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 连接数据库
connectDB();

// 中间件
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // 允许的前端地址
}));

// 路由
app.use('/api/auth', authRoutes);

// 基本路由
app.get('/', (req, res) => {
  res.send('API is running...');
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 