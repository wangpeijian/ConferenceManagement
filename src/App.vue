<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {

        data() {
            return {
                isLogin: this.getSession(this.KEYS.USER_INFO) !== null,
                isHideMenu: false,
            }
        },

        created() {
            // this.$router.replace("/login");
        },

        mounted() {


        },

        methods: {},

    }
</script>

<style>
    * {
        box-sizing: border-box !important;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        height: 100%;
    }

    body, html {
        height: 100%;
        padding: 0;
        margin: 0;
        font-family: 'Times New Roman', serif;
    }

    p {
        margin: 0;
        padding: 0;
    }

    a {
        text-decoration: none;
        -webkit-touch-callout: none;
    }

    /*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
    ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
        background-color: rgba(245, 245, 245, 0);
        border-radius: 5px;
    }

    /*定义滚动条的轨道，内阴影及圆角*/
    ::-webkit-scrollbar-track {
        /*-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);*/
        border-radius: 5px;
        background-color: rgba(245, 245, 245, 0);
    }

    /*定义滑块，内阴影及圆角*/
    ::-webkit-scrollbar-thumb {
        /*width: 10px;*/
        height: 5px;
        border-radius: 5px;
        /*-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);*/
        background-color: hsla(225, 4%, 58%, 0.33);
    }
</style>
