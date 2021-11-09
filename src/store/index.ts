import Vue from 'vue';
import Vuex from 'vuex';
import RecordItem from '@/recordLIst';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';
import {RootState} from '@/custom';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        recordList: [],
        tagList: [],
        currentTag: undefined
    } as RootState,
    mutations: {
        updateTag(state, payload: { id: string, name: string }) {
            const {id, name} = payload;
            const idList = state.tagList.map(item => item.id);
            if (idList.indexOf(id) >= 0) {
                const names = state.tagList.map(item => item.name);
                if (names.indexOf(name) >= 0) {
                    window.alert('标签名重复');
                } else {
                    const tag = state.tagList.filter(item => item.id === id)[0];
                    tag.name = name;
                    store.commit('saveTags');
                }
            }
        },
        removeTag(state, id: string) {
            let index = -1;
            for (let i = 0; i < state.tagList.length; i++) {
                if (state.tagList[i].id === id) {
                    index = i;
                }
                break;
            }
            if (index >= 0) {
                state.tagList.splice(index, 1);
                store.commit('saveTags');
                router.back();
            } else {
                window.alert('删除失败');
            }
        },
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
            record2.createdAt = new Date().toISOString();
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