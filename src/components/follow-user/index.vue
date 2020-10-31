
<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    round
    size="small"
    :loading='loading'
    @click="onFollow"
  >已关注</van-button>
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading='loading'
    @click="onFollow"
  >关注</van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'FollowUser',
  components: {},
  // 自定义v-model名字
  model: {
    prop: 'isFollowed',
    event: 'update-is_followed'
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Object, String, Number],
      required: true
    }
  },
  data () {
    return {
      loading: false// 控制loading的显示状态
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 点击关注或取消关注
    async  onFollow () {
      this.loading = true// 展示关注状态的loading状态
      try {
        if (this.isFollowed) {
          // 已关注，取消关注
          await deleteFollow(this.userId)
          // this.article.is_followed = false
        } else {
          // 没有关注，点击关注
          await addFollow(this.userId)
          // this.article.is_followed = true
        }
        // 更新视图状态
        // this.article.is_followed = !this.article.is_followed
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (err) {
        this.$toast('操作失败，请稍后重试')
        console.log(err)
      }
      this.loading = false// 关闭关注状态的loading状态
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
