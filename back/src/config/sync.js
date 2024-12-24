import sequelize from './db.js';
import '../models/brand.js';
import '../models/camera.js';
import '../models/film.js';
import '../models/item.js';
import '../models/user.js';
import Camera from '../models/camera.js';
import Film from '../models/film.js';

Camera.belongsToMany(Film, { through: 'Compatibility', foreignKey: 'camera_id', as: 'films' });
Film.belongsToMany(Camera, { through: 'Compatibility', foreignKey: 'film_id', as: 'cameras' });

const syncDatabase = async () => {
  try {
    await sequelize.sync({force: false}); //{ force: true } solo en desarrollo para recrear las tablas
    console.log('Modelos sincronizados correctamente.');
  } catch (error) {
    console.error('Error al sincronizar los modelos:', error);
  }
};

export default syncDatabase;