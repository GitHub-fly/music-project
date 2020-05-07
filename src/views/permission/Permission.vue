<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      :collapse="!collapseOnScroll"
      :collapse-on-scroll="collapseOnScroll"
      absolute
      color="deep-purple accent-4"
      dark
      scroll-target="#scrolling-techniques-6"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Collapsing Bar</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-checkbox v-model="collapseOnScroll" color="white" hide-details></v-checkbox>
    </v-app-bar>
    <v-sheet id="scrolling-techniques-6" class="overflow-y-auto" max-height="600">
      <v-container clipped style="height: 550px; padding-top: 80px">
        <v-row clipped-right class="fill-height">
          <v-col>
            <v-sheet height="400">
              <v-calendar ref="calendar" :now="today" :value="today" :events="events" color="primary" type="week"></v-calendar>
            </v-sheet>
          </v-col>
          <v-col justify="end" cols="12" sm="6" md="4" lg="3">
            <v-sheet elevation="10" class="pa-4">
              <v-chip-group column active-class="primary--text">
                <v-chip v-for="tag in tags" :key="tag">
                  {{ tag }}
                </v-chip>
              </v-chip-group>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-card>
</template>

<script>
export default {
  name: 'Permission',
  data: () => ({
    collapseOnScroll: true,
    today: '2019-01-08',
    tags: ['Work', 'Home Improvement', 'Vacation', 'Food', 'Drawers', 'Shopping', 'Art', 'Tech', 'Creative Writing'],
    events: [
      {
        name: 'Weekly Meeting',
        start: '2019-01-07 09:00',
        end: '2019-01-07 10:00'
      },
      {
        name: "Thomas' Birthday",
        start: '2019-01-10'
      },
      {
        name: 'Mash Potatoes',
        start: '2019-01-09 12:30',
        end: '2019-01-09 15:30'
      }
    ]
  })
}
</script>

<style lang="scss" scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}

.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}
</style>
