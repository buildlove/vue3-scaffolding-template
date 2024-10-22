import { defineStore } from 'pinia';

export const useRoutesStore = defineStore('routes', {
  persist: {
    enabled: true
  },
  state: () => {
    return {
      routes: []
    };
  },
  getters: {
    getRoutes: (state) => {
      return state.routes;
    }
  },
  actions: {
    saveRoutes(routes) {
      this.routes = routes;
    }
  }
});
