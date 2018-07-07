<template>
    <div>
        <div class="header">
            <h1 class="page-header">
                新增礼包
            </h1>
            <ol class="breadcrumb">
                <li>游戏官网</li>
                <li><a href="#/gameswebsite/giftlist">礼包列表</a></li>
                <li class="active">
                    新增礼包
                    <span class="back" @click= "back()">返回</span>
                </li>
            </ol>
        </div>
        <div id="page-inner">
            <div class="row">
                <div class="col-lg-12">
                    <div class="col-lg-12 addGiftFormWrapper">
                        <div class="addGiftForm">
                            <div class="addGiftInput">
                                <label>游戏名称：</label>
                                <select  v-model="addgift.game.id">
                                    <option disabled value="">请选择</option>
                                    <option 
                                            v-for="(list,index) in gamelist"
                                            v-bind:value="list.id">{{list.name}}</option>
                                </select>
                            </div>
                            <div class="addGiftInput">
                                <label>礼包名称：</label><input  v-model="addgift.name"/>
                            </div>
                            <div class="addGiftInput">
                                <label>礼包描述：</label><input  v-model="addgift.description"/>
                            </div>
                            <div class="addGiftInput">
                                <label>礼包有效期：</label><input  v-model="addgift.effectivetime"  placeholder="yyyy-mm-dd"/> ~ <input  v-model="addgift.deadline" placeholder="yyyy-mm-dd"/>
                            </div>
                            <div class="addGiftInput">
                                <label>数量：</label><input  v-model="addgift.remaining"/>
                            </div>
                            <div class="addGiftInput">
                                <label>礼包的CDKEY：</label><input  v-model="addgift.cdkey"/>
                            </div>
                            <div class="addGiftInput">
                                <label>是否主推：</label>
                                <select  v-model="addgift.main">
                                    <option value="false">否</option>
                                    <option value="true">是</option>
                                </select>
                            </div>
                        </div>
                        <div class="addGiftSubmit"><span @click="addgiftsubmit()">提交</span></div>
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
            return{
                gamelist: null,
                addgift: {
                    game:{
                        id: null
                    },
                    name: null,
                    description: null,
                    effectivetime: null,
                    deadline: null,
                    remaining: null,
                    cdkey: null,
                    main: "false"
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
           addgiftsubmit(){
                 this.addgift.remaining = parseInt(this.addgift.remaining)
                 var main = this.addgift.main

                 if(main == "true"){
                    this.addgift.main = true
                 }else if(main == "false"){
                    this.addgift.main = false
                 }
                 
                axios.post(url.gwaddgift,this.addgift).then(res => {
                    var code = res.data.Code,
                        msg = res.data.Msg
                        
                        if(code == 0){
                            window.location.href = "#/gameswebsite/giftlist"
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
.addGiftFormWrapper{
    background-color: #fff;
    padding: 5% 10%;
}
.addGiftForm{
    height: 370px;
    padding: 1px;
}
#page-inner .addGiftForm label{
    width: 150px;
    text-align: right;
}
.addGiftForm input,
.addGiftForm select{
    border: 1px solid #ccc;
    width: 300px;
    padding: 4px;
    border-radius: 4px;
}
.addGiftForm .addGiftInput{
    margin-bottom: 20px;
}
.addGiftForm .addGiftInputIcon .showFileimg{
    display: inline-block;
    padding: 23px 56px;
    width: 212px;
    height: 146px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #FFFFFF;
}
.addGiftInputIcon .showFileimg img{
    display: none;
    width: 100px;
}
.addGiftInputIcon .addGiftpushIcon{
    display: inline-block;
    height: 146px;
    float: left;
}
.addGiftForm .addGiftInputIcon input{
    border: none;
    display: inline;
    width: 83px;
}
.addGiftSubmit span{
    display: inline-block;
    padding: 5px 36px;
    margin-left: 150px;
    cursor: pointer;
    border-radius: 5px;
    background-color: #01D19C;
    color: #fff;
}
</style>