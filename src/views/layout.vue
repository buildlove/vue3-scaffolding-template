<template>
  <div class="layouts">
    <header
      class="layouts-header"
    >
      <router-link to="/template">带二级菜单路由 </router-link>
      <router-link to="/template/templateChild">带二级菜单子路由 </router-link>
      <router-link to="/template2">独立路由 </router-link>
    </header>
    <div class="layouts-wrapper">
      <section class="layouts-main">
        <router-view />
      </section>
    </div>
  </div>
</template>

<script setup>


</script>

<style>
.layouts {
  display: flex;
  height: 100vh;
  flex-direction: column;
}

.layouts-header {
  height: 57px;
  line-height: 60px;
  padding-left: 60px;
  /* flex-shrink: 0; */
  color: #fff;
  background-color: rgb(59,130,246);
  /* text-align: center; */
}

.layouts-wrapper {
  display: flex;
  height: 100%;
}

.layouts-menu {
  width: 280px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: rgb(248,113,113);
  font-size: 22px;
}

.layouts-main {
  width: 100%;
}
</style>
