<template>
  <div class="left-nav">
    <ul>
      <li>
        <i class="iconfont icon-wodezichan"></i>
        <p>收银</p>
      </li>
      <li>
        <i class="iconfont icon-dianpu"></i>
        <p>店铺</p>
      </li>
      <li>
        <i class="iconfont icon-hanbao"></i>
        <p>商品</p>
      </li>
      <li>
        <i class="iconfont icon-huiyuanqia"></i>
        <p>会员</p>
      </li>
      <li>
        <i class="iconfont icon-zuanshi"></i>
        <p>统计</p>
      </li>
      <li>
        <i class="iconfont icon-shezhi"></i>
        <p>设置</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
.left-nav{
  color: #fff;
  font-size: 10px;
  height: 100%;
  background-color: #1D8CE0;
  width: 60px;
}
ul li{
  list-style: none;
  text-align: center;
  border-bottom: 1px solid rgb(129, 177, 221);
  padding: 10px 0;
  cursor: pointer;
}
.iconfont{
  font-size: 24px;
}
</style>