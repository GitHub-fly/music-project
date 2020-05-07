<template>
  <div>
    <div class="hello">
      <input v-model="inputValue" type="text" />
      <button @click="addDataTolist1()">添加</button>
      <div v-for="(item, index) in list" :key="index" @click="delDataFromList(index)">{{ item }}</div>
    </div>

    <div class="hello">
      <input v-model="inputValue" type="text" /><button @click="addDataTolist2()">添加</button>
      <list-item :list="list"></list-item>
    </div>
  </div>
</template>

<script>
import ListItem from '../../components/List-item'

export default {
  components: {
    ListItem
  },
  data() {
    return {
      list: [],
      inputValue: ''
    }
  },
  methods: {
    addDataTolist1() {
      // inputValue长度为0时候不添加
      if (this.inputValue.length === 0) {
        return
      }
      this.list.push(this.inputValue)
      // 添加之后清空inputValue输入框
      this.inputValue = ''
    },
    delDataFromList(index) {
      this.list.splice(index, 1)
    },

    addDataTolist2() {
      if (this.inputValue.length === 0) {
        return '为0不添加'
      }
      this.list.push(this.inputValue)
      this.inputValue = ''
    }
  }
}
</script>

<style lang="scss" scoped></style>
