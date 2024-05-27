<template>
    <transition>
      <ul
        v-show="menuOpen"
        class="
          absolute
          bg-white
          rounded-md
          shadow-lg
          right-4
          z-50
          top-1
          border-solid border
        "
        style="width: 154px; padding: 5px"
      >
        <span class="absolute -top-3 -right-3">
          <slot name="close"></slot>
        </span>
        <li
          v-for="option in options"
          :key="option.name + option.class"
          class="
            hover:bg-[rgba(242,240,249,1)]
            cursor-pointer
            rounded
            font-normal
            text-sm text-[#25213B]
          "
          :class="option.class"
          style="padding: 5px"
        >
          {{ option.name }}
        </li>
  
        <hr style="margin-top: 5px; margin-bottom: 5px" />
        <li
          class="
            text-[#D30000]
            hover:bg-[rgba(242,240,249,1)]
            cursor-pointer
            rounded
            font-normal
            text-sm
          "
          style="padding: 5px"
        >
          Delete
        </li>
      </ul>
    </transition>
  </template>
  
  <script>
  export default {
    name: "DetailMenu",
    props: ["menuOpen"],
    data() {
      return {
        options: [
          {
            name: "Edit",
            class: "",
          },
          {
            name: "View Profile",
            class: "",
          },
          {
            name: "Activate User",
            class: "success",
          },
        ],
      };
    },
  };
  </script>
  
<style scoped>
    .success {
        @apply text-[#007F00];
    }
    
    .v-enter-active,
    .v-leave-active {
        transition: opacity 0.1s ease;
    }
    
    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }
</style>