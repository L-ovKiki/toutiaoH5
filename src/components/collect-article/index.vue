<template>
  <van-button
    :icon="value?'star':'star-o'"
    :class="{collected:value}"
    @click="onCollect"
    :loading='loading'
  />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  components: {},
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
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
    // 判断vaule来控制收藏状态
    async   onCollect () {
      this.loading = true
      try {
        if (this.value) {
          // 已收藏取消收藏
          await deleteCollect(this.articleId)
        } else {
          // 未收藏,点击收藏
          await addCollect(this.articleId)
        }
        // 更新视图
        // 自定义事件修改数据并不是立即的
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (err) {
        this.$toast.fail('操作失败，请稍后重试')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>
