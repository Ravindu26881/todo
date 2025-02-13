<template>
  <menu-bar @hide-menu="toggleMenu" :visible="isMenuVisible"/>

  <nav class="navbar bg-body-tertiary" >
    <div class="container-fluid">
      <div style="display: flex;align-items: center;gap: 10px;position: relative;transition: 0.5s;left: 0;" @click="toggleMenu" :class="{'navbar-brand_hidden ': searchMode || editMode }">
        <img src="https://img.icons8.com/?size=100&id=w3-HRY0z8wQY&format=png" style=" height: 30px;filter: invert(1);">
        <a class="navbar-brand" >Chores</a>
      </div>
    </div>
  </nav>



  <div class="search">
    <img class="icon-search-hidden" @click="toggleSearchMode" :class="{'icon-search-open': !searchMode && !editMode, 'blur disabled opacity-20': blur}"
         src="https://img.icons8.com/?size=100&id=112468&format=png"/>

    <div class="search-hidden"  :class="{'search-open': searchMode }">
      <input
             class="form-control input_search " type="search"
             placeholder="Search" aria-label="Search"
             @input="setSearchSubmitButtonState"
             v-model="searchText"/>
      <img class="icon-search-button" @click="findTaskByTitle(searchText)"
           src="https://img.icons8.com/?size=100&id=112468&format=png"
           :class="{ 'blur disabled opacity-20': searchSubmitDisabled}"
           />
      <img class="icon-arrow-up" @click="toggleSearchMode" src="https://img.icons8.com/?size=100&id=7801&format=png">
    </div>

  </div>


  <div class="dashboard__item-list__edit" style="transition: 0.5s;" :class="{'opacity-20 disabled': blur }">
    <div class="list-edit_text" :class="{'list-edit_text-hide ': !editMode }">Drag and drop to change order</div>
    <img class="icon-edit" src="https://img.icons8.com/?size=144&id=MsQIVqWh2kj2&format=png"
         :class="{'icon-edit-hide ': editMode || searchMode }"
        @click="editMode = !editMode"/>
    <img class="icon-edit" src="https://img.icons8.com/?size=100&id=59875&format=png"
         :class="{'icon-edit-hide ': !editMode }"
          @click="editMode = !editMode"/>
  </div>

  <div v-if="taskList.length < 1 && searchText.length > 1" style="color: white; padding: 100px">No results</div>
  <div class="dashboard__item-list" style="transition: 0.5s;" :class="{'blur disabled opacity-20': blur }">
    <ul class="list-group" ref="sortableList">
      <li  v-for="task in taskList" :key="task.id" class="dashboard__item-list__item dashboard__item-list__task" :class="{'dashboard__item-list__item__edit ': editMode, 'dashboard__item-list__item-completed' : task.completed }">
        <div class="task_checkbox">
          <input
              type="checkbox"
              class="btn-check"
              :id="task.id"
              v-model="task.completed"
              @click="triggerCheck(task.id)"
          />
          <label class="icon-completed-disabled" :class="{ 'icon-completed-enabled': task.completed, 'opacity-20 disabled': editMode }" :for="task.id"></label>
          <div class="dashboard__item-list__item__title" style="padding: 0px 14px 0px 0px;">
            {{ task.title }}
          </div>
        </div>

        <div class="dashboard__item-list__item-actions" >
          <img class="icon-delete" :class="{'opacity-20 disabled': editMode }" src="https://img.icons8.com/?size=192&id=83149&format=png&color=FA5252" @click="deleteTask(task.id)">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Sortable from 'sortablejs';
import MenuBar from '@/components/Bars/MenuBar.vue';

export default {
  name: 'TaskList',
  data() {
    return {
      taskList: [],
      searchText: '',
      editMode: false,
      sortable: null,
      searchMode: false,
      searchSubmitDisabled: true,
      isMenuVisible: false
    }
  },
  components: {
    MenuBar
  },
  props: {
    blur: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.loadTasks();
    this.initSortable();
  },
  watch: {
    editMode: function() {
      this.initSortable();
    },
    searchMode: function() {
      this.searchText = '';
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible
    },
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
    toggleSearchMode () {
      this.searchMode = !this.searchMode;
      this.searchText = ''
      this.loadTasks();
    },
    setSearchSubmitButtonState () {
      if (this.searchText.length > 0) {
        this.searchSubmitDisabled = false;
      } else {
        this.searchSubmitDisabled = true;
      }
    }
  }
}
</script>

<style scoped>

.disabled {
  pointer-events:none;
}

h3 {
  margin: 40px 0 0;
}
.blur {
  filter: blur(1px);
}
ul {
  list-style-type: none;
  padding: 0;
  height: calc(100vh - 60px);
  overflow: scroll;
  padding-bottom: 200px;
  padding-top: 20px;
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
  z-index:0;
}
.navbar-brand {
  position: relative;
  transition: 0.5s;
  left: 0;
}
.navbar-brand_hidden {
  left: -158px !important;
  transition: 0.5s;
}
.dashboard__item-list__item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 20px;
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
  transition: 0.5s;
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

.input_search {
  transition: 0.5s;
  height: 40px;
  border-radius: 32px;
  padding: 12px;
  text-align: center;
  background: rgb(41 40 40);
  border: 1px solid #a5a5a5;
  color: white;

}

.search-hidden {
  position: absolute;
  top: -100px;
  display: flex;
  align-items: center;
  padding: 20px;
  width: 100%;
  gap: 10px;
  transition: 0.5s;
}

.search-open {
  top: 0px;
  transition: 0.5s;
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


.icon-edit {
  filter: invert(1);
  width: 30px;
  height: 30px;
  position: absolute;
  right: 20px;
  margin-top: 20px;
  top: 4px;
  transition: 0.5s;
}

.opacity-20 {
  opacity: 0.2;
  transition: 0.5s;
}

.list-edit_text {
  position: absolute;
  right: 67px;
  top: 30px;
  color: white;
  transition: 0.5s;
  font-size: 13px;
}

.icon-edit-hide {
  top: -100px;
  transition: 0.5s;
}

.list-edit_text-hide {
  top: -100px;
  transition: 0.5s;
}

.icon-search-hidden {
  filter: invert(1);
  width: 30px;
  height: 30px;
  position: absolute;
  right: 60px;
  margin-top: 20px;
  top: -100px;
  transition: 0.5s;
}

.icon-search-open {
  top:4px;
}

.icon-search-button {
  filter: invert(1);
  width: 30px;
  height: 30px;
  transition: 0.5s;
}

.icon-arrow-up {
  filter: invert(1);
  width: 30px;
  height: 30px;
  transition: 0.5s;
}

</style>
