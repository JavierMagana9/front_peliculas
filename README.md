# front_peliculas

## Instalar componentes

```node
npm i
```

 - express
 - cors
 - dotenv
 - cookie-parser
 - ejs
 - jsonwebtoken
 - multer


## Variables de entorno

 - PORT: Puerto del servidor
 - URL_BASE: URL base para reutilizar


## Estructura del Proyecto

 - app.js: Punto de entrada de la aplicación Express.
 - routers: Rutas de Express para manejar las solicitudes.
 - controllers: Controladores para manejar las rutas
 - utils: Funciones de utilidad que proporcionan funcionalidades comunes a través de la aplicación.
 - views: Plantillas EJS para la interfaz de usuario.
 - public:  Archivo estático con hojas de estilo.
 - config: configuración de la base de datos y login en Firebase.
 - middleware:

## En detalle:

### app.js

- **Configuración Inicial:**
  - Importamos `express`, `cors`, `dotenv` para la configuración inicial, y `cookie-parser` para el manejo de cookies.
  - Se establece el puerto de escucha del servidor a partir de las variables de entorno.

- **Middlewares:**
  - `express.urlencoded` y `express.json` para parsear cuerpos de solicitudes en formatos URL-encoded y JSON.
  - `express.static` para utilizar archivos estáticos desde el directorio `public`.
  - `cookieParser` para parsear cookies de las solicitudes.
  - `cors` para habilitar CORS (Intercambio de Recursos de Origen Cruzado) y permitir solicitudes entre dominios.

- **Configuración de EJS:**
  - Se configura EJS como el motor de plantillas para renderizar vistas.
  - Se especifica el directorio `views` para almacenar las plantillas de EJS.

- **Rutas:**
  - Se definen rutas para las secciones `admin` y `user`, utilizando routers separados.

- **Manejo de Errores:**
  - Se manejan rutas no encontradas (404) devolviendo un mensaje simple.
  
- **Inicio del Servidor:**
  - Se inicia el servidor para escuchar en el puerto especificado, mostrando un mensaje en la consola una vez que el servidor está en funcionamiento.

### Routers

La aplicación utiliza tres routers para organizar las rutas relacionadas con diferentes aspectos de la aplicación:

#### adminRouter

Maneja todas las rutas relacionadas con las funciones del administrador.

`GET /`: Muestra una lista de todas las películas.
  - Controlador: `getPelis`
  - Propósito: Recuperar y renderizar una lista de todas las películas.

- `GET /crear`: Muestra el formulario para crear una nueva película.
  - Controlador: `getCrearPelis`
  - Propósito: Renderizar el formulario de creación de películas.

- `POST /crear`: Procesa los datos del formulario de creación de películas.
  - Controlador: `postCrearPelis`
  - Propósito: Recibir y procesar la información para crear una nueva película.

- `GET /modificar/:id`: Muestra el formulario para modificar una película existente.
  - Controlador: `getModificarPeli`
  - Propósito: Obtener los detalles de una película específica y renderizar el formulario de modificación.

- `POST /modificar`: Procesa los datos del formulario de modificación de películas.
  - Controlador: `modificarPeli`
  - Propósito: Recibir y actualizar la información de una película existente.

- `GET /eliminar/:id`: Muestra la vista de confirmación para eliminar una película.
  - Controlador: `vistaEliminar`
  - Propósito: Confirmar la eliminación de una película específica.

- `POST /eliminardef/:id`: Realiza la eliminación definitiva de una película.
  - Controlador: `eliminarDefinitivo`
  - Propósito: Eliminar permanentemente una película del sistema.

#### userRouter

El `userRouter` maneja las rutas accesibles por los usuarios de la aplicación, facilitando funciones como la búsqueda de películas, visualización de detalles y gestión de favoritos. 

- `GET /`: Muestra la página principal del área de usuario.
  - Controlador: `getIndexUser`
  - Propósito: Presentar opciones como buscar películas y ver películas favoritas.

- `GET /search`: Permite buscar y mostrar todas las películas.
  - Controlador: `getPeliculas`
  - Propósito: Buscar todas las películas disponibles y ofrecer la opción de añadirlas a favoritos.

- `GET /search/:id`: Muestra detalles de una película específica.
  - Controlador: `verMasId`
  - Propósito: Visualizar información detallada de una película seleccionada, identificada por su ID.

- `POST /search`: Busca películas por título.
  - Controlador: `postPeliTitulo`
  - Propósito: Recibir un título de película en el cuerpo de la solicitud y mostrar la película que coincide con ese título.

- `GET /movies`: Muestra las películas favoritas del usuario.
  - Controlador: `getFavoritos`
  - Propósito: Listar las películas que el usuario ha añadido a su lista de favoritos.

  #### authRouter

  ### Controladores

#### adminControllers:
Estos controladores manejan las operaciones administrativas relacionadas con las películas.

**getPelis**
- Recupera y muestra una lista de todas las películas en la sección de administración.

**getCrearPelis**
- Renderiza el formulario para crear una nueva película.

**postCrearPelis**
- Procesa los datos del formulario de creación de películas y añade una nueva película a la base de datos.

**getModificarPeli**
- Obtiene los detalles de una película específica para su modificación y renderiza el formulario de modificación.

**modificarPeli**
- Actualiza los detalles de una película en la base de datos basándose en los datos del formulario de modificación.

**vistaEliminar**
- Renderiza una vista para confirmar la eliminación de una película específica.

**eliminarDefinitivo**
- Elimina definitivamente una película de la base de datos.

#### userControllers:

Los controladores en `userRouter` gestionan las funcionalidades orientadas al usuario, como la búsqueda de películas y la visualización de favoritos.

**getIndexUser**
- Propósito: Renderiza la página principal del área de usuario con opciones como buscar películas y ver películas favoritas.

**getPeliculas**
- Propósito: Muestra todas las películas disponibles para que el usuario las explore.

**getFavoritos**
- Propósito: Lista todas las películas que el usuario ha añadido a sus favoritos.

**postPeliTitulo**
- Propósito: Busca y muestra películas basadas en el título proporcionado en la solicitud.

**verMasId**
- Propósito: Muestra detalles específicos de una película seleccionada.

### Utils: Consulta

La función `consulta` es  clave para realizar solicitudes HTTP a la API. Se utiliza a lo largo de la aplicación para interactuar con APIs y obtener los datos necesarios.

**consulta**
- Propósito: Realiza solicitudes HTTP asincrnas a una URL dada y devuelve la respuesta. Es adaptable para soportar varios métodos HTTP como GET, POST, y PUT.

Ejemplo:
```javascript
const respuesta = await consulta(url, metodo, datos);
```

### Views

La carpeta `Views` contiene archivos EJS, que son plantillas utilizadas para renderizar las páginas HTML en la aplicación. 

#### Vistas en `admin`

Las vistas dentro de `admin` son utilizadas para las funciones de gestión y administración de películas:
Las vistas `footer.ejs` y `header.ejs` dentro de la subcarpeta `template` son plantillas reutilizables que se incluyen en las vistas anteriores para mantener un diseño consistente.

- `cPanel.ejs`: La vista principal del panel de control administrativo.
- `eliminar.ejs`: Una vista que proporciona una interfaz para confirmar la eliminación de una película.
- `formCrear.ejs`: El formulario para introducir los datos de una nueva película.
- `formModificar.ejs`: El formulario para editar los datos de una película existente.

#### Vistas en `user`

Las vistas dentro de `user` están orientadas a la interacción del usuario final con la aplicación:

- `buscarPeli.ejs`: Permite a los usuarios buscar películas por diferentes criterios.
- `favoritos.ejs`: Muestra un listado de las películas que el usuario ha marcado como favoritas.
- `indexUser.ejs`: La página de inicio para los usuarios, desde donde pueden navegar a las funciones principales.
- `verMasId.ejs`: Proporciona detalles de una película específica.
- `verMasTitulo.ejs`: Muestra los resultados de la búsqueda de películas por título.
