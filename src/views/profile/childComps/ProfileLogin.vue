<template>
  <div id="login">
    <div class="login-item">
      <div class="avatar">
        <img src="~assets/img/profile/avatar.svg">
      </div>
    </div>
    <div class="login-item phone">
      <div class="login">登录/注册</div>
      <div class="item-phone">
        <img src="~assets/img/profile/phone.svg">
        <div>暂无绑定手机号</div>
      </div>
    </div>
    <div class="login-item arrow-right">
      <img src="~assets/img/common/arrow-left.svg" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProfileLogin"
  }
</script>

<style scoped>
  #login {
    background-color: var(--color-tint);
    height: 90px;
    display: flex;
  }

  .login-item {
    height: 100%;
  }

  .avatar {
    width: 80px;
    height: 80px;
  }

  .avatar img {
    width: 100%;
    margin-left: 10px;
  }

  .item-phone {
    display: flex;
  }

  .phone {
    flex: 1;
    margin-top: 22px;
    margin-left: 18px;
    text-align: left;
    color: #fff;
  }

  .phone .login {
    font-weight: 600;
  }

  .item-phone img {
    width: 20px;
    height: 20px;
    margin-left: -4px;
  }

  .arrow-right {
    width: 20px;
    height: 20px;
    line-height: 90px;
    margin-right: 30px;
  }

  .arrow-right img {
    width: 100%;
  }
</style>
