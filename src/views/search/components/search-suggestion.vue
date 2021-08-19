<template>
  <div class="search-suggestion">
    <van-cell :title="text" icon="search" v-for="(text, index) in suggestions" :key="index" @click="$emit('search', text)"></van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'

export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      // 固定用法
      handler (value) {
        this.loadSearchSuggestions(value)
      },
      immediate: true // 将在侦听开始之后立即调用
    }
  },
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (error) {
        this.$toast('数据获取失败')
      }
    }
  },
  data () {
    return {
      suggestions: [] // 联想数据数组
    }
  }
}
</script>

<style>

</style>
