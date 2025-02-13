<template>
<!--  <nav>-->
<!--    <router-link to="/">Home</router-link> |-->
<!--    <router-link to="/about">About</router-link>-->
<!--  </nav>-->
  <router-view/>
</template>

<style>
#app {
  font-family: Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #b1893c;;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.light-theme {
  filter: invert(1);
  transition: 0.5s;
}

.light-theme img {
  filter: invert(1);
  transition: 0s;
}

.light-theme .navbar-brand {
  filter: invert(1);
}

.light-theme .dashboard__item-list__item-completed {
  filter: invert(1);
}

.light-theme .dashboard__item-list__item-completed .dashboard__item-list__item-actions {
  filter: invert(1);
}

.dark-theme {
  filter: invert(0);
  transition: 0.5s;
}
</style>
