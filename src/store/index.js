import { createStore } from 'vuex';

export default createStore({
  state: {
    tasks: [{
      id: Math.floor(10000 + Math.random() * 90000),
      title: "You can add tasks by clicking the + icon in the bottom right corner.",
      completed: false
    },
      {
        id: Math.floor(10000 + Math.random() * 90000),
        title: "Delete tasks by clicking the X icon.",
        completed: false
      },
      {
        id: Math.floor(10000 + Math.random() * 90000),
        title: "Mark completed tasks by clicking the ✓ icon",
        completed: true
      },
      {
        id: Math.floor(10000 + Math.random() * 90000),
        title: "Move up high priority tasks by clicking the edit icon on top right.",
        completed: false
      }
    ],
    theme: 'dark'
  },
  getters: {
    getTaskByTitle: (state) => (searchString) => {
      const lowercasedSearchString = searchString.toLowerCase();
      return state.tasks.filter(task => task.title.toLowerCase().includes(lowercasedSearchString));
    },
    getCurrentTheme: (state) => {
      return state.theme;
    }
  },
  mutations: {
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';

      // Apply theme styles to body
      if (state.theme === 'dark') {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
      } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
      }
      // Store theme in localStorage
      localStorage.setItem('theme', state.theme);
    },
    setTheme(state) {
      localStorage.getItem('theme') ? state.theme = localStorage.getItem('theme') : state.theme = 'dark';
      if (state.theme === 'dark') {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
      } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
      }
      // Store theme in localStorage
      localStorage.setItem('theme', state.theme);
    },
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
    updateTaskOrder (state, sortedTasks) {
      state.tasks = sortedTasks;
      this.commit('saveTasksToLocalStorage');
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
