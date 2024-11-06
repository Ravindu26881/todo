import { createStore } from 'vuex';

export default createStore({
  state: {
    tasks: []
  },
  getters: {
    getTaskByTitle: (state) => (searchString) => {
      return state.tasks.filter(task => task.title.includes(searchString));
    }
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    addTask(state, taskTitle) {
      const newTask = {
        id: Math.floor(10000 + Math.random() * 90000),
        title: taskTitle,
        completed: false
      };
      state.tasks.push(newTask);
      this.commit('saveTasksToLocalStorage');
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id);
      this.commit('saveTasksToLocalStorage');
    },
    toggleTask(state, id) {
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.completed = !task.completed;
        this.commit('saveTasksToLocalStorage');
      }
    },
    saveTasksToLocalStorage(state) {
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }
  },
  actions: {
    loadTasks({ commit }) {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      if (tasks) {
        commit('setTasks', tasks);
      }
    }
  },
  modules: {}
});
