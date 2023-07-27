<!-- COMPONENTE BOILERPLATE -->

<template>
  <div class="container fade-in">
    <div class="row vh-100 justify-content-center align-items-center">
      <div class="col-auto p-2 text-center">
        <h4>Welcome!</h4>
        <img
          class="mb-3"
          src="../../assets/img/POSTASK-LOGO-PARODIA-POST-IT.png"
          alt=""
        />
        <h5>Sign In</h5>

        <form @submit.prevent="signIn" class="form-sign-in">
          <div class="form">
            <div class="form-input">
              <!-- <label class="input-field-label">E-mail</label> -->
              <input
                type="email"
                class="input-field w-100 mb-3"
                placeholder="Email"
                id="email"
                v-model="email"
                required
              />
            </div>
            <div class="form-input-password">
              <!-- <label class="input-field-label">Password</label> -->
              <input
                :type="passwordType"
                class="password input-field w-100 mb-3"
                placeholder="Password"
                id="password"
                v-model="password"
                required
              />
              <i @click="toggleEye" class="eye" :class="eyeClass"></i>
            </div>
            <p v-if="hidden" class="fade-in text-danger">Something is wrong.</p>
            <button class="btn btn-success w-100 mb-5" type="submit">
              Sign In
            </button>
          </div>
        </form>

        <p>
          Dont have an account?
          <PersonalRouter
            :route="route"
            :buttonText="buttonText"
            class="sign-up-link"
          />
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import PersonalRouter from "./PersonalRouter.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { ref, reactive } from "vue";
// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";

// variables para conectarme al form (login)

const email = ref("");
const password = ref("");

// Router to push user once SignedIn to Home
const redirect = useRouter();
const hidden = ref(false);
const eyeClass = ref("fa-solid fa-eye");
const passwordType = ref("password");

const toggleEye = () => {
  eyeClass.value =
    eyeClass.value === "fa-solid fa-eye"
      ? "fa-solid fa-eye-slash"
      : "fa-solid fa-eye";
  passwordType.value = passwordType.value === "password" ? "text" : "password";
};

// function to Signin user to supaBase
const signIn = async () => {
  try {
    await useUserStore().signIn(email.value, password.value);
    redirect.push({ path: "/" });
  } catch (error) {
    hidden.value = !hidden.value;
    setTimeout(() => {
      hidden.value = false;
    }, 5000);
  }
};
</script>

<style></style>
