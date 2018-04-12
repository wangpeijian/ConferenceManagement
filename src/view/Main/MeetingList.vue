<style scoped>
    .container {
        display: flex;
        flex-direction: row;
        justify-content: left;
    }

    .navigation {
        width: 200px;
        background: #3e3f41;
    }

    .el-menu-vertical-demo {
        border: none;
    }

    .el-menu-item {
        border-bottom: 1px solid #afafaf;
    }

    .el-menu-item:last-child {
        border: none;
    }

    .el-menu-item:first-child {
        border-top: 1px solid #afafaf;
    }

    .main-section {
        width: 100%;
        padding: 20px;
        overflow: auto;
    }

    .select-block {
        height: 40px;
        display: flex;
        flex-direction: row;
        justify-content: left;
    }

    .search-input {
        width: 200px;
        margin-right: 40px;
    }

    .meetings-list {
        display: flex;
        flex-direction: row;
        justify-content: left;
        flex-wrap: wrap;
        padding-top: 20px;
        margin: 0 -20px 0 -20px;
    }

    .meeting-item {
        width: 200px;
        border: 1px solid #ccc;
        border-radius: 10px;
        overflow: hidden;
        height: 200px;
        margin: 0 20px 20px 20px;
        position: relative;
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .meeting-item:hover > .hover-content {
        top: 0;
    }

    .hover-content {
        border-radius: 10px;
        transition: .3s;
        position: absolute;
        height: 100%;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: row;
        justify-content: left;
        flex-wrap: wrap;
    }

    .hover-content > .btn-box {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .footer {
        padding: 30px 0;
        width: 100%;
        text-align: center;
    }

    .footer .el-button{
        width: 200px;
    }

    .add-input{
        width: 100%;
    }
</style>

<template>
    <div class="container">
        <nav class="navigation">
            <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                background-color="#3e3f41"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="1">
                    <i class="el-icon-menu"></i>
                    <span slot="title">会议手册</span>
                </el-menu-item>
            </el-menu>
        </nav>

        <section class="main-section">
            <div class="select-block">
                <el-input
                    class="search-input"
                    placeholder="请输入内容"
                    v-model="searchText"
                    clearable>
                </el-input>

                <el-button icon="el-icon-search" type="primary" circle @click="doSearch"></el-button>
            </div>

            <div class="meetings-list">

                <div class="meeting-item" v-for="item in meetingData" :key="item.Id">
                    {{item.Hbname}}

                    <div class="hover-content">
                        <div class="btn-box">
                            <el-tooltip class="item" effect="dark" content="发布" :enterable="false" placement="top">
                                <el-button icon="el-icon-upload" type="primary" circle
                                           @click="doRelease(item.Id)"></el-button>
                            </el-tooltip>
                        </div>

                        <div class="btn-box">
                            <el-tooltip class="item" effect="dark" content="预览" :enterable="false" placement="top">
                                <el-button icon="el-icon-view" type="success" circle
                                           @click="doPreview(item.Id)"></el-button>
                            </el-tooltip>
                        </div>

                        <div class="btn-box">
                            <el-tooltip class="item" effect="dark" content="编辑" :enterable="false" placement="top">
                                <el-button icon="el-icon-edit-outline" type="warning" circle
                                           @click="doEdit(item.Id)"></el-button>
                            </el-tooltip>
                        </div>

                        <div class="btn-box">
                            <el-tooltip class="item" effect="dark" content="删除" :enterable="false" placement="top">
                                <el-button icon="el-icon-delete" type="danger" circle
                                           @click="doDelete(item.Id)"></el-button>
                            </el-tooltip>
                        </div>
                    </div>
                </div>
            </div>

            <footer class="footer">
                <el-button type="success" @click="addDialogVisible = true">新增会议</el-button>
            </footer>
        </section>

        <!--发布提示框-->
        <el-dialog
            title="发布"
            :visible.sync="releaseDialogVisible"
            width="30%"
            >
            <span>访问地址:{{releaseId}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="releaseDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <!--新增提示框-->
        <el-dialog
            title="新增会议"
            :visible.sync="addDialogVisible"
            width="30%"
        >
            <el-input
                class="add-input"
                placeholder="请输入会议名称"
                v-model="meetingName"
                >
            </el-input>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="doAdd" :disabled="!meetingName">确 定</el-button>
            </span>
        </el-dialog>

        <!--预览提示框-->
        <preview :previewDialogVisible="previewDialogVisible" :url="previewUrl" @close="previewDialogVisible = false" />
    </div>
</template>

<script>
    import preview from '../../components/Preview'

    export default {
        data() {
            return {
                searchText: "",

                meetingData: [],

                releaseDialogVisible: false,
                releaseId: '',

                addDialogVisible: false,
                meetingName: '',

                previewDialogVisible: false,
                previewUrl: '',
            }
        },

        created() {
            this.doSearch();
        },

        mounted() {

        },

        methods: {
            doSearch() {
                this.$get(`HandBookList?param=${this.searchText}`).then(({Data}) => {
                    this.meetingData = Data;
                });
            },

            doRelease(id) {
                this.releaseDialogVisible = true;
                this.releaseId = id;
            },

            doPreview(id) {
                this.previewDialogVisible = true;
                this.previewUrl = id;
            },

            doEdit(id) {
                this.$router.push(`/main/meeting/edit?mid=${id}`)
            },

            doDelete(id) {
                this.$deleteConfirm(() => {
                    this.$get(`HandBookDel?id=${id}`).then(({Code, Data, Msg}) =>{
                        if(Code === 200){
                            this.$showMsgTip(`删除成功`);
                            this.doSearch();
                        }else {
                            this.$showErrorTip(`删除失败`)
                        }
                    })
                })
            },

            doAdd(){
                this.$post(`SaveHandBook`, {
                    Hbname: this.meetingName
                }).then(({Code, Msg, data}) => {
                    if(Code === 200){
                        this.addDialogVisible = false;
                        this.$showMsgTip(`创建成功`);
                        this.doSearch();
                        // this.$router.push(`/main/meeting/edit?mid=${data.id}`);
                    }else{
                        this.$showErrorTip(Msg);
                    }
                })
            },
        },

        components: {
            preview
        }
    }
</script>
