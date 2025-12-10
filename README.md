# 🚀 The Business Journey

> **Proyecto Final - Desarrollo de Aplicaciones Web (DAW)**  
> *La inteligencia que impulsa negocios: avanza con IA.*

**The Business Journey** es una plataforma web diseñada para asistir a emprendedores en la planificación y evaluación de sus ideas de negocio. Mediante el uso de **inteligencia artificial**, la aplicación analiza los datos del usuario para generar planes de acción personalizados, estimaciones presupuestarias y una evaluación de probabilidad de éxito.

---

## 📋 Tabla de Contenidos
- [Descripción](#-descripción)
- [Características Principales](#-características-principales)
- [Arquitectura y Tecnologías](#-arquitectura-y-tecnologías)
- [Base de Datos](#-base-de-datos)
- [Instalación y Despliegue](#-instalación-y-despliegue)
- [Autor](#-autor)

---

## 📖 Descripción

En la era digital, transformar una idea en un proyecto viable es crucial. Este proyecto surge de la necesidad de optimizar el proceso de planificación empresarial.  
A diferencia de gestores de tareas tradicionales, **The Business Journey** se centra en el análisis predictivo y la orientación estratégica.

El sistema permite a los usuarios introducir detalles sobre su idea de negocio (enfocado actualmente en negocios online) y recibir un feedback instantáneo generado por modelos de IA.

---

## ✨ Características Principales

### 🤖 Consultoría con IA
- **Análisis de Idea:** Ingreso de nombre, descripción, presupuesto y tipo de plataforma (Online/Físico).  
- **Generación de Plan de Acción:** Hoja de ruta detallada por semanas (Investigación, Diseño, Logística, Marketing).  
- **Presupuesto Aproximado:** Estimación de costes basada en parámetros reales de mercado.  
- **Probabilidad de Éxito:** Evaluación mediante algoritmos predictivos.

### 📝 Blog Comunitario
- Funcionalidad **CRUD completa** para posts.  
- Los usuarios pueden crear, leer, modificar y eliminar sus publicaciones para compartir experiencias.

### 👤 Gestión de Usuarios
- Sistema seguro de **Registro y Login**.  
- Panel de control con historial de consultas realizadas.  
- Gestión del perfil y cambio de contraseña.

---

## 🛠 Arquitectura y Tecnologías

El proyecto utiliza una arquitectura **Cliente-Servidor**, comunicándose mediante una **API REST**.

### Front-End 🎨
- **Lenguaje:** JavaScript  
- **Framework:** React  
- **Estilos:** CSS3, Bootstrap, React-Bootstrap, Material-UI  
- **IDE:** Visual Studio Code

### Back-End ⚙️
- **Lenguaje:** C#  
- **Framework:** .NET Core  
- **API REST:** Endpoints seguros y estructurados  
- **IDE:** Visual Studio

### Inteligencia Artificial 🧠
- **Motor:** Groq  
- Seleccionado por su velocidad, eficiencia y flexibilidad para personalización de prompts.

---

## 🗄 Base de Datos

Se utiliza **MySQL** como sistema de gestión de base de datos relacional.  
El esquema incluye:

- **Usuario:** Datos de registro y credenciales.  
- **Consulta:** Inputs del usuario sobre su idea de negocio.  
- **Resultado_Consulta:** Datos generados por la IA (pasos, presupuesto y probabilidad).  
- **Post:** Entradas del blog comunitario.  
- **Tablas Intermedias:** `usuario_consulta`, `usuario_post` para relaciones.

---

## 🚀 Instalación y Despliegue

### Requisitos
- Dispositivo con acceso a internet y navegador web (recomendado Chrome).  
- .NET Core y Node.js instalados para desarrollo local.

### Entorno de Desarrollo
El proyecto se probó utilizando herramientas de tunelización:
- **Ngrok**  
- **LocalTunnel**

Ambas permiten exponer Front-End y Back-End a internet para pruebas y demostraciones.

### Pasos Generales
1. Clonar el repositorio.  
2. Configurar en el proyecto .NET la cadena de conexión a MySQL.  
3. Ejecutar el script SQL para generar la base de datos `thebusinessjourney`.  
4. Iniciar el backend con Visual Studio.  
5. En la carpeta del frontend, instalar dependencias con `npm install` e iniciar con `npm start`.

---

## ✒️ Autor

**Noel Jesús Llorente De La Cruz**  
*Desarrollador Full Stack*  
Proyecto realizado para el ciclo **Desarrollo de Aplicaciones Web (DAW)**  
Fecha: 21 de marzo de 2024

---

> ⚠️ **Licencia:** Este proyecto cuenta con una licencia propietaria. El código fuente es propiedad del desarrollador y no está permitida su distribución o modificación sin autorización previa.
