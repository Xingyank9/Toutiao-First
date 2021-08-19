<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button class="edit-btn" type="danger" plain round size="small" @click="isEdit = !isEdit">{{ isEdit ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item v-for="(channel, index) in myChannels" :key="index" class="grid-item" @click="onMyChannelClick(channel, index)">
        <van-icon slot="icon" name="close" v-show="isEdit && !fiexChannels.includes(channel.id)"></van-icon>
        <span class="text" slot="text" :class="{ active: index === active }">{{ channel.name }}</span>
      </van-grid-item>
    </van-grid>
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="tuijian-grid">
      <van-grid-item v-for="(channel, index) in tuijianChannels" :key="index" :text="channel.name" class="grid-item" icon="add-o" @click="onAddChannel(channel)"/>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'

export default {
  name: 'ChannelEdit',
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
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (error) {
        this.$toast('数据获取失败')
      }
    },
    onAddChannel (channel) {
      this.myChannels.push(channel)
    },
    // 编辑按钮的功能
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        // 不给删除固定频道
        if (this.fiexChannels.includes(index)) {
          return
        }
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        this.myChannels.splice(index, 1)
      } else {
        this.$emit('update-active', index, false)
      }
    }
  },
  data () {
    return {
      allChannels: [], // 所有频道
      isEdit: false, // 控制编辑状态
      fiexChannels: [0] // 固定频道
    }
  },
  computed: {
    // 计算属性内部数据一变化，计算属性会重新执行
    tuijianChannels () {
      // const channels = []
      // this.allChannels.forEach(channel => {
      //   // find也为遍历数组用来找到符合的条件
      //   const res = this.myChannels.find(myChannels => {
      //     return myChannels.id === channel.id
      //   })
      //   // 如果频道不包括则收集到推荐频道中
      //   if (!res) {
      //     channels.push(channel)
      //   }
      // })
      // // 返回计算结果
      // return channels

      // filter也是用来遍历数组的 过滤器
      return this.allChannels.filter(channel => { return !this.myChannels.find(myChannel => myChannel.id === channel.id) })
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: black;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
  }
  /deep/.grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      .van-grid-item__icon-wrapper {
        position: unset;
      }
      background-color: #f4f5f6;
      .van-grid-item__text,.text {
        font-size: 28px;
        color: black;
      }
      .active {
        color: red;
      }
    }
  }
  /deep/ .tuijian-grid {
    .grid-item {
      .van-grid-item__content {
        white-space: nowrap;
        flex-direction: row;
        .van-icon-add-o {
          font-size: 28px;
          margin-right: 5px;
        }
        .van-grid-item__text {
          margin-top: 0;
        }
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-close {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
      }
      .van-grid-item__text, .text {
        margin-top: 0;
      }
    }
  }
}
</style>>
