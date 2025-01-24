
# Luxury Cars API

Esta es la API para la tienda de vehículos de lujo que proporciona funcionalidades como administración de vehículos, comparaciones, favoritos y más.

## Introducción

La API de Luxury Cars permite la gestión de datos relacionados con vehículos, listas de comparación, favoritos y usuarios. Proporciona rutas RESTful para interactuar con la base de datos y manejar solicitudes desde el cliente.

## Instalación de dependencias

Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu sistema. Luego, sigue estos pasos para instalar las dependencias:

```bash
# Clona el repositorio
git clone <URL_DEL_REPOSITORIO>

# Ingresa al directorio del servidor
cd luxury-cars-server

# Instala las dependencias
npm install
```

## Ejecución

Puedes iniciar el servidor en modo desarrollo o producción:

```bash
node server.js
```

El servidor estará disponible en `http://localhost:5000` o el puerto configurado en tu archivo `.env`.

## Variables de entorno

Crea un archivo `.env` en el directorio raíz con las siguientes variables:

```
PORT=5000
DB_CONNECTION=<CADENA_DE_CONEXIÓN_A_LA_BASE_DE_DATOS>
CLOUDINARY_NAME=<TU_CLOUDINARY_NAME>
CLOUDINARY_API_KEY=<TU_CLOUDINARY_API_KEY>
CLOUDINARY_API_SECRET=<TU_CLOUDINARY_API_SECRET>
```

## Estructura del proyecto

- **config/**: Configuración de la base de datos y servicios externos.
- **controllers/**: Controladores que manejan la lógica de negocio.
- **data/**: Datos iniciales para pruebas o configuración.
- **error-handling/**: Manejo de errores personalizados.
- **middlewares/**: Middlewares para validación y autenticación.
- **models/**: Modelos de Mongoose para la base de datos.
- **routes/**: Rutas que definen los endpoints de la API.
- **app.js**: Configuración principal del servidor.
- **server.js**: Archivo de inicio del servidor.

## Datos del desarrollador

## Datos del desarrollador
- **Nombre:** Mariluz
- **Correo:** [mluzco29@gmail.com]
- **GitHub:** [https://github.com/Mariluz.2024]

Si tienes dudas o necesitas ayuda, no dudes en contactarme.
