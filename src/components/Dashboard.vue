<template>
  <div class="dashboard">

    <task-list class="aaaaaaaaaa" ref="taskList" :blur="addIconClicked" />
    <div>
    <div class="dashboard_input-floating-add-more__hidden">
      <textarea class="form-control" aria-label="With textarea" placeholder="Add a new task" @input="setSubmitButtonState" v-model="newTaskTitle" maxlength="65"></textarea>
      <img class="dashboard_button-add__hidden"  @click="addTask" src="https://img.icons8.com/?size=100&id=11208&format=png">
    </div>
      <img class="dashboard_button-floating-add__default " src="https://img.icons8.com/?size=100&id=37839&format=png"
           @click="addIconClicked = !addIconClicked"
      />
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
  mounted() {
    this.$store.commit('setTheme')
  },
  watch: {
    addIconClicked: function (newVal) {
      if (newVal) {
        this.$el.querySelector('.dashboard_button-floating-add__default').classList.add('dashboard_button-floating-add__clicked')
        this.$el.querySelector('.dashboard_input-floating-add-more__hidden').classList.add('dashboard_input-floating-add-more__open')
        this.$el.querySelector('.dashboard_input-floating-add-more__hidden').classList.add('dashboard_input-floating-add-more__open')
      } else {
        this.$el.querySelector('.dashboard_button-floating-add__default').classList.remove('dashboard_button-floating-add__clicked')
        this.$el.querySelector('.dashboard_input-floating-add-more__hidden').classList.remove('dashboard_input-floating-add-more__open')
      }
    }
  },
  methods: {
    addTask() {
      this.$store.commit('addTask', this.newTaskTitle)
      this.newTaskTitle = ''
      this.$refs.taskList.loadTasks();
      this.addIconClicked = false;
    },
    setSubmitButtonState () {
      if (this.newTaskTitle.length > 0) {
        this.$el.querySelector('.dashboard_button-add__hidden').classList.add('dashboard_button-add__open')
      } else {
        this.$el.querySelector('.dashboard_button-add__hidden').classList.remove('dashboard_button-add__open')
      }
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

.dashboard_button-floating-add__default {
  position: absolute;
  bottom: 40px;
  right: 20px;
  width: 50px;
  cursor: pointer;
  transition: 0.5s;
  filter: invert(1);
}

.dashboard_button-floating-add__clicked {
  transition: 0.5s;
  bottom: 40px;
  transform: rotate(45deg);
}

.dashboard_input-floating-add-more__hidden {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0 20px;
  position: absolute;
  bottom: -70px;
  transition: 0.5s;
  padding-right: 74px;
}

.form-control {
  height: 50px;
  border-radius: 32px;
  padding: 12px;
  margin-right: 10px;
  background: rgb(41, 40, 40);
  border: 1px solid rgb(165, 165, 165);
  color: white;
  text-align: center;
}
.form-control::placeholder {
  color: #a5a5a5;
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
  bottom: 40px;
}

.dashboard_button-add__hidden {
  opacity: 0.5;
  filter: blur(1px);
  height: 50px;
  transition: 0.2s;
  filter: invert(1);
}

.dashboard_button-add__open {
  opacity: 1;
  width: 50px;
  transition: 0.2s;
}

@media (min-width: 768px) {

}

</style>
