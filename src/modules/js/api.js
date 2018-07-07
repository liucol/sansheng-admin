/**
 * Created by User on 2018/3/27.
 */
let url ={
  login: '/',
  gwgamelist: '/admin/game/list',  //所有游戏信息列表
  gwdeletgame: '/admin/game/delete',   //删除游戏
  gwaddgame: '/admin/game/add',   //添加游戏
  gwmodifygetgameinfo: '/admin/game/edit/',   //获取游戏信息
  gwmodifygame: '/admin/game/save',  //修改游戏信息
  gwgamenamelist: '/admin/game/listname', //游戏名称数组列表
  gwallinfolist: '/admin/page/list',  //获取资讯列表
  gwaddinfo: '/admin/page/add',  //添加资讯
  gwgetinfo: '/admin/page/edit',   //获取一条资讯
  gwmodifyinfo: '/admin/page/save', //修改资讯
  gwdeletinfo: '/admin/page/delete/',  //删除资讯
  uploadimg: '/admin/upload', //上传图片
  gwaddgift: '/admin/gift/add', //添加礼包
  gwgiftlist: '/admin/gift/list',  //礼包列表
  gwgetgift: '/admin/gift/edit',  //获取一个礼包信息
  gwmodifygift: '/admin/gift/save', //修改礼包信息
  gwdeletgift: '/admin/gift/delete',  //删除礼包
  gwgetopenservice: '/admin/server/list', //区服列表
  gwaddopenservice: '/admin/server/add',  //添加区服
  gwgetoneopenservice: '/admin/server/edit', //获取指定区服
  gwmodifyopenservice: '/admin/server/save', //修改区服
  gwdeletopenservice: '/admin/server/delete'  //删除区服
}

//开发环境和真实环境的切换
let  host = 'http://192.168.1.174:8080'   //http://192.168.1.174:8080

for(let  key in url){
  if(url.hasOwnProperty(key)){
      url[key] = host + url[key]
  }
}

export default url
