<template>
  <div class="col-sm-12 col-md-4">
    <div class="card card-info mb-3">
      <div class="card-header p-3">
        <h3 class="card-title">
          {{stock.name}}
          <small>(Price: {{stock.price}} | Quantity: {{stock.quantity}})</small>
        </h3>
      </div>

      <div class="card-body">
        <div class="pull-left pb-3">
          <input
            type="Number"
            :class="{danger: insufficientQuantity}"
            class="form-control"
            placeholder="quantity"
            v-model="quantity"
          />
        </div>

        <div class="pull-right">
          <button
            class="btn btn-info"
            @click="sellStock"
            :disabled="insufficientQuantity || quantity<=0 "
          >{{insufficientQuantity ? 'Not enough Stocks': 'Sell'}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["stock"],
  data() {
    return {
      quantity: Number
    };
  },
  computed: {
    insufficientQuantity() {
      return this.quantity > this.stock.quantity;
    }
  },
  methods: {
    ...mapActions({
      placeSellOrder: "sellStock"
    }),
    sellStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity
      };
      this.placeSellOrder(order);
      this.quantity = 0;
    }
  }
};
</script>

<style scoped>
.danger {
  border: 1px solid red;
}
</style>