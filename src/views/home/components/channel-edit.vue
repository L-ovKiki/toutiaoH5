<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div
        slot="title"
        class="title-text"
      >我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="mini"
        class="edit-btn"
        @click="isEdit=!isEdit"
      >{{isEdit?'完成':'编辑'}}</van-button>
    </van-cell>
    <van-grid
      :gutter="10"
      class="my-grid"
    >
      <van-grid-item
        class="grid-item"
        v-for="(channel,index) in myChannels"
        :key="channel.id"
        @click="onMyChannelClick(channel,index)"
      >
        <!-- includes方法：检测数组中是否包含这个属性 -->
        <van-icon
          v-show="isEdit&& !fiexdChannels.includes(channel.id)"
          slot="icon"
          name="clear"
        ></van-icon>
        <span
          class="text"
          slot="text"
          :class="{active:index===active}"
        >{{channel.name}}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div
        slot="title"
        class="title-text"
      >频道推荐</div>
    </van-cell>
    <van-grid
      :gutter="10"
      class="recommend-grid"
    >
      <van-grid-item
        class="grid-item"
        v-for="channel in recommendChannels"
        :key="channel.id"
        icon='plus'
        :text="channel.name"
        @click='onAddChannel(channel)'
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [], // 所有频道列表
      isEdit: false, // 控制编辑状态的显示
      fiexdChannels: [0]// 固定频道，不允许删除
    }
  },
  computed: {
    ...mapState(['user']),
    // 计算属性会观测内部依赖数据的变化
    // 如果依赖的数据发生变化，则计算属性会重新执行
    recommendChannels () {
      // 数组的方法：遍历数组，把符合条件的元素储存到新的数组中
      return this.allChannels.filter(channel => {
        // 数组的find方法：遍历数组，把符合条件的第一个元素返回
        return !this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
      })
    }
    // recommendChannels () {
    //   const channels = []
    //   this.allChannels.forEach(channel => {
    //     // find遍历数组，找到满足条件的元素项
    //     const ret = this.myChannels.find(myChannel => {
    //       return myChannel.id === channel.id
    //     })
    //     // 如果我的频道中不包括该频道项，则收集到推荐频道中
    //     if (!ret) {
    //       channels.push(channel)
    //     }
    //   })
    //   // 把计算结果返回
    //   return channels
    // }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  methods: {
    // 获取所有频道列表
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('获取失败', err)
      }
    },
    // 点击频道添加
    async  onAddChannel (channel) {
      this.myChannels.push(channel)
      // .数据持久化处理
      if (this.user) {
        // 1.已登录，把数据请求接口放到线上
        try {
          await addUserChannel({
            id: channel.id, // 频道id
            seq: this.myChannels.length// 序号
          })
        } catch (err) {

        }
      } else {
        // 2.未登录，把数据存储到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    // 点击切换频道
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        // 如果是固定频道，则不删除
        if (this.fiexdChannels.includes(channel.id)) {
          return
        }
        // 编辑状态，则执行删除频道
        this.myChannels.splice(index, 1)
        if (index <= this.active) {
          // 让频道激活的索引减1
          this.$emit('update-active', this.active - 1, true)
        }
        // 处理持久化
        this.deleteChannel(channel)
      } else {
        // 非编辑状态，执行切换频道
        this.$emit('update-active', index, false)
      }
    },
    // 点击删除用户频道
    async   deleteChannel (channel) {
      try {
        if (this.user) {
        // 已登录，则将数据更新到线上
          await deleteUserChannel(channel.id)
        } else {
        // 未登录则将数据更新到本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (err) {
        this.$toast('操作失败，请稍后重试')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.channel-edit {
  padding: 85px 0;
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
  }
  .title-text {
    font-size: 32px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #333333;
  }
  ::v-deep .grid-item {
    width: 160px;
    height: 86px;
    border-radius: 6px;
    .van-grid-item__text,
    .text {
      margin-top: 0;
      font-size: 28px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: #222222;
    }
    .active {
      color: red !important;
    }
  }
  ::v-deep .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        z-index: 2;
      }
    }
  }
  ::v-deep .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        white-space: nowrap; //文字不折行
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
