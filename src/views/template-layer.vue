<template>
  <!-- 嵌套路由容器：左侧二级菜单 + 右侧嵌套路由出口 -->
  <div class="layer">
    <!-- 侧边二级菜单 -->
    <aside class="layer-menu">
      <div class="layer-menu-title">二级菜单</div>
      <router-link
        v-for="item in menuList"
        :key="item.path"
        :to="item.path"
        class="layer-menu-item"
        :class="{ 'is-active': isActive(item) }"
      >
        <span class="layer-menu-dot" />
        {{ item.label }}
      </router-link>
    </aside>

    <!-- 二级路由出口 -->
    <div class="layer-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

// 二级菜单配置（与 router/index.js 中 template 路由的 children 对应）
const menuList = [
  { label: '嵌套路由一（首页）', path: '/template/template1' },
  { label: '嵌套路由子路由', path: '/template/templateChild' },
];

const route = useRoute();

/**
 * 判断菜单项是否为当前激活项（路径完全匹配）
 * @param {Object} item 菜单配置项
 * @returns {boolean} 是否为当前页面
 */
const isActive = (item) => route.path === item.path;
</script>

<style lang="less" scoped>
/* 嵌套路由容器：侧边菜单 + 内容区 左右布局 */
.layer {
  display: flex;
  align-items: stretch;
  gap: 16px;
  min-height: calc(100vh - 124px);

  /* 侧边菜单卡片 */
  .layer-menu {
    flex-shrink: 0;
    width: 220px;
    padding: 16px 12px;
    background: var(--app-card-bg);
    border-radius: var(--app-radius);
    box-shadow: var(--app-shadow);
  }

  /* 菜单标题 */
  .layer-menu-title {
    padding: 4px 12px 12px;
    font-size: 13px;
    color: var(--app-text-secondary);
  }

  /* 菜单项：悬停变色、激活高亮 */
  .layer-menu-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    border-radius: 8px;
    color: #606266;
    font-size: 14px;
    text-decoration: none;
    transition: all 0.2s;

    &:hover {
      color: #409eff;
      background: #f0f7ff;
    }

    &.is-active {
      color: #409eff;
      background: #ecf5ff;
      font-weight: 600;
    }
  }

  /* 菜单项前置小圆点 */
  .layer-menu-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #c0c4cc;
    transition: background 0.2s;
  }

  /* 激活项圆点变主题色 */
  .layer-menu-item.is-active .layer-menu-dot {
    background: #409eff;
  }

  /* 右侧内容区 */
  .layer-content {
    flex: 1;
    min-width: 0;
  }
}
</style>
