<template>
  <div class="dashboard">
    <task-list ref="taskList" />
    <img class="dashboard_button-floating-add__default " src="https://img.icons8.com/?size=100&id=37839&format=png"
    @click="addIconClicked = !addIconClicked"
    />
    <div class="dashboard_input-floating-add-more__hidden">
      <textarea class="form-control" aria-label="With textarea" placeholder="Add a new task" v-model="newTaskTitle"></textarea>
      <img class="dashboard_button-add__hidden"  @click="addTask" src="https://img.icons8.com/?size=100&id=11208&format=png">
    </div>

  </div>
</template>

<script>
import TaskList from "@/components/Lists/TaskList.vue";

export default {
  name: 'DashBoard',
  components: {TaskList},
  data() {
    return {
      addIconClicked: false,
      newTaskTitle: ''
    }
  },
  watch: {
    addIconClicked: function (newVal) {
      if (newVal) {
        this.$el.querySelector('.dashboard_button-floating-add__default').classList.add('dashboard_button-floating-add__clicked')
        this.$el.querySelector('.dashboard_input-floating-add-more__hidden').classList.add('dashboard_input-floating-add-more__open')
      } else {
        this.$el.querySelector('.dashboard_button-floating-add__default').classList.remove('dashboard_button-floating-add__clicked')
        this.$el.querySelector('.dashboard_input-floating-add-more__hidden').classList.remove('dashboard_input-floating-add-more__open')
      }
    },
    newTaskTitle: function (newVal) {
      if (newVal.length > 0) {
        this.$el.querySelector('.dashboard_button-add__hidden').classList.add('dashboard_button-add__open')
      } else {
        this.$el.querySelector('.dashboard_button-add__hidden').classList.remove('dashboard_button-add__open')
      }
    }
  },
  methods: {
    addTask() {
      this.$store.commit('addTask', this.newTaskTitle)
      this.newTaskTitle = ''
      this.$refs.taskList.loadTasks();
      this.addIconClicked = false;
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

.dashboard_button-floating-add__default {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 70px;
  cursor: pointer;
  transition: 0.5s;
}

.dashboard_button-floating-add__clicked {
  transition: 0.5s;
  bottom: 100px;
  transform: rotate(45deg);
}

.dashboard_input-floating-add-more__hidden {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0 10px;
  position: absolute;
  bottom: -70px;
  transition: 0.5s;
}

.form-control {
  height: 50px;
  border-radius: 32px;
  padding: 12px;
}
.form-control:focus {
  border: 2px solid;
  box-shadow: none;
}
.form-control::-webkit-scrollbar {
  display: none;
}

.dashboard_input-floating-add-more__open {
  transition: 0.5s;
  bottom: 24px;
}

.dashboard_button-add__hidden {
  width: 0px;
  height: 50px;
  transition: 0.2s;
}

.dashboard_button-add__open {
  width: 50px;
  transition: 0.2s;
}

</style>
