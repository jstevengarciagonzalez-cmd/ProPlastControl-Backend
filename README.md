# 🏭 ProPlastControl - Backend & Dashboard

Sistema de gestión de inventario y control de producción diseñado para la industria plástica. Este proyecto integra una API RESTful desarrollada con Node.js y Express, conectada a una base de datos MySQL 8.4, junto con un panel de control interactivo en el frontend y seguridad basada en tokens JWT y control de roles.

---

## 🛠️ Tecnologías Utilizadas

- **Backend:** Node.js, Express.js
- **Base de Datos:** MySQL 8.4 (`mysql2/promise`)
- **Seguridad y Autenticación:** JSON Web Tokens (JWT), `bcryptjs` (Control de roles `admin` / `operario`)
- **Frontend:** HTML5, CSS3, JavaScript (Fetch API + `sessionStorage`), Bootstrap 5
- **Control de Versiones:** Git, GitHub
- **Pruebas de API:** Thunder Client / Postman

---

## 📁 Estructura del Proyecto

```text
ProPlastControl-Backend/
├── public/                 # Archivos estáticos del Frontend
│   ├── assets/             # Logotipo e imágenes corporativas
│   ├── css/                # Hojas de estilo personalizadas
│   ├── index.html          # Pantalla de Inicio de Sesión y Registro (JWT)
│   └── dashboard.html      # Panel principal protegido por roles con tablas dinámicas
├── src/                    # Código fuente del Backend
│   ├── config/             # Configuración de conexión a la BD (MySQL)
│   ├── controllers/        # Lógica de negocio (CRUDs y Autenticación)
│   ├── middlewares/        # Verificación de token JWT y permisos de administrador
│   ├── routes/             # Definición de endpoints de la API REST
│   └── server.js           # Servidor principal Express
├── .env                    # Variables de entorno (excluido en Git)
├── .gitignore              # Archivos excluidos del repositorio
├── package.json            # Dependencias y scripts del proyecto
└── README.md               # Documentación técnica del repositorio