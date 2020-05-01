<template>
  <div style="background-color: gray; border-radius: 5px; height: 560px">
    <span v-for="(item, index) in menus" :key="index" class="gutter">
      <mu-button @click="search()" :color="item.icon">{{ item.title }}</mu-button>
    </span>
    <v-text-field @keyup.enter="search()" max-width="300" label="type" hide-details="auto" v-model="searchType"></v-text-field>

    <div class="container" v-show="container">
      <div class="cardArea">
        <v-card class="mx-auto card" max-width="344" max-height="180" outlined v-for="(item, index) in showList" :key="index">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">type</div>
              <v-list-item-title class="headline mb-1" style="cursor: pointer;">{{ item.type }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.child[0].song_list_name }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="80" color="grey" @click="toSongType(index)">
              <img :src="item.child[0].thumbnail" alt="" />
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn text @click="del(index)">DELETE</v-btn>
            <v-btn text>UPDATE</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <v-row justify="center" align="center">
        <v-col cols="3" md="8">
          <v-pagination v-model="page" @next="nextPage()" @prev="lastPage()" class="my-1" :length="length"></v-pagination>
        </v-col>
      </v-row>
    </div>
    <div class="searchArea" v-show="searchArea">
      <SongListTable :desserts="searchAreaList"></SongListTable>
    </div>
  </div>
</template>

<script>
import SongListTable from '../components/SongListTable'
export default {
  name: 'MusicList',
  components: {
    SongListTable
  },
  data() {
    return {
      menus: [],
      songTypeList: [],
      showList: [],
      start: 0,
      end: 6,
      // 分页组件
      page: 1,
      searchType: '',
      searchList: [],
      // 查找歌曲类型相关的操作属性
      searchArea: false,
      container: true,
      searchAreaList: []
    }
  },
  created() {
    let index = this.$route.query.index
    let index1 = this.$route.query.index1
    this.menus = JSON.parse(localStorage.getItem('menuList'))[index].subMenus[index1].subMenus
    this.getMusicListInfo()
  },
  methods: {
    getMusicListInfo() {
      this.axios({
        methods: 'GET',
        url: this.GLOBAL.baseUrl + '/songList/all',
        params: {
          roleId: localStorage.getItem('roleId')
        }
      }).then((res) => {
        this.songTypeList = res.data.data
        this.songTypeList.splice(3, 1)
        localStorage.setItem('songTypeList', JSON.stringify(this.songTypeList))
        this.showList = this.songTypeList.slice(this.start, this.end)
      })
    },
    nextPage() {
      if (this.end <= this.songTypeList.length) {
        this.showList = this.songTypeList.slice((this.start += 6), (this.end += 6))
        console.log(this.page)
      } else {
        console.log(this.start + '  ' + this.end)
        return
      }
    },
    lastPage() {
      console.log(this.start + '  ' + this.end)
      this.showList = this.songTypeList.slice((this.start -= 6), (this.end -= 6))
    },
    del(i) {
      this.songTypeList.splice(this.start + i, 1)
      this.showList.splice(i, 1)
      if (this.showList.length == 6) {
        return
      } else {
        this.showList.splice(5, 0, this.songTypeList[this.end])
        console.log(this.showList)
      }
    },
    search() {
      if (this.searchType == '') {
        if (this.searchAreaList.length != 0) {
          this.searchArea = false
          this.container = true
          this.start = 0
          this.end = 6
          this.showList = this.songTypeList.slice(this.start, this.end)
        }
        return
      }
      this.searchArea = false
      this.container = true
      for (let i = 0; i < this.songTypeList.length; i++) {
        const item = this.songTypeList[i]
        const type = item.type
        if (type.search(this.searchType) != -1) {
          this.searchList.splice(i, 0, item)
          this.showList = this.searchList
        }
      }
    },
    toSongType(index) {
      this.searchArea = true
      this.container = false
      this.searchAreaList = this.songTypeList[this.start + index].child
      console.log(this.searchAreaList)
    }
  },
  computed: {
    length: function() {
      return Math.ceil(this.songTypeList.length / 6)
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;

  .cardArea {
    display: flex;
    flex-wrap: wrap;
  }
  .card {
    flex: 0 0 30%;
    margin: 10px;

    img {
      cursor: pointer;
      border-radius: 10px;
    }
  }
}
SongListTable {
  margin-top: 20px;
}
</style>
