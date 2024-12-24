import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Brand from './brand.js';
import Camera from './camera.js';
// import Compatibility from './compatibility.js';

const Film = sequelize.define('Film', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  iso: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isIn: [[50, 100, 200, 400, 800, 1600]],
    },
  },
  format: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      isIn: [['35mm', '110mm', '120mm']],
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
  tableName: 'films',
});

Film.belongsTo(Brand, { foreignKey: 'brand_id' });

export default Film;