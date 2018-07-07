<template>
<div>
        <div class="header">
                <h1 class="page-header">
                    编辑内容
                </h1>
                <ol class="breadcrumb">
                    <li>游戏官网</li>
                    <li><a href="#/gameswebsite/allinfolist">资讯列表</a></li>
                    <li class="active">
                        编辑内容
                        <span class="back" @click="back()">返回</span>
                    </li>
                </ol>
            </div>
            <div id="page-inner">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="col-lg-12 editNewsFormWrapper">
                            <!-- 富文本编辑器 定义一个div容器 -->
                            <div id="editor" style="height:700px;max-height:800px;">
                                    
                            </div>
                            <div class="hidden" id="Ocontent">{{gwmodifyInfos.content}}</div>
                            <div class="editorBtn">
                                <span class="public" @click="public()">发表</span>
                                <span class="save">保存</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</div>
</template>
<script>
    import axios from 'axios'  
    import E from 'wangeditor' 
    import url from 'js/api.js'
    import qs from 'qs'

    export default {
        data() {
            return{
                Oeditor: null,
                gwmodifyinfoid: null,
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
        created(){
            this.getinfoid()
            this.getinfo()
        },
        methods:{
            getinfoid(){
                    let urlarry = location.hash.split('?')[1],
                        infoid = qs.parse(urlarry).id
                    this.gwmodifyinfoid = infoid
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

                            this.Oeditor.txt.html(data.Content)
                        }else if(code == 2){
                            window.location.href = url.login
                        }else{
                            alert(msg)
                        }
                            
                    })
               },
            public(){
                axios.post(url.gwmodifyinfo,this.gwmodifyInfos).then(res => {
                    var code = res.data.Code,
                        msg = res.data.Msg
                    if(code == 0){
                        window.location.href="#/gameswebsite/allinfolist"
                    }else if(code == 2){
                        window.location.href = url.login
                    }else{
                        alert(msg)
                    }
                })
            },
            back(){
                    window.history.back()
                },
            seteditor(){
                var editor = new E('#editor')

         
                editor.customConfig.uploadFileName = 'uploadfile'
                editor.customConfig.uploadImgServer = url.uploadimg

                editor.customConfig.uploadImgHooks = {
                    customInsert: function (insertImg, result, editor) {
                                // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                                // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
                        
                                // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                                var url =result.Data
                                insertImg(url)
                        
                                // result 必须是一个 JSON 格式字符串！！！否则报错
                            }
                        }

                editor.customConfig.debug=true
                editor.customConfig.onchange = (html) => {
                    this.gwmodifyInfos.content = html
                }
                editor.create()

                //把editor挂载到data上面
                this.Oeditor = editor
            }    
        },
        watch: {
        },
        mounted(){
            this.seteditor()
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
.editNewsFormWrapper{
    background-color: #fff;
    padding: 2% 5%;
}
.note-editable{
    min-height: 500px;
}
.editorBtn{
    margin-top: 10px;
}
.editorBtn span{
    display: inline-block;
    background-color: #ccc;
    padding: 5px 20px;
    cursor: pointer;
    border-radius: 4px;
    color: #fff;
    background-color: #84a4ff;
}
/*.editorBtn .public{
    background-color: #ff8c87;
}
.editorBtn .save{
    background-color: #d0bfff;
}*/
.editorBtn span:hover{
    background-color: #ff8c87;
}
#editor {
    height: 900px !important;
}
#editor .w-e-text-container{
    height: 700px !important;
}

</style>