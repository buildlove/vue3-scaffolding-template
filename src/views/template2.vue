<template>
  <div>模版二请求</div>
</template>

<script setup>

import { onMounted } from 'vue'
import { getSecurityUser } from '@/api'

onMounted(()=> {
  getSecurityUser()
})

</script>
