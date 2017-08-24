<template>
  <div id="app">
    <header class="navbar navbar-inverse navbar-fixed-top" id="header"  v-if="!isManage">
      <div class="navbar-header">
        <router-link tag="a" class="navbar-brand" :to='{path:"/"}'>WCG Fetch</router-link> 
      </div>
      <div class="container">
        <ul class="pull-right nav navbar-nav">
            <li v-for="item in navbarMsg" class=""><router-link tag="a" :to='{path:item.path}'>{{item.text}}</router-link></li>
        </ul>
      </div>
    </header>
      <router-view></router-view>
    <div class="container footer">
      <p class="text-center">Copyright©2017  <a href="mailto:695663045@qq.com">@Gzt</a></p>
    </div>
  </div>
</template>

<script>
import Headroom from 'headroom.js'
export default {
  name: 'app',
  computed:{
    isManage(){
      var patt = new RegExp('manage');
      return patt.test(this.$route.path);
    }
  },
  data(){
    return{
      navbarMsg:[{
        text:"定制爬虫",
        path:"/setSpider",
      },{
        text:"爬取数据",
        path:"/getData",
      },{
        text:"爬取分析",
        path:"/anlysis",
      },{
        text:"关于我们",
        path:"/about",
      }]
    }
  },
  mounted(){
    var test = new Headroom(document.getElementById('header'),{
      "tolerance": 5,
       "offset": 205,
       "classes": {
           "initial": "animated",
           "pinned": "slideInDown",
           "unpinned": "slideInUp"
        }
    });
    test.init();
  }
}
</script>
<style type="text/css">
#app{
  font-family: Helvetica, Tahoma, Arial, "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei";
  font-family: Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei";
}  
</style>

<style scoped>

.testDiv{
  height: 1080px;
  background: #BDC3C7 no-repeat;
}
.animated {
  animation-duration: .5s;
  animation-fill-mode: both;
}

@keyframes slideInDown {
  from {
    transform: translate3d(0, -100%, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

.slideInDown {
  animation-name: slideInDown;
}

@keyframes slideInUp {
  from {
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, -110%, 0);
  }
}

.slideInUp {
  animation-name: slideInUp;
}

.headroom--top{
  background-color: rgba(0,0,0,0);
}
.footer{
  border-top: 1px solid #ccc;
  padding-top: 20px;
  margin-top:20px;
}
/*.headroom--top a{
  color:#2C3E50
}
.headroom--top .container a{
  color:#2C3E50
}*/
</style>
