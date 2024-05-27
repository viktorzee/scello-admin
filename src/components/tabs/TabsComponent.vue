<template>
    <div
      id="table-tabination"
      class="
        pb-3
        relative
        border-b border-solid border-[#C6C2DE]
        flex
        justify-between
        items-center
        flex-col
        sm:flex-row
        gap-3
        sm:gap-0
      "
    >
      <ul class="flex order-1 sm:order-none">
        <li
          v-for="(tab, index) in tabs"
          :key="tab + index"
          class="
            px-2
            capitalize
            text-[#6E6893]
            font-medium
            text-sm
            cursor-pointer
          "
          :class="{ 'text-[#25213B]': tab == activeTab }"
          :ref="tab"
          @click="$emit('changeTab', tab)"
        >
          {{ tab }}
        </li>
        <li
          class="
            select-highlight
            absolute
            bottom-0
            bg-[#25213B]
            transition-transform
            hidden
            sm:list-item
          "
          :style="{ height: '2px', ...highlightClasses }"
        ></li>
      </ul>
  
      <p class="text-sm font-normal text-[#6E6893]">
        Total payable amount:
        <span class="text-lg font-bold text-scelloo-primary">{{
          formatter.format(getUnpaidTotal)
        }}</span>
        <span class="text-lg font-normal text-[#6E6893]">
          USD</span
        >
      </p>
    </div>
  </template>
  
  <script>
    import { mapGetters } from "vuex";
    import { formatter } from "../../utils/helpers";
    
    export default {
        name: "TabsComponent",
        props: ["tabs", "activeTab"],
        data() {
        return {
            mounted: false,
            formatter: formatter,
        };
        },
        computed: {
        highlightClasses() {
            if (this.mounted) {
            // Store active tab DOM element
            let activeTabElement = this.$refs[this.activeTab][0]; // $ref returns an array, so we are getting the 0 index of the returned array.
            let offsetLeft = activeTabElement.offsetLeft; // left position to be given to the highlighter;
            let offsetWidth = activeTabElement.offsetWidth; // width of the highlighter
            return {
                transform: `translate(${offsetLeft}px)`,
                width: offsetWidth + "px",
            };
            } else {
            return {};
            }
        },
        ...mapGetters(["getUnpaidTotal"]),
        },
        mounted() {
        this.mounted = true;
        },
    };
  </script>
  
  <style>
  </style>