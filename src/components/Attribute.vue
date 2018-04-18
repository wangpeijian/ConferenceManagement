<style scoped>
    .page {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        padding-left: 20px;
        max-width: 600px;
        width: 100%;
        min-width: 350px;
        text-align: center;
    }

    .content {
        flex-grow: 1;
        overflow: auto;
    }

    .box-card {
        margin: 10px;
    }

    .carousel-item {
        position: relative;
        padding-right: 100px;
    }

    .carousel-bottom {
        margin: 40px 0;
    }

    .avatar {
        display: inline-block;
        height: 100px;
    }

    .btn-remove {
        position: absolute;
        top: 50%;
        right: 20px;
        color: #fff;
        transform: translate(0%, -50%);
    }

    .el-select, .el-date-editor{
        width: 100%;
    }
</style>

<template>
    <div class="page">
        <h4>属性区</h4>

        <div class="content">
            <div v-if="!formType">
                <el-card class="box-card">
                    <el-alert
                        title="请选择编辑区域..."
                        type="info"
                        show-icon
                        :closable="false"
                    >
                    </el-alert>
                </el-card>
            </div>

            <!--轮播图属性-->
            <div v-if="formType === 'carousel'">
                <el-card class="box-card" v-for="(item, index) in carouselArray" :key="index">
                    <el-form label-width="80px" class="carousel-item">
                        <el-form-item label="图片">
                            <el-upload
                                class="avatar-uploader"
                                :action="UPLOAD_IMAGE"
                                :data="{pid: mid}"
                                :show-file-list="false"
                                :on-success="(...arr)=>{
                                    handleAvatarSuccess(index, ...arr);
                                }"
                            >
                                <img v-if="item.imageUrl" :src="item.imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>

                        <el-form-item label="跳转地址">
                            <el-input v-model="carouselArray[index].linkUrl" placeholder="请输入跳转链接"></el-input>
                        </el-form-item>

                        <el-button class="btn-remove" type="danger" icon="el-icon-delete" circle
                                   @click="removeCarouselItem(index)"></el-button>
                    </el-form>
                </el-card>

                <div class="carousel-bottom">
                    <el-button class="btn-add" type="primary" icon="el-icon-plus" circle
                               @click="addCarouselItem"></el-button>
                </div>
            </div>

            <!--入口属性-->
            <div v-if="formType === 'entry'">
                <el-card class="box-card">
                    <el-form label-width="80px">
                        <el-form-item label="图片">
                            <el-upload
                                class="avatar-uploader"
                                :action="UPLOAD_IMAGE"
                                :data="{pid: mid}"
                                :show-file-list="false"
                                :on-success="handleEntrySuccess"
                            >
                                <img v-if="entryItem.icon" :src="entryItem.icon" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>

                        <el-form-item label="标签名称">
                            <el-input v-model="entryItem.label" placeholder="请输入名称"></el-input>
                        </el-form-item>

                        <el-form-item label="类型">
                            <el-select v-model="entryItem.type" placeholder="请选择" @change="changEntryType">
                                <el-option-group
                                    v-for="group in entryOptions"
                                    :key="group.label"
                                    :label="group.label">
                                    <el-option
                                        v-for="item in group.options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-option-group>
                            </el-select>
                        </el-form-item>

                        <!--根据不同链接类型展示不同表单数据-->
                        <!--内部文章-->
                        <template v-if="entryItem.type === 'article'">
                            <el-form-item label="内容">
                                <el-select v-model="entryItem.articleId" placeholder="请选择">
                                    <el-option
                                        v-for="item in articleList"
                                        :key="item.id"
                                        :label="item.title"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </template>

                        <!--外部链接-->
                        <template v-if="entryItem.type === 'link'">
                            <el-form-item label="链接地址">
                                <el-input v-model="entryItem.href" placeholder="请输入链接"></el-input>
                            </el-form-item>
                        </template>

                        <!--特殊类型-->
                        <!--地图-->
                        <template v-if="entryItem.type === 'map'">
                            <el-form-item label="目标地点">
                                <el-input v-model="entryItem.location" placeholder="请输入地址"></el-input>
                            </el-form-item>
                        </template>

                        <!--天气预报-->
                        <template v-if="entryItem.type === 'weather'">
                            <el-form-item label="城市">
                                <el-input v-model="entryItem.city" placeholder="请输入地点"></el-input>
                            </el-form-item>

                            <el-form-item label="日期">
                                <el-date-picker
                                    v-model="entryItem.date"
                                    type="date"
                                    placeholder="选择日期"
                                    format="yyyy 年 MM 月 dd 日"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </template>

                        <!--文件列表-->
                        <template v-if="entryItem.type === 'file'">
                            <el-form-item label="文件列表" key="file">
                                <el-upload
                                    class="upload-demo"
                                    :action="UPLOAD_FILE"
                                    :data="{pid: mid}"
                                    :on-success="fileUploadSuccess"
                                    :on-remove="removeFile"
                                    multiple
                                    :file-list="entryItem.fileList">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                </el-upload>
                            </el-form-item>
                        </template>

                        <!--人员行程-->
                        <template v-if="entryItem.type === 'trip'">
                            <el-form-item label="文件列表" key="trip">
                                <el-upload
                                    class="upload-demo"
                                    :action="UPLOAD_TRIP"
                                    :data="{pid: mid}"
                                    :on-success="scheduleUploadSuccess"
                                    :on-remove="removeSchedule"
                                    :limit="1"
                                    :file-list="entryItem.scheduleFile">
                                    <el-button size="small" type="primary" v-if="entryItem.scheduleFile.length === 0">点击上传</el-button>
                                </el-upload>
                            </el-form-item>

                            <el-form-item label="">
                                <el-button type="primary" size="small" round :disabled="entryItem.scheduleFile.length === 0" @click="checkDetail">查看列表</el-button>
                            </el-form-item>
                        </template>

                        <!--会议签到-->
                        <template v-if="entryItem.type === 'sign'">

                        </template>

                    </el-form>
                </el-card>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                mid: this.$route.query.mid,

                entryOptions: [{
                    label: '基础类型',
                    options: [{
                        value: 'article',
                        label: '内部文章'
                    },{
                        value: 'link',
                        label: '外部链接'
                    }]
                }, {
                    label: '特殊类型',
                    options: [{
                        value: 'map',
                        label: '地图'
                    }, {
                        value: 'weather',
                        label: '天气预报'
                    }, {
                        value: 'file',
                        label: '文件'
                    }, {
                        value: 'trip',
                        label: '行程'
                    }, {
                        value: 'sign',
                        label: '签到'
                    }]
                }],

            }
        },

        created() {

        },

        mounted() {

        },

        methods: {
            /*轮播图控制*/
            addCarouselItem() {
                this.carouselArray.push({
                    imageUrl: '',
                    linkUrl: '',
                })
            },

            removeCarouselItem(index) {
                this.carouselArray.splice(index, 1);
            },

            handleAvatarSuccess(index, res, file) {
                this.carouselArray[index].imageUrl = res.Data.link;
            },
            /*轮播图控制结束*/

            /*选择入口链接类型*/
            changEntryType(value){

            },

            /*九宫格控制*/
            handleEntrySuccess( res, file){
                this.entryItem.icon = res.Data.link;
            },
            /*九宫格控制结束*/

            /*文件列表控制*/
            fileUploadSuccess(res, file, fileList){
                const {Data: {Filename, Filepath, Id}} = res;
                const fileName = Filename;
                this.entryItem.fileList = fileList.map(item => {
                    if(fileName.includes(item.name)){
                        item.name = fileName;
                        item.url = Filepath;
                        item.id = Id;
                    }
                    return item;
                });
            },

            removeFile(file, fileList){
                this.entryItem.fileList = this.entryItem.fileList.filter(item => {
                    return !item.name.includes(file.name);
                });
            },
            /*文件列表控制结束*/

            /*日程文件控制*/
            scheduleUploadSuccess(res, file, fileList){
                // const {Data: {Filename, Filepath, Id}} = res;

                if(!this.entryItem.scheduleFile){
                    this.entryItem.scheduleFile = [];
                }

                this.entryItem.scheduleFile = [{
                    name: file.name,
                  /*  url: Filepath,
                    id: Id,*/
                }];
            },

            removeSchedule(file, fileList) {
                this.$get(`HbfileDel?id=${this.entryItem.scheduleFile[0].id}`).then(res => {
                    if (res.Code === 200) {
                        this.$showMsgTip(`删除成功`);
                        this.entryItem.scheduleFile = [];
                    } else {
                        this.$showErrorTip(`删除失败`)
                    }
                });
            },
            /*日程文件控制结束*/

            checkDetail(){
                this.$router.push(`/main/trip/edit?mid=${this.mid}`);
            }
        },

        components: {},

        computed: {
            formType() {
                return this.$store.state.attribute.objectType;
            },

            carouselArray() {
                return this.$store.state.attribute.carouselArray;
            },

            entryItem(){
                return this.$store.state.attribute.entryArray[this.$store.state.attribute.entryIndex];
            },

            articleList(){
              return this.$store.state.attribute.articleList;
            }
        }
    }
</script>
