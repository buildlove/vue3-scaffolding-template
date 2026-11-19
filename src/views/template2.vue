<template>
  <!-- 独立路由页：演示 Axios 请求封装 -->
  <div class="page">
    <el-card shadow="never" class="page-card">
      <template #header>
        <div class="page-header">
          <span>🌐 Axios 请求演示</span>
          <el-tag size="small" type="warning">独立路由</el-tag>
        </div>
      </template>
      <p class="page-desc">
        点击按钮发起请求（统一请求封装见 src/utils/request.js，含拦截器与统一错误提示）。
      </p>
      <el-button type="primary" :loading="loading" @click="handleRequest">发送请求</el-button>
      <!-- 请求结果展示区：成功输出 JSON，失败输出错误信息 -->
      <div v-if="resultText" class="page-result">{{ resultText }}</div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getSecurityUser } from '@/api';

// 请求加载状态：控制按钮 loading 效果
const loading = ref(false);
// 请求结果文本：展示接口返回或错误信息
const resultText = ref('');

/**
 * 发送演示请求并展示结果
 * 成功时以 JSON 格式展示返回数据，失败时展示错误信息
 */
const handleRequest = async () => {
  loading.value = true;
  resultText.value = '';
  try {
    const res = await getSecurityUser();
    resultText.value = JSON.stringify(res, null, 2);
  } catch (error) {
    // 兼容业务错误（拦截器 reject 字符串）与网络错误（Error 对象）
    resultText.value = `请求失败：${error?.message || error}`;
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="less" scoped>
/* 请求结果展示区 */
.page-result {
  margin-top: 16px;
  padding: 12px 16px;
  border-radius: 8px;
  background: #f7f9fc;
  font-family: "SF Mono", Menlo, Consolas, monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #606266;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
