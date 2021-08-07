<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Apple Color Emoji", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
input, button, select {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Apple Color Emoji", sans-serif;
}
button{
  cursor: pointer;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
  }
}
</style>
