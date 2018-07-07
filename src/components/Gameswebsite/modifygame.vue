<template>
        <div>
            <div class="header">
                <h1 class="page-header">
                    修改游戏
                </h1>
                <ol class="breadcrumb">
                    <li>游戏官网</li>
                    <li><a href="#/gameswebsite/gamelist">游戏列表</a></li>
                    <li class="active">
                        修改游戏
                        <span class="back" @click="back()">返回</span>
                    </li>
                </ol>
            </div>
            <div id="page-inner">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="col-lg-12 modifygameFormWrapper">
                            <div class="modifygameForm">
                                <!-- <div class="modifygameInput">
                                    <label>ID：</label><input v-model="modifygameinfo.Id"/>
                                </div> -->
                                <div class="modifygameInput">
                                    <label>游戏名称：</label><input v-model="modifygameinfo.Name"/>
                                </div>
                                <div class="modifygameInput">
                                    <label>游戏描述：</label><input v-model="modifygameinfo.Description"/>
                                </div>
                                <div class="modifygameInput">
                                    <label>平台：</label><input v-model="modifygameinfo.Platform"/>
                                </div>
                                <div class="modifygameInput">
                                    <label>下载地址：</label><input v-model="modifygameinfo.DownPath"/>
                                </div>
                                <!-- <div class="modifygameInput">
                                    <label>下载次数：</label><input v-model="modifygameinfo.down_count"/>
                                </div> -->
                                <div class="modifygameInput">
                                    <label>落地页链接：</label><input v-model="modifygameinfo.Images"/>
                                </div>
                                <div class="modifygameInput">
                                    <label>游戏状态：</label><input v-model="modifygameinfo.Status"/>
                                </div>
                                <div class="modifygameInput">
                                    <label>备注：</label><input  v-model="modifygameinfo.Note"/>
                                </div>
                            </div>
                            <div class="modifygameSubmit"><span @click = "modifygamesubmit()">提交</span></div>
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
    
    
    export default{
        data(){
            return{
                gwmodifygameid: null,
                modifygameinfo:{
                    // Id: null,
                    Name: null,
                    Description: null,
                    Platform: null,
                    DownPath: null,
                    Images: null,
                    Status: null,
                    Note: null, 
                }
            }
        },
        created() {
            this.getgameid()
            this.gwmodifygetgameinfo()
        },
        methods:{
            getgameid(){
                let urlarry = location.hash.split('?')[1],
                gameid = qs.parse(urlarry).id
                this.gwmodifygameid = gameid
            },
            gwmodifygetgameinfo(){
                axios.get(url.gwmodifygetgameinfo+this.gwmodifygameid).then(res => {
                    var code = res.data.Code,
                        msg = res.data.Msg

                        if(code == 0){
                            this.modifygameinfo = res.data.Data
                        }else if(code == 2){
                            window.location.href = url.login
                        }else{
                            alert(msg)
                        }
                    
                })
            },
            modifygamesubmit(){
                this.modifygameinfo.Status = parseInt(this.modifygameinfo.Status)
                // var con = confirm("您确定修改？")
                // if(con){
                        axios.post(url.gwmodifygame,this.modifygameinfo).then(res => {
                            var Code = res.data.Code,
                                message = res.data.Msg

                            if(Code == 0 ){
                                window.location.href = "#/gameswebsite/gamelist"
                            }else if(code == 2){
                                window.location.href = url.login
                            }else{
                                alert(message)
                            }
                        })
                    //}
                },
            back(){
                window.history.back()
            }
        }
    }
    </script>
    <style>
        /*返回*/
    .back{
        display: inline-block;
        padding: 3px 15px;
        margin-left: 30px;
        background-color: #337ab7;
        color: #fff;
        border-radius: 4px;
        cursor: pointer;
    }
    /*表单*/
    .modifygameFormWrapper{
        background-color: #fff;
        padding: 5% 10%;
    }
    .modifygameForm{
        height: 425px;
        padding: 1px;
    }
    #page-inner .modifygameForm label{
        width: 150px;
        text-align: right;
    }
    .modifygameForm input{
        border: 1px solid #ccc;
        width: 300px;
        padding: 4px;
        border-radius: 4px;
    }
    .modifygameForm .modifygameInput{
        margin-bottom: 20px;
    }
    .modifygameForm .modifygameInputIcon .showFileimg{
        display: inline-block;
        padding: 23px 56px;
        width: 212px;
        height: 146px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #FFFFFF;
    }
    .modifygameInputIcon .showFileimg img{
        display: none;
        width: 100px;
    }
    .modifygameInputIcon .modifygamepushIcon{
        display: inline-block;
        height: 146px;
        float: left;
    }
    .modifygameForm .modifygameInputIcon input{
        border: none;
        display: inline;
        width: 83px;
    }
    .modifygameSubmit span{
        display: inline-block;
        padding: 5px 36px;
        margin-left: 150px;
        cursor: pointer;
        border-radius: 5px;
        background-color: #01D19C;
        color: #fff;
    }
    </style>