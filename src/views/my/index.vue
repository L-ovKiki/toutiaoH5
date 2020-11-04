<template>
  <div class="my-container">
    <!-- 已登录头部 -->
    <div
      v-if="user"
      class="header user-info"
    >
      <div class="base-info">
        <div class="left">
          <van-image
            round
            fit="cover"
            class="avatar"
            :src="userInfo.photo"
          />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button
            class="btn"
            size="mini"
            round
            to="/user/profile"
          >编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>

      </div>
    </div>
    <!-- 未登录的头部 -->
    <div
      v-else
      class="header not-login"
    >
      <div
        class="login-btn"
        @click="$router.push('/login')"
      >
        <img
          class="mobile-img"
          src="~@/assets/mobile.png"
          alt=""
        >
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <!-- 导航 -->
    <van-grid
      :column-num="2"
      class="grid-nav"
      clickable
    >
      <van-grid-item class="grid-item">
        <i
          slot="icon"
          class="iconfont icon-shoucang"
        ></i>
        <span
          slot="text"
          class="text"
        >收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i
          slot="icon"
          class="iconfont icon-lishi"
        ></i>
        <span
          slot="text"
          class="text"
        >历史</span>
      </van-grid-item>
    </van-grid>

    <van-cell
      title="消息通知"
      is-link
    />
    <van-cell
      class="mb-9"
      title="小智同学"
      is-link
    />
    <van-cell
      v-if="user"
      class="logout-cell"
      clickable
      title="退出登录"
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUsersInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {
      // 用户数据
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    // 如果用户登录了，则请求加载用户信息数据
    if (this.user) {
      this.loadUserInfo()
    }
  },
  mounted () {},
  methods: {
    // 点击退出登录
    onLogout () {
      // 退出提示
      this.$dialog.confirm({
        title: '是否确认退出'
      })
        .then(() => {
          // 确认退出，清除登录状态(容器中的user和本地存储中的user)
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          console.log('取消')
        })
    },
    async loadUserInfo () {
      try {
        const { data } = await getUsersInfo()
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取数据失败，请稍后重试')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my-container {
  .header {
    width: 750px;
    height: 401px;
    opacity: 0.7;
    background: url("~@/assets/banner.png");
    background-size: cover;
    background-color: #3296fa;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #ffffff;
      }
    }
  }
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between; //向两边撑开
      align-items: center; //垂直居中
      .left {
        display: flex;
        align-items: center;
        .avatar {
          border: 4px solid #fff;
          width: 132px;
          height: 132px;
        }
        .name {
          margin-left: 22px;
          font-size: 30px;
          color: #ffffff;
        }
      }
      .right {
        font-family: MicrosoftYaHei;
        font-weight: 400;
        font-size: 20px;
        .btn {
          width: 115px;
          height: 32px;
          background: #ffffff;
          border-radius: 16px;
        }
      }
    }
    .data-stats {
      background-color: #3296fa;
      display: flex;
      .data-item {
        flex: 1;
        height: 130px;
        display: flex;
        flex-direction: column; //水平分布
        justify-content: center; //水平居中
        align-items: center; //垂直居中
        .count {
          font-size: 36px;
          color: #ffffff;
        }
        .text {
          font-size: 23px;
          color: #ffffff;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      .iconfont {
        font-size: 45px;
        color: #eb5253;
      }
      .text {
        font-size: 28px;
        color: #333333;
        font-family: MicrosoftYaHei;
        font-weight: 400;
      }
      .icon-lishi {
        color: #ff9d1d;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }

  .mb-9 {
    margin-bottom: 9px;
  }
  .van-icon-arrow::before {
    color: #9f9f9f;
  }
}
</style>
