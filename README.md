![Image](https://user-images.githubusercontent.com/129693341/250697163-be9c92fd-7dc7-4d07-8520-e0e71d4159aa.png)

# MD-Linkyan

## Índice

* [1. Introducción](#1-Introducción)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Instrucciones de uso](#3-Instrucciones-de-uso)
* [4. Instalación](#4-Instalación)
* [5-Interfaz de Linea de Comando CLI](#5-Interfaz-de-Línea-de-Comando-CLI))
* [6. Diagrama de flujo](#5-Diagrama-de-flujo)
* [7. Project gitHubs](#7-Project-gitHub)
* [8. Referencias utilizada](#8-Referencias-utilizadas)

***
## 1. Introducción
Markdown es un lenguaje de marcado que nos permite dar formato a un texto de manera rápida y sencilla. Inicialmente diseñado para facilitar la creación de contenido web sin la necesidad de utilizar HTML directamente, se ha convertido en una herramienta versátil para dar estilo a cualquier tipo de texto, independientemente de su destino.

## 2. Resumen del proyecto
El objetivo es crear una herramienta utilizando [Node.js](https://nodejs.org/) para analizar archivos en formato Markdown y verificar los links que contienen. La herramienta proporcionará estadísticas sobre los links encontrados, como la cantidad total de links, la cantidad de links únicos y la cantidad de links rotos o no válidos.

Esta herramienta será útil para desarrolladores y comunidades de código abierto, ya que les permitirá identificar y corregir los links rotos en sus archivos Markdown, lo que mejorará la calidad y utilidad de la información compartida en plataformas como GitHub, foros y blogs.

El proceso general de la herramienta será el siguiente:

Recibir como entrada una ruta de archivo o directorio que contiene archivos Markdown a analizar.
Leer el contenido de los archivos Markdown.
Extraer los links encontrados en cada archivo y almacenarlos en una lista.
Si se proporciona la opción --validate, verificar la validez de cada link realizando una solicitud HTTP para comprobar su estado.
Mostrar los resultados en la consola, incluyendo los links encontrados y las estadísticas (cantidad total, cantidad de links únicos y cantidad de links rotos).
Con esta herramienta, los desarrolladores podrán mantener sus archivos Markdown actualizados y corregir cualquier link roto, lo que mejorará la confiabilidad y utilidad de la documentación y la información compartida en su comunidad de código abierto.

## 3.Instrucciones de uso

Las siguientes instrucciones le permitirán instalar la librería en su terminal.

**md-links**
Si pasamos la opción `md-links` nos retornará instrucciones acerca de los comandos.

```
$ md-links 
```
![img](imag/instrucciones.png)

## 4.Instalación
La instalación se puede realizar por npm:

```
$ `npm i md-links`
```


 ## 5. Interfaz de Linea de Comando (CLI) ⚙️

Se ejecuta de la siguiente manera a través del terminal:

```
$ mdLinks <path> [options]
```

 Ejemplo:

```
$ mdLinks <path>
```
![img](imag/errorEnRuta.png)

![img](imag/mdLinksRoute.png)

####  Opciones

**--validate**
Al ingresar el comando `md-links path --validate`el módulo hace una petición HTTP para averiguar si el link funciona o no, retonando las siguientes propiedades.

```
$ mdLinks <path> --validate
```
![img](imag/validate.png) 

**--stats**
Si pasamos la opción `--stats` el output (salida) obtenemos un texto con estadísticas básicas sobre los links, como el número total de links y links únicos.

```
$ mdLinks <path> --stats
```
![img](imag/stats.png)

**--validate --stats** **--stats --validate**
Si pasamos la opción `--validate` y `--stats` o Si pasamos la opción `--stats` y `--validate` nos retornara las estadísticas de los links totales, únicos y rotos.

```
$ mdLinks <path> --validate --stats
```
![validate](imag/validate-stats.png)



## 6. Diagrama de flujo

![img](https://user-images.githubusercontent.com/129693341/254017149-42480e97-47c0-490d-8abe-51dca22ef639.png)

## 7.  Project gitHub

![img](imag/project-github.png)

## 8.- Referencias utilizadas<br>

- [File-Sytem](https://nodejs.org/api/fs.html)
- [Path module](https://www.npmjs.com/package/path) aquí esta la documentación (https://nodejs.org/api/path.html)
- [axios]( https://www.npmjs.com/package/axios) aquí esta la documentación (https://axios-http.com/docs/intro) 
- [chalk](https://www.npmjs.com/package/chalk) 
- [marked](https://www.npmjs.com/package/markedy) aquí esta la documentación (https://marked.js.org/) 
- [cheerio](https://www.npmjs.com/package/cheerio) aquí esta la documentación (https://cheerio.js.org/docs/intro)

### **Crédito**
<div align = "center">
  <!-- Gmail -->
  <a href="mailto:yanettr2023@gmail.com" target="_blank">
    <img alt="Gmail"
          src="https://img.shields.io/badge/-Gmail-EA4335?style=flat-square&logo=Gmail&logoColor=white">
  </a>
  <!-- Linkedin -->
  <a href="https://www.linkedin.com/in/yanet-toribio/" target="_blank">
    <img alt="Linkedin"
          src="https://img.shields.io/badge/-Linkedin-0A66C2?style=flat-square&logo=Linkedin&logoColor=white">
  </a>	  	  
</div>
