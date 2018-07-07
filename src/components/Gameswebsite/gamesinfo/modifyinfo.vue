<template>
        <div>
            <div class="header">
                <h1 class="page-header">
                    修改资讯
                </h1>
                <ol class="breadcrumb">
                    <li>游戏官网</li>
                    <li>
                        <a href="#/gameswebsite/allinfolist">资讯列表</a>
                    </li>
                    <li class="active">
                            修改资讯
                        <span class="back" @click="back()">返回</span>
                    </li>
                </ol>
            </div>
            <div id="page-inner">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="col-lg-12 modifyInfoFormWrapper">
                            <div class="modifyInfoForm">
                                <div class="modifyInfoInput">
                                    <label>游戏名称：</label>
                                    <input disabled v-model="gwmodifyInfos.game.name"/>
                                    <!-- <select v-model="gwmodifyInfos.game.id">
                                        <option disabled value="">请选择</option>
                                        <option 
                                                v-for="(list,index) in gamelist"
                                                v-bind:value="list.id">{{list.name}}</option>
                                    </select> -->
                                </div>
                                <div class="modifyInfoInput">
                                    <label>资讯类型：</label>
                                    <select v-model="gwmodifyInfos.tag">
                                        <option disabled value="">请选择</option>
                                        <option 
                                                v-for="(list,index) in infotypearray"
                                                v-bind:value="list.name">{{list.name}}</option>
                                    </select>
                                </div>
                                <div class="modifyInfoInput">
                                    <label>标题：</label>
                                    <input v-model="gwmodifyInfos.title"/>
                                </div>
                                <div class="modifyInfoInput">
                                    <label>作者：</label>
                                    <input v-model="gwmodifyInfos.editor"/>
                                </div>
                                <!-- <div class="modifyInfoInput">
                                    <label>Seo标题：</label>
                                    <input/>
                                </div> -->
                                <!-- <div class="modifyInfoInput">
                                    <label>Seo描述：</label>
                                    <input v-model="gwmodifyInfos.description"/>
                                </div> -->
                                <div class="modifyInfoInput">
                                    <label>Seo关键字：</label>
                                    <input v-model="gwmodifyInfos.keywords"/>
                                </div>
                                <div class="modifyInfoInput">
                                    <label>是否发布：</label>
                                    <select v-model="gwmodifyInfos.status">
                                        <option disabled value="">请选择</option>
                                        <option value="1">是</option>
                                        <option value="0">否</option>
                                    </select>    
                                </div>
                            </div>
                            <div class="modifyInfoSubmit">
                                <span id="SubmitButton" @click="modifyInfofn()">提交</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <script>
        import axios from 'axios'   
        import url from 'js/api.js' 
        import qs from 'qs'
    
        export default {
    
            data() {
                return {
                    gwmodifyinfoid: null,  //资讯id
                    gamelist: null,
                    infotypearray: [
                        {
                            tag: 0,
                            name: "攻略"
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
                    gwmodifyInfos:{
                        game:{
                            id: null,
                            name: null
                        },
                        content: null,
                        tag: null,
                        title: null,
                        editor: null,
                        keywords: null,
                        status: null
                    }
                }
            },
            created() {
                this.getinfoid()  //得到地址的资讯id
                //this.getgamenamelist()   //获取游戏列表
                this.getinfo()  //获取当前资讯id的信息
            },
            methods: {
                getinfoid(){
                    let urlarry = location.hash.split('?')[1],
                    infoid = qs.parse(urlarry).id
                    this.gwmodifyinfoid = infoid
                },
               getgamenamelist(){
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
               getinfo(){
                    axios.get(url.gwgetinfo+"/"+this.gwmodifyinfoid).then(res => {
                        var gwmodifyInfos = this.gwmodifyInfos,
                            data = res.data.Data,
                            code = res.data.Code,
                            msg = res.data.Msg
                            
                            if(code == 0){
                                gwmodifyInfos.id = data.Id
                                gwmodifyInfos.game.id = data.Game.Id
                                gwmodifyInfos.game.name = data.Game.Name
                                gwmodifyInfos.content = data.Content
                                gwmodifyInfos.tag = data.Tag
                                gwmodifyInfos.title = data.Title
                                gwmodifyInfos.editor = data.Editor
                                gwmodifyInfos.keywords = data.Keywords
                                gwmodifyInfos.status = data.Status
                            }else if(code == 2){
                                window.location.href = url.login
                            }else{
                                alert(msg)
                            }
                            
                    })
               },
               modifyInfofn(){
                    var status = this.gwmodifyInfos.status
                    this.gwmodifyInfos.status = parseInt(status)
                    axios.post(url.gwmodifyinfo,this.gwmodifyInfos).then(res => {
                        var code = res.data.Code,
                            msg = res.data.Msg
                            
                        if(code == 0){
                            window.location.href = "#/gameswebsite/allinfolist"
                        }else if(code == 2){
                            window.location.href = url.login
                        }else{
                            alert(msg)
                        }
                    })
               },
                back(){
                    window.history.back()
                }
            }
        }
    </script>
    <style>
        /*返回*/
    
        .back {
            display: inline-block;
            padding: 3px 15px;
            margin-left: 30px;
            background-color: #337ab7;
            color: #fff;
            border-radius: 4px;
            cursor: pointer;
        }
    
        /*表单*/
    
        .modifyInfoFormWrapper {
            background-color: #fff;
            padding: 5% 10%;
        }
    
        .modifyInfoForm {
            padding: 1px;
        }
    
        #page-inner .modifyInfoForm label {
            width: 150px;
            text-align: right;
        }
    
        .modifyInfoForm input,
        .modifyInfoForm select {
            border: 1px solid #ccc;
            width: 300px;
            padding: 4px;
            border-radius: 4px;
        }
    
        .modifyInfoForm .modifyInfoInput {
            margin-bottom: 20px;
        }
    
        .modifyInfoSubmit span {
            display: inline-block;
            padding: 5px 36px;
            margin-left: 150px;
            cursor: pointer;
            border-radius: 5px;
            background-color: #01D19C;
            color: #fff;
        }
    </style>