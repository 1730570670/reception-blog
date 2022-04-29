<template>
  <div class="home">
      <!-- 左边博客信息 -->
      <div class="leftContent">
        <el-card class="box-card" v-for="item in blogInfoList" :key="item.blogCreateTime">
          <div class="blogImg">
            <img :src="item.blogImgUrl" alt="图片加载失败">
          </div>
          <div class="contentDiv">
            <div class="typeTitle">
              <!-- 分类标签 -->
              <el-tag v-text="item.blogType.blogTypename"></el-tag>
              <!-- 时间+文章 -->
              <h4 class="title">{{item.blogCreateTime+":"+item.blogTitle}}</h4>
            </div>
            <hr>
            <!-- 内容 -->
            <div class="context" :v-html="item.blogContent">
            </div>
          </div>
        </el-card>
        <!-- 分页组件 -->
        <div class="pageTemp">
          <el-pagination
          @current-change="currentPage"
            background
            layout="prev, pager, next"
            :total="pageSize*11" >
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
      pageSize:1,
      blogInfoList:[]
    }
  },
  components: {
    Calender
  },
  methods: {
    // 分页
    async currentPage(index){
      var i =await this.$ajaxPost(`/blog/${index}`)
      if(i.message){
        this.$message.error('请求出错了')
      }
      this.blogInfoList=i.data.data.records
      this.pageSize=i.data.data.pages;
    },  
   formatDate(time){
      var date = new Date(time);
      var year = date.getFullYear(),
          month = date.getMonth() + 1,//月份是从0开始的
          day = date.getDate(),
          hour = date.getHours(),
          min = date.getMinutes(),
          sec = date.getSeconds();
      var newTime = year + '-' +
          month + '-' +
          day + ' ' +
          hour + ':' +
          min + ':' +
          sec;
        return newTime;
    }
    // 查询数据
  },
  mounted() {
    //默认加载分页查询为1
    this.currentPage(0)
    // console.log(this.formatDate(1651207502000));
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
      width: 660px;
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
    // 日历组件
    .Calender{
      width: 100%;
      height: 260px;
    }
  }
}
</style>
