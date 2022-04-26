<template>
  <v-btn
    plain
    rounded
  >
    <router-link
      to="/"
      class="d-flex align-center text-decoration-none"
    >
      <v-img
        :src="$vuetify.theme.dark ? imageDark : imageLight"
        max-height="50px"
        max-width="50px"
        alt="logo"
        contain
        class="me-3"
      ></v-img>
    </router-link>
  </v-btn>
</template>

<script>
export default {
  components: {},
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { imageLight, imageDark, linkTo } = props.item

    return { imageLight, imageDark, linkTo }
  },
}
</script>

<style>
</style>
