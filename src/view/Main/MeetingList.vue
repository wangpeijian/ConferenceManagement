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

                <div class="meeting-item" v-for="item in meetingData" :key="item.id">
                    {{item.name}}

                    <div class="hover-content">
                        <div class="btn-box">
                            <el-tooltip class="item" effect="dark" content="发布" :enterable="false" placement="top">
                                <el-button icon="el-icon-upload" type="primary" circle
                                           @click="doRelease(item.id)"></el-button>
                            </el-tooltip>
                        </div>

                        <div class="btn-box">
                            <el-tooltip class="item" effect="dark" content="预览" :enterable="false" placement="top">
                                <el-button icon="el-icon-view" type="success" circle
                                           @click="doPreview(item.id)"></el-button>
                            </el-tooltip>
                        </div>

                        <div class="btn-box">
                            <el-tooltip class="item" effect="dark" content="编辑" :enterable="false" placement="top">
                                <el-button icon="el-icon-edit-outline" type="warning" circle
                                           @click="doEdit(item.id)"></el-button>
                            </el-tooltip>
                        </div>

                        <div class="btn-box">
                            <el-tooltip class="item" effect="dark" content="删除" :enterable="false" placement="top">
                                <el-button icon="el-icon-delete" type="danger" circle
                                           @click="doDelete(item.id)"></el-button>
                            </el-tooltip>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                searchText: "",

                meetingData: [{
                    id: "1",
                    name: '1',
                }, {
                    id: "2",
                    name: '2',
                }, {
                    id: "3",
                    name: '3',
                }, {
                    id: "4",
                    name: '4',
                }, {
                    id: "5",
                    name: '5',
                }, {
                    id: "6",
                    name: '6',
                }, {
                    id: "7",
                    name: '7',
                }]
            }
        },

        created() {

        },

        mounted() {

        },

        methods: {
            doSearch() {
                console.log(`搜索关键字：`, this.searchText);
            },

            doRelease(id) {

            },

            doPreview(id) {

            },

            doEdit(id) {
                this.$router.push(`/main/meeting/edit?mid=${id}`)
            },

            doDelete(id) {
                this.deleteConfirm(()=>{
                    console.log(`删除：`, id);
                })
            },
        },

        components: {}
    }
</script>
