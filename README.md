![Image](https://user-images.githubusercontent.com/129693341/250697163-be9c92fd-7dc7-4d07-8520-e0e71d4159aa.png)

# MD-Linkyan

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Instalación](#3-instalacion)
* [4. Diagramas de flujo](#4-diagramas-de-flujo)
* [5. Comandos](#5-comandos)

***
## 1. Introducción# 
Este proyecto consiste en crear una herramienta Linkyan. Librería en Javascript que te permite leer archivos Markdown (.md) para verificar los links que contengan y reportar algunas estadísticas, incluyendo si son válidos o no, con solo ingresar una ruta, además de proporcionar una herramienta de línea de comando (CLI).

## 2. Resumen del proyecto
[Markdown](https://es.wikipedia.org/wiki/Markdown) El objetivo es crear una herramienta utilizando [Node.js](https://nodejs.org/) para analizar archivos en formato Markdown y verificar los links que contienen. La herramienta proporcionará estadísticas sobre los links encontrados, como la cantidad total de links, la cantidad de links únicos y la cantidad de links rotos o no válidos.

Esta herramienta será útil para desarrolladores y comunidades de código abierto, ya que les permitirá identificar y corregir los links rotos en sus archivos Markdown, lo que mejorará la calidad y utilidad de la información compartida en plataformas como GitHub, foros y blogs.

El proceso general de la herramienta será el siguiente:

Recibir como entrada una ruta de archivo o directorio que contiene archivos Markdown a analizar.
Leer el contenido de los archivos Markdown.
Extraer los links encontrados en cada archivo y almacenarlos en una lista.
Si se proporciona la opción --validate, verificar la validez de cada link realizando una solicitud HTTP para comprobar su estado.
Mostrar los resultados en la consola, incluyendo los links encontrados y las estadísticas (cantidad total, cantidad de links únicos y cantidad de links rotos).
Con esta herramienta, los desarrolladores podrán mantener sus archivos Markdown actualizados y corregir cualquier link roto, lo que mejorará la confiabilidad y utilidad de la documentación y la información compartida en su comunidad de código abierto.

## 3. Instalación
#### `npm install md-links`

## 4. Diagramas de flujo

![Image](https://user-images.githubusercontent.com/129693341/254017149-42480e97-47c0-490d-8abe-51dca22ef639.png)


### 5. Comados

Nuestra aplicación se ejecuta de la siguiente manera a través de la terminal:

#### `md-links <path-to-file> [options]`

### Menú de ayuda



### Opciones



Al ingresar el comando `md-links path --validate` el módulo hace una petición HTTP para averiguar si el link funciona o no, retonando las siguientes propiedades.



Si pasamos la opción `--stats` el output (salida) obtenemos un texto con estadísticas básicas sobre los links, como el número total de links y links únicos



Al combinar `--stats` y `--validate` obtenemos links únicos, rotos y el total de links.





