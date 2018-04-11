<style scoped>
    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 20px;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .tab-aside {
        flex-grow: 1;
        padding-right: 20px;
    }

    .article-item {
        padding: 5px 0;
        text-align: left;
        font-size: 14px;
        color: #333;
        position: relative;
    }

    .insert-btn {
        color: #409EFF;
        display: none;
        position: absolute;
        right: 10px;
        cursor: pointer;
        text-decoration: underline;
    }

    .article-item:hover .insert-btn {
        display: inline-block;
    }

    .footer {
        padding: 30px 0;
        width: 100%;
        text-align: center;
    }

    .el-button{
        width: 200px;
    }
</style>

<style>
    a[href="https://www.froala.com/wysiwyg-editor?k=u"] {
        display: none !important;
    }
</style>

<template>
    <div>
        <div class="container">
            <div class="tab-aside">
                <el-tabs v-model="activeName" class="tab-aside">
                    <el-tab-pane label="特殊样式" name="style">
                        <styleTemplate @insertStyle="insertStyle"/>
                    </el-tab-pane>
                    <el-tab-pane label="插入文章" name="article">
                        <div v-for="item in articleList" :key="item.id" class="article-item">
                            {{item.title}}

                            <span class="insert-btn" @click="insertArticle(item.id, item.title)">插入链接</span>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>

            <!-- <section id="editor" class="editor-box"></section>-->
            <froala class="editor-box" v-if="config" :tag="'textarea'" :config="config" v-model="model"></froala>
        </div>

        <footer class="footer">
            <el-button type="success" @click="dialogVisible = true">预览</el-button>
            <el-button type="primary" @click="submit">保存</el-button>
            <el-button type="info" @click="()=>{this.$router.back()}">返回</el-button>
        </footer>

        <el-dialog
            title=""
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>这是一段信息</span>
        </el-dialog>
    </div>
</template>

<script>
    import styleTemplate from '../../components/StyleTemplate';

    import VueFroala from 'vue-froala-wysiwyg';

    export default {
        data() {
            const UPLOAD_IMAGE = this.UPLOAD_IMAGE;

            return {
                aid: this.$route.query.aid,

                activeName: 'style',

                articleList: [{
                    title: "测试文章1",
                    id: "1"
                }, {
                    title: "测试文章2",
                    id: "2"
                }, {
                    title: "测试文章3",
                    id: "3"
                }, {
                    title: "测试文章4",
                    id: "4"
                }],

                $editor: null,

                config: {
                    placeholder: "",
                    language: "zh_cn",
                    heightMin: 480,
                    widthMin: 800,
                    height: 480,
                    width: 800,
                    direction: 'ltr',
                    toolbarButtons: ['fullscreen', '|', 'insertLink', 'insertImage', 'insertTable', '|',
                        'quote', 'insertHR', 'subscript', 'superscript', 'undo', 'redo', '|', 'bold', 'italic',
                        'underline', 'strikeThrough', '|', 'fontFamily', '|', 'fontSize', '|', 'color', 'emoticons',
                        'inlineStyle', '|', 'paragraphFormat', '|', 'paragraphStyle', 'align', 'formatOL', 'formatUL',
                        'outdent', 'indent', 'clearFormatting', 'insertimg'],
                    allowedImageTypes: ["jpeg", "jpg", "png", "gif"],
                    imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif'],
                    // imageUploadURL: UPLOAD_IMAGE,
                    events: {
                        'froalaEditor.initialized': (e, editor) => {
                            this.$editor = editor;
                            // editor.html.insert(`<a href="#/main/">文章</a>`, true)
                        },
                    }
                },

                model: null,

                dialogVisible: false,
            }
        },

        created() {
            console.log("当前文章id", this.aid)
        },

        mounted() {

        },

        methods: {
            submit() {
                console.log("当前文章id", this.model)
            },

            insertArticle(id, title) {
                this.insertHTML(`<a href="#/article?id=${id}">${title}</a>`);
            },

            insertStyle(content) {
                this.insertHTML(content);
            },

            insertHTML(html) {
                this.$editor.html.insert(html, true)
            }

        },

        components: {
            styleTemplate,
        }
    }
</script>
