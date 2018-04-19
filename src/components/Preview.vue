<style>
    .preview-component .el-dialog {
        background: transparent;
        border: none;
        box-shadow: none;
    }

    .preview-component .el-dialog__header {
        display: none;
    }
</style>

<style scoped>
    .iphone-box {
        height: 805px;
        width: 410px;
        margin: 0 auto;
        background-size: contain;
        background-repeat: no-repeat;
        position: relative;
    }

    .webview {
        position: absolute;
        top: 177px;
        left: 45px;
        width: 317px;
        height: 510px;
    }

    .navigation{
        position: absolute;
        top: 141px;
        width: 317px;
        left: 45px;
        height: 35px;
        background: #ff5073;
        text-align: center;
        color: #fff;
        line-height: 35px;
    }

    .back-btn{
        position: absolute;
        left: 10px;
        font-size: 24px;
        top: 5px;
        cursor: pointer;
    }
</style>

<template>
    <div class="preview-component">
        <el-dialog
            :visible.sync="preview"
            width="50%"
            :before-close="close"
        >
            <div class="iphone-box" :style="{backgroundImage: `url(${iphoneImage})`}">

                <nav class="navigation">
                    <i class="back-btn el-icon-arrow-left" @click="iframeGoBack"></i>

                    预览
                </nav>

                <iframe id="preview" v-if="preview" class="webview" :src="`http://mt.guoanfamily.com/meetWap/${url}`" scrolling="no"
                        frameborder="0" width="262px" height="424px"></iframe>
            </div>

        </el-dialog>
    </div>
</template>

<script>
    import iphoneImage from '../../static/Main/iphone.png';

    export default {

        props: {
            previewDialogVisible: {
                default: false,
            },

            url: {
                default: '',
            }
        },

        data() {
            return {
                iphoneImage: iphoneImage,
                preview: false,
            }
        },

        created() {

        },

        mounted() {

        },

        methods: {
            close(done) {
                this.$emit(`close`);
                done();
            },

            iframeGoBack(){
                if(!frames[0].location.hash.includes(this.url)){
                    history.go(-1);
                }
            }
        },

        watch: {
            previewDialogVisible() {
                this.preview = this.previewDialogVisible;
            }
        },

        computed: {},

        components: {},
    }
</script>
