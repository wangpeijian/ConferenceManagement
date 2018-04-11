<style scoped>
    .page{
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        padding-right: 20px;
        max-width: 600px;
        min-width: 250px;
        text-align: center;
    }

    .article-item{
        font-size: 14px;
        padding: 10px 0;
        color: #333;
    }

    .article-item:hover{
        color: #409EFF;
    }

    .btn-add{
        margin-top: 10px;
    }
</style>

<template>
    <div class="page">
        <h4>文章列表</h4>

        <!--基本属性-->
        <el-card class="box-card">
            <div  v-for="item in articleList" :key="item.id">
                <router-link :to="`/main/article/edit?mid=${mid}&aid=${item.id}`">
                    <div class="article-item">
                        {{item.title}}
                    </div>
                </router-link>
            </div>

            <router-link :to="`/main/article/edit?mid=${mid}`">
                <el-button class="btn-add" type="primary"  size="mini" icon="el-icon-plus" circle></el-button>
            </router-link>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                mid: this.$route.query.mid
            }
        },

        created() {
            const articleList = [{
                title: "测试文章1",
                id: "1"
            },{
                title: "测试文章2",
                id: "2"
            },{
                title: "测试文章3",
                id: "3"
            },{
                title: "测试文章4",
                id: "4"
            }];

            this.$store.commit("initArticleList", {
                articleList,
            })
        },

        mounted() {

        },

        methods: {

        },

        components: {},

        computed: {
            articleList() {
                return this.$store.state.attribute.articleList;
            },
        }
    }
</script>
