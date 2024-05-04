# MicrofrontMonoRepo

Microfrontend: Pequeños proyectos que van a representar parte de la lógica del negocio, se van a desplegar de manera individual, independiente y autónomo.ç

| Ventajas | Desventajas |
|----------|----------|
| Dependencia y autonomía    | Consistencia en la UI   |
| Deployment y release( Implementación y lanzamiento) por separado    | Coordinación entre los equipos   |
| Escalabilidad    | Tamaño del bundle   |
|  monolito  | Conflicto de versiones  |


## ¿Cómo puedo construir un Micro Frontend ?
* Siggle-SPA
* webpack 5 Module Federation: plugin que permite la carga de partes de un aplicación compilada por separado. Permite a la aplicación de angular cargar módulos de otra aplicación en tiempo de ejecución. Estos módulos pueden ser desarrollados, probados y desplegados de forma independiente para luego integrarlos.


## Module Federation : Monorepo y Multirepo (Trabajaremos con monorepo)
Monorepo: En un monorepo, todos los proyectos y microservicios de una organización se almacenan en un único repositorio de código fuente. Esto significa que todas las partes de la aplicación, incluidos los microfrontends, estarían en el mismo repositorio. En este caso, Module Federation se utilizaría para permitir la carga dinámica de módulos entre diferentes partes del mismo repositorio.
Multirepo: En un multirepo, cada proyecto o microservicio se almacena en su propio repositorio de código fuente. Esto significa que cada microfrontend tendría su propio repositorio.


## 1. Crear la aplicación Monorepo
`ng new microfrontMonoRepo --create-application=false`
El comando ``ng new microfrontMonoRepo --create-application=false`` se utiliza para crear un nuevo proyecto Angular, pero con la opción --create-application=false, lo que significa que no se creará una aplicación Angular inicial automáticamente. Este comando solo creará la estructura de directorios y archivos necesarios para un proyecto Angular en blanco, pero sin ninguna aplicación dentro de él. 

## 2. Crear microfrontends
` ng generate application <nombre-de-tu-aplicacion>`
Esto te permitirá crear múltiples aplicaciones dentro del mismo proyecto de monorepo de Angular. Cada aplicación tendrá su propio conjunto de archivos y directorios, lo que te permitirá desarrollar y mantener aplicaciones separadas dentro de la misma base de código.

## 3. Crear biblioteca para compartir funcionalidades
`ng g library commons-lib`
creará una estructura de directorios y archivos para tu biblioteca Angular dentro del proyecto. Esto incluirá archivos de código fuente TypeScript, así como archivos de configuración y pruebas. Una vez que se haya creado la biblioteca, podrás agregar componentes, servicios, directivas u otros elementos que desees compartir entre diferentes partes de tu aplicación Angular.

## 4. Activar el Module Federation
`npm install -D @angular-architects/module-federation `

### 1. Crear microfronteds
Determinar la estructura de los micrfrontends, al mf principal de determina que es el Host y al resto de lo remote<br>
Estructura
* Nivel 1(Host): mf-shell
* Nivel 2(Remote): mf-shopping, mf-payment
* Nivel 3: commons-lib

Host:
`ng add @angular-architects/module-federation --project mf-shell --port 4200 --type host`

Remote:
`ng add @angular-architects/module-federation --project mf-shopping --port 4201 --type remote`

Librería:
`ng g library commons-lib`

En caso de que muestre error: 
Borrar la carpeta de node_module
`npm cache clean --force`
`npm i`

### 2. Crear el proyecto en cada uno de los mf
Implementar servicios, componentes, interfaces y rutas. Una vez terminada la implementación ir al fichero `webpack.config.js` de cada mf configurar el nombre y en el apartado de `expose`  vas a poner los módulos, rutas o componentes que quieras compartir con los otro mf.
```module.exports = withModuleFederationPlugin({
  name: 'mfPayment',
  exposes: { 
    './Routes': './projects/mf-payment/src/app/app.routes.ts',
  },
  shared: {
    ...shareAll({  //comprarte todo con los otros mf
singleton: true, //todos deben trabajar con la misma librería y estas librerías se deben descargar una única vez
strictVersion: true, //todos los mf deben usar la misma versión de sus librerías
requiredVersion: 'auto' }),
  },
  sharedMappings: [ "@coomons-lib" ]
});
```
### 3. Conectar los micrifrontend
Ir al nivel 1: mf-shell. Ir al fichero `webpack.config.js`

```module.exports = withModuleFederationPlugin({

  remotes: { //Se define las rutas en la que se van a ejecutar los otros mf que hemos creado
    "mfPayment": "http://localhost:4202/remoteEntry.js",
    "mfShopping": "http://localhost:4201/remoteEntry.js",    
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
  sharedMappings: [ "@coomons-lib" ]

});
```
Crear un fichero `custom.d.ts`
```declare module 'mfShopping/*';
declare module 'mfPayment/*';
```
Cuando utilizas ``declare module``, estás creando una declaración de tipo ambiental en TypeScript para decirle al compilador que existe un módulo con ese nombre.

En el `app.routes.ts` definir las rutas de los mf

```export const routes: Routes = [
    {
        path:'',
        loadChildren:() => import('mfShopping/Routes').then( r => r.routesMfShopping)
    },
    {
        path:'payment',
        loadChildren:() => import('mfPayment/Routes').then( r => r.routesmfPayment)
    },
];
```

Listo con esto podríamos levantar el proyecto y debe funcionar. Hay que recordar que hay que levantar cada proyecto de manera independiente 
`ng s mf-shell`
`ng s mf-shopping`

## Crear librerias
Permite compartir entre diferentes partes de tu aplicación Angular. Para realizar un canal de comunicación trabajamos con servicios.

`ng g library commons-lib`

Una vez creada ir a `package.json` y agregamos las librerías que necesitamos para trabajar. Siempre recordando que estas librerías deben de existir en la aplicación base y deben de tener la misma versión.
```"dependencies": {
    "tslib": "^2.3.0",
    "rxjs": "~7.8.0"
  },
```
Nos movemos en la terminal hasta estar dentro del project librería
`cd .\project\commons-lib`
`npm i`

Ir a la raiz de la aplicación y en el `tsconfig.json` agregamos la librería que hemos creado
```"compilerOptions": {
    "paths": {
      "@coomons-lib": [
        //"./dist/coomons-lib",
        "./projects/coomons-lib/src/public-api.ts" //referencia directa
      ]
    },
```
En cada mf que quiera usar esta librería debo instanciarla en el fichero `webpack.config.js`
`sharedMappings: [ "@coomons-lib" ]`
Esto se hace para que la librería de angular arquitect pueda generar una instancia de la descarga e inyectarla en cada uno de los mf

