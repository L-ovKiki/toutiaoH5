<template>
  <van-button
    :icon="value===1?'good-job':'good-job-o'"
    :class="{liked:value===1}"
    @click="onCollect"
    :loading='loading'
  />
</template>

<script>
import { addLike, deleteLike } from '@/api/article'
export default {
  name: 'LikeArticle',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Object, String, Number],
      required: true
    }
  },
  data () {
    return {
      loading: false// 控制加载的显示状态
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 判断value值显示点赞状态
    async  onCollect () {
      this.loading = true// 展示点赞状态的loading状态
      try {
        let status = -1
        if (this.value === 1) {
          // 已点赞，取消点赞
          await deleteLike(this.articleId)
        } else {
          // 没有点赞，点击点赞
          await addLike(this.articleId)
          status = 1
        }
        // 更新视图状态
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        this.$toast('操作失败，请稍后重试')
        console.log(err)
      }
      this.loading = false// 关闭点赞状态的loading状态
    }
  }
}
</script>

<style lang="scss" scoped>
.liked {
  .van-icon {
    color: #e5645f;
  }
}
</style>
