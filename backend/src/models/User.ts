import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

export class User extends Model {
  declare id: string;
  declare username: string;
  declare password: string;
  declare email: string;
  declare role: 'user' | 'sales' | 'developer' | 'admin';
  declare createdAt: Date;
  declare updatedAt: Date;
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  role: {
    type: DataTypes.ENUM('user', 'sales', 'developer', 'admin'),
    defaultValue: 'user'
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users'
}); 