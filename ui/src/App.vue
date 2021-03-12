<template>
  <div id="app">
    <div class="i-app-header">
      <h1>INVENTORY BY QR</h1>
      <Button icon="pi pi-bars"
        @click="onMenuButtonClick"
        class="p-button-text p-button-outline i-app-menu-button"/>
    </div>
    <div class="i-app-menu">
      <ivt-menu :items="items"/>
    </div>
    <div class="i-app-content-mask"/>
    <div class="i-app-content">
      <router-view/>
    </div>
    <Toast position='bottom-left'/>
  </div>
</template>

<script>
import event from './utils/event';
import IvtMenu from './components/menu';

export default {
  components: {
    'ivt-menu': IvtMenu,
  },

  data() {
    return {
      messages: [],
      items: [
        {
          label: 'Goederen',
          key: 'Items',
          submenu: [
            { label: 'Overzicht', key: 'ItemView', to: '/itemview' },
            { label: 'Aanmaken', key: 'ItemAdd', to: '/itemadd' },
          ],
        },
        {
          label: 'Plaatsen',
          key: 'Plaatsen',
          submenu: [
            { label: 'Overzicht', key: 'PlaceView', to: '/places' },
            { label: 'Aanmaken', key: 'PlaceAdd', to: '/placeadd' },
          ],
        },
      ],
      menuLeft: null,
      maskVisible: false,
    };
  },

  methods: {
    closeMenu() {
      document.querySelector('.i-app-menu').style.left = this.menuLeft;
      document.querySelector('.i-app-content-mask').style.visibility = 'hidden';
      this.maskVisible = false;
    },

    OnContentMaskClick() {
      this.closeMenu();
    },

    onMenuButtonClick() {
      if (this.maskVisible) this.closeMenu();
      else this.openMenu();
    },

    openMenu() {
      document.querySelector('.i-app-menu').style.left = 0;
      document.querySelector('.i-app-content-mask').style.visibility = 'visible';
      this.maskVisible = true;
    },
  },

  mounted() {
    const el = document.querySelector('.i-app-menu');
    const style = getComputedStyle(el);
    if (style.left !== '0px') this.menuLeft = `-${style.width}`;

    event.on('toast', (e) => { this.$toast.add(e); });
  },

  watch: {
    $route() {
      this.closeMenu();
    },
  },
};
</script>

<style lang="scss">
$menuwidth: 150px;
$headerheight: 100px;

.i-app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid white;
  height: $headerheight;

  h1 {
    text-align: center;
  }
}

.i-app-menu-button {
  top: -20px;
  left: 2px;
  visibility: hidden;
}

.i-app-menu {
  z-index: 1000;
  position: fixed;
  width: $menuwidth;
  height: 100%;
  left: 0;
  top: $headerheight;
  border-right:  1px solid white;
  background-color: var(--surface-a);
}

.i-app-content {
  z-index: 900;
  position: fixed;
  left: $menuwidth;
  top: $headerheight;
  padding: 10px;
  width: calc(100% - #{$menuwidth});
  height: 100%;
  background-color: var(--surface-a);
}

.i-app-content-mask {
  z-index: 901;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: $menuwidth;
  top: $headerheight;
  padding: 10px;
  width: 100%;
  height: 100%;
  visibility: hidden;
}

#app {
  position: fixed;
  top: 0 !important;
  left: 0;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

html {
  height: 100%;
}

body {
  position: fixed;
  background-color: var(--surface-a);
  color: var(--text-color);
  margin: 0;
  top: 0;
  left: 0;
  height: 100%;
  font-family: var(--font-family);
  font-weight: normal;
}

@media screen and (max-width: 800px) {
  .i-app-menu {
    left: -$menuwidth;
    border: none;
  }

  .i-app-content {
    width: 100%;
    left: 0;
  }

  .i-app-menu-button {
    visibility: visible;
  }
}

</style>
