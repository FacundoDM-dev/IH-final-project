<template>
  <Nav />
  <h1>Name: {{username}}</h1>
  <h1>Website: <a target="_blank" :href="website">{{website}}</a></h1>
  <h1>Location: {{location}}</h1>
  <h1>Byography: {{bio}}</h1>
  <img :src="avatar_url" v-if="avatar_url" alt="Profile picture">
  <input @change="fileManager" type="file" />
  <button @click="uploadFile">Upload File</button>

  <Profile />
</template>

<script setup>
import { supabase } from "../supabase";
import { onMounted, ref, toRefs, watch } from "vue";
import { useUserStore } from "../stores/user";
import Nav from "../components/Nav.vue";
import Profile from "../components/Profile.vue";

// variables avatar

const file = ref();
const fileUrl = ref();

const fileManager = (event) => {
  file.value = event.target.files[0];
  // console.log(event);
  console.log(file.value);
};

const uploadFile = async () => {
  if (!file.value) return;
  const filePath = `profiles/${file.value.name}`;
  const { error: uploadError } = await supabase.storage
    .from("profile-img")
    .upload(filePath, file.value);
  if (uploadError) {
    console.error("Error uploading file:", uploadError);
    return;
  }
  console.log("File succesfully upload.");

  const { data: urlData, error: urlError } = await supabase.storage
    .from("profile-img")
    .getPublicUrl(filePath);
   console.log(urlData);
  if (urlError) {
    console.error("Error getting public URL:", urlError);
    return;
  }

  fileUrl.value = urlData.publicURL;
 console.log(fileUrl.value);

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: fileUrl.value })
    .eq("user_id", supabase.auth.user().id);

  if (updateError) {
    console.error("Error updating profile:", updateError);
    return;

  } console.log("Profile successfully updated.");
  
  await userStore.fetchUser()
}

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

watch(
  () => userStore.profile, 
  (newProfile) => {
    // username.value = newProfile.full_name;
    // website.value = newProfile.website;
    // location.value = newProfile.location;
    // bio.value = newProfile.bio;
    avatar_url.value = newProfile.avatar_url;
  }, 
  { deep: true }
);

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
