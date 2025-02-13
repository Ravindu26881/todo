<template>
  <div class="menu-bar" :class="visible ? 'menu-bar__visible' : ''" @click="hideMenu">
    <div class="menu-var__wrapper"  @click.stop>
      <div class="theme-changer__wrapper">
        <div class="theme-changer__header">Change theme</div>
        <div class="theme-changer-options__wrapper" @click="changeTheme">
           <div>
                 <svg height="50" width="50" xmlns="http://www.w3.org/2000/svg">
                   <circle r="18" cx="25" cy="25" fill="red" stroke="green" stroke-width="3" opacity="1" style="stroke: #b6a6b4;fill: white;" ></circle>
                 </svg>
             <div v-if="currentTheme === 'dark'">Light</div>
             <div v-else >Dark</div>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MenuBar',
  data() {
    return {
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
  },
  watch: {
  },
  computed: {
    currentTheme() {
      return this.$store.state.theme;
    }
  },
  methods: {
    hideMenu() {
      this.$emit('hide-menu')
    },
    changeTheme() {
      this.$store.commit('toggleTheme')
    }
  }
}
</script>

<style>
body {
  filter: invert(1);
}
.menu-bar {
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 99999;
  left: -100vw;
  transition: 0.5s;
}
.menu-var__wrapper {
  padding: 10px;
  transition: 0.5s;
  background: #393939;
  width: 60%;
  height: -webkit-fill-available;
  border-radius: 26px;
  margin: 18px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
.menu-bar__visible {
  transition: 0.5s;
  left: 0;
  backdrop-filter: blur(1px);
}

.theme-changer__wrapper {
  color: white;
  padding: 18px;
  border-radius: 26px;
  background: #2d2d2d;
}

.theme-changer-options__wrapper {
  display: flex;
  justify-content: space-around;
  padding: 14px;
}

</style>
