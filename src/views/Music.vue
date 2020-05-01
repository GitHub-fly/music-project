<template>
  <div style="padding-top:10px;">
    <span v-for="(item, index) in menus" :key="index" class="gutter">
      <mu-button :color="item.icon">{{ item.title }}</mu-button>
    </span>
    <v-card style="margin-top: 20px" width="1000">
      <v-card-title>
        Music
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-simple-table fixed-header height="400">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left" v-for="(item, index) in headers" :key="index">{{ item }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in desserts" :key="item.name">
              <td><v-checkbox></v-checkbox></td>
              <td>
                <div class="img"><img :src="item.thumbnail" alt="" /></div>
              </td>
              <td>{{ item.songName }}</td>
              <td>{{ item.singer }}</td>
              <td>{{ item.commentCount }}</td>
              <td>{{ item.likeCount }}</td>
              <td>{{ item.playCount }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Music',
  data() {
    return {
      menus: [],
      search: '',
      headers: ['', 'Thumbnail', 'SongName', 'Singer', 'Comment_count', 'Like_count', 'Play_count'],
      desserts: JSON.parse(localStorage.getItem('songList'))
    }
  },
  created() {
    let index = this.$route.query.index
    let index1 = this.$route.query.index1
    console.log(index, index1)
    this.menus = JSON.parse(localStorage.getItem('menuList'))[index].subMenus[index1].subMenus
  },
  methods: {},
  mounted() {}
}
</script>

<style scoped lang="scss">
.img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
</style>
