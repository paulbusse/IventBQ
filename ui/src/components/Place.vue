<template>
  <keep-alive>
    <div>
      <h1>Creëer een nieuwe plaats:</h1>
      <div>
        Naam:
        <input type="name"
               placeholder="Voer naam in"
               v-model="postdata.name"
               @input="inputName"/>
        <div class="errmsg_div">{{errmsg}}</div>
        <div class="button">
          <button type="submit" @click="create"  v-bind:disabled="bDisabled">Creëer</button>
        </div>
      </div>
    </div>
  </keep-alive>
</template>

<script>

export default {
  data() {
    return {
      errmsg: null,
      bDisabled: true,
      postdata: {
        name: '',
      },
    };
  },
  methods: {
    create() {
      this.axios.post('/Places', this.postdata)
        .then((res) => console.log(res.data))
        .catch((error) => console.log('ERROR', error));
    },
      
    inputName(input) {
      const v = input.target.value;
      if (v.length === 0) {
        this.errmsg = 'Verplicht veld';
      } else if (v.length > 20) {
        this.errmsg = 'Maximaal 20 tekens';
      } else {
        this.errmsg = null;
      }
      this.bDisabled = this.errmsg;
      console.log(this.errmsg);
      console.log(input.target.value);
    },
  },
};
</script>

<style scoped>
.button  {
    padding-top: 10px;
}
.errmsg_div {
  color: red;
  font-size: x-small;
  min-height: 13pt;
}
button {
    background: lightgray;
    padding: 2px 2px 2px 2px;
}
</style>
