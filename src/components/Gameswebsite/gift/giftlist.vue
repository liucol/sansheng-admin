<template>
        <div id="gamelist">
            <div class="header">
                <h1 class="page-header">
                    礼包列表
                </h1>
                <ol class="breadcrumb">
                    <li>游戏官网</li>
                    <li class="active">礼包列表</li>
                </ol>
    
            </div>
            <div id="page-inner">
                <div class="row">
                    <div class="col-md-12">
                        <div class="gamebuttons"><a href="#/gameswebsite/addgift"><span class="addgame">新增礼包</span></a></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <!-- Advanced Tables -->
                        <div class="table-responsive giftlistTable">
                            <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                <thead>
                                    <tr>
                                        <th>礼包ID</th>
                                        <th>游戏名称</th>
                                        <th>礼包名称</th>
                                        <th>礼包描述</th>
                                        <th>礼包有效期</th>
                                        <th>剩余数量</th>
                                        <th>礼包的CDKEY</th>
                                        <th>是否主推</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(list,index) in giftlist"
                                    >
                                        <td>{{list.Id}}</td>
                                        <td>{{list.Game.Name}}</td>
                                        <td>{{list.Name}}</td>
                                        <td class="center">{{list.Description}}</td>
                                        <td class="center">{{list.EffectiveTime}}~{{list.Deadline}}</td>
                                        <td>{{list.Remaining}}</td>
                                        <td>{{list.Cdkey}}</td>
                                        <td v-if="list.Main">是</td>
                                        <td v-else>否</td>
                                        <td>
                                            <a :href="'#/gameswebsite/modifygift?id='+list.Id" class="modifyButtonA"><span class="operateButton modifyButton">修改</span></a>
                                            <span class="operateButton deleteButton" data-toggle="modal" data-target="#deleteButtonModal" @click = "deletgift(list.Id)">删除</span>
                                        </td>
                                    </tr>
                                    <!-- <tr>
                                        <td>Trident</td>
                                        <td>Internet Explorer 5.0</td>
                                        <td>Win 95+</td>
                                        <td class="center">5</td>
                                        <td class="center">C</td>
                                        <td>Win 95+</td>
                                        <td>
                                            <a href="modifygameinfo.html"  class="modifyButtonA"><span class="operateButton modifyButton">修改</span></a>
                                            <span class="operateButton deleteButton" data-toggle="modal" data-target="#deleteButtonModal" data-gameId="456">删除</span>
                                        </td>
                                    </tr> -->
                                </tbody>
                            </table>
                        </div>
                        <!--End Advanced Tables -->
                    </div>
                </div>
            </div>
            <!--确定删除弹窗-->
            <div class="modal fade" id="deleteButtonModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="myModalLabel">提示</h4>
                        </div>
                        <div class="modal-body">
                            您确定要删除吗？
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                            <button type="button" class="btn btn-primary deleteSureBtn" data-gameId="" @click="delet()">确定</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
  import axios from 'axios'  
   import url from 'js/api.js'

   export default{
        data(){
            return{
                giftlist: null,
                deletgiftid: null
            }
        },
        created() {
            this.getgiftlist()
        },
        methods:{
            getgiftlist(){
                  axios.get(url.gwgiftlist).then(res => {
                      var code = res.data.Code,
                          msg = res.data.Msg

                          if(code == 0){
                            this.giftlist = res.data.Data
                          }else if(code == 2){
                            window.location.href = url.login
                          }else{
                              alert(msg)
                          }
                  })
            },
            deletgift(giftid){
                this.deletgiftid = giftid
            },
            delet(){
                axios.get(url.gwdeletgift+'/'+this.deletgiftid).then(res => {
                    var code = res.data.Code,
                        msg = res.data.Msg 
                        
                    if(code == 0){
                        setTimeout(function(){
                            window.location.reload()
                        },100)
                    }else if(code == 2){
                        window.location.href = url.login
                    }else{
                        alert(msg)
                    }
                    
                  })
            }
        }
    }
</script>

<style>
      /* @import 'giftlist.css' */
      #page-inner .gamebuttons{
        border-bottom: 1px solid #DFDFDF;
        margin-bottom: 40px;
        overflow: hidden;
    }
    #page-inner  .addgame{
        display: inline-block;
        padding: 5px 10px 10px 10px;
        border-radius: 5px;
        margin-bottom: -5px;
        background-color: #01D19C;
        color: #fff;
    }
    .giftlistTable tbody tr{
        background-color: #FAFAFA;
    }
    .giftlistTable thead{
        background-color: #4D4C51;
        color: #E3E2E7;
    }
    .giftlistTable thead th{
        padding-left: 20px !important;
        border-color: transparent !important;
        border-bottom: 1px solid #4D4C51 !important;
    }
    .giftlistTable thead th:nth-last-child(1){
        padding-left: 0;
        text-align: center;
    }
    .giftlistTable tbody td{
        padding-left: 20px !important;
    }
    .giftlistTable tbody td:nth-last-child(1){
        padding-left: 0;
        text-align: center;
    }
    
    .table-hover>tbody>tr:hover{
        background-color: #E0F4F2;
    }

    .giftlistTable tbody a{
        display: inline-block;
    }
    .giftlistTable .table{
        margin-bottom: 0 !important;
    }
    .operateButton{
        display: inline-block;
        padding: 3px 17px;
        border-radius: 15px;
        background-color: #F8FFFC;
    }
    .modifyButton{
        border: 1px solid #01D19C;
        text-decoration: none;
        color: #01D19C;
    }
    .modifyButtonA{
        margin-right: 10px;
    }
    .deleteButton{
        cursor: pointer;
        border: 1px solid #A8A8B0;
        color: #A8A8B0;
    }
</style>