<template>
  <v-simple-table fixed-header height="445" style="margin-top: 20px">
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
            <div class="img"><img :src="item.thumbnail" alt="封面图" /></div>
          </td>
          <td>{{ item.song_list_name }}</td>
          <!-- <td>{{ item.singer }}</td> -->
          <td>{{ item.comment_count }}</td>
          <td>{{ item.like_count }}</td>
          <td>{{ item.play_counts }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: 'SongListTable',
  props: {
    desserts: {
      type: Array,
      default: () => [
        // {
        //   thumbnail: String,
        //   singer: String,
        //   commentCount: String,
        //   likeCount: String,
        //   playCount: String
        // }
      ]
    }
  },
  data() {
    return {
      headers: ['', 'Thumbnail', 'SongName', 'Comment_count', 'Like_count', 'Play_count']
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {},
  computed: {}
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
