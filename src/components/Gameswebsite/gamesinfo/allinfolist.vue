<template>
    <div>
            <div class="header">
                    <h1 class="page-header">
                        资讯列表
                    </h1>
                    <ol class="breadcrumb">
                        <li>游戏官网</li>
                        <li class="active">资讯列表</li>
                    </ol>
        
                </div>
                <div id="page-inner">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="newsbuttons">
                                <a href="#/gameswebsite/addinfo"><span class="addnews">新增资讯</span></a>
                                <div class="searchinfo">
                                    <div class="searchinput searchbyname">
                                            <label>游戏名称：</label>
                                            <!-- <select v-model="gwaddinfos.game.id"> -->
                                            <select v-model="searchval.gameid">
                                                    <option  value="">请选择</option>
                                                    <option 
                                                        v-for="(list,index) in gamelist"
                                                        v-bind:value="list.id">{{list.name}}</option>
                                            </select>
                                    </div>
                                    <div class="searchinput searchbyname">
                                            <label>资讯类型：</label>
                                            <!-- <select v-model="gwaddinfos.game.id"> -->
                                            <select v-model="searchval.tag">
                                                    <option value="">请选择</option>
                                                    <option 
                                                            v-for="(list,index) in infotypearray"
                                                            v-bind:value="list.name">{{list.name}}</option>
                                            </select>
                                    </div>
                                    <span class="searchsbmit" @click="search()">搜索</span>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <!-- Advanced Tables -->
                            <div class="table-responsive infoListTable">
                                <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                    <thead>
                                    <tr>
                                        <th>资讯ID</th>
                                        <th>游戏名称</th>
                                        <th>资讯类型</th>
                                        <th>标题</th>
                                        <th>发布时间</th>
                                        <th>作者</th>
                                        <th>Seo标题</th>
                                        <th>Seo关键字</th>
                                        <th>浏览量</th>
                                        <th>发布状态</th>
                                        <th>新闻内容</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr
                                        v-for="(list,index) in allinfolist"
                                    >
                                        <td>{{list.Id}}</td>
                                        <td>{{list.Game.Name}}</td>
                                        <td>{{list.Tag}}</td>
                                        <td>{{list.Title}}</td>
                                        <td class="center">{{list.Addtime}}</td>
                                        <td>{{list.Editor}}</td>
                                        <td>Trident</td>
                                        <td>{{list.Keywords}}</td>
                                        <td>{{list.Views}}</td>
                                        <td class="center" v-if="list.Status == 1">是</td>
                                        <td class="center" v-if="list.Status == 0">否</td>
                                        <td>
                                            <a :href="'#/gameswebsite/editcontent?id='+list.Id"><span>编辑</span></a>
                                        </td>
                                        <td>
                                            <a :href="'#/gameswebsite/modifyinfo?id='+list.Id" class="modifyButtonA"><span class="operateButton modifyButton">修改</span></a>
                                            <span class="operateButton deleteButton" data-toggle="modal" data-target="#deleteButtonModal" :data-infoId="list.Id" @click="getinfoid(list.Id)">删除</span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!--End Advanced Tables -->
                        </div>
                    </div>
                    <!--分页-->
                    <!-- <div class="row">
                        <div class="col-md-12 paginationWrap">
                            <nav aria-label="...">
                                <span class="total">共 16 页</span>
                                <ul class="page">
                                    <li class="disabled"><a href="#"><i class="iconfont">&#xe697;</i></a></li>
                                    <li class="active"><a href="#">1</a></li>
                                    <li><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                    <li><a href="#">4</a></li>
                                    <li><a href="#">5</a></li>
                                    <li><a href="#"><i class="iconfont">&#xe6a7;</i></a></li>
                                </ul>
                            </nav>
                        </div>
                    </div> -->
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
                                <button type="button" class="btn btn-primary deleteSureBtn" data-gameId="" @click="deletinfo()">确定</button>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
</template>
<script>
    import axios from 'axios'   
    import url from 'js/api.js'
    export default {
        data() {
            return {
                allinfolist: null,
                gamelist: null,
                infotypearray: [
                    {
                        tag: 0,
                        name: "新闻"
                    },
                    {
                        tag: 1,
                        name: "公告"
                    },
                    {
                        tag: 2,
                        name: "活动"
                    },
                    {
                        tag: 3,
                        name: "开服"
                    },
                    {
                        tag: 4,
                        name: "合服"
                    }
                ],
                searchval: {
                    gameid: null,
                    tag: null
                },
                deletinfoid: null
            }
        },
        created() {
            this.getallinfolist()
            this.getgamelist()
        },
        methods: {
            getallinfolist(){
                axios.get(url.gwallinfolist).then(res => {
                    var code = res.data.Code,
                        msg = res.data.Msg

                    if(code == 0){
                        this.allinfolist = res.data.Data
                    }else if(code == 2){
                        window.location.href = url.login
                    }else{
                        alert(msg)
                    }
                   
                })
           },
           getgamelist(){
                axios.get(url.gwgamenamelist).then(res => {
                    var code = res.data.Code,
                        msg = res.data.Msg

                    if(code == 0){
                        this.gamelist = res.data.Data
                    }else if(code == 2){
                        window.location.href = url.login
                    }else{
                        alert(msg)
                    }
                    
                })
           },
           getinfoid(infoid){
                this.deletinfoid = infoid
           },
           deletinfo(){
                axios.get(url.gwdeletinfo+"/"+this.deletinfoid).then(res => {
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
           },
           search(){
               var gameid = this.searchval.gameid,
                   tag = this.searchval.tag

                axios.get(url.gwallinfolist+'?game='+gameid+'&tag='+tag).then(res => {
                    var code = res.data.Code,
                        msg = res.data.Msg

                    if(code == 0){
                        this.allinfolist = res.data.Data
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
    #page-inner .newsbuttons{
    border-bottom: 1px solid #DFDFDF;
    margin-bottom: 40px;
    overflow: hidden;
}
#page-inner  .addnews{
    display: inline-block;
    padding: 5px 10px 10px 10px;
    border-radius: 5px;
    margin-bottom: -5px;
    background-color: #01D19C;
    color: #fff;
}
#page-inner  .searchinfo{
    display: inline-block;
}
#page-inner  .searchinput{
    display: inline-block;
    margin-left:  15px;
}
#page-inner  .searchinput select{
    border: 1px solid #ccc;
    width: 150px;
    padding: 4px;
    border-radius: 4px;
}
#page-inner  .searchsbmit{
    display: inline-block;
    margin-left: 15px;
    padding: 3px 15px;
    background-color: #FF982E;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
}
.infoListTable tbody tr{
    background-color: #FAFAFA;
}
.infoListTable thead{
    background-color: #4D4C51;
    color: #E3E2E7;
}
.infoListTable thead th{
    padding-left: 20px !important;
    border-color: transparent !important;
    border-bottom: 1px solid #4D4C51 !important;
}
.infoListTable thead th:nth-last-child(1){
    padding-left: 0;
    text-align: center;
}
.infoListTable tbody td{
    padding-left: 20px !important;
}
.infoListTable tbody td:nth-last-child(1){
    padding-left: 0;
    text-align: center;
}

.table-hover>tbody>tr:hover{
    background-color: #E0F4F2;
}

.infoListTable tbody a{
    display: inline-block;
}
.infoListTable .table{
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