![Image](https://user-images.githubusercontent.com/129693341/250697163-be9c92fd-7dc7-4d07-8520-e0e71d4159aa.png)

# MD-Linkyan

## Índice

* [1. Introducción](#1-Introducción)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Instrucciones de uso](#3-Instrucciones-de-uso)
* [4. Instalación](#4-Instalación)
* [5. Interfaz de Linea de Comando CLI](#5-Interfaz-de-Línea-de-Comando-CLI))
* [6. Diagrama de flujo](#5-Diagrama-de-flujo)
* [7. Referencias utilizada](#7-Referencias-utilizadas)

***
## 1. Introducción
Markdown es un lenguaje de marcado que nos permite dar formato a un texto de manera rápida y sencilla. Inicialmente diseñado para facilitar la creación de contenido web sin la necesidad de utilizar HTML directamente, se ha convertido en una herramienta versátil para dar estilo a cualquier tipo de texto, independientemente de su destino.

## 2. Resumen del proyecto
El objetivo es crear una herramienta utilizando [Node.js](https://nodejs.org/) para analizar archivos en formato Markdown y verificar los links que contienen. La herramienta proporcionará estadísticas sobre los links encontrados, como la cantidad total de links, la cantidad de links únicos y la cantidad de links rotos o no válidos.

Esta herramienta será útil para desarrolladores y comunidades de código abierto, ya que les permitirá identificar y corregir los links rotos en sus archivos Markdown, lo que mejorará la calidad y utilidad de la información compartida en plataformas como GitHub, foros y blogs.

## 3.Instrucciones de uso

Las siguientes instrucciones le permitirán instalar la librería en su terminal.

**md-links**
Si pasamos la opción `md-links` nos retornará instrucciones acerca de los comandos.

```
$ md-links 
```
![image](https://github.com/Yanettr/DEV007-md-links/assets/129693341/7246f21c-3941-4a82-a6bf-4295b30fe873)

## 4.Instalación
La instalación se puede realizar por npm:

```
$ npm i md-linksyan              

```

 ## 5. Interfaz de Linea de Comando (CLI) 

Se ejecuta de la siguiente manera a través del terminal:

```
$ md-links  <path> [options]
```

 Ejemplo:

```
$ md-links <path>
```

![image](https://github.com/Yanettr/DEV007-md-links/assets/129693341/21683dfd-e92b-45ef-9142-f2a1f883a95f)

![image](https://github.com/Yanettr/DEV007-md-links/assets/129693341/ed023b07-967f-40dc-becc-d791839e311a)

####  Opciones

**--validate**<br>
Al ingresar el comando `md-links path --validate`el módulo hace una petición HTTP para averiguar si el link funciona o no, retonando las siguientes propiedades.

```
$ md-links <path> --validate
```

![image](https://github.com/Yanettr/DEV007-md-links/assets/129693341/51178624-29e4-4045-999e-afd2f1cb3ce4)

**--stats** <br>
Si pasamos la opción `--stats` el output (salida) obtenemos un texto con estadísticas básicas sobre los links, como el número total de links y links únicos.

```
$ md-links <path> --stats
```

![image](https://github.com/Yanettr/DEV007-md-links/assets/129693341/56eabfd4-7083-4125-91cb-36b5f3cc1af9)

**--validate --stats** o **--stats --validate** <br>
Si pasamos la opción `--validate` y `--stats` o Si pasamos la opción `--stats` y `--validate` nos retornara las estadísticas de los links totales, únicos y rotos.

```
$ md-links  <path> --validate --stats
```

```
$ md-links <path>  --stats --validate
```

![image](https://github.com/Yanettr/DEV007-md-links/assets/129693341/287f2ff9-2e02-4a00-b037-65618dcee48b)
![image](https://github.com/Yanettr/DEV007-md-links/assets/129693341/f9a1a216-02d6-482d-b894-75de408bbf2b)

## 6. Planificación
- Github Projects   | [GitHub Projects](https://github.com/users/Yanettr/projects/2)
- Diagrama de flujo | [Diagrama de Flujo](https://user-images.githubusercontent.com/129693341/254017149-42480e97-47c0-490d-8abe-51dca22ef639.png)

## 7. Referencias utilizadas<br>

- [File-Sytem](https://nodejs.org/api/fs.html)
- [Path module](https://www.npmjs.com/package/path) aquí esta la documentación (https://nodejs.org/api/path.html)
- [axios]( https://www.npmjs.com/package/axios) aquí esta la documentación (https://axios-http.com/docs/intro) 
- [chalk](https://www.npmjs.com/package/chalk) 
- [marked](https://www.npmjs.com/package/markedy) aquí esta la documentación (https://marked.js.org/) 
- [cheerio](https://www.npmjs.com/package/cheerio) aquí esta la documentación (https://cheerio.js.org/docs/intro)
- [Babel](https://babeljs.io/setup#installation) 

### **Realizado por :**
```
    YanettrDEV007😎
```
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
