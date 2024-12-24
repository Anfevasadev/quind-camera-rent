import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.js';
import Item from './item.js';

const Rental = sequelize.define('Rental', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  item_reference: {
    type: DataTypes.STRING(50),
    allowNull: false,
    references: {
      model: Item,
      key: 'reference',
    },
  },
  rental_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  return_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  late_days: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  timestamps: false,
  tableName: 'rentals',
});

Rental.belongsTo(User, { foreignKey: 'customer_id' });
Rental.belongsTo(Item, { foreignKey: 'item_reference', targetKey: 'reference' });

export default Rental;