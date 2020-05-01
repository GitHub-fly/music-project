<template>
  <div class="bg">
    <mu-container>
      <mu-form ref="form" :model="loginDto" class="login-form">
        <mu-form-item label="用户名" prop="name" :rules="usernameRules">
          <mu-text-field v-model="loginDto.name" prop="name"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密码" prop="password" :rules="passwordRules">
          <mu-text-field type="password" v-model="loginDto.password" prop="password"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="isAgree" :rules="argeeRules">
          <mu-checkbox label="同意用户协议" v-model="loginDto.isAgree"></mu-checkbox>
          <div class="verify">
            <mu-form-item label="验证码" prop="verifyCode" :rules="verifyCodeRules">
              <mu-text-field v-model="loginDto.verifyCode" prop="verifyCode"></mu-text-field>
            </mu-form-item>
            <div class="img" @click="changeImg()">
              <img :src="src" alt="" />
            </div>
          </div>
        </mu-form-item>

        <mu-form-item>
          <mu-button color="primary" @click="submit">提交</mu-button>
          <mu-button @click="clear">重置</mu-button>
        </mu-form-item>
      </mu-form>
      <mu-dialog title="Dialog" width="360" :open.sync="openSimple">
        登录成功
        <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">Close</mu-button>
      </mu-dialog>

      <div>
        <v-row justify="center">
          <v-dialog v-model="dialogWindow" max-width="500px">
            <v-card>
              <v-card-title>
                请选择角色：
              </v-card-title>
              <v-card-text>
                <v-select v-model="roleName" :items="select" label="A Select List" item-value="text"></v-select>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" text @click="dialogWindow = false">
                  Close
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="getUserMuse()">
                  entry
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
    </mu-container>
    <button @click="toGit()">GitHub</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      dialogWindow: false,
      select: [],
      roleId: 0,
      roleName: '',
      roleList: '',
      result: {},
      token: '',
      usernameRules: [{ validate: (val) => !!val, message: '必须填写用户名' }],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码', trigger: 'blur' },
        { validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10', trigger: 'blur' }
      ],
      argeeRules: [{ validate: (val) => !!val, message: '必须同意用户协议' }],
      verifyCodeRules: [{ validate: (val) => !!val, message: '必须填写验证码' }],
      loginDto: {
        name: 'soft1851',
        password: '123456a',
        verifyCode: '',
        uuid: '',
        isAgree: false
      },
      menuList: [],
      closeSimpleDialog: false,
      openSimple: false,
      src: ''
    }
  },
  components: {},
  created() {},
  mounted() {
    this.src = this.changeImg()
  },
  methods: {
    changeImg() {
      return (this.src = this.GLOBAL.baseUrl + '/captcha?uuid=' + this.uuid())
    },
    uuid() {
      let s = []
      let hexDigits = '0123456789abcdef'
      for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = '-'
      let text = s.join('')
      this.loginDto.uuid = text
      return text
    },
    /**
     * 提交按钮监听方法，主要用来判断登录是否成功
     */
    submit() {
      this.$refs.form.validate().then((result) => {
        console.log('form valid: ', result)
        this.axios({
          method: 'post',
          url: this.GLOBAL.baseUrl + '/sysAdmin/login',
          data: JSON.stringify(this.loginDto),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          let code = res.data.code
          if (code == 1) {
            this.$store.commit('setRoleName', this.roleName)
            // 获取角色列表
            this.roleList = res.data.data.admin.roles
            // 获取角色 token
            this.token = res.data.data.token
            localStorage.setItem('token', this.token)
            this.$store.commit('setToken', this.token)
            // 获取当前用户的基本信息
            localStorage.setItem('admin', JSON.stringify(res.data.data.admin))
            this.$store.commit('setAdmin', res.data.data.admin)

            if (this.roleList.length > 1) {
              this.dialogWindow = true
              for (let i = 0; i < this.roleList.length; i++) {
                const element = this.roleList[i]
                this.select.splice(i, 0, element.roleName)
              }
              this.result = res
            } else {
              this.roleName = this.roleList[0].roleName
              this.getUserMuse()
            }
          } else {
            alert(res.data.msg)
          }
        })
      })
    },

    /**
     * 通过 token 获取当前用户所拥有的的菜单权限
     */
    getUserMuse() {
      localStorage.setItem('roleName', this.roleName)
      for (let i = 0; i < this.roleList.length; i++) {
        const element = this.roleList[i]
        if (this.roleName == element.roleName) {
          this.roleId = element.roleId
          localStorage.setItem('roleId', this.roleId)
          break
        }
      }
      console.log('角色id:' + this.roleId)

      this.axios({
        methods: 'get',
        url: this.GLOBAL.baseUrl + '/sysRole',
        params: {
          roleId: this.roleId
        }
      }).then((res) => {
        this.menuList = res.data.data.menus
        localStorage.setItem('menuList', JSON.stringify(this.menuList))
        this.$store.commit('setMenuList', this.menuList)
        this.getMusicInfo()
        this.$router.push('/')
      })
    },
    /**
     * 获取音乐列表的数据
     */
    getMusicInfo() {
      this.axios({
        methods: 'get',
        url: this.GLOBAL.baseUrl + '/song/limit',
        params: {
          roleId: localStorage.getItem('roleId')
        }
      }).then((res) => {
        console.log(res)

        localStorage.setItem('songList', JSON.stringify(res.data.data))
      })
    },
    /**
     * 清除表单数据
     */
    clear() {
      this.$refs.form.clear()
      this.loginDto = {
        name: '',
        password: '',
        verifyCode: '',
        isAgree: false
      }
    },
    toGit() {
      const authorize_uri = 'https://github.com/login/oauth/authorize'
      const client_id = '0484ede0f81b37d56093'
      const redirect_uri = 'http://localhost:8080/login/oauth2/code/github'
      window.location.href = `${authorize_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}`
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.verify {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-left: 50px;
  height: 50px;
  justify-content: space-between;
}
.img {
  cursor: pointer;
  margin-left: 10px;
  width: 100px;
  height: 40px;

  img {
    width: 100%;
    height: 100%;
  }
}

.bg {
  background-image: url('../assets/images/login-bg.jpg');
  opacity: 0.8;
  height: 125vh;
  background-size: calc(100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-form {
  max-width: 500px;
  margin-left: 300px;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
}
</style>
