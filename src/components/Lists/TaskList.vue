<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand">Chores</a>
      <form class="d-flex" role="search">
        <input class="form-control" style="height: 40px;
    border-radius: 32px;
    padding: 12px;
text-align: center;" type="search" placeholder="Search" aria-label="Search" v-model="searchText">
      </form>
    </div>
  </nav>

    <div class="dashboard__item-list">
      <ul class="list-group">
        <div class="dashboard__item-list__task" v-for="task in taskList" :key="task.id">
          <div class="dashboard__item-list__item" >
            <div class="task_checkbox">
              <input
                  type="checkbox"
                  class="btn-check"
                  :id="task.id"
                  v-model="task.completed"
                  @click="triggerCheck(task.id)"
              />
              <!--                <img class="task_checkbox-icon-complete" v-if="!task.completed" :for="task.id" src="https://img.icons8.com/?size=100&id=11658&format=png&color=40C057" />-->
              <!--                <img class="task_checkbox-icon-completed" v-else-if="task.completed" :for="task.id" src="https://img.icons8.com/?size=100&id=11208&format=png&color=40C057" />-->

              <label class="icon-completed-disabled"  :class="{ 'icon-completed-enabled': task.completed }" :for="task.id"></label>
              <div class="dashboard__item-list__item__title">
                {{ task.title }}
              </div>
            </div>

            <div class="dashboard__item-list__item-actions">
              <img class="icon-delete" src="https://img.icons8.com/?size=192&id=83149&format=png&color=FA5252" @click="deleteTask(task.id)">
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
  height: calc(100vh - 60px);
  overflow: scroll;
  padding-bottom: 82px;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.navbar {
  padding: 20px 8px;
}
.dashboard__item-list__item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 20px;
  background: #f7f6f6;
  border-radius: 40px;
  margin: 10px 20px;
  text-align: left;
}
.dashboard__item-list__item-actions {
  display: flex;
  gap: 6px;
  align-items: center;
}
.task_checkbox {
  display: flex;
  gap: 14px;
  align-items: center;
}

.dashboard__item-list__task:first-child {
  margin-top: 20px;
}

.icon-completed-disabled {
  background-image: url(https://img.icons8.com/?size=100&id=11208&format=png&color=40C057);
  height: 20px;
  width: 20px;
  min-width: 20px;
  background-size: cover;
  background-color: transparent;
  filter: grayscale(1);
  transition: 0.5s;
}

.icon-completed-enabled {
  filter: none;
  transition: 0.5s;
}

.icon-delete {
  height: 20px;
  width: 20px;
  min-width: 20px;
}
</style>
