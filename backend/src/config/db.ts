import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL database connected successfully');
    
    // 同步数据库模型（开发环境下可以使用，生产环境建议使用数据库迁移）
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Database models synchronized');
    }
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
}; 