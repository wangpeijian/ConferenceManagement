<style scoped>
    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 20px;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .footer{
        padding: 80px 0;
        width: 100%;
        text-align: center;
    }

    .el-button{
        width: 200px;
    }
</style>

<template>
    <div>
        <div class="container">
            <articleList/>

            <structure />

            <attribute />
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
    import structure from '../../components/Structure';
    import attribute from '../../components/Attribute';
    import articleList from '../../components/Article';

    export default {
        data() {
            return {
                mid: this.$route.query.mid,

                dialogVisible: false,
            }
        },

        created() {
            console.log("当前会议id", this.mid)
        },

        mounted() {

        },

        methods: {
            submit(){
                console.log("保存的数据", this.mid, this.$store.state.attribute);
            }
        },

        components: {
            structure,
            attribute,
            articleList
        }
    }
</script>
