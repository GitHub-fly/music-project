<template>
  <div style="padding-top:10px;">
    <h1>音乐管理</h1>
    <!-- <span v-for="(item, index) in permissions" :key="index" class="gutter">
      <mu-button color="teal" v-if="item === 'music:add'">添加歌曲</mu-button>
      <mu-button color="success" v-if="item === 'music:edit'">编辑歌曲</mu-button>
      <mu-button color="error" v-if="item === 'music:delete'">删除歌曲</mu-button>
    </span>
    <v-card>
      <v-card-title>
        Nutrition
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="desserts" :search="search"></v-data-table>
    </v-card> -->
  </div>
</template>

<script>
export default {
  name: 'Music',
  data() {
    return {
      permissions: [],
      search: '',
      headers: []
    }
  },
  created() {
    // this.permissions = this.$store.state.menuList[1].subMenus[1].permissions
    console.log(this.permissions)
  }
}
</script>

<style scoped lang="scss"></style>

