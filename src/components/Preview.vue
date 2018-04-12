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
        height: 667px;
        width: 375px;
        margin: 0 auto;
        background-size: contain;
        background-repeat: no-repeat;
        position: relative;
    }

    .webview {
        position: absolute;
        top: 145px;
        left: 38px;
        width: 262px;
        height: 424px;
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
                <iframe class="webview" :src="url" frameborder="0"></iframe>
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
