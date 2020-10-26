<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      fixed
    >
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
      >搜索</van-button>
    </van-nav-bar>
    <!-- 频道列表 -->
    <!-- 通过 v-model 绑定当前激活标签对应的索引值，默认情况下启用第一个标签。 -->
    <!-- 通过 animated 属性可以开启切换标签内容时的转场动画。 -->
    <!-- 通过 swipeable 属性可以开启滑动切换标签页。 -->
    <van-tabs
      v-model="active"
      animated
      swipeable
      class="channel-tabs"
    >
      <van-tab
        :title="item.name"
        v-for="item in channels"
        :key="item.id"
      >
        <!-- 文章列表 -->
        <article-list :channel='item' />
      </van-tab>
      <div
        slot='nav-right'
        class="placeholder"
      ></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
      >
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: []// 频道列表
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async  loadChannels () {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('获取用户频道数据失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  padding-top: 178px;
  padding-bottom: 98px;
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border-radius: 32px;
    border: none;
    font-size: 28px;

    .van-icon {
      font-size: 32px;
    }
  }
  ::v-deep .channel-tabs {
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 96px;
      z-index: 1;
      left: 0;
      right: 0;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: #777777;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px;
      height: 6px;
      background: #3296fa;
      border-radius: 3px;
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      background: #ffffff;
      opacity: 0.5;
      display: flex;
      font-size: 40px;
      justify-content: center;
      align-items: center;
      i.iconfont {
        font-size: 33px;
      }
      &::before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
