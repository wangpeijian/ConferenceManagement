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
                                    :action="UPLOAD_IMAGE"
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
                                    :action="UPLOAD_IMAGE"
                                    :on-success="scheduleUploadSuccess"
                                    :on-remove="removeSchedule"
                                    :limit="1"
                                    :file-list="entryItem.scheduleFile">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                </el-upload>
                            </el-form-item>
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
                    }]
                }],

                // articleList: [],
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
                this.carouselArray[index].imageUrl = this.concatFileUrl(res.data.fileNameList[0]);
            },
            /*轮播图控制结束*/

            /*选择入口链接类型*/
            changEntryType(value){
                switch (value){
                    case "article":
                        break;
                    case "link":
                        break;
                    case "map":
                        break;
                    case "weather":
                        break;
                    case "file":
                        break;
                    case "trip":
                        break;
                }
            },

            /*九宫格控制*/
            handleEntrySuccess( res, file){
                this.entryItem.icon = this.concatFileUrl(res.data.fileNameList[0]);
            },
            /*九宫格控制结束*/

            /*文件列表控制*/
            fileUploadSuccess(res, file, fileList){
                const fileName = res.data.fileNameList[0];
                this.entryItem.fileList = fileList.map(item => {
                    if(fileName.includes(item.name)){
                        item.name = fileName;
                        item.url = this.concatFileUrl(fileName);
                    }
                    return item;
                });

                console.log("上传后：",this.entryItem.fileList)
            },

            removeFile(file, fileList){
                this.entryItem.fileList = this.entryItem.fileList.filter(item => {
                    return !item.name.includes(file.name);
                });

                console.log("删除后：",this.entryItem.fileList)
            },
            /*文件列表控制结束*/

            /*日程文件控制*/
            scheduleUploadSuccess(res, file, fileList){
                const fileName = res.data.fileNameList[0];

                if(!this.entryItem.scheduleFile){
                    this.entryItem.scheduleFile = [];
                }

                this.entryItem.scheduleFile = [{
                    name: fileName,
                    url: this.concatFileUrl(fileName),
                }];
            },

            removeSchedule(file, fileList){
                this.entryItem.scheduleFile = [];
            },
            /*日程文件控制结束*/
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
