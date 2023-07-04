<template>
  <div>
    <h1>Test</h1>
    <!-- <label for="">email</label>
    <input v-model="email" type="text">

    <label for="">password</label>
    <input v-model="password" type="text"> -->

    <label for="">name</label>
    <input v-model="name" type="text">

    <!-- <button @click="singUp(email, password)">SignUp</button> -->
    <button @click="getName()">Name</button>
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase';

// const email = ref("")
// const password = ref("")
const name = ref("")


const singUp = async (email, password) => {
  console.log("aca imprimio usuario", email, password);
  let { dataUser, error } = await supabase.auth.signUp({
    email: email,
    password: password
  })

  if (error) {
    throw error 
  } 

  if (dataUser) {
    this.user = dataUser
  }
}

// select email from auth.users where id = 'a622d06a-1145-4d3d-913c-fff6feaec382'

const getName = async () => {
 
  const { data: test, error } = await supabase
  .from('test')
  .select()

  if (error) {
    throw error 
  } 

  if (data) {
    console.log("Usuarios",data);
  }
}




</script>

<style scoped>
</style>
