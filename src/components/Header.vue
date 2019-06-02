<template>
  <div class="header">
    <h2>{{poiInfo.name}}</h2>
  </div>
</template>

<script>
  export default {
    name: 'heade',
    props: {
      poiInfo: {
        type: Object,
        default: {}
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
