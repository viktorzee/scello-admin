<template>
  <main class="container mx-auto pt-14 2xl:p-10">
    <data-table />
  </main>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import DataTable from "./components/table/DataTable.vue";

export default {
  name: "App",

  components: {
    DataTable,
  },

  data: () => ({
    //
  }),

  mounted() {
    this.$store.dispatch("fetchAndStoreUsers");
  },
};
</script>

<style>
#app {
  @apply bg-[rgba(242,240,249,1)] w-screen leading-4;
  min-height: 100vh;
}
</style>