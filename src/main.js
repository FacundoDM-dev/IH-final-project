// Importar la función 'createApp' de Vue 3 para crear una nueva instancia de la aplicación
import { createApp } from "vue";

// Importar la función 'createPinia' de Pinia para crear una nueva instancia de la tienda global
import { createPinia } from "pinia";

// Importar el componente principal 'App.vue'
import App from "./App.vue";

// Importar el enrutador de Vue Router
import router from "./router";

// Importar el plugin 'VueSweetalert2' para mostrar alertas con estilos personalizados
import VueSweetalert2 from 'vue-sweetalert2';

// Importar los estilos de SweetAlert2
import 'sweetalert2/dist/sweetalert2.min.css';

// Importar el archivo de estilos personalizados 'style.css'
import './assets/style.css';

// Crear una nueva instancia de la aplicación
const app = createApp(App);

// Usar el plugin 'VueSweetalert2' en la aplicación
app.use(VueSweetalert2);

// Usar la instancia de Pinia como almacenamiento global de la aplicación
app.use(createPinia());

// Usar el enrutador de Vue Router en la aplicación
app.use(router);

// Montar la aplicación en el elemento con el ID "app" en el DOM
app.mount("#app");