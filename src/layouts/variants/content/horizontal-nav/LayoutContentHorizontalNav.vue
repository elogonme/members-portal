<template>
  <layout-content-horizontal-nav :nav-menu-items="navMenuItems">
    <!-- Default Slot -->
    <slot></slot>

    <!-- Navbar -->
    <template #navbar>
      <div
        class="navbar-content-container"
        :class="{'expanded-search': shallShowFullSearch}"
      >
        <!-- Left Content: Search -->
        <div class="d-flex align-center">
          <v-app-bar-nav-icon
            v-if="$vuetify.breakpoint.mdAndDown"
          ></v-app-bar-nav-icon>
          <router-link
            to="/"
            class="d-flex align-center text-decoration-none"
          >
            <v-img
              :src="appLogo"
              max-height="50px"
              max-width="50px"
              alt="logo"
              contain
              class="me-3"
            ></v-img>
            <h2 class="app-title text--primary">
              {{ appName }}
            </h2>
          </router-link>
        </div>

        <!-- Right Content: I18n, Light/Dark, Notification & User Dropdown -->
        <div class="d-flex align-center">
          <div v-show="$vuetify.breakpoint.mdAndUp">
            <v-icon>
              {{ icons.mdiMapMarker }}
            </v-icon>
            <a class="nav-bar-link mx-2">Find Us</a>
            <span class="mx-2">
              Customer Service
            </span>
            <v-icon>
              {{ icons.mdiPhone }}
            </v-icon>
            <a class="nav-bar-link mx-2">1-800-461-4361</a>
          </div>
          <app-bar-search
            :shall-show-full-search.sync="shallShowFullSearch"
            :data="appBarSearchData"
            :filter="searchFilterFunc"
            :search-query.sync="appBarSearchQuery"
            class="me-4"
          ></app-bar-search>
          <app-bar-i18n></app-bar-i18n>
          <app-bar-theme-switcher class="mx-4"></app-bar-theme-switcher>
          <app-bar-notification></app-bar-notification>
          <app-bar-user-menu class="ms-2"></app-bar-user-menu>
        </div>
      </div>
      <v-overlay
        :value="$store.state.app.shallContentShowOverlay"
        z-index="5"
        absolute
        class="system-bar-overlay"
      ></v-overlay>
    </template>

    <!-- Slot: footer -->
    <template #footer>
      <div class="d-flex justify-space-between">
        <span>COPYRIGHT &copy; {{ new Date().getFullYear() }} <a
          href="https://www.pbas.ca/"
          class="text-decoration-none"
        >The PBAS Group</a>, All rights Reserved</span>
        <div class="d-flex align-center">
          <span>Hand-crafted &amp; Made with</span>
          <v-icon
            color="error"
            class="ms-2"
          >
            {{ icons.mdiHeartOutline }}
          </v-icon>
        </div>
      </div>
    </template>

    <!-- App Content -->
    <!-- <template #v-app-content>
      <app-customizer class="d-none d-md-block"></app-customizer>
    </template> -->
  </layout-content-horizontal-nav>
</template>

<script>
import LayoutContentHorizontalNav from '@core/layouts/variants/content/horizontal-nav/LayoutContentHorizontalNav.vue'
import AppCustomizer from '@core/layouts/components/app-customizer/AppCustomizer.vue'
import navMenuItems from '@/navigation/horizontal'

// App Bar Components
import AppBarSearch from '@core/layouts/components/app-bar/AppBarSearch.vue'
import AppBarI18n from '@core/layouts/components/app-bar/AppBarI18n.vue'
import AppBarThemeSwitcher from '@core/layouts/components/app-bar/AppBarThemeSwitcher.vue'
import AppBarUserMenu from '@core/layouts/components/app-bar/AppBarUserMenu.vue'
import AppBarNotification from '@core/layouts/components/app-bar/AppBarNotification.vue'

// Search Data
import appBarSearchData from '@/assets/app-bar-search-data'

import { ref, watch } from '@vue/composition-api'

import themeConfig from '@themeConfig'
import { mdiHeartOutline, mdiPhone, mdiMapMarker } from '@mdi/js'

export default {
  components: {
    LayoutContentHorizontalNav,
    AppCustomizer,

    // App Bar Components
    AppBarSearch,
    AppBarI18n,
    AppBarThemeSwitcher,
    AppBarUserMenu,
    AppBarNotification,
  },
  setup() {
    // Search
    const appBarSearchQuery = ref('')
    const shallShowFullSearch = ref(false)
    const maxItemsInGroup = 5
    const totalItemsInGroup = ref({
      pages: 0,
      files: 0,
      contacts: 0,
    })
    watch(appBarSearchQuery, () => {
      totalItemsInGroup.value = {
        pages: 0,
        files: 0,
        contacts: 0,
      }
    })

    const searchFilterFunc = (item, queryText, itemText) => {
      if (item.header || item.divider) return true

      const itemGroup = (() => {
        if (item.to !== undefined) return 'pages'
        if (item.size !== undefined) return 'files'
        if (item.email !== undefined) return 'contacts'

        return null
      })()

      const isMatched = itemText.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1

      if (isMatched) {
        if (itemGroup === 'pages') totalItemsInGroup.value.pages += 1
        else if (itemGroup === 'files') totalItemsInGroup.value.files += 1
        else if (itemGroup === 'contacts') totalItemsInGroup.value.contacts += 1
      }

      return appBarSearchQuery.value && isMatched && totalItemsInGroup.value[itemGroup] <= maxItemsInGroup
    }

    return {
      navMenuItems,

      // Search
      appBarSearchQuery,
      shallShowFullSearch,
      appBarSearchData,
      searchFilterFunc,

      // App Config
      appName: themeConfig.app.name,
      appLogo: themeConfig.app.logo,

      // Icons
      icons: {
        mdiHeartOutline,
        mdiPhone,
        mdiMapMarker,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.app-title {
  font-size: 1.25rem;
  font-weight: 600;
}

.navbar-content-container {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  position: relative;
}
</style>
