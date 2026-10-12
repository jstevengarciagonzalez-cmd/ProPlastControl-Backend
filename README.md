# 🏭 ProPlastControl - Backend & Dashboard

Sistema de gestión de inventario y control de producción diseñado para la industria plástica. Este proyecto integra una API RESTful desarrollada con Node.js y Express, conectada a una base de datos MySQL, junto con un panel de control interactivo en el frontend.

---

## 🛠️ Tecnologías Utilizadas

- **Backend:** Node.js, Express.js
- **Base de Datos:** MySQL
- **Frontend:** HTML5, CSS3, JavaScript (Fetch API), Bootstrap 5
- **Control de Versiones:** Git, GitHub
- **Pruebas de API:** Thunder Client / Postman

---

## 📂 Estructura del Proyecto

```text
ProPlastControl-Backend/
├── public/                # Archivos estáticos del Frontend
│   ├── index.html         # Pantalla de Inicio / Acceso
│   └── dashboard.html     # Panel principal con tablas dinámicas
├── src/                   # Código fuente del Backend
│   ├── config/            # Configuración de conexión a la BD
│   ├── controllers/       # Lógica de negocio (CRUDs)
│   ├── routes/            # Definición de endpoints de la API
│   └── server.js          # Servidor principal Express
├── .env                   # Variables de entorno
├── .gitignore             # Archivos excluidos de Git
└── package.json           # Dependencias del proyecto