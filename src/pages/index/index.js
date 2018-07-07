/**
 * Created by User on 2018/3/27.
 */
// import 'css/common.css'
// import './index.css'

import Vue from 'vue'
import axios from 'axios'
// import Bar from "components/Bar.vue"
// import Ts from "components/Ts.vue"


import Router from 'vue-router'
Vue.use(Router)

let routes = [{
  path: '',  //首页
  components: require("../../components/Index.vue")
},
{
  path: '/gameswebsite/gamelist',  //游戏列表
  components: require("../../components/Gameswebsite/Gamelist.vue")
},
{
  path: '/gameswebsite/addgame',  //添加游戏
  components: require("../../components/Gameswebsite/addgame.vue")
},
{
  path: '/gameswebsite/modifygame',  //修改游戏
  components: require("../../components/Gameswebsite/modifygame.vue")
},
{
  path: '/gameswebsite/allinfolist',  //资讯列表
  components: require("../../components/Gameswebsite/gamesinfo/allinfolist.vue")
},
{
  path: '/gameswebsite/addinfo',  //添加资讯
  components: require("../../components/Gameswebsite/gamesinfo/addinfo.vue")
},
{
  path: '/gameswebsite/modifyinfo',  //修改资讯
  components: require("../../components/Gameswebsite/gamesinfo/modifyinfo.vue")
},
{
  path: '/gameswebsite/editcontent',  //编辑资讯内容
  components: require("../../components/Gameswebsite/gamesinfo/editcontent.vue")
},
{
  path: '/gameswebsite/addgift',  //添加礼包
  components: require("../../components/Gameswebsite/gift/addgift.vue")
},
{
  path: '/gameswebsite/giftlist',  //礼包列表
  components: require("../../components/Gameswebsite/gift/giftlist.vue")
},
{
  path: '/gameswebsite/modifygift',  //修改礼包
  components: require("../../components/Gameswebsite/gift/modifygift.vue")
},
{
  path: '/gameswebsite/openservicelist',  //开服列表
  components: require("../../components/Gameswebsite/openservice/openservicelist.vue")
},
{
  path: '/gameswebsite/addopenservice',  //添加开服
  components: require("../../components/Gameswebsite/openservice/addopenservice.vue")
},
{
  path: '/gameswebsite/modifyopenservice',  //修改开服
  components: require("../../components/Gameswebsite/openservice/modifyopenservice.vue")
}
]
//创建router实例
let router = new Router({
  routes
})



let app = new Vue({
  el: "#wrapper",
  router,
  data: {
    lists: null,
    indexp: 0,
    gwindex: null,
    indexc: null,
    navlist: [{
      a:{
        name: '首页',
        link: '/#',
        fonticon: 'fa-dashboard'
      }
    },
    {
      a:{
        fonticon: 'fa-sitemap',
        name: '游戏官网',
      },
      b:[
        {
          name: '游戏列表',
          link: '/gameswebsite/gamelist'
        },
        {
          name: '资讯列表',
          link: '/gameswebsite/allinfolist'
        },
        {
          name: '礼包列表',
          link: '/gameswebsite/giftlist'
        },
        {
          name: '开服列表',
          link: '/gameswebsite/openservicelist'
        }
      ]
    }
  ]
  },
  created(){
    //this.getLists()
  },
  methods: {
    getLists() {
      axios.get('http://192.168.1.174:8080/admin/game/list?page=1').then(res => {
        var curList = res.data.Data
        this.lists = curList
      })
    },
    clicknav1(index){
        this.indexp = index
    },
    clickgw(index){
        this.gwindex = index
    }
  },
  components: {
    // Foot,
    // Bar
  }
})

