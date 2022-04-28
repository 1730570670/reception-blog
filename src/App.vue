<template>
  <div id="app">
    <div class="blogContainer">
      <router-view/>
    </div>
    <div class="backGround"></div>
  </div>
</template>

<style lang="less">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app{
  padding: 50px 0px;
  .blogContainer{
    z-index: 999;
    background-color:rgba(0,0,0,0.2);
    margin: 0px auto;
    width: 75%;
    .navbar{
      display: flex;
      font-size: 23px;
      div{
        margin-left: 20px;
      }
    }
  }
}
//背景图片
.backGround{
  z-index: -999;
  position:fixed;
  left: 0;
  top: 0;
  height: 100vh;
  background: #000;
  width: 100%;
  background: url('https://img0.baidu.com/it/u=3415031676,1265821426&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800') no-repeat;
  background-size: cover;
  background-attachment:fixed;
}
</style>
