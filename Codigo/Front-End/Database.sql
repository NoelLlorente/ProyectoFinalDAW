CREATE DATABASE  IF NOT EXISTS `thebusinessjourney` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `thebusinessjourney`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: thebusinessjourney
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `consulta`
--

DROP TABLE IF EXISTS `consulta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consulta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `presupuesto` decimal(10,0) NOT NULL,
  `tipo` varchar(10) NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consulta`
--

LOCK TABLES `consulta` WRITE;
/*!40000 ALTER TABLE `consulta` DISABLE KEYS */;
INSERT INTO `consulta` VALUES (1,'Tienda de ropa',1000,'Online','2024-04-28 13:02:08'),(2,'Página web de venta de cursos',500,'Online','2024-04-28 13:03:18');
/*!40000 ALTER TABLE `consulta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(500) NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (3,'Post desde thebeast200x@gmail.com','2024-04-28 19:18:22'),(4,'Nuevo post desde thebeast200x@gmail.com','2024-04-28 19:18:40');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resultado_consulta`
--

DROP TABLE IF EXISTS `resultado_consulta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resultado_consulta` (
  `idresultado_consulta` int NOT NULL AUTO_INCREMENT,
  `resultado` varchar(5000) DEFAULT NULL,
  `idconsulta` int NOT NULL,
  PRIMARY KEY (`idresultado_consulta`),
  UNIQUE KEY `idconsulta_UNIQUE` (`idconsulta`),
  KEY `consulta_idx` (`idconsulta`),
  CONSTRAINT `consulta` FOREIGN KEY (`idconsulta`) REFERENCES `consulta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resultado_consulta`
--

LOCK TABLES `resultado_consulta` WRITE;
/*!40000 ALTER TABLE `resultado_consulta` DISABLE KEYS */;
INSERT INTO `resultado_consulta` VALUES (1,'¡Hola! Me alegra trabajar contigo para ayudarte a lanzar tu tienda de ropa. Con un presupuesto de 1000 euros, vamos a ser creativos y enfocarnos en los pasos más importantes para lanzar tu negocio de manera efectiva.\n\n**Hoja de ruta personalizada:**\n\n**Semana 1-2: Investigación de mercado y planificación**\n\n* Investigación de tendencias de moda y competencia en el mercado local\n* Definir el nicho de mercado y objetivo de la tienda de ropa\n* Crear un plan de negocio básico, incluyendo objetivos, estrategias y proyecciones financieras\n\n**Semana 3-4: Creación de la marca y presencia en línea**\n\n* Crear una identidad de marca consistente (logotipo, colores, tipografía)\n* Registrar la marca en redes sociales y crear perfiles básicos\n* Crear un sitio web básico utilizando una plataforma como Wix o WordPress (aprox. 100 euros)\n\n**Semana 5-6: Selección de productos y proveedores**\n\n* Investigación de proveedores de ropa y selección de productos iniciales\n* Crear un catálogo de productos básico para la tienda en línea\n* Establecer contactos con proveedores y negociar precios y condiciones\n\n**Semana 7-8: Lanzamiento y marketing**\n\n* Lanzar la tienda en línea y promocionarla en redes sociales\n* Crear un plan de marketing básico, incluyendo publicidad en redes sociales (aprox. 200 euros)\n\n**Análisis detallado del presupuesto:**\n\n* Creación de la marca y presencia en línea: 100 euros (sitio web y registro de marca en redes sociales)\n* Selección de productos y proveedores: 200 euros (investigación y viajes para visitar proveedores)\n* Lanzamiento y marketing: 200 euros (publicidad en redes sociales)\n* Gastos misceláneos (material de oficina, etc.): 100 euros\n\n**Evaluación de viabilidad:**\n\n* Análisis de la competencia: Hay una competencia moderada en el mercado de ropa en la zona, pero también hay una demanda constante.\n* Análisis del mercado: La tendencia de moda en la zona es hacia ropa casual y sostenible.\n* Riesgos potenciales: Falta de experiencia en el mercado de ropa, falta de financiamiento para crecer.\n* Probabilidad de éxito: 60% (necesita trabajo adicional en marketing y promoción para atraer clientes)\n\n**Recomendaciones estratégicas:**\n\n* Invertir en publicidad en redes sociales para atraer clientes y crear conciencia de la marca.\n* Ofrecer descuentos y promociones para atraer a clientes iniciales y fomentar la lealtad.\n* Monitorear y ajustar constantemente el inventario y la selección de productos para adaptarse a las tendencias y preferencias de los clientes.\n\nEspero que esta hoja de ruta y análisis te ayuden a lanzar tu tienda de ropa de manera efectiva con tu presupuesto de 1000 euros. ¡Buena suerte!',1),(2,'¡Hola! Me alegra poder ayudarte a explorar tu idea de negocio de una página web de venta de cursos con un presupuesto inicial de 500 euros.\n\n**Hoja de ruta personalizada:**\n\nPara llevar a cabo tu proyecto, te propongo la siguiente hoja de ruta:\n\n**Semana 1-2: Investigación y planificación (día 1-14)**\n\n* Investigación de mercado: Análisis de la competencia y tendencias en el mercado de cursos online.\n* Definir la misión y visión de la plataforma de cursos.\n* Identificar el público objetivo y los cursos más demandados.\n\n**Semana 3-4: Creación de contenido y desarrollo de la plataforma (día 15-28)**\n\n* Creación de contenido para los cursos (texto, imágenes, videos, etc.).\n* Desarrollo de la plataforma web utilizando herramientas como WordPress, Moodle o plataforma de cursos en línea gratuita (si es posible).\n\n**Semana 5-6: Diseño y prueba (día 29-42)**\n\n* Diseño de la interfaz de usuario y experiencia del usuario (UI/UX).\n* Pruebas alpha y beta de la plataforma con un grupo de usuarios piloto.\n\n**Semana 7-8: Lanzamiento y marketing (día 43-56)**\n\n* Lanzamiento oficial de la plataforma.\n* Creación de un plan de marketing y publicidad en redes sociales.\n\n**Cronograma detallado:**\n\n| Semana |Actividad | Duración |\n| --- | --- | --- |\n| 1-2 | Investigación y planificación | 14 días |\n| 3-4 | Creación de contenido y desarrollo | 14 días |\n| 5-6 | Diseño y prueba | 14 días |\n| 7-8 | Lanzamiento y marketing | 14 días |\n\n**Análisis del presupuesto:**\n\nCon un presupuesto inicial de 500 euros, te recomendamos asignar los recursos de la siguiente manera:\n\n* Desarrollo de la plataforma web: 150 euros\n* Creación de contenido: 100 euros\n* Diseño y prueba: 75 euros\n* Marketing y publicidad: 175 euros\n\n**Oportunidades para ahorrar:**\n\n* Utilizar herramientas gratuitas o de código abierto para el desarrollo de la plataforma.\n* Crear contenido de alta calidad a través de la colaboración con expertos en el tema.\n* Utilizar redes sociales y herramientas de marketing digital gratuitas para promocionar la plataforma.\n\n**Evaluación de viabilidad:**\n\nBasándome en la información proporcionada, estimo que la probabilidad de éxito de tu proyecto es del 60%. Esto se debe a que la competencia en el mercado de cursos online es alta, y la falta de recursos financieros puede limitar la capacidad de marketing y promoción de la plataforma. Sin embargo, con una planificación y ejecución adecuadas, la plataforma puede tener éxito.\n\n**Recomendaciones estratégicas:**\n\n* Identificar nichos específicos y cursos de alta demanda para focalizar la oferta.\n* Establecer alianzas con expertos en la materia y proveedores de contenido para ampliar la oferta de cursos.\n* Desarrollar un plan de marketing digital efectivo para atraer a la audiencia objetivo.\n\nEspero que esta hoja de ruta te haya sido de ayuda. Recuerda que la clave para el éxito es la planificación y la ejecución efectivas, así como la adaptación a las tendencias del mercado. ¡Buena suerte con tu proyecto!',2);
/*!40000 ALTER TABLE `resultado_consulta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `correo` varchar(50) NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`correo`),
  UNIQUE KEY `correo_UNIQUE` (`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES ('beast200x@gmail.com','2024-04-28 18:51:47'),('thebeast200x@gmail.com','2024-04-23 17:01:33');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_consulta`
--

DROP TABLE IF EXISTS `usuario_consulta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_consulta` (
  `id_usuario` varchar(50) NOT NULL,
  `id_consulta` int NOT NULL,
  PRIMARY KEY (`id_consulta`),
  UNIQUE KEY `id_consulta_UNIQUE` (`id_consulta`),
  KEY `id_usuario_idx` (`id_usuario`),
  CONSTRAINT `id_consulta` FOREIGN KEY (`id_consulta`) REFERENCES `consulta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`correo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_consulta`
--

LOCK TABLES `usuario_consulta` WRITE;
/*!40000 ALTER TABLE `usuario_consulta` DISABLE KEYS */;
INSERT INTO `usuario_consulta` VALUES ('thebeast200x@gmail.com',1),('thebeast200x@gmail.com',2);
/*!40000 ALTER TABLE `usuario_consulta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_post`
--

DROP TABLE IF EXISTS `usuario_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_post` (
  `id_usuario` varchar(50) NOT NULL,
  `id_post` int NOT NULL,
  PRIMARY KEY (`id_post`),
  UNIQUE KEY `id_post_UNIQUE` (`id_post`),
  KEY `usuarioid_idx` (`id_usuario`),
  CONSTRAINT `postid` FOREIGN KEY (`id_post`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usuarioid` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`correo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_post`
--

LOCK TABLES `usuario_post` WRITE;
/*!40000 ALTER TABLE `usuario_post` DISABLE KEYS */;
INSERT INTO `usuario_post` VALUES ('thebeast200x@gmail.com',3),('thebeast200x@gmail.com',4);
/*!40000 ALTER TABLE `usuario_post` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-28 19:28:40
