<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand">Chores</a>
      <form class="d-flex" role="search">
        <input class="form-control" style="height: 40px; border-radius: 32px; padding: 12px; text-align: center; background: rgb(41 40 40); border: 1px solid #a5a5a5; color: white;" type="search" placeholder="Search" aria-label="Search" v-model="searchText">
      </form>
    </div>
  </nav>
  <div class="dashboard__item-list__edit">
    <div class="list-edit_text" :class="{'list-edit_text-hide ': editMode }">{{ todayText }}</div>
    <div class="list-edit_text" :class="{'list-edit_text-hide ': !editMode }">Drag and drop to change order</div>
    <img class="icon-edit" src="https://img.icons8.com/?size=144&id=MsQIVqWh2kj2&format=png"
         :class="{'icon-edit-hide ': editMode }"
        @click="editMode = !editMode"/>
    <img class="icon-edit" src="https://img.icons8.com/?size=100&id=59875&format=png"
         :class="{'icon-edit-hide ': !editMode }"
          @click="editMode = !editMode"/>
  </div>

  <div class="dashboard__item-list">
    <ul class="list-group" ref="sortableList">
      <li  v-for="task in taskList" :key="task.id" class="dashboard__item-list__item dashboard__item-list__task" :class="{'dashboard__item-list__item__edit': editMode, 'dashboard__item-list__item-completed' : task.completed }">
        <div class="task_checkbox">
          <input
              type="checkbox"
              class="btn-check"
              :id="task.id"
              v-model="task.completed"
              @click="triggerCheck(task.id)"
          />
          <label class="icon-completed-disabled" :class="{ 'icon-completed-enabled': task.completed, 'opacity-20': editMode }" :for="task.id"></label>
          <div class="dashboard__item-list__item__title" style="padding: 0px 14px 0px 0px;">
            {{ task.title }}
          </div>
        </div>

        <div class="dashboard__item-list__item-actions" >
          <img class="icon-delete" :class="{'opacity-20': editMode }" src="https://img.icons8.com/?size=192&id=83149&format=png&color=FA5252" @click="deleteTask(task.id)">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Sortable from 'sortablejs';

export default {
  name: 'TaskList',
  data() {
    return {
      taskList: [],
      searchText: '',
      editMode: false,
      sortable: null,
      todayText:''
    }
  },
  mounted() {
    this.loadTasks();
    this.initSortable();
    this.setDate()
  },
  watch: {
    searchText: function(newVal) {
      this.findTaskByTitle(newVal);
    },
    editMode: function() {
      this.initSortable();
    }
  },
  methods: {
    loadTasks() {
      this.$store.dispatch('loadTasks').then(() => {
        this.taskList = this.$store.state.tasks;
      });
    },
    deleteTask(id) {
      this.$store.commit('deleteTask', id);
      this.loadTasks();
    },
    triggerCheck(id) {
      this.$store.commit('toggleTask', id);
      this.loadTasks();
    },
    findTaskByTitle(title) {
      const task = this.$store.getters.getTaskByTitle(title);
      this.taskList = task;
    },
    initSortable() {
      if (this.editMode) {
        this.sortable = new Sortable(this.$refs.sortableList, {
          onEnd: (evt) => {
            const movedTask = this.taskList[evt.oldIndex];
            this.taskList.splice(evt.oldIndex, 1);
            this.taskList.splice(evt.newIndex, 0, movedTask);
            this.$store.commit('updateTaskOrder', this.taskList);
          },
        });
      } else {
        if (this.sortable) {
          this.sortable.destroy(); // Destroy the sortable instance
          this.sortable = null;
        }
      }
    },
    setDate() {
      const today = new Date();

      const day = today.getDate();
      const month = today.toLocaleString('default', { month: 'long' });
      const year = today.getFullYear();

      // Function to get the ordinal suffix (st, nd, rd, th)
      function getOrdinalSuffix(day) {
        if (day > 3 && day < 21) return 'th'; // Covers 11-13
        switch (day % 10) {
          case 1: return 'st';
          case 2: return 'nd';
          case 3: return 'rd';
          default: return 'th';
        }
      }

      const ordinalSuffix = getOrdinalSuffix(day);
      this.todayText = `Today is ${day}${ordinalSuffix} of ${month}, ${year}`;
    }
  }
}
</script>

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
  margin-top: 70px;
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
  background-color: rgb(57 57 57) !important;
  z-index: 1;
}
.dashboard__item-list__item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 20px;
  background: #3b3b3b;
  color: white;
  border-radius: 40px;
  margin: 10px 20px;
  text-align: left;
  transition: 0.5s;
}

.dashboard__item-list__item-completed {
  background: #4f6151dd;
  text-decoration: line-through;
}

.dashboard__item-list__item__edit {
  padding: 20px 20px;
  border: 1px solid;
  transition: 0.5s;
  color: #cfffe5;
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

.form-control::placeholder {
  color: #a5a5a5;
}
.form-control:focus {
  border: 2px solid white !important;
  box-shadow: none;
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
  transition: 0.5s;
}

.icon-drag_hidden {
  width: 0px;
  height: 0px;
  position: absolute;
  transition: 0.5s;
}

.icon-drag_open {
  position: unset;
  width: 20px;
  height: 20px;
  transition: 0.5s;
}

.icon-edit {
  filter: invert(1);
  width: 30px;
  height: 30px;
  position: absolute;
  right: 20px;
  margin-top: 20px;
  top: 80px;
  transition: 0.5s;
}

.opacity-20 {
  opacity: 0.2;
  transition: 0.5s;
}

.list-edit_text {
  position: absolute;
  left: 20px;
  top: 107px;
  color: white;
  transition: 0.5s;
  font-size: 13px;
}

.icon-edit-hide {
  top: 32px;
  transition: 0.5s;
}

.list-edit_text-hide {
  top: 32px;
  transition: 0.5s;
}
</style>
