<template>
  <div class="container">
    <div class="row vh-100 justify-content-center align-items-center">
      <div class="col-auto p-2 text-center">
        <div class="header">
          <div class="header-description">
            <h4>Welcome!</h4>
            <img
              class="mb-3"
              src="../../assets/img/POSTASK-LOGO-PARODIA-POST-IT.png"
              alt=""
            />
            <h5>Sign Up</h5>
          </div>
        </div>

        <form @submit.prevent="signUp" class="form-sign-in fade-in">
          <div class="form">
            <div class="form-input">
              <!-- <label class="input-field-label">E-mail</label> -->
              <input
                type="email"
                class="input-field w-100 mb-3"
                placeholder="E-mail"
                id="email"
                v-model="email"
                required
              />
            </div>
            <div class="form-input-password">
              <!-- <label class="input-field-label">Password</label> -->
              <input
                :type="passwordType"
                class="input-field w-100 mb-3"
                placeholder="Password"
                id="password"
                v-model="password"
                required
              />
              <i @click="toggleEye" class="eye" :class="eyeClass"></i>
            </div>
            <div class="form-input-password">
              <!-- <label class="input-field-label">Confirm password</label> -->
              <input
                :type="passwordType"
                class="input-field w-100 mb-3"
                placeholder="Confirm password"
                id="confirmPassword"
                v-model="confirmPassword"
                required
              />
              <i @click="toggleEye" class="eye" :class="eyeClass"></i>
            </div>
            <button class="btn btn-success w-100 mb-5" type="submit">
              Sign Up
            </button>
            <p>
              Have an account?
              <PersonalRouter
                :route="route"
                :buttonText="buttonText"
                class="sign-up-link"
              />
            </p>
          </div>
        </form>

        <div class="text-danger" v-show="errorMsg">{{ errorMsg }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import Swal from "sweetalert2";

// constantes para las rutas
const route = "/auth/login";
const buttonText = "Sign In";

// constantes para los inputs
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Mensaje de error
const errorMsg = ref("");

// Ruta para empujar al usuario una vez que se haya registrado para iniciar sesión
const redirect = useRouter();

// función para registrar al usuario en supaBase con un método timeOut () para mostrar el error
const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      // llama a la store users y envía la información de los usuarios al backend para iniciar sesión
      await useUserStore().signUp(email.value, password.value);
      // redirige al home/signIn
      redirect.push({ path: "/auth/login" });
      Swal.fire("Check your email!");
    } catch (error) {
      // muestra el mensaje de error
      errorMsg.value = error.message;
      // esconde el mensaje de error
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "Something is wrong.";
};

const eyeClass = ref("fa-solid fa-eye");

const passwordType = ref("password");

const toggleEye = () => {
  eyeClass.value =
    eyeClass.value === "fa-solid fa-eye"
      ? "fa-solid fa-eye-slash"
      : "fa-solid fa-eye";
  passwordType.value = passwordType.value === "password" ? "text" : "password";
};
</script>

<style></style>
