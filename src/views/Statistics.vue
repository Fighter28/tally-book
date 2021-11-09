<template>
  <Layout>
    <Tabs class-prefix="types" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    <ol>
      <li v-for="(group,index) in result" :key="index">
        <h3 class="title">{{ group.title }}</h3>
        <ol>
          <li class="record" v-for="item in group.items" :key="item.id">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{item.notes}}</span>
            <span>¥{{ item.amount }} </span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<script lang="ts">
import Tabs from '@/components/Tabs.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import intervalList from '@/constants/intervalList';
import recordTypeList from '@/constants/recordTypeList';
import {RootState, Tag} from '@/custom';
import RecordItem from '@/recordLIst';


@Component({
  components: {Tabs}
})
export default class statistics extends Vue {
  tagString(tags: string[]) {
    return tags.length === 0 ? '无':tags.join(',');
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get result() {
    const {recordList} = this;
    type HashTableValue = { title: string, items: RecordItem[] }
    const hashTable: { [key: string]: HashTableValue } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createdAt!.split('T');
      hashTable[date] = hashTable[date] || {title: date, items: []};
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  type = '-';
  interval = 'day';
  intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>
<style scoped lang="scss">
::v-deep {
  .types-tabs-item {
    background: white;

    &.selected {
      background: #c4c4c4;

      &::after {
        display: none;
      }
    }
  }

  .interval-tabs-item {
    height: 48px;
  }
}

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  @extend %item
}

.record {
  background: white;
  @extend %item
}
.notes{
  margin-right: auto;
  margin-lefkt: 16px;
  color: #999;
}
</style>