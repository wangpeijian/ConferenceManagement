export default {
    state: {
        objectType: '',     //entry  carousel

        entryArray: [],
        entryIndex: 0,

        carouselArray: [],

        articleList: [],


    },
    mutations: {
        initArticleList(state, {articleList}){
            state.articleList = articleList;
        },

        initCarouselArray(state, {carouselArray}){
            state.carouselArray = carouselArray;
        },

        initEntry(state, {entryArray}){
            state.entryArray = entryArray;
        },

        chooseCarousel(state, {}) {
            state.objectType = 'carousel';
        },

        chooseEntry(state, {entryIndex}) {
            state.objectType = 'entry';
            state.entryIndex = entryIndex;
        }
    },
    actions: {},
    getters: {}
}
