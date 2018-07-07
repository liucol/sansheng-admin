<template>
    <div>
        <div class="header">
            <h1 class="page-header">
                新增开服
            </h1>
            <ol class="breadcrumb">
                <li>游戏官网</li>
                <li><a href="#/gameswebsite/openservicelist">开服列表</a></li>
                <li class="active">
                    新增开服
                    <span class="back" @click= "back()">返回</span>
                </li>
            </ol>
        </div>
        <div id="page-inner">
            <div class="row">
                <div class="col-lg-12">
                    <div class="col-lg-12 addopenserviceFormWrapper">
                        <div class="addopenserviceForm">
                            <div class="addopenserviceInput">
                                <label>游戏名称：</label>
                                <select v-model="addopenservice.game.id">  
                                    <option disabled value="">请选择</option>
                                    <option 
                                            v-for="(list,index) in gamelist"
                                            v-bind:value="list.id">{{list.name}}</option>
                                </select>
                            </div>
                            <div class="addopenserviceInput">
                                <label>区服：</label>
                                <input  v-model="addopenservice.name"/>
                            </div>
                            <div class="addopenserviceInput">
                                <label>区服描述：</label>
                                <input  v-model="addopenservice.description"/>
                            </div>
                            <div class="addopenserviceInput">
                                <label>开服时间：</label>
                                <input  v-model="addopenservice.opentime"  placeholder="yyyy-mm-dd hh:mm:ss"/>
                                <span class="modelstyle">格式：2018-05-01 12:00:00</span> 
                            </div>
                        </div>
                        <!-- " -->
                        <div class="addopenserviceSubmit" @click="addopenservicesubmit()"><span>提交</span></div>
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
                addopenservice: {
                    game:{
                        id: null
                    },
                    name: null,
                    description: null,
                    opentime: null
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
           addopenservicesubmit(){
                axios.post(url.gwaddopenservice,this.addopenservice).then(res => {
                    var code = res.data.Code,
                        msg = res.data.Msg

                        if(code == 0){
                            window.location.href =  "#/gameswebsite/openservicelist"
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
.addopenserviceFormWrapper{
    background-color: #fff;
    padding: 5% 10%;
}
.addopenserviceForm{
    height: 290px;
    padding: 1px;
}
#page-inner .addopenserviceForm label{
    width: 150px;
    text-align: right;
}
.addopenserviceForm input,
.addopenserviceForm select{
    border: 1px solid #ccc;
    width: 300px;
    padding: 4px;
    border-radius: 4px;
}
.addopenserviceForm .addopenserviceInput{
    margin-bottom: 20px;
}
.addopenserviceForm .addopenserviceInputIcon .showFileimg{
    display: inline-block;
    padding: 23px 56px;
    width: 212px;
    height: 146px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #FFFFFF;
}
.addopenserviceInputIcon .showFileimg img{
    display: none;
    width: 100px;
}
.addopenserviceInputIcon .addopenservicepushIcon{
    display: inline-block;
    height: 146px;
    float: left;
}
.addopenserviceForm .addopenserviceInputIcon input{
    border: none;
    display: inline;
    width: 83px;
}
.addopenserviceSubmit span{
    display: inline-block;
    padding: 5px 36px;
    margin-left: 150px;
    cursor: pointer;
    border-radius: 5px;
    background-color: #01D19C;
    color: #fff;
}
.modelstyle{
    color: rgb(245, 163, 76);
}
</style>