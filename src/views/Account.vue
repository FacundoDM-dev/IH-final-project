<template>
  <Nav />
  <h1>Name: {{username}}</h1>
  <h1>Website: <a target="_blank" :href="website">{{website}}</a></h1>
  <h1>Location: {{location}}</h1>
  <h1>Byography: {{bio}}</h1>
  <img :src="avatar_url ? avatar_url : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'" alt="Profile picture">
  <Profile/>
</template>

<script setup>
  import { supabase } from '../supabase'
  import { onMounted, ref, toRefs } from 'vue'
  import { useUserStore } from "../stores/user";
  import Nav from '../components/Nav.vue';
  import Profile from '../components/Profile.vue';

  const userStore = useUserStore();


  const loading = ref(false);
  const username = ref(null);
  const website = ref(null);
  const avatar_url = ref(null);
  const location = ref(null);
  const bio = ref(null);


 

  async function getProfile() {
    await userStore.fetchUser();
    username.value = userStore.profile.full_name;
    website.value = userStore.profile.website;
    location.value = userStore.profile.location;
    bio.value = userStore.profile.bio;
    avatar_url.value = userStore.profile.avatar_url;
  }

  onMounted(() => {
    getProfile();
  });

  // async function signOut() {
  //   try {
  //     loading.value = true
  //     let { error } = await supabase.auth.signOut()
  //     if (error) throw error
  //   } catch (error) {
  //     alert(error.message)
  //   } finally {
  //     loading.value = false
  //   }
  // }
</script>

<style>
img {
  width: 200px;
  border-radius: 50%;
}
</style>