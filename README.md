## Índice

- [1. Preámbulo](#1-preámbulo) - [1. Resumen del proyecto](#1-resumen-del-proyecto)
- [2. Resumen del proyecto](#2-resumen-del-proyecto) - [3. Objetivos de aprendizaje](#3-objetivos-de-aprendizaje)
- [3. Objetivos de aprendizaje](#3-objetivos-de-aprendizaje) - [4. Consideraciones generales](#4-consideraciones-generales)
- [4. Consideraciones generales](#4-consideraciones-generales) - [5. Criterios de aceptación mínimos del proyecto](#5-criterios-de-aceptación-mínimos-del-proyecto)
- [5. Criterios de aceptación mínimos del proyecto](#5-criterios-de-aceptación-mínimos-del-proyecto) - [6. Entregables](#6-entregables)
- [6. Entregables](#6-entregables) - [7. Hacker edition](#7-hacker-edition)
- [7. Hacker edition](#7-hacker-edition) - [8. Pistas, tips y lecturas complementarias](#8-pistas-tips-y-lecturas-complementarias)
- [8. Pistas, tips y lecturas complementarias](#8-pistas-tips-y-lecturas-complementarias) - [9. Checklist](#9-checklist)
- [9. Checklist](#9-checklist) - [10. Achicando el problema](#10-achicando-el-problema)
- [10. Achicando el problema](#10-achicando-el-problema)

\*\*\* ---

## 1. Preámbulo ## 1. Resumen del proyecto

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado El proyecto consiste en desarrollar una aplicación de línea de comandos (CLI) en JavaScript que permita analizar archivos en busca de enlaces y revisar su estado mediante solicitudes HTTP. El objetivo principal es brindar una herramienta sencilla y efectiva para verificar la validez de los enlaces presentes en archivos Markdown.
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...) y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que ## Funcionalidades principales:
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una **Análisis de archivos:** La herramienta permite al usuario proporcionar una ruta o un conjunto de rutas de archivos y directorios para ser analizados en busca de enlaces. La CLI es capaz de reconocer archivos md y extraer los enlaces contenidos en ellos.
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

![md-links](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg) **Extracción de enlaces:** La aplicación utiliza técnicas de procesamiento de texto para identificar y extraer enlaces válidos presentes en los archivos.

## 2. Resumen del proyecto **Verificación de estado de enlaces:** Una vez extraídos los enlaces, la herramienta realiza solicitudes HTTP para verificar el estado de cada enlace. Se comprueba si los enlaces son accesibles o si devuelven códigos de estado como 200 (OK), 404 (No encontrado) u otros códigos de error.

En este proyecto crearás una herramienta de línea de comando (CLI) así como tu **Informes de resultados:** Después de analizar los archivos y revisar los enlaces, la aplicación genera un informe detallado que muestra el estado de cada enlace junto con la ubicación del archivo que contiene el enlace. Esto permite al usuario identificar rápidamente enlaces rotos o inaccesibles.
propia librería (o biblioteca - library) en JavaScript.

En esta oportunidad nos alejamos un poco del navegador para construir un **Interfaz intuitiva:** La interfaz de línea de comandos está diseñada para ser fácil de usar y proporciona mensajes informativos durante el proceso de análisis y verificación.
programa que se ejecute usando Node.js. Aprenderemos sobre procesos
(`process.env`, `process.argv`, ...), cómo interactuar con el sistema archivos,
cómo hacer consultas de red, etc.

[Node.js](https://nodejs.org/es/) es un entorno de ejecución para JavaScript ## Uso típico del proyecto:
construido con el [motor de JavaScript V8 de Chrome](https://developers.google.com/v8/).
Esto nos va a permitir ejecutar JavaScript en el entorno del sistema operativo,
ya sea tu máquina o un servidor, lo cual nos abre las puertas para poder
interactuar con el sistema en sí, archivos, redes, etc.

Diseñar tu propia librería es una experiencia fundamental para cualquier - El usuario ejecuta la CLI desde la terminal y proporciona la ruta o rutas de los archivos y directorios que desea analizar.
desarrolladora porque que te obliga a pensar en la interfaz (API) de tus
_módulos_ y cómo será usado por otras developers. Debes tener especial
consideración en peculiaridades del lenguaje, convenciones y buenas prácticas.

## 3. Objetivos de aprendizaje - La aplicación procesa los archivos MD y extrae todos los enlaces encontrados en ellos.

Reflexiona y luego marca los objetivos que has llegado a entender y aplicar en tu proyecto. Piensa en eso al decidir tu estrategia de trabajo. - Luego, realiza solicitudes HTTP para verificar el estado de cada enlace y registra los resultados.

### JavaScript - Finalmente, se genera un informe completo que muestra los enlaces encontrados, su estado y la ubicación del archivo relacionado.

- [ ] **Diferenciar entre tipos de datos primitivos y no primitivos** Este proyecto proporciona una manera eficiente de mantener actualizados los enlaces presentes en archivos, lo que puede ser útil para asegurar la integridad y calidad de documentos, páginas web o proyectos en general.
