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
        @click="isChennelEditShow=true"
      >
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="isChennelEditShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channel-edit
        :my-channels="channels"
        :active='active'
        @update-active='onUpdateActive'
      >

      </channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: [], // 频道列表
      isChennelEditShow: false// 控制频道编辑的显示与隐藏
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async  loadChannels () {
      try {
        // const { data } = await getUserChannels()
        // this.channels = data.data.channels
        let channels = []
        if (this.user) {
        // 已登录，请求获取用户频道列表
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          // 未登录，判断是否有本地的频道数据列表数据
          const localChannels = getItem('TOUTIAO_CHANNELS')
          // 有，拿来使用
          if (localChannels) {
            channels = localChannels
          } else {
            // 没有，请求获取默认频道列表
            const { data } = await getUserChannels()
            channels = data.data.channels
          }
        }
        this.channels = channels
      } catch (err) {
        this.$toast('获取用户频道数据失败')
      }
    },
    // 点击切换频道
    onUpdateActive (index, isChennelEditShow = false) {
      // 切换频道
      this.active = index
      // 关闭弹层
      this.isChennelEditShow = isChennelEditShow
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
      opacity: 0.8;
      display: flex;
      font-size: 40px;
      justify-content: center;
      align-items: center;
      i.iconfont {
        font-size: 33px;
        color: black;
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
