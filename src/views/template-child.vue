<template>
  <!-- 嵌套路由子路由页面 -->
  <div class="page">
    <el-card shadow="never" class="page-card">
      <template #header>
        <div class="page-header">
          <span>🧩 嵌套路由子路由</span>
          <el-tag size="small" type="success">子路由</el-tag>
        </div>
      </template>
      <p class="page-desc">
        当前页面由二级子路由渲染，演示 router-view 的嵌套出口能力（外层布局 + 内层侧边菜单 + 子页面）。
      </p>
      <el-button type="primary" plain @click="$router.push('/template/template1')">返回首页</el-button>
    </el-card>
  </div>
</template>
