<template>
  <v-content>
    <v-card class="mx-auto mb-8" max-width="1400" outlined v-for="(item, index) in repositries" :key="index">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-avatar tile size="80"> <v-btn text>Start</v-btn></v-list-item-avatar>
      </v-list-item>
      <v-card-actions>
        <div class="overline ml-2 mr-4">{{ item.languare }}</div>
        <div class="overline ml-4 mr-4">{{ item.pushed_at }}</div>
      </v-card-actions>
    </v-card>
  </v-content>
</template>

<script>
export default {
  name: 'Repositry',
  props: {
    repositries: {
      type: Array,
      default: () => []
    }
  }
}
</script>
