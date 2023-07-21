<template>
  <NavBar />
  <div
    class="container mt-5 d-flex justify-content-center align-items-center mb-5 gap-5 flex-column"
  >
  <div>
    <div
        v-if="isLoading"
        class=""
        style="height: 200px"
      >
      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>

      <div class="d-flex justify-content-center align-items-center flex-column fade-in" v-else>
        <div>
      <img
        class="avatar "
        :src="avatar_url"
        v-if="avatar_url"
        alt="Profile picture"
      />
      <div>
        <input class="form-control" @change="fileManager" type="file" />
        <button class="button btn btn-primary w-100" @click="uploadFile">
          Upload File
        </button>
      </div>
    </div>

    <div class="mt-5 mb-5 text-center w-50 text-center">
      <h5>Name: {{ username }}</h5>
      <h5>
        Website: <a target="_blank" :href="website">{{ website }}</a>
      </h5>
      <h5>Location: {{ location }}</h5>
      <h5 class="">Bio: {{ bio }}</h5>
    </div>
    <Profile @updateProfileEmit="hundleUpdateProfile" />
  </div>
      </div>
  </div>
    
  <FooterBar />
</template>

<script setup>
import { supabase } from "../supabase";
import { onMounted, ref, watch } from "vue";
import { useUserStore } from "../stores/user";
import NavBar from "../components/Nav.vue";
import FooterBar from "../components/Footer.vue";
import Profile from "../components/Profile.vue";

// variables avatar

const file = ref();
const fileUrl = ref();

const fileManager = (event) => {
  file.value = event.target.files[0];
  // console.log(event);
  // console.log(file.value);
};

const hundleUpdateProfile = (updatedProfileData) => {
  username.value = updatedProfileData.full_name;
  website.value = updatedProfileData.website;
  location.value = updatedProfileData.location;
  bio.value = updatedProfileData.bio;
  avatar_url.value = updatedProfileData.avatar_url;
};

const uploadFile = async () => {
  if (!file.value) return;

  const { data } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("user_id", supabase.auth.user().id);

  const deleteUrl = data[0].avatar_url;
  // console.log(deleteUrl);
  const { error: urlDeleteError } = await supabase.storage
    .from("profile-img")
    .remove([deleteUrl]);

  if (urlDeleteError) {
    console.error("Error deleting file:", urlDeleteError);
    return;
  }
  console.log("File succesfully upload.");

  const timestamp = Date.now();
  const filePath = `profiles/${timestamp}-${file.value.name}`;
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
  }
  console.log("Profile successfully updated.");

  await userStore.fetchUser();
};

const userStore = useUserStore();

const isLoading = ref(true);
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

  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
}

watch(
  () => userStore.profile,
  (updatedProfileData) => {
    // username.value = updatedProfileData.full_name;
    // website.value = updatedProfileData.website;
    // location.value = updatedProfileData.location;
    // bio.value = updatedProfileData.bio;
    avatar_url.value = updatedProfileData.avatar_url;
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

</style>
