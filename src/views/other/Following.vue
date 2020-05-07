<template>
  <v-container>
    <FollowersComp :followers="followings" :type="type"></FollowersComp>
  </v-container>
</template>

<script>
import FollowersComp from '../../components/FollowersComp'
export default {
  name: 'DataComp',
  components: {
    FollowersComp
  },
  data() {
    return {
      type: 'following',
      followings: []
    }
  },
  created() {
    this.followingsData()
  },
  methods: {
    followingsData() {
      let urlPlus = JSON.parse(localStorage.getItem('gitUser')).following_url
      let url = urlPlus.slice(0, urlPlus.indexOf('{'))
      this.axios({
        method: 'get',
        url: url
      }).then((res) => {
        let resFollowings = res.data
        for (let i = 0; i < resFollowings.length; i++) {
          const item = resFollowings[i]
          this.followings.splice(i, 0, {
            login: item.login,
            avatar_url: item.avatar_url
          })
        }
        console.log(this.followings)
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
