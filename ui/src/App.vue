<template>
   <div id="app">
      <h1>INVENTORY BY QR</h1>
      <TabMenu :model="items"/>
      <div style='height:10pt'/>
      <router-view/>
      <Toast position='bottom-left'/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      items: [
        { label: 'Plaatsen', to: '/places' },
        { label: 'Items', to: '/item' },
      ],
    };
  },
};
</script>

<style>
.app-container {
  text-align: center;
}

h1 {
  text-align: center;
}

body {
  background-color: var(--surface-a);
  color: var(--text-color);
}
</style>
