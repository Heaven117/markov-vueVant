<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {
    this.$router.push('organizationDetail')
  },
  methods: {

  },
}
</script>

<style lang="scss">
html {
  overflow-x: hidden;
}

#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.router-view {
  height: 100%;
}
</style>
