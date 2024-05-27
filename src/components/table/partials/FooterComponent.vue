<template>
  <!-- Buttons will be provided by parent to improve event listener flexibility and handle logic in a single component -->
  <div
    style="height: 45px"
    class="
      w-full
      bg-[#F4F2FF]
      rounded-b-lg
      flex
      items-center
      justify-end
      px-5
    "
  >
    <select-row
      @rowsperpage="(rows) => $emit('rowsperpage', rows)"
      :rowSelectData="rowSelectData"
    />
    <p
      class="
        text-xs
        tracking-wider
        text-[#6E6893]
        font-semibold
      "
      style="margin-right: 50px; margin-left: 50px"
    >
      {{ firstDataIndex + 1 }}-{{
        lastDataIndex < dataLength ? lastDataIndex : dataLength
      }}
      of {{ dataLength }}
    </p>

    <div>
      <slot name="previousButton"> </slot>
      <slot name="nextButton"> </slot>
    </div>
  </div>
</template>

<script>
import SelectRow from "../../UI/SelectRow.vue";

export default {
  name: "FooterComponent",
  props: ["firstDataIndex", "lastDataIndex", "dataLength"],
  components: {
    SelectRow,
  },
  data() {
    return {
      rowSelectData: {
        label: "Rows per page",
        options: [10, 15, 20, 25],
        name: "rowsperpage",
      },
    };
  },
};
</script>

<style>
</style>