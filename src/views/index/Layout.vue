<template>
  <div>
    <v-card class="overflow-hidden">
      <v-app-bar fixed="" color="#fcb69f" dark shrink-on-scroll :src="bg" scroll-target="#scrolling-techniques-2">
        <template v-slot:img="{ props }">
          <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"></v-img>
        </template>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title link>云音乐后台</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-menu left bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="dialog = true">
              <v-list-item-title>更改密码</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>系统设置</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout()">
              <v-list-item-title>退出系统</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      <v-sheet id="scrolling-techniques-2" class="overflow-y-auto" max-height="600">
        <v-container style="height: 1px;"></v-container>
      </v-sheet>
    </v-card>
    <v-container class="box">
      <v-row>
        <v-col cols="3">
          <v-container>
            <v-card min-height="550" class="overflow-hidden">
              <v-navigation-drawer
                v-model="drawer"
                :color="color"
                :expand-on-hover="expandOnHover"
                :mini-variant="miniVariant"
                :right="right"
                absolute
                dark
              >
                <v-list dense nav class="py-0">
                  <v-list-item two-line :class="miniVariant && 'px-0'">
                    <v-list-item-avatar class="avatar">
                      <img :src="admin.avatar" />
                      <div class="file-box">
                        <input
                          type="file"
                          title="更改头像"
                          id="file"
                          @change="changeAvatar($event)"
                          accept=".jpg,.gif,.png,.bmp"
                          ref="InputFile"
                          name="files"
                        />
                      </div>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title><h3 class="gutter link">Cloud Music</h3> </v-list-item-title>
                      <v-list-item-subtitle class="gutter link">{{ roleName }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider></v-divider>
                  <v-list>
                    <v-list-group v-for="(item, index) in items" :key="index">
                      <template v-slot:activator v-if="item.type == 1">
                        <v-list-item-icon>
                          <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content v-if="item.subMenus.length > 0">
                          <v-list-item-title class="link">{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-content v-else>
                          <router-link :to="item.path">
                            <v-list-item-title class="link">{{ item.title }}</v-list-item-title>
                          </router-link>
                        </v-list-item-content>
                      </template>

                      <v-list-item
                        v-for="(subItem, index1) in item.subMenus"
                        :key="index1"
                        style="cursor: pointer"
                        @click="gotoSubPage(subItem.path, index, index1)"
                      >
                        <v-list-item-icon style="margin-left:20px;">
                          <v-icon>{{ subItem.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title class="link">{{ subItem.title }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-group>
                  </v-list>
                </v-list>
              </v-navigation-drawer>
            </v-card>
          </v-container>
        </v-col>
        <v-col cols="9">
          <router-view class="area" />
        </v-col>
      </v-row>
    </v-container>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Change Password</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Password*" type="password" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Reconfirm*" type="password" required v-model="pass"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*updatePassword</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="updatePassword()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      admin: JSON.parse(localStorage.getItem('admin')),
      drawer: true,
      items: JSON.parse(localStorage.getItem('menuList')),
      roleName: localStorage.getItem('roleName'),
      color: 'gary',
      colors: ['primary', 'blue', 'success', 'red', 'teal'],
      right: true,
      miniVariant: false,
      expandOnHover: false,
      background: true,
      dialog: false,
      pass: '',
      loginDto: {}
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    logout() {
      alert('logout')
      localStorage.clear()
      this.$store.commit('setAdmin', null)
      this.$router.push('/login')
    },
    gotoSubPage(path, index, index1) {
      console.log(path, index, index1)
      this.$router.push({
        path: path,
        query: {
          index: index,
          index1: index1
        }
      })
    },
    updatePassword() {
      this.loginDto.name = JSON.parse(localStorage.getItem('admin')).name
      this.loginDto.password = this.pass
      this.axios({
        method: 'put',
        url: '/sysAdmin/password',
        data: JSON.stringify(this.loginDto),
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          roleId: localStorage.getItem('roleId')
        }
      }).then((res) => {
        alert(res.data.data)
        localStorage.clear()
        this.$router.push('/login')
      })
    },
    // 更改头像的方法
    changeAvatar() {
      let formData = new FormData()
      formData.append('id', localStorage.getItem('id'))
      formData.append('file', event.target.files[0])
      this.axios({
        method: 'post',
        url: '/sysAdmin/upload',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        params: {
          roleId: localStorage.getItem('roleId')
        },
        data: formData
      }).then((res) => {
        console.log(this.admin)
        console.log(res.data.data)
        this.admin.avatar = res.data.data
        console.log(this.admin)
        localStorage.setItem('admin', JSON.stringify(this.admin))
      })
    }
  },
  computed: {
    bg() {
      return this.background ? 'https://picsum.photos/1920/1080?random' : undefined
    }
  }
}
</script>

<style scoped lang="scss">
.box {
  margin-top: 90px;

  a {
    color: #fff;
    text-decoration: none;
  }
}
.area {
  margin-top: 13px;
}

.avatar {
  position: relative;

  .file-box {
    position: absolute;

    #file {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      opacity: 0;
    }
  }
}
</style>
