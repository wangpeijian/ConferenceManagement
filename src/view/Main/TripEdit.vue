<style scoped>
    .page {
        overflow: auto;
        padding: 10px;
    }

    .trip-table {
        border-collapse: collapse;
        width: 2000px;
        font-size: 12px;
    }

    th, td {
        text-align: center;
        border: 1px solid #333;
        background: #ddd;
        color: #888;
    }

    th {
        width: 200px;
        cursor: pointer;
        user-select: none;
        font-size: 16px;
        line-height: 24px;
    }

    th.active {
        background: #fff;
        color: #333;
    }

    td.active {
        background: #fff;
        color: #333;
    }

    .submit-btn{
        width: 200px;
        margin-bottom: 10px;
    }
</style>

<template>
    <div class="page">

        <el-button class="submit-btn" type="primary" round @click="set">保存</el-button>

        <table class="trip-table">
            <thead>
            <tr>
                <th class="active" style="width: 70px">序号</th>
                <th v-for="(son, key) in selectColumn" :class="{active: selectColumn[key].select}" @click="selectItem(key)">{{selectColumn[key].name}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in tripData">
                <td class="active" style="width: 70px">{{index + 1}}</td>
                <td v-for="(son, key) in selectColumn" :class="{active: selectColumn[key].select}">{{item[key]}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                mid: this.$route.query.mid,
                tripData: [],
                selectColumn: {
                    Companyname: {name: '公司名称', select: true},
                    Username: {name: '姓名', select: true},
                    Trainclass: {name: '培训班级', select: true},
                    Group: {name: '分组', select: true},
                    Department: {name: '部门', select: true},
                    Station: {name: '岗位', select: true},
                    Phonenum: {name: '联系方式', select: true},
                    Sex: {name: '性别', select: true},
                    Roompairnum: {name: '房间配对标号', select: true},
                    Roomnum: {name: '住宿房间', select: true},
                    Staycontactperson: {name: '住宿联系人', select: true},
                    Cometime: {name: '来程时间', select: true},
                    Shuttlebatch: {name: '接送批次', select: true},
                    Comecontactpersion: {name: '来程联系人', select: true},
                    Backtime: {name: '回程时间', select: true},
                    Shuttlebatchback: {name: '接送批次', select: true},
                    Backcontactperson: {name: '回程联系人', select: true},
                },
            }
        },

        created() {
            this.init()
        },

        mounted() {

        },

        methods: {
            init() {
                this.$get(`TrainShowCol?pid=${this.mid}`).then(res => {
                    if (res.Data.length) {
                        this.selectColumn = JSON.parse(res.Data[0].Showcolname);
                    }
                });

                this.$get(`MeetingTripList?pid=${this.mid}&porn=`).then(res => {
                    if (res.Data) {
                        this.tripData = res.Data
                    }
                });
            },

            selectItem(item) {
                this.selectColumn[item].select = !this.selectColumn[item].select;
            },

            set() {
                this.$post(`SetTrainShowCol?pid=${this.mid}`, [{Showcolname: JSON.stringify(this.selectColumn)}]).then(res => {
                    if(res.Code === 200){
                        this.$showMsgTip(`保存成功`);
                    }else{
                        this.$showErrorTip(`保存失败`)
                    }
                })
            }
        },

        computed: {},

        components: {}
    }
</script>
