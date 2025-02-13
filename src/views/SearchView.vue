<template>
  <div class="search">
    <input type="text"  placeholder="Search task by title">
    <task-list :searchMode="true"  />
  </div>
</template>
<script>

export default {
}
</script>
