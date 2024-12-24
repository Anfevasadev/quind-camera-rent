import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Camera from './camera.js';
import Film from './film.js';

const Item = sequelize.define('Item', {
  reference: {
    type: DataTypes.STRING(10),
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
  camera_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'cameras',
      key: 'id',
    },
  },
  film_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'films',
      key: 'id',
    },
  },
}, {
  timestamps: false,
  tableName: 'items',
});

Item.belongsTo(Camera, { foreignKey: 'camera_id', as: 'camera' });
Item.belongsTo(Film, { foreignKey: 'film_id', as: 'film' });

export default Item;