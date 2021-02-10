<template>
  <div>

    <DataTable :value='items'>
      <template #title>Goederen toevoegen</template>
      <Column field='ids'></Column>
      <Column field='label'></Column>
      <Column field='quantity'></Column>
      <Column field='count'></Column>
    </DataTable>
      <!--div class='p-grid p-ai-start vertical-container'>
        <div class='p-col-2 header'>Nr.</div>
        <div class='p-col-5 header'>Omschrijving</div>
        <div class='p-col-3 header'>Kwantiteit</div>
        <div class='p-col-2 header'>Aantal</div>
      </!--div>
      <div class='p-grid'>
        <div class='p-col-2'>1</div>
        <div class='p-col-5'>Courgettesoep met ballekes in tomatensaus</div>
        <div class='p-col-3'>2p</div>
        <div class='p-col-2'>3</div>
      </div>
      <div class='p-grid'>
        <div class='p-col-2'>2</div>
        <div class='p-col-5'>Courgettesoep</div>
        <div class='p-col-3'>1p</div>
        <div class='p-col-2'>2</div>
      </div>
      <div v-for='(item, index) in items' v-bind:key='index' class='p-grid'>
        <div class='p-col-2'>{{ item.ids.join(', ') }}</div>
        <div class='p-col-5'>
          <InputText
            style='width: 100%'
            :class='{ "p-invalid": labelInvalid[index] }'
            type='text'
            v-model='item.label'
          />
        </div>
        <div class='p-col-3'>
          <InputText style='width: 100%' type='text' v-model='item.quantity' />
        </div>
        <div class='p-col-2 count'>
          <InputNumber
            showButtons
            buttonLayout='horizontal'
            incrementButtonIcon='pi pi-plus'
            decrementButtonIcon='pi pi-minus'
            decrementButtonClass='p-button-outlined'
            incrementButtonClass='p-button-outlined'
            :min='1'
            v-model='item.count'
          />
        </div>
      </div>
      <div class='p-grid p-ai-end vertical-container'>
        <div class='p-col-12'>A</div>
      </div>
      <div class='status' :class='{ error: this.errorstate }'>
        {{ message }}
      </div>""
    </template>
  </Card-->
  </div>
</template>

<script>
// import _ from 'lodash';
import { ref } from 'vue';

export default {
  computed: {
    message() {
      if (this.error.size) {
        return this.error.values().next().value;
      }
      return '';
    },
    errorstate() {
      return this.error.size !== 0;
    },
  },

  data() {
    return {
      error: new Map(),
      labelInvalid: [false, false],
    };
  },

  methods: {
    invalidLabel(index) {
      if (this.items[index].label.length === 0) {
        console.log('added', `LL0_${index}`);
        this.error.set(`LL0_${index}`, 'Omschrijving mag niet leeg zijn.');
      } else {
        console.log('deleted', `LL0_${index}`);
        this.error.delete(`LL0_${index}`);
      }
      console.log(this.error);
      return !this.items[index].label.length;
    },
  },

  watch: {
    items: {
      handler(cur, old) {
        console.log('CUR', cur);
        console.log('OLD', old);
      },
      deep: true,
    },
  },

  setup() {
    const items = ref([
      {
        ids: [3],
        label: 'Tomatensoep',
        quantity: '2p',
        count: 1,
      },
      {
        ids: [4, 5],
        label: 'Tomatensoep',
        quantity: '2p',
        count: 2,
      },
    ]);
    return {
      items,
    };
  },
};
</script>

<style lang='scss'>
.iic-view {
    box-sizing: border-box;
    border-bottom: 1px solid var(--text-color);
    font-weight: bold;
    text-align: center;

  .count {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .p-inputnumber {
    margin: auto;
  }

  .p-inputnumber-input {
    width: 3em;
    text-align: right;
  }

  .p-card-title {
    h1 {
      font-size: 1.5rem;
      text-align: left;
    }
  }

  .status {
    font-size: x-small;
  }

  .error {
    color: red;
  }
}
</style>
