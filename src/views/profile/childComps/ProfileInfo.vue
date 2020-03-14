<template>
  <div id="info">
    <div class="info-item">
      <div>
        <span class="money">0.00</span>
        <span>元</span>
      </div>
      <div>我的余额</div>
    </div>
    <span class="line"></span>
    <div class="info-item discounts">
      <div>
        <span class="money">0</span>
        <span>个</span>
      </div>
      <div>我的优惠</div>
    </div>
    <span class="line"></span>
    <div class="info-item">
      <div>
        <span class="money">0</span>
        <span>分</span>
      </div>
      <div>我的积分</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProfileInfo"
  }
</script>

<style scoped>
  #info {
    display: flex;
    align-items: center;
    text-align: center;
    background-color: #fff;
    height: 80px;
  }

  .info-item {
    flex: 1;
  }

  .info-item .money {
    color: orange;
    font-size: 24px;
    font-weight: 400;
  }

  .line {
    width: 2px;
    height: 80px;
    background-color: #f6f6f6;
  }
</style>
