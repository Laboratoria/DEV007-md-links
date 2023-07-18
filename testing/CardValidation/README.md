# Tarjeta de crédito válida

## Índice

* [1. Resumen general](#1-preámbulo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Recursos utilizados](#3-consideraciones-generales)
* [4. Descripción del Proyecto](#4-hito-criterios-de-aceptación-mínimos-del-proyecto)
* [5. Check list a considerar Project Feedback](#5-hito-opcional-mostrar-la-franquicia-de-tarjeta)
* [6. El equipo de trabajo](#6-consideraciones-técnicas)

***

## 1. Resumen general

El El proyectdo Card Validatión es el entregable correspondiente spring numero 1 del grupo DEV007 del BootCamp de Laboratoria. Se desarrolló individualmente, en lineas generales, el objetivo prncipal fué crear una aplicación web para un proceso de validación de tarjetas de credito utilizando el  [algoritmo de Luhn](https://es.wikipedia.org/wiki/Algoritmo_de_Luhn) y adicionalmente ocultar los digitos de la tarjeta de cédito acepto los ultimos cuatro.

## 2. Resumen del proyecto

Para el presente proyecto, se ha seleccionado como temática la necesidad de la tienda virtual Mommy & Kids en la cual se comercializan productos para niños (juguetes, accesorios para alimentación, cuidado, paseo, entre otros). La tienda dentro de su pagina web requiere tener una pasarela de pago, entre la funcionalidad de dicha pasarela debe estar, entre otras cosas, la validacion del medio de pago a través de las tarjetas de crérdito. Para lo cual se ha creado una imagen de la web, sonde se muestra el procesos de compra en 4 pasos, como imagen estpatica y se incluye funcionalidad a el proceso de validacion y enmascaramiento parcial al numero de la tarjeta de crédito, para dar respuesta a los objetivos planteados en el presente proyecto.

### Los objetivos generales de este proyecto son los siguientes

 Los objetivos planteados pos Laboratoria, en los cuales se debe enfocar el procesos de aprendizaje, para el desarollo del presente proyecto son los siguientes:
* Trabajar en base a un boilerplate, la estructura básica de un proyecto en
  distintas carpetas (a través modulos en JS).
* Conocer las herramientas de mantenimiento y mejora del código (linters y
  pruebas unitarias).
* Aprender sobre objetos, estructuras, métodos e iteración (bucles)
  en JavaScript
* Implementar control de versiones con git (y la plataforma github)

## 3. Recursos utilizados

* Software y aplicaciones web: Visual Studio Code (para generar el código), Figma (para realizar prototipo), Githup(repositorio del proyecto), zoom (para comunicación con coachs y compañeras). Internet(para búsqueda de información y acceso a aplicaciones web)
* Hardware: PC del desarrollador.
* Tiempo: 54 horas aproximadamente incluyendo horas de OH e intercambio con compañeras. Estas horas incluye el tiempo de estudio e investigación. No incluye el tiempo conectado a las demás actividades de laboratoria.
* Humano: 1 desarollador. Colaboración adicional de acuerdo a las necesidades (coach, compañeras)

## 4. Descripción del Proyecto 

La proyecto desarrollado está ambientado la tienda virtual Mommy & Kids, tienda que comercializa productos para niños (juguetes, accesorios para alimentación, cuidado, paseo, entre otros). El proceso de compra de la pagina web incluye un carrito, en el cual el cliente va agregando los productos a comprar, luego pasa a el proceso de colocar los datos de envío para posteriormente seleccionar el metodo de pago y finalmente hacer efectiva su compra, todo esto previo al registro como cliente en la web.

El desarrollo del codigó está enfocado en una estructura general HTLM, con la ambientacion de la página web en CCS de acuerso al prototipo (que en la vida real sería aprobado por el cliente), y la funcionalidad será desarrollada en JavaScript, unicamente en el proceso de validacion y enmascaramiento del número de tarjeta de crédito respondiendo a los requisitos del proyecto, establecidos por Laboratoria.

**Hitos: Criterios de aceptación mínimos del proyecto**

Laboratoria ha establedico los equisitos que el proyecto para asegurar cubrir los objetivos principales de aprendizaje.

**1. Una interfaz que debe permitir a la usuaria:**

* Insertar un numero (texto) que quieres validar. Usa solo caracteres numéricos
  (dígitos) en la tarjeta a validar [0-9].  
* Ver si el resultado es válido o no.  
* Ocultar todos los dígitos del número de tarjeta a exepción de los últimos
  4 caracteres.  
* No debes poder ingresar un campo vacío.  

**2. Pruebas unitarias de los métodos.**  
Los metódos de validator (isValid y maskify) deben tener cobertura con
pruebas unitarias.

**3. Código de tu proyecto subido a tu repo e interfaz "desplegada".**  
El código final debe estar subido en un repositorio en GitHub. La interfaz o
pagina web, debe ser "desplegada" (accesible públicamente online) usando
GitHub Pages.
  
**4. Un README que contiene una definición del producto.**  
En el README cuéntanos cómo pensaste en los usuarios y cuál fue tu proceso
para definir el producto final a nivel de experiencia y de interfaz.  
Estas preguntas sirven como guía:

* Quiénes son los principales usuarios de producto.
* Cuáles son los objetivos de estos usuarios en relación con tu producto.
* Cómo crees que el producto que estás creando está resolviendo sus problemas.

**5. Hito Opcional: Mostrar la franquicia de tarjeta**
Las partes opcionales tienen como intención permitirte profundizar un poco más
sobre los objetivos de aprendizaje del proyecto. Todo en la vida tiene pros y
contras, decide sabiamente si quieres invertir el tiempo en profundizar/
perfeccionar o aprender cosas nuevas en el siguiente proyecto.

En hito 2 puedes además de validar si el número de la
tarjeta es válida, mostrar la [franquicia](https://es.wikipedia.org/wiki/N%C3%BAmero_de_tarjeta_bancaria)
de la tarjeta (ej: Visa, MasterCard, etc)
usando estas [reglas de validación](https://stevemorse.org/ssn/cc.html).
Si escribes un nuevo método para eso, hay que hacer pruebas unitarias.

**Planificación del desarrollo del proyecto**

El proyecto se desarolla en 2 spring, divididos de la siguente forma:

**Spring 1:**
* Planificacion del Spring 1, actividades generales y tareas. 
* Diseño de Imagen y protoripo.
* Desarrollo HTLM
**Spring 2:**
* Planificacion del Spring 2, actividades generales y tareas. 
* Diseño CCS
* Desarrollo JS, isvalid.....Completar
* Inicio del readme

**Spring 3:**
* Planificacion del Spring 2, actividades generales y tareas. 
* Diseño CCS.
* Desarrollo JS, maskify          
* Realizacion del Readme
* Test                           
* Cargue del proyecto a Github
* Presentación del Proyecto.

**Prototipo**
Plantilla del diseño de Imagen:

Imagen del Prototipo:
C:\Users\usuario\Desktop\CLLP---DEV007-card-validation\Img Readme\Diseño.jpg

Las partes opcionales tienen como intención permitirte profundizar un poco más
sobre los objetivos de aprendizaje del proyecto. Todo en la vida tiene pros y


**El proyecto**

* Imagen de la web
* Demostración
* Descrioción de los archivos
* `README.md`: explica la información necesaria para el uso de tu aplicación
  web, así como una introducción a la aplicación, su funcionalidad y decisiones de
  diseño que tomaron.
* `src/index.html`: punto de entrada a tu aplicación. Este archivo
  debe contiene HTML e incluye el CSS y JavaScript necesario.
* `src/style.css`: este archivo contiene las reglas de estilo. 
* `src/validator.js`: impementación del objeto validator y contiene dos
  métodos utilizados:
  - validator.isValid(cardNumber): contiene el algopritmo Luhn a trasvés del cual se
     cverifica el número de tarjeta.
  - validator.maskify(cardNumber):en elñ cual con el número de tarjeta se retornar 
    todos menos los últimos cuatro caracteres enmascarados.
* `src/index.js`: acá debes escuchar eventos del DOM, invocar
  validator.isValid() y validator.maskify().
* `test/validator.spec.js`: contiene algunos tests de ejemplo.

## 6. Check list a considerar Project Feedback
En resumen, los criterios de aceptación mínimos del proyecto para considerar
Project Feedback:

* [ ] Tiene una interfaz que permite a la usuaria saber si la tarjeta es valido
  y ocultar el numero hasta las 4 ultimos digitos.
* [ ] El proyecto será entregado incluyendo pruebas unitarios de los métodos de
  validator (isValid y maskify).
* [ ] El proyecto será entregado libre de _errores_ de eslint (_warnings_ son ok).
* [ ] El proyecto será entregado subiendo tu código a GitHub.
* [ ] La interfaz será "desplegada" usando GitHub Pages.
* [ ] El README contiene una definición del producto

## 7. El equipo de trabajo.

El presente proyecto fué desarollado de forma individual con el apoyo del grupo de coach de Laboratoria, 
el apoyo entre las compañeras de squad y el apoyo espacial de la compañera de preadmisión.

Desarollado y presentado por: Carmen Luna, mamá e Ingeniero Mecánico y estudiante del DEV007 de Laboratoría.


   ## “El único lugar donde el éxito viene antes del trabajo es en el diccionario”. *Donald Kendall*
