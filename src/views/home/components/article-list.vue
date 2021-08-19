<template>
  <div class="article-list">
    <van-pull-refresh v-model="isRefreshLoading" @refresh="onRefresh" :head-height="80">
      <template #pulling="props">
        <img
          class="doge"
          src="https://img01.yzcdn.cn/vant/doge.png"
          :style="{ transform: `scale(${props.distance / 80})` }"
        />
        </template>
          <!-- 释放提示 -->
        <template #loosing>
          <img class="doge" src="https://img01.yzcdn.cn/vant/doge.png" />
        </template>

        <!-- 加载提示 -->
        <template #loading>
        <img class="doge" src="https://img01.yzcdn.cn/vant/doge-fire.jpg" />
      </template>
      <!-- 列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <van-cell v-for="(article, index) in list" :key="index" :title="article.title" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'

export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 存储列表数据
      loading: false, // 控制loading状态
      finished: false, // 控制数据加载结束状态
      timestamp: null, // 请求获取下一页数据的时间戳
      error: false, // 控制列表刷新失败提示
      isRefreshLoading: false // 控制下拉刷新
    }
  },
  methods: {
    // onLoad () {
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }

    //     // 加载状态结束
    //     this.loading = false

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 1000)
    // }
    // 滚动到底部触发onLoad方法
    async onLoad () {
      try {
        const { data } = await getArticle({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })

        // if (Math.random() > 0.5) {
        //   JSON.parse('asdafdsad')
        // } 测试用

        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true

        this.loading = false
      }
    },
    // 下拉刷新触发
    async onRefresh () {
        try {
          // 拿到数据
          const { data } = await getArticle({
            channel_id: this.channel.id,
            timestamp: Date.now(), // 获取最新的时间戳
            with_top: 1
          })
          // 加数据
          this.list.unshift(...data.data.results)
          // 关闭refreshloading
          this.isRefreshLoading = false
        } catch (error) {
          console.log('请求失败', error);
        }
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  height: 85vh;
  overflow-y: auto;
  .doge {
    width: 300px;
    height: 180px;
    margin-top: 8px;
    border-radius: 4px
  }
}
</style>
