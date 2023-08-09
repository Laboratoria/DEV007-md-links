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

## 2. Funcionalidades principales

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

## 3. Ejecución del proyecto:

### Creación del Proyecto:

La idea inicial recibida para la creación del proyecto fue una librería que permitiera analizar el estado de links presentes en archivos \*.md\_ \*Para esto se dibujó un diagrama de flujo que considerara los pasos y la lógica a seguir al ejecutar estos comandos aplicados tanto a archivos como directorios, generando recursividad en la función.

En esta primera versión del proyecto de MDLinks se decidió presentar un proyecto corto en que la lógica aplicada sea la que está basada exlusivamente en los archivos, se espera poder actualizar prontamente esta versión para poder aplicar su lógica en directorios que puedan ser recorridos en búsqueda de archivos _.md_ para analizar sus respectivos links y poder aplicar la recursividad.

![](https://i.postimg.cc/50Shg79q/Diagrama-sin-t-tulo.jpg)

> DIAGRAMA DE FLUJO INICIAL , INCLUYE RECURSIVIDAD
> ![](https://i.postimg.cc/bwq3HyDM/Diagrama-sin-t-tulo-1.jpg)
> DIAGRAMA DE FLUJO FINAL, INCLUYE SÓLO LA LÓGICA APLICADA A LA PRIMERA VERSIÓN DEL PROYECTO

### Configuración del Entorno:

El primer paso para dar funcionalidad al proyecto fue crear un repositorio y luego abrirlo en Visual Studio Code (VS Code), un entorno de desarrollo integrado popular, al cual se le instaló los módulosd e Node.js, previamente instalado en el sistema.

Se decidió usar CommonJS y se configuró Eslint con las reglas establecidas por Airbnb.

### Creación del Proyecto:

Se ejecutó el comando npm init en la terminal para iniciar un nuevo proyecto Node.js. configurando el nombre ,la versión y la descripción.

### Instalación de Dependencias y creación de arhivos:

Para poder ejecutar la lógica del proyecto se instalaron algunas librerías/ frameworks, en este caso el motor principal fie _axios_ ya que es la librería que nos permite hacer la llamada de https para analizar cada uno de los links.

Se creó un archivo JS principal llamado _index.js_ en el que se incluyó toda la lógica del proyecto, incluida la importanción de bibliotecas y luego se llamó la funcionalidad a través de un archivo llamado _cli.js_.

Además se creó un archivo _functions.js_ en el que se replicó la lógica desglosada en funciones aisladas para el posterior testeo.

Es importante destacar que se aplicó programación asíncrona (promesas) para realizar solicitudes HTTP a cada enlace utilizando Axios.

## 4. Instrucciones de uso

#### Instalación

#### Interacción con la terminal

##### Comandos:

Para interactuar con la aplicación sed debe abrir la terminal del sistema y ejecutar el siguiente comando:

###### mdLinks "ruta del archivo" --validate

El comando _validate_ analizará el archivo en búsqueda de Links, los cuales serán almacenados para posteriormente hacer el llamado HTTPS para analizar su estado.
Finalmente se devolverá un objeto en la terminal que indique las siguientes propiedades:

- File (archivo del que se obtuvo el Link)
- Href (Link)
- Text (Titulo del Link)
- Status (Estado del Link representado con su respectico código)
- Ok( Según sea el caso puede retornar la palabra "OK" o "Fail" )

![](https://i.postimg.cc/W4XKJD5X/Captura-de-pantalla-2023-08-09-172013.png)

> Representación de la apariencia de la terminal al ejecutar el comando --Validate

###### mdLinks "ruta del archivo" --stats

El commando _stats_ devuelve estadísticas con respecto al total de Links en el archivo.
Estas son :

- Total (total de Links encontrados y analizados)
- Unique ( total de Links únicos)
- Broken ( Total de Links que no se encuentran operativos)
  ![](https://i.postimg.cc/vmQkB7t4/Captura-de-pantalla-2023-08-09-172029.png)
  > Representación de la apariencia de la terminal al ejecutar el comando --Validate

##### Errores

> ![](https://i.postimg.cc/XYKt41dM/Captura-de-pantalla-2023-08-09-172538.png)
> Respuesta al indicar una ruta que no existe
