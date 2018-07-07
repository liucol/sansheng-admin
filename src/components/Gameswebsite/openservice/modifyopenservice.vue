<template>
        <div>
                <div class="header">
                    <h1 class="page-header">
                        修改开服
                    </h1>
                    <ol class="breadcrumb">
                        <li>游戏官网</li>
                        <li><a href="#/gameswebsite/openservicelist">开服列表</a></li>
                        <li class="active">
                            修改开服
                            <span class="back" @click= "back()">返回</span>
                        </li>
                    </ol>
                </div>
                <div id="page-inner">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="col-lg-12 modifyopenserviceFormWrapper">
                                <div class="modifyopenserviceForm">
                                    <div class="modifyopenserviceInput">
                                        <label>游戏名称：</label>
                                        <input  disabled v-model="openservice.game.name"/>
                                    </div>
                                    <div class="modifyopenserviceInput">
                                        <label>区服：</label>
                                        <input v-model="openservice.name"/>
                                    </div>
                                    <div class="modifyopenserviceInput">
                                        <label>区服描述：</label>
                                        <input v-model="openservice.description" />
                                    </div>
                                    <div class="modifyopenserviceInput">
                                        <label>开服时间：</label>
                                        <input  v-model="openservice.opentime"  placeholder="yyyy-mm-dd hh:mm:ss"/> 
                                        <span class="modelstyle">格式：2018-05-01 12:00:00</span>
                                    </div>
                                </div>
                                <!-- " -->
                                <div class="modifyopenserviceSubmit" @click="modifyopenservicesubmit()"><span>提交</span></div>
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
        return{
            openserviceid: null,
            openservice:{
                game:{
                    id: null,
                    name: null
                },
                name: null,
                description: null,
                opentime: null
            }
        }
    },
    created(){
        this.getopenserviceid()
        this.getopenservice()
    },
    methods: {
        getopenserviceid(){
            let urlarry = location.hash.split('?')[1],
            infoid = qs.parse(urlarry).id
            this.openserviceid = infoid
        },
        getopenservice(){
            axios.get(url.gwgetoneopenservice+"/"+this.openserviceid).then(res => {
                var openservice = this.openservice,
                    data = res.data.Data,
                    code = res.data.Code,
                    msg = res.data.Msg

                    if(code == 0){
                        openservice.game.id = data.Game.Id
                        openservice.game.name = data.Game.Name
                        openservice.id = data.Id
                        openservice.name = data.Name
                        openservice.description = data.Description
                        openservice.opentime = data.OpenTime
                    }else if(code == 2){
                        window.location.href = url.login
                    }else{
                        alert(msg)
                    }
                   
            })
        },
        modifyopenservicesubmit(){
            axios.post(url.gwmodifyopenservice,this.openservice).then(res => {
                var code = res.data.Code,
                    msg  = res.data.Msg
                if(code == 0){
                    window.location.href = "#/gameswebsite/openservicelist"
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
        .modifyopenserviceFormWrapper{
            background-color: #fff;
            padding: 5% 10%;
        }
        .modifyopenserviceForm{
            height: 235px;
            padding: 1px;
        }
        #page-inner .modifyopenserviceForm label{
            width: 150px;
            text-align: right;
        }
        .modifyopenserviceForm input,
        .modifyopenserviceForm select{
            border: 1px solid #ccc;
            width: 300px;
            padding: 4px;
            border-radius: 4px;
        }
        .modifyopenserviceForm .modifyopenserviceInput{
            margin-bottom: 20px;
        }
        .modifyopenserviceForm .modifyopenserviceInputIcon .showFileimg{
            display: inline-block;
            padding: 23px 56px;
            width: 212px;
            height: 146px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background-color: #FFFFFF;
        }
        .modifyopenserviceInputIcon .showFileimg img{
            display: none;
            width: 100px;
        }
        .modifyopenserviceInputIcon .modifyopenservicepushIcon{
            display: inline-block;
            height: 146px;
            float: left;
        }
        .modifyopenserviceForm .modifyopenserviceInputIcon input{
            border: none;
            display: inline;
            width: 83px;
        }
        .modifyopenserviceSubmit span{
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