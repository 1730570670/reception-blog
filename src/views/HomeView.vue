<template>
  <div class="home">
      <!-- 左边博客信息 -->
      <div class="leftContent">
        <el-card class="box-card" v-for="item in 8" :key="item">
          <div class="blogImg">
            <img :src="blogInfo.imgurl" alt="图片加载失败">
          </div>
          <div class="contentDiv">
            <div class="typeTitle">
              <!-- 分类标签 -->
              <el-tag>{{blogInfo.type}}</el-tag>
              <!-- 时间+文章 -->
              <h4 class="title">{{blogInfo.createTime+":"+blogInfo.title}}</h4>
            </div>
            <hr>
            <!-- 内容 -->
            <div class="context" v-html="blogInfo.content">
            </div>
          </div>
        </el-card>
        <!-- 分页组件 -->
        <div class="pageTemp">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000" @click="val(v)">
        </el-pagination>
        </div>
      </div>
      <!-- 右边关于信息 -->
      <div class="rightInfo">
        <!-- 资料卡 -->
        <div class="Calender">
          <!-- 日历组件 -->
          <Calender class="CaTemp"></Calender>
        </div>
      </div>
  </div>
</template>

<script>
import Calender from '@/components/calender/Calender.vue'

export default {
  name: 'HomeView',
  data() {
    return {
      blogInfo:{
        title:"测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题",
        content:`我就是内容测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题我就是内容测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题
        我就是内容测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题
        我就是内容测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题
        我就是内容测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题`,
        imgurl:'https://hjy-1309140759.cos.ap-guangzhou.myqcloud.com/hjye0e1e6ca-fe8c-4101-bd24-1cb2f8ef9c91.jpg',
        type:'SpringCloud',
        createTime:'2022年4月27号'
      }
    }
  },
  components: {
    Calender
  },
  methods: {
    val(v){
      console.log(v);
    }
  },
}
</script>
<style lang="less" scoped>
.home{
  width: 100%;
  height: 100%;
  display: flex;  
  justify-content: space-between;
  .leftContent{
    // 显示博客信息容器
    width: 68%;
    //博客信息卡片
    .box-card{
      border: #409EFF solid 1px;
      width: 85%;
      height: 200px;
      margin: 30px auto;
      display: flex;
      align-items: center;
      background-color: rgba(0, 0, 0, 0,0.1);
      // 装博客图片的盒子
      .blogImg{
        height: 150px;
        width: 150px;
        float: left;
        //博客显示的照片
        img{
          width: 100%;
          height: 100%;
        }
      }
      // 标题容器
      .contentDiv{
        height: 150px;
        width: 440px;
        margin-left: 25px;
        float: left;
        // 显示分类时间标题
        .typeTitle{
          padding: 0 5px;
          height: 60px;
          width: 100%;
          display: flex;
          align-items: center;
          // 分类
          .el-tag{
            text-align: center;
            width: 100px;
          }
          // 标题
          .title{
            color: #409EFF;
            margin-left:10px;
            overflow: hidden;				//溢出内容隐藏
            text-overflow: ellipsis;		//文本溢出部分用省略号表示
            display: -webkit-box;			//特别显示模式
            -webkit-line-clamp: 2;			//行数
            line-clamp: 2;					
            -webkit-box-orient: vertical;	//盒子中内容竖直排列
          }
        }
      }
      // 内容
      .context{
        color: #000000;
        overflow: hidden;				//溢出内容隐藏
        text-overflow: ellipsis;		//文本溢出部分用省略号表示
        display: -webkit-box;			//特别显示模式
        -webkit-line-clamp: 4;			//行数		
        -webkit-box-orient: vertical;	//盒子中内容竖直排列
      }
    }
    //分页组件
    .pageTemp{
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  // 右边容器信息
  .rightInfo{
    margin-top: 30px;
    width: 30%;
    height: 800px;
    border: 1px red solid;
    // 日历组件
    .Calender{
      width: 100%;
      height: 260px;
    }
  }
}
</style>
