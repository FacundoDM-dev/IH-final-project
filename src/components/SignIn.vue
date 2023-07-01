<!-- COMPONENTE BOILERPLATE -->
 
  <template>

  <div class="container">
    <h3 class="header-title">Log In to ToDo App</h3>
    
    <form @submit.prevent="signIn" class="form-sign-in">
      <div class="form">
        <div class="form-input">
          <label class="input-field-label">E-mail</label>
          <input
            type="email"
            class="input-field"
            placeholder="example@gmail.com"
            id="email"
            v-model="email"
            required
          />
        </div>
        <div class="form-input">
          <label class="input-field-label">Password</label>
          <input
            type="password"
            class="input-field"
            placeholder="**********"
            id="password"
            v-model="password"
            required
          />
        </div>
        <button class="button" type="submit">Sign In</button>

        
      </div>
    </form>

    <p>Dont have an account? <PersonalRouter :route="route" :buttonText="buttonText" class="sign-up-link"/></p>
  </div>

</template>

<script setup>
import PersonalRouter from "./PersonalRouter.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { ref, reactive} from "vue"
// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";


// variables para conectarme al form (login)

const email = ref("")
const password = ref("")

// Router to push user once SignedIn to Home
const redirect = useRouter();

// const signUp = async () => {
//   if (password.value === confirmPassword.value) {
//     try {
//       // calls the user store and send the users info to backend to logIn
//       await useUserStore().signUp(email.value, password.value);
//       // redirects user to the homeView
//       redirect.push({ path: "/auth/login" });
//     } catch (error) {
//       // displays error message
//       errorMsg.value = error.message;
//       // hides error message
//       setTimeout(() => {
//         errorMsg.value = null;
//       }, 5000);
//     }
//     return;
//   }
//   errorMsg.value = "error";
// };

// Arrow function to Signin user to supaBase

const signIn = async () => {
  try {
    // escribir comectario, tarea para casa.
    await useUserStore().signIn(email.value, password.value);
     // redirects user to the homeView
    redirect.push({ path: "/" });

  } catch (error) {
    alert(error)
  }
};
</script>

<style></style>
