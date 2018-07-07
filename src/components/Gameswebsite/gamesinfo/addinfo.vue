<template>
    <div>
        <div class="header">
            <h1 class="page-header">
                新增资讯
            </h1>
            <ol class="breadcrumb">
                <li>游戏官网</li>
                <li>
                    <a href="#/gameswebsite/allinfolist">资讯列表</a>
                </li>
                <li class="active">
                    新增资讯
                    <span class="back" @click= "back()">返回</span>
                </li>
            </ol>
        </div>
        <div id="page-inner">
            <div class="row">
                <div class="col-lg-12">
                    <div class="col-lg-12 addInfoFormWrapper">
                        <div class="addInfoForm">
                            <div class="addInfoInput">
                                <label>游戏名称：</label>
                                <select v-model="gwaddinfos.game.id">
                                    <option disabled value="">请选择</option>
                                    <option 
                                            v-for="(list,index) in gamelist"
                                            v-bind:value="list.id">{{list.name}}</option>
                                </select>
                            </div>
                            <div class="addInfoInput">
                                <label>资讯类型：</label>
                                <select v-model="gwaddinfos.tag">
                                    <option disabled value="">请选择</option>
                                    <option 
                                            v-for="(list,index) in infotypearray"
                                            v-bind:value="list.name">{{list.name}}</option>
                                </select>
                            </div>
                            <div class="addInfoInput">
                                <label>标题：</label>
                                <input v-model="gwaddinfos.title"/>
                            </div>
                            <div class="addInfoInput">
                                <label>作者：</label>
                                <input v-model="gwaddinfos.editor"/>
                            </div>
                            <!-- <div class="addInfoInput">
                                <label>Seo标题：</label>
                                <input/>
                            </div> -->
                            <!-- <div class="addInfoInput">
                                <label>Seo描述：</label>
                                <input v-model="gwaddinfos.description"/>
                            </div> -->
                            <div class="addInfoInput">
                                <label>Seo关键字：</label>
                                <input v-model="gwaddinfos.keywords"/>
                            </div>
                            <div class="addInfoInput">
                                <label>是否发布：</label>
                                <select v-model="gwaddinfos.status">
                                    <option disabled value="">请选择</option>
                                    <option value="1">是</option>
                                    <option value="0">否</option>
                                </select>    
                            </div>
                        </div>
                        <div class="addInfoSubmit">
                            <span id="SubmitButton" @click="addinfofn()">提交</span>
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

    export default {

        data() {
            return {
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
                gwaddinfos:{
                    game:{
                        id: null
                    },
                    tag: null,
                    title: null,
                    editor: null,
                    //description: null,
                    keywords: null,
                    status: null
                }
            }
        },
        created() {
            this.getgamenamelist()
        },
        methods: {
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
           addinfofn(){
                var status = this.gwaddinfos.status
                this.gwaddinfos.status = parseInt(status)
                axios.post(url.gwaddinfo,this.gwaddinfos).then(res => {
                    var code = res.data.Code,
                        msg = res.data.Msg
                        
                    if(code == 0){
                        window.location.href = "#/gameswebsite/allinfolist"
                    }else if(code == 2){
                        window.location.href = url.login
                    }else{
                        alert(Msg)
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

    .addInfoFormWrapper {
        background-color: #fff;
        padding: 5% 10%;
    }

    .addInfoForm {
        padding: 1px;
    }

    #page-inner .addInfoForm label {
        width: 150px;
        text-align: right;
    }

    .addInfoForm input,
    .addInfoForm select {
        border: 1px solid #ccc;
        width: 300px;
        padding: 4px;
        border-radius: 4px;
    }

    .addInfoForm .addInfoInput {
        margin-bottom: 20px;
    }

    .addInfoSubmit span {
        display: inline-block;
        padding: 5px 36px;
        margin-left: 150px;
        cursor: pointer;
        border-radius: 5px;
        background-color: #01D19C;
        color: #fff;
    }
</style>