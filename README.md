\# 🌊 ReSolve



Sistema web para la gestión y seguimiento de incidencias del área de Sistemas.



\## 📌 Descripción



ReSolve es una aplicación web desarrollada para mejorar la organización, registro y seguimiento de incidencias dentro de un entorno hotelero.



El sistema permite registrar problemas reportados por los diferentes departamentos, asignar responsables, dar seguimiento al estado de la incidencia y consultar información histórica para facilitar la toma de decisiones.



El proyecto nace como solución a la falta de organización y control en el manejo de incidencias del departamento de Sistemas.



\---



\## 🎯 Objetivo



Desarrollar una plataforma que permita:



\- Registrar incidencias de manera estructurada.

\- Clasificar incidencias por departamento y categoría.

\- Dar seguimiento mediante estados.

\- Registrar soluciones y observaciones.

\- Consultar información para generar reportes.

\- Mejorar la comunicación entre áreas.



\---



\## 🚀 Funcionalidades principales



\### 🔐 Autenticación

\- Inicio de sesión de usuarios.

\- Manejo de sesiones mediante JWT.

\- Control de acceso.



\### 📝 Gestión de incidencias

\- Crear incidencias.

\- Visualizar incidencias registradas.

\- Editar información.

\- Eliminar incidencias.

\- Filtrar por estado, prioridad y área.

\- Seguimiento del proceso de atención.



\### 📊 Dashboard

\- Resumen general de incidencias.

\- Visualización de información relevante.

\- Acceso rápido a módulos principales.



\---



\## 🛠️ Tecnologías utilizadas



\### Frontend



\- React

\- Vite

\- JavaScript

\- CSS

\- React Router DOM

\- Lucide Icons



\### Backend



\- Node.js

\- Express

\- MySQL

\- JWT

\- bcrypt

\- CORS

\- dotenv



\### Base de datos



\- MySQL Workbench



\---



\## 📂 Estructura del proyecto



```

ReSolve/

│

├── resolve-backend/

│   ├── src/

│   ├── database/

│   ├── server.js

│   └── package.json

│

└── resolve-frontend/

&#x20;   ├── src/

&#x20;   ├── public/

&#x20;   └── package.json

```



\---



\## ⚙️ Instalación



\### 1. Clonar repositorio



```bash

git clone https://github.com/Fanyo12/ReSolve.git

```



\---



\## Backend



Entrar a la carpeta:



```bash

cd resolve-backend

```



Instalar dependencias:



```bash

npm install

```



Crear archivo `.env` con la configuración de la base de datos.



Ejecutar:



```bash

npm run dev

```



\---



\## Frontend



Entrar a la carpeta:



```bash

cd resolve-frontend

```



Instalar dependencias:



```bash

npm install

```



Ejecutar:



```bash

npm run dev

```



\---



\## 🗄️ Base de datos



El proyecto incluye scripts SQL para crear y llenar la base de datos:



```

resolve-backend/database/

```



Archivos:



\- schema.sql

\- seed.sql



\---



\## 🎨 Diseño



La interfaz utiliza una identidad visual inspirada en ambientes costeros:



🌊 Azul océano  

🏖️ Tonos arena  

🌴 Verde natural  

🪸 Detalles coral  



Buscando transmitir una experiencia limpia, organizada y amigable.



\---



\## 👩‍💻 Desarrollo



Proyecto realizado como parte de la estadía profesional de Ingeniería en Software y Sistemas.



\*\*Proyecto:\*\* ReSolve  

\*\*Área:\*\* Sistemas  

\*\*Año:\*\* 2026

