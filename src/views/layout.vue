<template>
  <!-- 整体布局容器：顶部导航 + 主内容区 -->
  <div class="layouts">
    <!-- 顶部导航栏 -->
    <header class="layouts-header">
      <!-- 品牌区：Logo 与项目名称 -->
      <div class="layouts-brand">
        <div class="layouts-logo">V3</div>
        <div class="layouts-name">
          <div class="layouts-title">Vue3 脚手架演示</div>
          <div class="layouts-subtitle">Vue3.5 · Vite · Pinia · Element Plus</div>
        </div>
      </div>

      <!-- 主导航：与路由联动，自动高亮当前页面 -->
      <nav class="layouts-nav">
        <router-link
          v-for="item in navList"
          :key="item.path"
          :to="item.path"
          class="layouts-nav-item"
          :class="{ 'is-active': isActive(item) }"
        >
          {{ item.label }}
        </router-link>
      </nav>

      <!-- 右侧实时时钟：演示定时器与组件卸载清理 -->
      <div class="layouts-clock">🕐 {{ currentTime }}</div>
    </header>

    <!-- 主内容区：一级路由出口 -->
    <div class="layouts-wrapper">
      <section class="layouts-main">
        <router-view />
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

// 顶部导航配置：active 为该导航对应的路由完整路径（用于精确高亮）
const navList = [
  { label: '嵌套路由', path: '/template', active: '/template/template1' },
  { label: '二级子路由', path: '/template/templateChild', active: '/template/templateChild' },
  { label: '独立路由', path: '/template2', active: '/template2' },
];

const route = useRoute();

// 当前时间字符串，每秒刷新一次
const currentTime = ref('');
// 定时器 id：组件卸载时清理，避免内存泄漏
let timer = null;

/**
 * 判断导航项是否为当前激活项
 * @param {Object} item 导航配置项
 * @returns {boolean} 当前路由路径与配置的 active 完全匹配时返回 true
 */
const isActive = (item) => route.path === item.active;

/**
 * 将日期格式化为 YYYY-MM-DD HH:mm:ss
 * @param {Date} date 日期对象
 * @returns {string} 格式化后的时间字符串
 */
const formatTime = (date) => {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

// 挂载后启动时钟定时器
onMounted(() => {
  currentTime.value = formatTime(new Date());
  timer = setInterval(() => {
    currentTime.value = formatTime(new Date());
  }, 1000);
});

// 卸载时清理定时器
onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style lang="less" scoped>
/* 布局整体：顶部栏 + 可滚动内容区 */
.layouts {
  display: flex;
  flex-direction: column;
  height: 100vh;

  /* 顶部导航栏：品牌 + 菜单 + 时钟 三段式 */
  .layouts-header {
    display: flex;
    align-items: center;
    gap: 24px;
    height: 64px;
    padding: 0 24px;
    background: var(--app-card-bg);
    border-bottom: 1px solid #e5eaf3;
  }

  /* 品牌区 */
  .layouts-brand {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  /* Logo：渐变色圆角方块 */
  .layouts-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: linear-gradient(135deg, #4f46e5, #3b82f6);
    color: #fff;
    font-size: 16px;
    font-weight: 700;
  }

  /* 项目名称 */
  .layouts-title {
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
  }

  /* 项目副标题（技术栈） */
  .layouts-subtitle {
    font-size: 12px;
    color: var(--app-text-secondary);
  }

  /* 主导航 */
  .layouts-nav {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: 16px;
  }

  /* 导航项：悬停变色，激活态渐变底 */
  .layouts-nav-item {
    padding: 6px 16px;
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
      color: #fff;
      background: linear-gradient(135deg, #4f46e5, #3b82f6);
    }
  }

  /* 右侧时钟：等宽数字避免抖动 */
  .layouts-clock {
    margin-left: auto;
    font-size: 13px;
    color: var(--app-text-secondary);
    font-variant-numeric: tabular-nums;
  }

  /* 内容区：超出滚动 */
  .layouts-wrapper {
    flex: 1;
    overflow: auto;
  }

  .layouts-main {
    padding: 20px;
    min-height: calc(100vh - 64px - 40px);
  }
}
</style>
