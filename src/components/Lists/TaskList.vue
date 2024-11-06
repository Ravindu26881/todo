<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand">Chores</a>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="searchText">
      </form>
    </div>
  </nav>

    <div class="dashboard__item-list">
      <ul class="list-group">
        <div v-for="task in taskList" :key="task.id">
          <div class="dashboard__item-list__item" >
            {{ task.title }}
            <div class="dashboard__item-list__item-actions">
              <div class="task_checkbox">
                <input
                    type="checkbox"
                    class="btn-check"
                    :id="task.id"
                    v-model="task.completed"
                    @click="triggerCheck(task.id)"
                />
                <label class="btn btn-light" v-if="!task.completed" :for="task.id">Complete</label>
                <label class="btn btn-success" v-else-if="task.completed" :for="task.id">Completed</label>
              </div>
              <button class="btn btn-danger" @click="deleteTask(task.id)">Delete</button>
            </div>
          </div>
        </div>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'TaskList',
  data() {
    return {
      taskList: [],
      searchText: ''
    }
  },
  mounted() {
   this.loadTasks()
  },
  watch: {
    searchText: function(newVal) {
      this.findTaskByTitle(newVal);
    }
  },
  methods: {
    loadTasks() {
      this.$store.dispatch('loadTasks').then(
      this.taskList = this.$store.state.tasks
      )
    },
    deleteTask(id) {
      this.$store.commit('deleteTask', id)
      this.loadTasks()
    },
    triggerCheck(id) {
      this.$store.commit('toggleTask', id)
      this.loadTasks()
    },
    findTaskByTitle(title) {
      const task = this.$store.getters.getTaskByTitle(title);
      this.taskList =task;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.dashboard__item-list__item {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
}
.dashboard__item-list__item-actions {
  display: flex;
  gap: 6px;
}
</style>
