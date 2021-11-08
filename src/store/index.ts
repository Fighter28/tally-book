import Vue from 'vue';
import Vuex from 'vuex';
import RecordItem from '@/recordLIst';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex);
type RootState = {
    recordList: RecordItem[],
    tagList: Tag[],
    currentTag?: Tag
}
const store = new Vuex.Store({
    state: {
        recordList: [],
        tagList: [],
        currentTag: undefined
    } as RootState,
    mutations: {
        setCurrentTag(state, id: string) {
            state.currentTag = state.tagList.filter(t => t.id === id)[0];
        },
        fetchRecords(state) {
            state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];

        },
        createTag(state, name: string) {
            const names = state.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                window.alert('标签重复了');
                return 'duplicated';
            }
            const id = createId().toString();
            state.tagList.push({id, name: name});
            store.commit('saveTags');
            window.alert('添加成功');
            return 'success';
        },
        saveRecords(state) {
            window.localStorage.setItem('recordList',
                JSON.stringify(state.recordList));
        },
        createRecord(state, record) {
            const record2: RecordItem = clone(record);
            record2.createdAt = new Date();
            state.recordList.push(record2);
            store.commit('saveRecords');
        },
        fetchTags(state) {
            return state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
        },
        saveTags(state) {
            window.localStorage.setItem('tagList',
                JSON.stringify(state.tagList));
        }
    },


});
store.commit('increment', 0);
export default store;