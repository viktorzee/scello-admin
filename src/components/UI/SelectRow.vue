<template>
    <div class="custom-select relative">
      <label
        class="
          text-xs text-[#6E6893]
          flex
          cursor-pointer
          font-semibold
          tracking-wider
        "
        @click="displayOptions = !displayOptions"
        ><span
          >{{ rowSelectData.label }}:
          <span class="text-xs text-[#6E6893]">{{
            selectedOption
          }}</span></span
        >
        <img
          src="../../assets/svgs/row-select-icon.svg"
          alt=""
          class="transition-transform"
          :class="{ 'rotate-180': displayOptions }"
          style="margin-left: 11px"
        />
      </label>
  
      <ul
        :name="rowSelectData.name"
        :id="rowSelectData.name"
        class="
          bg-white
          rounded-md
          absolute
          w-full
          bottom-5
          right-0
          border-solid border border-[#C6C2DE]
          shadow-lg
        "
        style="padding: 5px"
        v-show="displayOptions"
      >
        <li
          :value="option"
          v-for="option in rowSelectData.options"
          :key="option + rowSelectData.name"
          class="
            cursor-pointer
            rounded-md
            hover:bg-[rgba(242,240,249,1)]
            text-xs
          "
          style="padding: 5px"
          @click="selectedOption = option"
        >
          {{ option }}
        </li>
      </ul>
    </div>
</template>
  
<script>
  export default {
    name: "SelectRow",
    props: ["rowSelectData"],
    emits: ["rowsperpage"],
    data() {
      return {
        selectedOption: this.rowSelectData.options[0],
        displayOptions: false,
      };
    },
    watch: {
      selectedOption() {
        this.displayOptions = false;
        this.$emit("rowsperpage", this.selectedOption);
      },
    },
  };
</script>
  
  <style scoped>
  </style>