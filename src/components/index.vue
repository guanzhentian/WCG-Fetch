<template>
<div class="basic">
  <div class="backImg">
    <div class="shadow">
      <div class="container">
        <div class="row">
        <div class="col-xs-offset-3 col-xs-7 text-center centerDiv">
            <h3>无需下载 只需几步操作</h3>
            <h3>就能产生你想要的爬虫  在线爬取</h3>
            <h3>简单 &nbsp;&nbsp;&nbsp;  结构化  &nbsp;&nbsp; 定制化</h3>
            <router-link :to="{path:'/setSpider'}"class="col-xs-12  btn btn-info startBtn">开始定制爬虫</router-link>
            <div class="watchA">
              <a href=""  class="text-muted"><span class="fui-play"></span>观看介绍视频</a>
            </div>
        </div>
        </div>
      </div>
    </div>
  </div>
  <div class="nextDiv">
    <img src="../assets/down.png" class="center-block downPng">
  </div>
  <div class="contentDiv">
    <div class="container">
      <div class="row">
        <div class="col-xs-12">
          <h2 class="text-center">WCG Fetch&nbsp; 是什么?</h2>
        </div>
      </div>
      <div class="row contentDiv" >
          <ul class="col-xs-offset-2 col-xs-8">
            <li class="contentLi">    
              <h5>WCG Fetch 是一个全自定制化的爬虫,爬取的网站、爬取的目标数据、爬取的网址限制，全部由你来定制</h5>
            </li>
            <li class="contentLi">
              <h5>只需要简单的几步操作，以及一些简单的知识，就能构造出你自己的爬虫，爬取你想爬取的数据</h5>
            </li> 
            <li class="contentLi">
              <h5>能够实时查看爬取到的数据，手动停止爬虫的运行</h5>
            </li> 
            <li class="contentLi">
              <h5>可以分析爬虫的爬取过程</h5>
            </li>
            <li class="contentLi">
              <h5>是由中国矿业大学计算机学院的宝石结晶队所制作</h5>
            </li> 
          </ul>
      </div>
    </div>
  </div>
  <div class="contentDiv teach">
    <div class="shadow">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h2 class="text-center">使用教程</h2>
            <h6  class="text-center">无需学习Python或者各种框架啦，只需要跟着下面几个步骤，就能轻易的创作属于你的爬虫。</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="contentDiv learn">
    <div class="container">
      
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.basic{
  width: 100%;
}
.backImg{
  width: 100%;
  height: 800px;
  background:rgb(40,47,52) url('../assets/back.jpg') no-repeat;
  background-size: 110%;
}
.shadow{
  width: 100%;
  height: 100%;
  background-color: rgba(51,51,51,0.4);
}
.centerDiv{
  padding-top: 200px;
  color:#ECF0F1;
}
.startBtn{
  margin-top: 60px;
  margin-bottom: 20px;
}
.watchA{
  margin-top: 50px;
  font-size: 16px;
}

.downPng{
  height:50px;
}
.nextDiv{

  line-height: 0;
}
.contentDiv{
  margin-top: 20px;
}
.contentDiv ul{

}
.contentLi{
  margin-bottom: 50px;
}
.teach{
  width: 100%;
  height: 250px;
  background:rgb(40,47,52) url('../assets/back2.jpg') no-repeat;
  background-size: 110%;
  color:white;
}
.teach h6 {
  margin-top:80px;
}
</style>
