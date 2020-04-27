<template>
  <div class="row d-flex mt-3 col-12">
    <app-stock v-for="stock in stocks" :stock="stock"></app-stock>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Stock from "./Stock.vue";
export default {
  computed: {
    ...mapGetters({ stocks: "stockPortfolio" })
  },
  components: {
    appStock: Stock
  }
};
</script>

<style>
</style>