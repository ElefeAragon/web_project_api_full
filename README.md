# Around The U.S. — Proyecto Full Stack (web_project_api_full)

## Descripción del proyecto

Around The U.S. es una aplicación web de tipo red social donde los usuarios pueden registrarse, iniciar sesión, editar su perfil y avatar, y compartir tarjetas con fotografías de lugares alrededor del mundo. Los usuarios pueden dar "me gusta" a las tarjetas de otros usuarios y eliminar únicamente las tarjetas que ellos mismos crearon.

Este proyecto integra un front-end desarrollado en React con un back-end propio construido en Node.js/Express, con autenticación basada en JWT y una base de datos MongoDB.

## Funcionalidad

- Registro de nuevos usuarios (email y contraseña)
- Inicio de sesión con autenticación JWT
- Edición del perfil (nombre y descripción)
- Edición del avatar del usuario
- Visualización de tarjetas de todos los usuarios
- Creación de nuevas tarjetas
- Eliminación de tarjetas propias (protegido: no se puede eliminar tarjetas de otros usuarios)
- Dar y quitar "me gusta" en las tarjetas

## Tecnologías y técnicas utilizadas

### Front-end
- React
- Vite
- JavaScript (ES6+)
- CSS
- Fetch API para consumo de la API REST

### Back-end
- Node.js
- Express
- MongoDB con Mongoose
- JSON Web Tokens (JWT) para autenticación
- bcryptjs para el hash de contraseñas
- celebrate / Joi para validación de solicitudes
- winston / express-winston para el registro de solicitudes y errores
- cors para habilitar solicitudes cross-origin
- Manejo centralizado de errores mediante middleware

### Infraestructura y despliegue
- Google Cloud Platform (Compute Engine, VM e2-micro con Ubuntu)
- Nginx como proxy reverso y servidor de archivos estáticos
- PM2 para mantener el proceso del back-end activo y recuperarlo automáticamente ante fallos
- MongoDB instalado directamente en el servidor
- Certificados SSL/TLS emitidos con Let's Encrypt (Certbot)
- Dominio registrado con FreeDNS

## URL de la aplicación

- **Front-end:** https://webprojectfelipe.chickenkiller.com
- **Back-end (API):** https://apiwebprojectfelipe.chickenkiller.com

## Autor

Felipe Aragón — [ElefeAragon](https://github.com/ElefeAragon)
