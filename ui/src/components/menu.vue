<template>
  <ul class=ivt-menu-container>
    <div class="p-component" v-for="item in items" :key="item.key">
      <li v-if="item.to">
        <router-link class="ivt_menu_item" :to="item.to">
          <div class="ivt_menu_item">{{item.label}}</div>
        </router-link>
      </li>
      <li v-if="item.submenu" class='ivt-submenu'>{{item.label}}
        <ivt-menu :items="item.submenu" class='ivt-submenu-items'/>
      </li>
    </div>
  </ul>
</template>

<script>

export default {
  name: 'ivt-menu',
  props: {
    items: Array,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.ivt-menu-container {
  list-style-type: none;
  padding-left: 10px;
  margin-top: 15px;

  a {
    color: var(--text-color);
  }

  .ivt-submenu {
    font-weight: bold;
    padding-bottom: 0;
  }

  .ivt-submenu-items {
    margin-top: 10px;
    border-left: 1px solid gray
  }

  .ivt_menu_item {
    text-decoration: none;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .ivt_menu_item:hover {
    text-decoration: underline solid var(--primary-color);
    text-decoration-thickness: 2px;
  }

  .router-link-active {
    color: var(--primary-color);
  }
}
</style>
