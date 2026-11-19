<template>
  <!-- 首页：欢迎横幅 + 技术栈介绍 + 功能演示 -->
  <div class="home">
    <!-- 欢迎横幅 -->
    <section class="home-hero">
      <h1 class="home-hero-title">👋 欢迎使用 Vue3 脚手架</h1>
      <p class="home-hero-desc">
        开箱即用的 Vue3.5 + Vite + Pinia + Vue Router + Element Plus 演示工程，
        覆盖嵌套路由、状态管理、请求封装等常用能力，可直接作为新项目的起步模板。
      </p>
      <div class="home-hero-tags">
        <span v-for="tag in heroTags" :key="tag" class="home-hero-tag">{{ tag }}</span>
      </div>
    </section>

    <!-- 技术栈卡片 -->
    <section class="home-section">
      <h2 class="home-section-title">技术栈</h2>
      <div class="home-stack">
        <div v-for="tech in techList" :key="tech.name" class="home-stack-card">
          <div class="home-stack-icon">{{ tech.icon }}</div>
          <div class="home-stack-name">{{ tech.name }}</div>
          <div class="home-stack-desc">{{ tech.desc }}</div>
        </div>
      </div>
    </section>

    <!-- 功能演示 -->
    <section class="home-section">
      <h2 class="home-section-title">功能演示</h2>
      <div class="home-demo">
        <!-- Pinia 计数器演示 -->
        <el-card shadow="never" class="home-demo-card">
          <template #header>
            <div class="home-demo-header">
              <span>🍍 Pinia 状态管理</span>
              <el-tag size="small" type="success">实时联动</el-tag>
            </div>
          </template>
          <div class="home-counter">
            <!-- 计数值：修改后所有引用处自动更新 -->
            <div class="home-counter-num">{{ demoStore.count }}</div>
            <!-- getter 派生值 -->
            <div class="home-counter-tip">双倍值（getters）：{{ demoStore.doubleCount }}</div>
            <div class="home-counter-btns">
              <el-button type="primary" @click="demoStore.increment()">+ 1</el-button>
              <el-button @click="demoStore.decrement()">- 1</el-button>
              <el-button type="warning" plain @click="demoStore.reset()">重置</el-button>
            </div>
          </div>
        </el-card>

        <!-- 路由节点 + 分页联动演示 -->
        <el-card shadow="never" class="home-demo-card">
          <template #header>
            <div class="home-demo-header">
              <span>🧭 路由节点（分页联动）</span>
              <el-tag size="small">共 {{ nodeList.length }} 个节点</el-tag>
            </div>
          </template>
          <!-- 当前页节点列表 -->
          <div class="home-nodes">
            <div v-for="item in pagedNodes" :key="item.path" class="home-node-item">
              <el-tag size="small" effect="plain" :type="item.meta?.node ? 'primary' : 'info'">
                层级 {{ item.meta?.level ?? '-' }}
              </el-tag>
              <span class="home-node-name">{{ item.meta?.name || '未命名路由' }}</span>
            </div>
            <el-empty v-if="!pagedNodes.length" :image-size="60" description="暂无节点" />
          </div>
          <!-- 分页器：与上方节点列表真实联动 -->
          <el-pagination
            class="home-pagination"
            size="small"
            background
            layout="total, sizes, prev, pager, next"
            :page-sizes="[2, 4, 6]"
            :total="nodeList.length"
            v-model:current-page="page"
            v-model:page-size="pageSize"
          />
        </el-card>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoutesStore } from '@/store/routes';
import { useDemoStore } from '@/store/demo';

// 欢迎横幅标签列表
const heroTags = ['Vue 3.5', 'Vite 4', 'Pinia', 'Vue Router 4', 'Element Plus', 'Less'];

// 技术栈介绍数据（图标使用 emoji，避免额外图标依赖）
const techList = [
  { icon: '⚡', name: 'Vue 3.5', desc: '组合式 API 与最新响应式特性' },
  { icon: '🚀', name: 'Vite 4', desc: '极速开发服务器与生产构建' },
  { icon: '🍍', name: 'Pinia', desc: '轻量直观的状态管理方案' },
  { icon: '🧭', name: 'Vue Router 4', desc: '嵌套路由与动态路由能力' },
  { icon: '🎨', name: 'Element Plus', desc: '成熟优雅的桌面端组件库' },
  { icon: '🌐', name: 'Axios', desc: '统一请求封装与拦截器' },
];

// Pinia 演示仓库（state / getters / actions 写法见 src/store/demo.js）
const demoStore = useDemoStore();

// 路由仓库：router/index.js 在全局前置守卫中写入路由表
const routesStore = useRoutesStore();

/**
 * 递归拍平路由树，收集所有节点
 * @param {Array} tree 路由树
 * @param {Array} result 结果数组
 * @returns {Array} 拍平后的节点数组
 */
const flattenRoutes = (tree, result = []) => {
  tree.forEach((node) => {
    result.push(node);
    if (node?.children?.length) {
      flattenRoutes(node.children, result);
    }
  });
  return result;
};

// 带 meta.name 的路由节点列表（演示 store 读取 + 递归处理树结构）
const nodeList = computed(() =>
  flattenRoutes(routesStore.routes).filter((item) => item?.meta?.name)
);

// 分页参数：当前页码与每页条数
const page = ref(1);
const pageSize = ref(4);

// 当前页展示的节点（分页与列表真实联动）
const pagedNodes = computed(() => {
  const start = (page.value - 1) * pageSize.value;
  return nodeList.value.slice(start, start + pageSize.value);
});
</script>

<style lang="less" scoped>
/* 首页容器：纵向卡片流 */
.home {
  display: flex;
  flex-direction: column;
  gap: 20px;

  /* 欢迎横幅：渐变背景 + 投影 */
  .home-hero {
    padding: 36px 40px;
    border-radius: 16px;
    background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 55%, #06b6d4 100%);
    box-shadow: 0 12px 32px rgba(79, 70, 229, 0.25);
    color: #fff;
  }

  .home-hero-title {
    margin: 0 0 12px;
    font-size: 28px;
    font-weight: 700;
  }

  .home-hero-desc {
    margin: 0 0 20px;
    max-width: 720px;
    font-size: 15px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.85);
  }

  /* 横幅标签组 */
  .home-hero-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .home-hero-tag {
    padding: 4px 12px;
    border: 1px solid rgba(255, 255, 255, 0.35);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.15);
    font-size: 12px;
  }

  /* 区块标题 */
  .home-section-title {
    margin: 0 0 12px;
    font-size: 18px;
    color: #1f2937;
  }

  /* 技术栈卡片网格：自适应列数 */
  .home-stack {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 16px;
  }

  /* 技术栈卡片：悬停上浮 */
  .home-stack-card {
    padding: 20px;
    border-radius: var(--app-radius);
    background: var(--app-card-bg);
    box-shadow: var(--app-shadow);
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(30, 41, 59, 0.1);
    }
  }

  .home-stack-icon {
    font-size: 28px;
  }

  .home-stack-name {
    margin: 10px 0 6px;
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
  }

  .home-stack-desc {
    font-size: 13px;
    line-height: 1.6;
    color: var(--app-text-secondary);
  }

  /* 功能演示双栏网格 */
  .home-demo {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 16px;
    align-items: start;
  }

  .home-demo-card {
    border-radius: var(--app-radius);
    border: none;
  }

  /* 演示卡片头部 */
  .home-demo-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
  }

  /* 计数器演示区 */
  .home-counter {
    text-align: center;
  }

  .home-counter-num {
    font-size: 42px;
    font-weight: 700;
    color: #4f46e5;
    font-variant-numeric: tabular-nums;
  }

  .home-counter-tip {
    margin: 4px 0 16px;
    font-size: 13px;
    color: var(--app-text-secondary);
  }

  /* 路由节点列表 */
  .home-nodes {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 180px;
  }

  .home-node-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    border-radius: 8px;
    background: #f7f9fc;
  }

  .home-node-name {
    font-size: 14px;
    color: var(--app-text);
  }

  /* 分页器 */
  .home-pagination {
    margin-top: 16px;
  }
}
</style>
