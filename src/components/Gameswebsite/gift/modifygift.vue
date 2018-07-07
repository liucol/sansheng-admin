<template>
        <div>
                <div class="header">
                    <h1 class="page-header">
                        修改礼包
                    </h1>
                    <ol class="breadcrumb">
                        <li>游戏官网</li>
                        <li><a href="#/gameswebsite/giftlist">礼包列表</a></li>
                        <li class="active">
                            修改礼包
                            <span class="back" @click= "back()">返回</span>
                        </li>
                    </ol>
                </div>
                <div id="page-inner">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="col-lg-12 modifyGiftFormWrapper">
                                <div class="modifyGiftForm">
                                    <div class="modifyGiftInput">
                                        <label>游戏名称：</label><input disabled v-model="modifyGift.game.name"/>
                                    </div>
                                    <div class="modifyGiftInput">
                                        <label>礼包名称：</label><input  v-model="modifyGift.name"/>
                                    </div>
                                    <div class="modifyGiftInput">
                                        <label>礼包描述：</label><input  v-model="modifyGift.description"/>
                                    </div>
                                    <div class="modifyGiftInput">
                                        <label>礼包有效期：</label><input  v-model="modifyGift.effectivetime"  placeholder="yyyy-mm-dd"/> ~ <input  v-model="modifyGift.deadline" placeholder="yyyy-mm-dd"/>
                                    </div>
                                    <div class="modifyGiftInput">
                                        <label>剩余数量：</label><input  v-model="modifyGift.remaining"/>
                                    </div>
                                    <div class="modifyGiftInput">
                                        <label>礼包的CDKEY：</label><input  v-model="modifyGift.cdkey"/>
                                    </div>
                                    <div class="addGiftInput">
                                        <label>是否主推：</label>
                                        <select  v-model="modifyGift.main" >
                                            <option value="false">否</option>
                                            <option value="true">是</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="modifyGiftSubmit"><span @click="modifyGiftsubmit()">提交</span></div>
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
                giftid: null,
                modifyGift: {
                    id: null,
                    game:{
                        id: null,
                        name: null
                    },
                    name: null,
                    description: null,
                    effectivetime: null,
                    deadline: null,
                    remaining: null,
                    cdkey: null,
                    main: null
                }
            }
        },
        created() {
            this.getgiftid()
            this.getgiftmsg()
        },
        methods: {
            getgiftid(){
                let urlarry = location.hash.split('?')[1],
                infoid = qs.parse(urlarry).id
                this.giftid = infoid
            },
            getgiftmsg(){
                axios.get(url.gwgetgift+"/"+this.giftid).then(res => {
                   var modifyGiftmsg = this.modifyGift,
                       data = res.data.Data,
                       code = res.data.Code,
                       msg = res.data.Msg

                       if(code == 0){
                            modifyGiftmsg.id = data.Id
                            modifyGiftmsg.game.id = data.Game.Id
                            modifyGiftmsg.game.name = data.Game.Name
                            modifyGiftmsg.name = data.Name
                            modifyGiftmsg.description = data.Description
                            modifyGiftmsg.effectivetime = data.EffectiveTime
                            modifyGiftmsg.cdkey = data.Cdkey
                            modifyGiftmsg.deadline = data.Deadline
                            modifyGiftmsg.remaining=data.Remaining
                            modifyGiftmsg.main = data.Main
                       }else if(code == 2){
                            window.location.href = url.login
                       }else{
                           alert(msg)
                       }
                   
                })
            }, 
            modifyGiftsubmit(){
                 var modifyGift = this.modifyGift,
                     main = modifyGift.main 

                 if(main == "true"){
                   this.modifyGift.main = true
                 }else if(main == "false"){
                   this.modifyGift.main = false
                 }
                 
                 this.modifyGift.remaining = parseInt(modifyGift.remaining)

                axios.post(url.gwmodifygift,this.modifyGift).then(res => {
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
.modifyGiftFormWrapper{
    background-color: #fff;
    padding: 5% 10%;
}
.modifyGiftForm{
    height: 360px;
    padding: 1px;
}
#page-inner .modifyGiftForm label{
    width: 150px;
    text-align: right;
}
.modifyGiftForm input,
.modifyGiftForm select{
    border: 1px solid #ccc;
    width: 300px;
    padding: 4px;
    border-radius: 4px;
}
.modifyGiftForm .modifyGiftInput{
    margin-bottom: 20px;
}
.modifyGiftForm .modifyGiftInputIcon .showFileimg{
    display: inline-block;
    padding: 23px 56px;
    width: 212px;
    height: 146px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #FFFFFF;
}
.modifyGiftInputIcon .showFileimg img{
    display: none;
    width: 100px;
}
.modifyGiftInputIcon .modifyGiftpushIcon{
    display: inline-block;
    height: 146px;
    float: left;
}
.modifyGiftForm .modifyGiftInputIcon input{
    border: none;
    display: inline;
    width: 83px;
}
.modifyGiftSubmit span{
    display: inline-block;
    padding: 5px 36px;
    margin-left: 150px;
    cursor: pointer;
    border-radius: 5px;
    background-color: #01D19C;
    color: #fff;
}
</style>