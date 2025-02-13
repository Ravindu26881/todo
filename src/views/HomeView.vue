<template>
  <div class="home" style=" background: #2d2d2d;   font-family: 'Poppins';">
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
