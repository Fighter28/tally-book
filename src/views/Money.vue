<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <div class="notes">
      <FormItem field-name="备注" @update:value="onUpdateNotes" placeholder="在这里输入备注"/>
    </div>
    <Tags/>
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import RecordItem from '@/recordLIst';


@Component({
  components: {Tags, FormItem, Types, NumberPad},
})
export default class money extends Vue {
  get recordList() {
    return this.$store.state.recordList;

  }

  record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  created() {
    this.$store.commit('fetchRecords');
  }

  saveRecord() {
    this.$store.commit('createRecord', this.record);
  }

}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notes {
  padding: 12px 0;
}
</style>
