<template>
  <div class="search-container">
    <!-- 顶部搜索栏 -->
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#5babfb"
        @focus="isResultShow = false"
      />
    </form>

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :search-text="searchText"/>
    <!-- 搜索结果 -->
    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText" :search-text="searchText" @search="onSearch"/>
    <!-- 联想建议 -->
    <!-- 历史 -->
    <search-lishi v-else/>
    <!-- 历史 -->
  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import SearchLishi from './components/search-lishi'

export default {
    data () {
      return {
        searchText: '',
        isResultShow: false
      }
    },
    methods: {
      onSearch (val) {
          this.searchText = val
          this.isResultShow = true
      },
      onCancel () {
          this.$router.back()
      }
    },
    name: 'SearchIndex',
    components: {
      SearchSuggestion,
      SearchResult,
      SearchLishi
    }
}
</script>
<style lang="less">
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
