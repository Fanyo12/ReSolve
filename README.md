# 🌊 ReSolve

Sistema web para la gestión, seguimiento y documentación de incidencias del área de Sistemas.

---

## 📌 Descripción

**ReSolve** es una aplicación web desarrollada para mejorar la organización, registro y seguimiento de incidencias dentro de un entorno hotelero.

El sistema permite registrar problemas reportados por los diferentes departamentos, dar seguimiento a su estado, documentar las soluciones aplicadas y conservar información útil para futuras incidencias mediante una Base de Conocimientos.

El proyecto surge como solución a la falta de organización y control en el manejo de incidencias del Departamento de Sistemas, proporcionando una herramienta centralizada para registrar, consultar y dar seguimiento a los problemas reportados.

---

## 🎯 Objetivo

Desarrollar una plataforma que permita:

- Registrar incidencias de manera estructurada.
- Clasificar incidencias por departamento y categoría.
- Dar seguimiento mediante diferentes estados.
- Establecer niveles de prioridad.
- Registrar la solución aplicada a una incidencia.
- Consultar el historial de incidencias.
- Generar reportes de incidencias en formato PDF.
- Crear y consultar una Base de Conocimientos.
- Aprovechar las soluciones de incidencias cerradas para generar conocimiento.
- Consultar pendientes que requieren atención.
- Controlar el acceso mediante roles y permisos.

---

## 🚀 Funcionalidades principales

### 🔐 Autenticación

- Inicio de sesión de usuarios.
- Autenticación mediante JWT.
- Control de acceso según el rol.
- Protección de las funciones administrativas.

### 📝 Gestión de incidencias

- Registrar nuevas incidencias.
- Visualizar incidencias registradas.
- Consultar el detalle de una incidencia.
- Editar información.
- Filtrar incidencias.
- Clasificar por estado.
- Clasificar por prioridad.
- Clasificar por departamento y categoría.
- Actualizar el estado de una incidencia.
- Cerrar incidencias.
- Registrar la solución aplicada.
- Dar seguimiento al proceso de atención.

### 📊 Dashboard

- Resumen general de las incidencias.
- Visualización de información relevante.
- Acceso a los principales módulos del sistema.

### 📄 Reportes

- Generación de reportes de incidencias en formato PDF.
- Inclusión de información relevante de los registros.
- Presentación del reporte con la identidad visual de ReSolve.

### 📚 Base de Conocimientos

- Consultar conocimientos registrados.
- Consultar el detalle de cada conocimiento.
- Agregar conocimientos manualmente.
- Generar conocimiento a partir de incidencias cerradas.
- Conservar las soluciones documentadas para futuras consultas.

### 📋 Pendientes del día

- Consulta de incidencias que requieren atención.
- Seguimiento de asuntos pendientes.
- Identificación de incidencias que necesitan actualización o atención.

### 👥 Gestión de usuarios

- Consultar usuarios registrados.
- Crear nuevos usuarios.
- Asignar roles.
- Activar o desactivar cuentas.
- Protección de contraseñas mediante bcrypt.
- Actualización de información de usuarios.

### 🔑 Roles y permisos

ReSolve cuenta con tres roles principales:

| Función | Administrador | Técnico | Consulta |
|---|:---:|:---:|:---:|
| Dashboard | ✅ | ✅ | ✅ |
| Consultar incidencias | ✅ | ✅ | ✅ |
| Gestionar incidencias | ✅ | ✅ | ❌ |
| Registrar soluciones | ✅ | ✅ | ❌ |
| Consultar conocimientos | ✅ | ✅ | ✅ |
| Gestionar conocimientos | ✅ | ✅ | ❌ |
| Consultar pendientes | ✅ | ✅ | ✅ |
| Gestionar usuarios | ✅ | ❌ | ❌ |

Los permisos determinan las funciones disponibles para cada usuario dentro de la plataforma.

---

## 🛠️ Tecnologías utilizadas

### Frontend

- React
- Vite
- JavaScript
- CSS
- React Router DOM
- Lucide Icons

### Backend

- Node.js
- Express
- MySQL
- mysql2
- JWT
- bcrypt
- CORS
- dotenv
- Nodemon

### Base de datos

- MySQL
- MySQL Workbench

---

## 📂 Estructura del proyecto

```text
ReSolve/
│
├── resolve-backend/
│   ├── src/
│   ├── database/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── resolve-frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md
