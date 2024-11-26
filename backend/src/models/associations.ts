import { User } from './User';
import { Product } from './Product';

// 用户与产品的收藏关系（多对多）
User.belongsToMany(Product, {
  through: 'UserFavorites',
  as: 'favorites'
});
Product.belongsToMany(User, {
  through: 'UserFavorites',
  as: 'favoritedBy'
});

// 产品创建者关系（一对多）
User.hasMany(Product, {
  foreignKey: 'createdById',
  as: 'createdProducts'
});
Product.belongsTo(User, {
  foreignKey: 'createdById',
  as: 'creator'
}); 