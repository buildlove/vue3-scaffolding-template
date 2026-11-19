import { defineStore } from 'pinia';

/**
 * 演示用计数仓库
 * 展示 Pinia 的 state / getters / actions 标准写法，供首页功能演示使用
 */
export const useDemoStore = defineStore('demo', {
  state: () => ({
    // 计数值
    count: 0,
  }),
  getters: {
    // 双倍计数值：演示 getter 派生状态
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    /**
     * 计数加一
     */
    increment() {
      this.count += 1;
    },
    /**
     * 计数减一
     */
    decrement() {
      this.count -= 1;
    },
    /**
     * 计数重置为 0
     */
    reset() {
      this.count = 0;
    },
  },
});
