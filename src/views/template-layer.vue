<template>
  <div class="layer">
    <div class="layouts-header-menu">菜单</div>
    <div>
      111111
      <router-view />
    </div>
  </div>
</template>

<script lang="jsx">
// 预留的 JSX 脚本块（当前无业务逻辑，导出空对象保证 SFC 结构合法）
export default {};
</script>

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