<template>
  <div class="ivt_menu_container">
      <div class="p-component" v-for="item in items" :key="item.label">
        <router-link class="ivt_menu_item" :to="item.to">
          <div class="ivt_menu_item">
            {{item.label}}
          </div>
        </router-link>
      </div>
  </div>
</template>

<script>

export default {
  props: {
    items: Array,
  },
  data() {
    return {};
  },
};
</script>

<style>
.ivt_menu_item {
  padding-top: 15px;
  color: var(--text-color);
  text-decoration: none!important;
}
</style>
