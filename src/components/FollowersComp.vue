<template>
  <v-content>
    <v-card class="mx-auto mr-5 ml-5 mb-8" fill flat outlined v-for="(item, index) in followers" :key="index">
      <v-list-item three-line>
        <v-list-item-avatar tile size="80" class="my-auto">
          <v-avatar class="profile" color="grey" size="80" tile>
            <v-img :src="item.avatar_url"></v-img>
          </v-avatar>
        </v-list-item-avatar>

        <v-list-item-content class="ml-8">
          <div class="overline mb-4">{{ type }}</div>
          <v-list-item-title class="headline mb-1">{{ item.login }}</v-list-item-title>
          <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="100">
          <v-btn text>Unfollow</v-btn>
        </v-list-item-avatar>
      </v-list-item>
    </v-card>
  </v-content>
</template>
<script>
export default {
  props: {
    followers: {
      type: Array,
      default() {
        return []
      }
    },
    type: {
      type: String,
      default() {
        return ''
      }
    }
  }
}
</script>
