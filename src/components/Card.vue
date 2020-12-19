<template>
  <card class="card">
    <template #title>
      {{ title }}
    </template>
    <template #content>
      {{ content }}
    </template>
  </card>
</template>

<script>
import Card from 'primevue/card'

export default {
  components: {
    Card
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  background: rgba($color: #ffffff, $alpha: 0.1);
  margin-top: 50px;
  transition: width 2s, height 4s;
  //   border-radius: 100px;
}
</style>
