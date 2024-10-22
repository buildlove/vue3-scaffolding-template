<template>
  <div class="layer">
    <div class="layouts-header-menu">菜单</div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<style lang="less">

.layer {
  height: 100%;
  display: flex;
  .layouts-header-menu {
    width: 300px;
    height: 100%;
    line-height: 60px;
    color: #fff;
    background-color: rgb(246, 146, 59);
  }
}


</style>