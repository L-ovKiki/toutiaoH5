<template>
  <div class="search-suggestion">
    <van-cell
      :title="item"
      icon="search"
      v-for="(item ,index) in suggestions"
      :key="index"
      @click="$emit('search',item)"
    >
      <div
        v-html="highlight(item)"
        slot="title"
      ></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
// 按需加载有好处，只会把有需要的加载进来
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []// 联想建议数据列表
    }
  },
  computed: {},
  watch: {
    searchText: {
    // 当searchText发生变化时就会调用hander函数
    // 注意：handler函数是固定的

      // debounce函数
      // 参数1：一个函数
      // 参数2：延迟时间，单位是毫秒
      // 返回值：防抖之后的函数
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }, 200),
      // handler (value) {
      //   this.loadSearchSuggestions(value)
      // },
      immediate: true// 该回调会在侦听开始之后被立即调用
    }
  },
  created () {},
  mounted () {},
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('数据获取失败，请稍后重试')
      }
    },
    // 高亮的函数
    highlight (item) {
      // 正则表达式//中间的内容都会当作匹配字符来使用，而不是数据变量
      // 如果需要根据数据变量动态创建正则表达式，则手动new RegExp
      const reg = new RegExp(this.searchText, 'gi')
      return item.replace(reg, `<span class="active">${this.searchText}</span>`)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-suggestion {
  padding-top: 108px;
  .van-cell {
    ::v-deep span.active {
      color: #3296fa;
    }
  }
}
</style>
