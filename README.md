# Markdown Links

## Índice

- [1. Resumen del proyecto](#1-resumen-del-proyecto)
- [3. Objetivos de aprendizaje](#3-objetivos-de-aprendizaje)
- [4. Consideraciones generales](#4-consideraciones-generales)
- [5. Criterios de aceptación mínimos del proyecto](#5-criterios-de-aceptación-mínimos-del-proyecto)
- [6. Entregables](#6-entregables)
- [7. Hacker edition](#7-hacker-edition)
- [8. Pistas, tips y lecturas complementarias](#8-pistas-tips-y-lecturas-complementarias)
- [9. Checklist](#9-checklist)
- [10. Achicando el problema](#10-achicando-el-problema)

---

## 1. Resumen del proyecto

El proyecto consiste en desarrollar una aplicación de línea de comandos (CLI) en JavaScript que permita analizar archivos en busca de enlaces y revisar su estado mediante solicitudes HTTP. El objetivo principal es brindar una herramienta sencilla y efectiva para verificar la validez de los enlaces presentes en archivos Markdown.

## Funcionalidades principales:

**Análisis de archivos:** La herramienta permite al usuario proporcionar una ruta o un conjunto de rutas de archivos y directorios para ser analizados en busca de enlaces. La CLI es capaz de reconocer archivos md y extraer los enlaces contenidos en ellos.

**Extracción de enlaces:** La aplicación utiliza técnicas de procesamiento de texto para identificar y extraer enlaces válidos presentes en los archivos.

**Verificación de estado de enlaces:** Una vez extraídos los enlaces, la herramienta realiza solicitudes HTTP para verificar el estado de cada enlace. Se comprueba si los enlaces son accesibles o si devuelven códigos de estado como 200 (OK), 404 (No encontrado) u otros códigos de error.

**Informes de resultados:** Después de analizar los archivos y revisar los enlaces, la aplicación genera un informe detallado que muestra el estado de cada enlace junto con la ubicación del archivo que contiene el enlace. Esto permite al usuario identificar rápidamente enlaces rotos o inaccesibles.

**Interfaz intuitiva:** La interfaz de línea de comandos está diseñada para ser fácil de usar y proporciona mensajes informativos durante el proceso de análisis y verificación.

## Uso típico del proyecto:

- El usuario ejecuta la CLI desde la terminal y proporciona la ruta o rutas de los archivos y directorios que desea analizar.

- La aplicación procesa los archivos MD y extrae todos los enlaces encontrados en ellos.

- Luego, realiza solicitudes HTTP para verificar el estado de cada enlace y registra los resultados.

- Finalmente, se genera un informe completo que muestra los enlaces encontrados, su estado y la ubicación del archivo relacionado.

Este proyecto proporciona una manera eficiente de mantener actualizados los enlaces presentes en archivos, lo que puede ser útil para asegurar la integridad y calidad de documentos, páginas web o proyectos en general.


https://www.laboratoria.la/

https://www.cinemark.ccl/pelicula?corporate_film_id=93835

https://www.falabella.com/falabella-cl

