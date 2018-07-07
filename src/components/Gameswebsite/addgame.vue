<template>
    <div>
        <div class="header">
            <h1 class="page-header">
                新增游戏
            </h1>
            <ol class="breadcrumb">
                <li>游戏官网</li>
                <li><a href="#/gameswebsite/gamelist">游戏列表</a></li>
                <li class="active">
                    新增游戏
                    <span class="back" @click= "back()">返回</span>
                </li>
            </ol>
        </div>
        <div id="page-inner">
            <div class="row">
                <div class="col-lg-12">
                    <div class="col-lg-12 addGameFormWrapper">
                        <div class="addGameForm">
                            <!-- <div class="addGameInput">
                                <label>ID：</label><input v-model="addgameinfo.Id"/>
                            </div> -->
                            <div class="addGameInput">
                                <label>游戏名称：</label><input v-model="addgameinfo.Name"/>
                            </div>
                            <div class="addGameInput">
                                <label>游戏描述：</label><input v-model="addgameinfo.Description"/>
                            </div>
                            <div class="addGameInput">
                                <label>平台：</label><input v-model="addgameinfo.Platform"/>
                            </div>
                            <div class="addGameInput">
                                <label>下载地址：</label><input v-model="addgameinfo.downpath"/>
                            </div>
                            <!-- <div class="addGameInput">
                                <label>下载次数：</label><input v-model="addgameinfo.down_count"/>
                            </div> -->
                            <div class="addGameInput">
                                <label>落地页链接：</label><input v-model="addgameinfo.Images"/>
                            </div>
                            <div class="addGameInput">
                                <label>游戏状态：</label><input v-model="addgameinfo.Status"/>
                            </div>
                            <div class="addGameInput">
                                <label>备注：</label><input  v-model="addgameinfo.Note"/>
                            </div>
                        </div>
                        <div class="addGameSubmit"><span @click = "addgamesubmit()">提交</span></div>
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
            addgameinfo:{
                // Id: null,
                Name: null,
                Description: null,
                Platform: null,
                downpath: null,
                Images: null,
                Status: null,
                Note: null, 
            }
        }
    },
    methods:{
        addgamesubmit(){
            var status = this.addgameinfo.Status
            if(!/\d/.test(status)){
                 alert("游戏状态必须为数字")
                 return
            }
            this.addgameinfo.Status = parseInt(status)
            axios.post(url.gwaddgame,this.addgameinfo).then(res => {
                var code = res.data.Code,
                    msg = res.data.Msg

                if(code == 0 ){
                    window.location.href = "#/gameswebsite/gamelist"
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
.addGameFormWrapper{
    background-color: #fff;
    padding: 5% 10%;
}
.addGameForm{
    height: 425px;
    padding: 1px;
}
#page-inner .addGameForm label{
    width: 150px;
    text-align: right;
}
.addGameForm input{
    border: 1px solid #ccc;
    width: 300px;
    padding: 4px;
    border-radius: 4px;
}
.addGameForm .addGameInput{
    margin-bottom: 20px;
}
.addGameForm .addGameInputIcon .showFileimg{
    display: inline-block;
    padding: 23px 56px;
    width: 212px;
    height: 146px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #FFFFFF;
}
.addGameInputIcon .showFileimg img{
    display: none;
    width: 100px;
}
.addGameInputIcon .addGamepushIcon{
    display: inline-block;
    height: 146px;
    float: left;
}
.addGameForm .addGameInputIcon input{
    border: none;
    display: inline;
    width: 83px;
}
.addGameSubmit span{
    display: inline-block;
    padding: 5px 36px;
    margin-left: 150px;
    cursor: pointer;
    border-radius: 5px;
    background-color: #01D19C;
    color: #fff;
}
</style>