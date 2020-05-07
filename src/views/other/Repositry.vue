<template>
  <v-container>
    <RepositryComp :repositries="repos"></RepositryComp>
  </v-container>
</template>

<script>
import RepositryComp from '../../components/RepositryComp'
export default {
  name: 'Repositry',
  components: {
    RepositryComp
  },
  data() {
    return {
      repos: []
    }
  },
  created() {
    this.reposData()
  },
  mounted() {},
  methods: {
    // 获取仓库信息
    reposData() {
      this.axios({
        method: 'get',
        url: JSON.parse(localStorage.getItem('gitUser')).repos_url
      }).then((res) => {
        let resRepos = res.data
        for (let i = 0; i < resRepos.length; i++) {
          const item = resRepos[i]
          this.repos.splice(i, 0, {
            name: item.name,
            description: item.descritiption,
            pushed_at: item.pushed_at,
            language: item.language,
            updated_at: item.updated_at
          })
        }
        console.log(this.repos)
      })
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss"></style>
