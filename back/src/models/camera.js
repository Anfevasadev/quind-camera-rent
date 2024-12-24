import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Brand from './brand.js';
import Film from './film.js';
// import Compatibility from './compatibility.js';

const Camera = sequelize.define('Camera', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  model: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  has_flash: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
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
  tableName: 'cameras',
});

Camera.belongsTo(Brand, { foreignKey: 'brand_id' });

export default Camera;