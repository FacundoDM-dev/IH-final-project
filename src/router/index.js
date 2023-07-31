// Importar funciones y componentes necesarios desde Vue Router y archivos locales
import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import Home from "../views/Home.vue";
import Account from "../views/Account.vue"
import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";
import Weather from "../views/Weather.vue"

// Definir las rutas de la aplicación
const routes = [
  // Ruta para el módulo de autenticación (login y registro)
  {
    path: "/auth",
    component: Auth,
    children: [
      { path: "login", component: SignIn },  // Subruta para la página de inicio de sesión
      { path: "signup", component: SignUp }, // Subruta para la página de registro
    ],
  },
  // Ruta para la página de inicio de la aplicación
  { path: "/", component: Home },
  // Ruta para la página de la cuenta del usuario
  { path: "/account", component: Account },
  // Ruta para la página del clima (posiblemente para mostrar datos del clima)
  { path: "/weather", component: Weather }, 
];

// Crear el enrutador utilizando las rutas definidas y el modo de historial de navegación web
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Exportar el enrutador para que pueda ser utilizado en la aplicación principal
export default router;