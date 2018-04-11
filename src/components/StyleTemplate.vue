<style scoped>
    .page {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        max-width: 600px;
        min-width: 250px;
        height: 500px;
        overflow: auto;
    }

    .template-item {
        padding: 10px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .item-body {
        font-size: 14px;
    }

    .insert-btn {
        color: #409EFF;
        cursor: pointer;
        text-decoration: underline;
        font-size: 14px;
    }
</style>

<template>
    <div class="page">

        <!--特殊样式组件-->
        <div class="template-item">
            <div class="item-body">
                <span style="display: inline-block;background: #eee; line-height: 100%;">
                    <span style="float: left; background: red; min-width: 20px;padding: 5px;">序号&nbsp;</span>
                    <span style="float: left; padding:5px 50px 5px 5px;">标题</span>
                </span>
            </div>

            <div class="insert-btn" @click="add">添加</div>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },

        created() {

        },

        mounted() {

        },

        methods: {
            add(e) {
                this.$emit("insertStyle", e.target.previousElementSibling.innerHTML)
            }
        },

        components: {}
    }
</script>
