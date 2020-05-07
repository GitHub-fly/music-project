<template>
  <v-card>
    <v-toolbar color="deep-purple accent-4" dark flat>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Page title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-avatar size="36">
        <img :src="gitUser.avatar_url" alt="John" />
      </v-avatar>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon @click="logout()">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs v-model="currentItem" fixed-tabs slider-color="white">
          <v-tab v-for="(item, index) in items" :key="index" link :to="item.path">
            {{ item.text }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <router-view class="mt-8" />
  </v-card>
</template>

<script>
export default {
  name: 'Git',
  data: () => ({
    currentItem: 'tab-Web',
    items: [
      {
        text: 'Repositry',
        path: '/git/repositry'
      },
      {
        text: 'Followers',
        path: '/git/followers'
      },
      {
        text: 'Following',
        path: '/git/following'
      }
    ],
    gitUser: {}
  }),
  created() {
    console.log('回调')
    let user = this.$route.query.user
    if (user) {
      this.gitUser = JSON.parse(user)
      localStorage.setItem('token', this.gitUser.id)
      localStorage.setItem('gitUser', user)
    }
    this.gitUser = JSON.parse(localStorage.getItem('gitUser'))
  },
  methods: {
    logout() {
      alert('logout')
      localStorage.clear()
      this.$store.commit('setAdmin', null)
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped></style>
