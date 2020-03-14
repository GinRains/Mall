<template>
  <div id="msg">
    <div class="profile">
      <div class="msg-item">
        <img src="~assets/img/profile/message.svg" alt="">
        <span>我的消息</span>
      </div>
      <div class="msg-item">
        <img src="~assets/img/profile/pointer.svg" alt="">
        <span>积分商城</span>
      </div>
      <div class="msg-item">
        <img src="~assets/img/profile/vip.svg" alt="">
        <span>会员卡</span>
      </div>
    </div>
    <div class="cart">
      <div class="msg-item">
        <img src="~assets/img/profile/cart.svg" alt="">
        <span>我的购物车</span>
      </div>
      <div class="msg-item">
        <img src="~assets/img/profile/shopping.svg" alt="">
        <span>下载购物APP</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProfileMsg"
  }
</script>

<style scoped>
  img {
    width: 24px;
    height: 24px;
    margin: 10px;
  }

  .profile {
    border-top: 14px solid rgba(0, 0, 0, .1);
    border-bottom: 14px solid rgba(0, 0, 0, .1);
  }

  .msg-item {
    display: flex;
    align-items: flex-end;
  }

  .msg-item span {
    padding-bottom: 9px;
    border-bottom: 1px solid #c5c4c4;
    flex: 1;
  }

  .msg-item:nth-child(3) span {
    border-bottom: none;
  }
</style>
