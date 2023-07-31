// Importar las funciones y librerías necesarias
import { defineStore } from "pinia";
import { supabase } from "../supabase";

// Definir la tienda "useUserStore" utilizando el Options API de Pinia
export const useUserStore = defineStore("user", {
  // Estado inicial de la tienda
  state: () => ({
    user: null,     // Variable para almacenar la información del usuario autenticado
    profile: null   // Variable para almacenar el perfil del usuario
  }),

  // Acciones disponibles en la tienda
  actions: {
    // Acción para obtener el usuario autenticado y su perfil
    async fetchUser() {
      // Obtener el usuario autenticado desde Supabase
      const user = await supabase.auth.user();
      if (user) {
        // Si existe un usuario autenticado, asignarlo al estado de la tienda
        this.user = user;

        // Obtener el perfil del usuario desde la tabla "profiles" de Supabase
        const { data: profile } = await supabase
          .from('profiles')
          .select()
          .match({ user_id: this.user.id });

        // Si se encontró un perfil, asignarlo al estado de la tienda
        if (profile) this.profile = profile[0];
      }
    },

    // Acción para registrar un nuevo usuario
    async signUp(email, password) {
      // Registrar el usuario utilizando Supabase
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      // Si ocurrió un error durante el registro, lanzarlo para manejarlo externamente
      if (error) {
        throw error;
      }

      // Si el registro fue exitoso y se obtuvo un usuario, asignarlo al estado de la tienda
      if (user) {
        this.user = user;

        // Crear un nuevo perfil para el usuario en la tabla "profiles" de Supabase
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              user_id: this.user.id,
              username: email
            }
          ]);

        // Si ocurrió un error al crear el perfil, mostrarlo en la consola
        if (profileError) {
          console.error(profileError);
        } else {
          // Si se creó el perfil con éxito, asignarlo al estado de la tienda
          if (profile) {
            this.profile = profile[0];
          }
        }
      }
    },

    // Acción para iniciar sesión con un usuario existente
    async signIn(email, password) {
      // Iniciar sesión utilizando Supabase
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      },
      {
        shouldCreateUser: false,
      });

      // Si ocurrió un error durante el inicio de sesión, lanzarlo para manejarlo externamente
      if (error) throw error;

      // Si el inicio de sesión fue exitoso y se obtuvo un usuario, asignarlo al estado de la tienda
      if (user) {
        this.user = user;

        // Obtener el perfil del usuario desde la tabla "profiles" de Supabase
        const { data: profile } = await supabase
          .from('profiles')
          .select()
          .match({ user_id: this.user.id })

        // Si se encontró un perfil, asignarlo al estado de la tienda
        if (profile) this.profile = profile[0];
      }
    },

    // Acción para cerrar sesión
    async signOut(){
      // Cerrar sesión utilizando Supabase
      const { error } = await supabase.auth.signOut();
      // Si ocurrió un error durante el cierre de sesión, lanzarlo para manejarlo externamente
      if (error) throw error;
    },
  },

  // Opciones de persistencia de la tienda
  persist: {
    enabled: true,                    // Habilitar la persistencia
    strategies: [
      {
        key: "user",                   // Clave única para identificar la persistencia de este estado
        storage: localStorage,         // Almacenar el estado en el localStorage del navegador
      },
    ],
  },
});