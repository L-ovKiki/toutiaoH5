<template>
  <div class="my-container">
    <div class="header not-login">
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
    <div class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image
            round
            fit="cover"
            class="avatar"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <span class="name">黑马头条号</span>
        </div>
        <div class="right">
          <van-button
            size="mini"
            round
          >编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">88</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">66</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">1314</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">666</span>
          <span class="text">获赞</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
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
}
</style>
