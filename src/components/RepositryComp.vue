<template>
  <v-content>
    <v-card class="mx-auto mr-5 ml-5 mb-5" fill flat outlined v-for="(item, index) in repositries" :key="index">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1 blue--text text--darken-4">{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-btn small><v-icon left>mdi-star</v-icon> Star</v-btn>
      </v-list-item>

      <v-card-actions>
        <!-- <v-btn text> <v-icon left>mdi-pencil</v-icon>{{ item.language }}</v-btn> -->
        <v-chip small class="ma-2" color="success" outlined>
          <v-icon small left>mdi-pencil</v-icon>
          {{ item.language }}
        </v-chip>
        <v-card-subtitle>{{ item.pushed_at }}</v-card-subtitle>
      </v-card-actions>
    </v-card>
  </v-content>
</template>

<script>
export default {
  name: 'RepositryComp',
  props: {
    repositries: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({})
}
</script>
