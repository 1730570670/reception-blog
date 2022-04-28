<template>
  <div class="about">
    <mavon-editor v-model="context" :toolbars="toolbars" />
    <el-button @click="sendBolg">发送</el-button>
  </div>
</template>
<script>
export default {
  name:'A-bout',
   data () {
        return {
            context: ' ',//输入的数据
            toolbars: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                mark: true, // 标记
                superscript: true, // 上角标
                quote: true, // 引用
                ol: true, // 有序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                help: true, // 帮助
                code: true, // code
                subfield: true, // 是否需要分栏
                fullscreen: true, // 全屏编辑
                readmodel: false, // 沉浸式阅读
                undo: true, // 上一步
                trash: true, // 清空
                save: true, // 保存（触发events中的save事件）
                navigation: true // 导航目录
            }
        };
    },
    methods: {
      sendBolg () {
          console.log(this.context)
            var htmlContent = this.converter.makeHtml(this.context)
            console.log(htmlContent)
      }
    },
}
</script>

<style>

</style>