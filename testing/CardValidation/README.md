# Tarjeta de crédito válida


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
