import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { User } from './User';

export class Product extends Model {
  declare id: string;
  declare name: string;
  declare model: string;
  declare category: string;
  declare price: number;
  declare description: string;
  declare specifications: object;
  declare images: string[];
  declare modelFile: string | null;
  declare documents: string[];
  declare version: string;
  declare createdById: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Product.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  specifications: {
    type: DataTypes.JSON,
    defaultValue: {}
  },
  images: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  modelFile: {
    type: DataTypes.STRING,
    allowNull: true
  },
  documents: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  version: {
    type: DataTypes.STRING,
    defaultValue: '1.0.0'
  },
  createdById: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Product',
  tableName: 'products'
}); 