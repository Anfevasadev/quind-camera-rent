# Quind Camera Rent

## Contexto General

Este repositorio contiene la implementación de una prueba técnica para la vacante de Ingeniero de Desarrollo Junior. La prueba consiste en desarrollar una aplicación básica relacionada con el alquiler de cámaras analógicas, así como resolver dos problemas de programación adicionales.

## Requisitos

### Problema 1: Ordenar Lista de Enteros  
Crea una función que reorganice una lista de enteros no negativos para formar el número más grande posible.  

**Ejemplo:**  
Entrada: `[50, 2, 1, 9]`  
Salida: `95021`  

---

### Problema 2: Buscar Letra en Cadena  
Diseña un programa que identifique si una cadena contiene la letra 'a' e indique su posición.  

**Ejemplo:**  
Entrada: `s = 'idioma'`  
Salida: `La letra 'a' está en la posición: 6`  

---

### Problema 3: Programa de Alquiler de Cámaras  

Desarrolla un sistema para el alquiler de cámaras fotográficas analógicas con los siguientes requisitos:  

#### Requerimientos Funcionales  
- Gestión de cámaras con las características: marca, modelo, soporte para flash y compatibilidad con tipos de películas.  
- Gestión de películas: marca, nombre, sensibilidad ISO (50, 100, 200, 400, 800, 1600) y formato (35mm, 110mm, 120mm).  
- Estados de los ítems: en tienda, alquilado, retrasado o en reparación.  
- Los clientes pueden alquilar un máximo de 1 cámara.  
- Penalización: cámaras con retraso tienen un máximo de 7 días de alquiler y generan una sanción de 1 mes sin nuevos alquileres.  

#### Requerimientos Técnicos  
- API REST implementada en el lenguaje backend de tu preferencia (Node.js, Java, PHP).  
- Base de datos con migraciones o scripts SQL/NoSQL.  
- Frontend en una tecnología reactiva como React, Vue o Angular.  

## Funcionalidades

### Core Features

#### Gestión de Productos
- Visualización de catálogo de cámaras y películas
- Detalles de productos con información específica
- Visualización de compatibilidad entre cámaras y películas
- Visualización de disponibilidad de items

#### Sistema de Usuarios
- Registro de nuevos usuarios
- Inicio de sesión
- Autenticación mediante JWT
- Cierre de sesión

#### Sistema de Alquiler
- Alquiler de cámaras disponibles
- Visualización de alquileres activos
- Devolución de items alquilados
- Gestión automática de penalizaciones
- Verificación de límites de alquiler (1 cámara por usuario)
- Control de plazos de alquiler (7 días máximo)

#### Gestión de Estados
- Seguimiento del estado de los items
  - En tienda
  - Alquilado
  - Con retraso
  - En reparación
- Actualización automática de estados

### Bonus Features

#### Utilidades de Programación
- Función para ordenar números y obtener el mayor número posible
- Buscador de posición de letra 'a' en cadenas de texto

### Características Técnicas

#### Frontend (React)
- Interfaces intuitivas
- Gestión de estado con Context API
- Manejo de rutas con React Router
- Llamadas a API con Axios

#### Backend (Node.js)
- API REST
- Autenticación JWT
- Validación de datos
- Manejo de errores
- Middleware de autorización
- Relaciones entre entidades

#### Base de Datos (PostgreSQL)
- Modelo relacional
- Migraciones
- Relaciones entre tablas
- Índices optimizados

## Requisitos del Sistema

### Software Necesario
- Docker Desktop 24.0.6 o superior
- Node.js 18.x.x (para desarrollo)
- npm 10.x.x (para desarrollo)
- Git

### Puertos Requeridos
Los siguientes puertos deben estar disponibles:
- 80: Frontend
- 3000: API Backend
- 5432: PostgreSQL

### Variables de Entorno
El proyecto utiliza las siguientes variables de entorno que ya están configuradas en el docker-compose.yml:

#### Backend
```env
DB_DIALECT=postgres
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
```
## Instalación

### Usando Docker (Recomendado)

1. Clonar el repositorio
```bash
git clone https://github.com/Anfevasadev/quind-camera-rent.git
cd quind-camera-rent
```
2. Construir y levantar los contenedores:
```bash
docker-compose up --build
```
(Si no funciona a la primera, ejecutar este mismo comando otra vez)

3. La aplicación estará disponible en:
Frontend: http://localhost:80
API: http://localhost:3000
(Esto puede tardar varios minutos)

## Uso

### Frontend (Interfaz de Usuario)

#### Funciones Públicas
- Ver catálogo de cámaras y películas
- Ver detalles de productos
- Ver compatibilidades
- Registrarse como usuario
- Iniciar sesión

#### Funciones de Usuario Autenticado
- Alquilar cámaras
- Ver mis alquileres activos
- Devolver items alquilados
- Cerrar sesión

### Backend (API REST)

Las siguientes operaciones requieren Thunder Client o una herramienta similar:

#### Autenticación
```http
POST /api/auth/login
POST /api/users/register
```

#### Administración de Cámaras (requiere rol admin excepto gets)
```http
POST /api/cameras/create
PUT /api/cameras/:id
DELETE /api/cameras/:id
GET /api/cameras
GET /api/cameras/:id
```
#### Administración de Películas (requiere rol admin excepto gets)
```http
POST /api/cameras/create
PUT /api/cameras/:id
DELETE /api/cameras/:id
GET /api/cameras
GET /api/cameras/:id
```
#### Administración de Películas (requiere rol admin excepto gets)
```http
POST /api/films/create
PUT /api/films/:id
DELETE /api/films/:id
GET /api/films
GET /api/films/:id
```

#### Gestión de Items (requiere rol admin excepto gets)
```http
POST /api/items/create
PUT /api/items/:reference
DELETE /api/items/:reference
GET /api/items
GET /api/items/:reference
```
#### Compatibilidades (requiere rol admin excepto gets)
```http
POST /api/compatibility/create
DELETE /api/compatibility
GET /api/compatibility
GET /api/compatibility/camera/:cameraId
GET /api/compatibility/film/:filmId
```
#### Gestión de Marcas (requiere rol admin)
```http
POST /api/brands/create
PUT /api/brands/:id
DELETE /api/brands/:id
GET /api/brands
GET /api/brands/:id
```
#### Alquileres (autenticado)
```http
POST /api/rentals/rent
POST /api/rentals/return
GET /api/rentals/user
PUT /api/rentals/edit/:rentalId (admin)
```
#### Headers Requeridos
```http
Authorization: <token>
Content-Type: application/json
```
#### Ejemplos de Uso con Thunder Client
##### Crear una Marca (admin)
```http
POST /api/brands/create
{
  "name": "Canon",
  "repair_address": "Calle Principal #123"
}
```
##### Crear una Cámara (admin)
```http
POST /api/cameras/create
{
  "model": "AE-1",
  "has_flash": true,
  "brand_id": 1
}
```
##### Crear un Item (admin)
```http
POST /api/items/create
{
  "reference": "CAM001",
  "type": "camera",
  "camera_id": 1
}
```
##### Alquilar un Item (usuario)
```http
POST /api/rentals/rent
{
  "itemReference": "CAM001",
}
```

## Estructura del Proyecto

### Componentes Principales

#### Backend (`/back`)
- `controllers/`: Maneja las peticiones HTTP y respuestas
- `models/`: Define la estructura de datos usando Sequelize
- `routes/`: Define las rutas de la API REST
- `middleware/`: Implementa autenticación y validación
- `services/`: Contiene la lógica de negocio
- `jobs/`: Tareas automatizadas (ej: actualización de alquileres)

#### Frontend (`/front`)
- `components/`: Componentes React reutilizables
- `pages/`: Páginas principales de la aplicación
- `contexts/`: Gestión de estado global
- `styles/`: Hojas de estilo CSS por componente
- `utils/`: Funciones auxiliares y validaciones

#### Base de Datos (`/database`)
- `init.sql`: Script de inicialización con estructura y datos de ejemplo