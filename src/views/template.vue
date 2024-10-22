<template>
  <div>
    <el-pagination
      :page-size="20"
      :pager-count="11"
      layout="total, sizes, prev, pager, next, jumper"
      :total="1000"
      @size-change="()=> {}"
      @current-change="()=> {}"
    />
    <div>
      状态管理器:
      <div v-for="(item, index) in stateNodes" :key="index">{{ item?.meta?.name }}</div>
    </div>
  </div>
</template>

<script setup>

import { onMounted, ref } from 'vue'
import { useRoutesStore } from '@/store/routes';

let expendRoutes = ref([])
let stateNodes = ref([])

const dealTreeData = (treeData, nodes=[]) => {
  treeData.forEach((item) => {
    expendRoutes.value = [...expendRoutes.value, item]
    if(item?.children?.length){
      dealTreeData(item.children, nodes)
    }
  })
};

onMounted(()=> {
  const store = useRoutesStore();
  const routes = store.routes;

  expendRoutes.value = []
  dealTreeData(routes) // 获取所有路由节点

  console.log(expendRoutes.value)
  const nodes = expendRoutes.value.filter((item)=> item?.meta?.node)
  stateNodes.value = nodes
  console.log(nodes)
})


</script>