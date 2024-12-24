import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Brand from './brand.js';

const Item = sequelize.define('Item', {
  reference: {
    type: DataTypes.STRING(50),
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      isIn: [['camera', 'film']],
    },
  },
  state: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'available',
    validate: {
      isIn: [['available', 'rented', 'delayed', 'under_repair']],
    },
  },
  brand_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'brands',
      key: 'id',
    },
  },
}, {
  timestamps: false,
  tableName: 'items',
});

Item.belongsTo(Brand, { foreignKey: 'brand_id' });

export default Item;