<template>
  <div class="home">
    <dashboard />
  </div>
</template>

<script>
// @ is an alias to /src
import dashboard from '@/components/Dashboard.vue'

export default {
  name: 'HomeView',
  components: {
    dashboard
  }
}
</script>
