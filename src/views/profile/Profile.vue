<template>
  <div>
    <nav-bar class="profile-nav">
      <template v-slot:center>
        <div class="profile">我的档案</div>
      </template>
    </nav-bar>
    <profile-login/>
    <profile-info/>
    <profile-msg/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import ProfileLogin from "./childComps/ProfileLogin";
  import ProfileInfo from "./childComps/ProfileInfo";
  import ProfileMsg from "./childComps/ProfileMsg";

  export default {
    name: "Profile",
    components: {
      NavBar,
      ProfileLogin,
      ProfileInfo,
      ProfileMsg
    }
  }
</script>

<style scoped>
  .profile-nav {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 600;
  }
</style>
