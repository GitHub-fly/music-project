<template>
  <div>
    <div v-for="(item, index) in list" :key="index" @click="delDataFromList(index)">{{ item }}</div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  watch: {
    list(val) {
      this.innerList = val
    }
  },
  data() {
    return {
      innerList: []
    }
  },
  methods: {
    delDataFromList(index) {
      this.innerList.splice(index, 1)
    }
  }
}
</script>
