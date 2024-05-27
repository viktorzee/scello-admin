<template>
    <tr
      class="bg-white pr-7 transition-colors table-entry"
      :class="{ 'bg-[#F4F2FF]': user.id == userDetail }"
    >
      <td class="pl-5">
        <div class="flex items-center">
          <check-box v-model="userSelected" />
          <button
            class="ml-5 cursor-pointer"
            @click="
              () =>
                userDetail == user.id
                  ? $emit('openDetail', null)
                  : $emit('openDetail', user.id)
            "
          >
            <img
              src="../../../assets/svgs/master.svg"
              alt=""
              :class="{ 'rotate-180': user.id == userDetail }"
              class="transition-transform"
            />
          </button>
        </div>
      </td>
      <td class="flex flex-col select-text" style="gap: 5px">
        <span class="font-medium text-[#25213B] text-sm">{{
          `${user.first_name} ${user.last_name}`
        }}</span>
        <span class="text-[#6E6893] font-normal text-sm">{{
          user.email
        }}</span>
      </td>
      <td>
        <div class="flex flex-wrap">
          <span
            class="rounded-xl text-xs font-medium"
            :style="{
              color: user.is_active ? '#4A4AFF' : '#6E6893',
              backgroundColor: user.is_active ? '#E6E6F2' : '#F2F0F9',
              padding: '2px 5px',
            }"
            ><span style="font-size: 16px">•</span>
            {{ user.is_active ? "Active" : "Inactive" }}</span
          >
          <span
            class="w-full text-xs text-[#6E6893] font-medium select-text leading-3"
            style="margin-top: 5px"
            >{{ `Last login: ${user.last_seen}` }}</span
          >
        </div>
      </td>
      <td>
        <div class="flex flex-wrap">
          <span
            class="rounded-xl text-xs font-medium capitalize"
            style="padding: 2px 5px"
            :style="paymentStatusStyles"
            ><span style="font-size: 16px">•</span> {{ user.payment_status }}</span
          >
          <span
            class="w-full text-xs text-[#25213B] font-medium select-text"
            style="margin-top: 5px"
            >{{ `${paidStatusText}: ${user.payment_date}` }}</span
          >
        </div>
      </td>
      <td class="select-text">
        <div class="flex flex-wrap text-right font-normal">
          <span class="text-sm w-full text-[#25213B]"
            >${{ user.amount }}</span
          >
          <span
            class="w-full text-[#6E6893] text-xs tracking-wider mt-1"
            >USD</span
          >
        </div>
      </td>
  
      <td>
        <div class="flex items-center justify-center">
          <span
            class="text-xs text-[#6E6893] text-center cursor-pointer hover:bg-[rgba(242,240,249,1)] font-normal rounded"
            style="padding: 5px"
            @click="
              () =>
                userDetail == user.id
                  ? $emit('openDetail', null)
                  : $emit('openDetail', user.id)
            "
            >View {{ user.id == userDetail ? "Less" : "More" }}</span
          >
        </div>
      </td>
  
      <td>
        <div class="relative">
          <button
            class="cursor-pointer"
            @click="
              entryMenu == user.id
                ? $emit('openEntryMenu', null)
                : $emit('openEntryMenu', user.id)
            "
          >
            <img src="../../../assets/svgs/more-dot.svg" alt="" />
          </button>
          <detail-menu :menuOpen="entryMenu == user.id">
            <template #close>
              <button
                class="aspect-square rounded-full border border-solid bg-white"
                style="padding: 6.5px"
                @click="$emit('openEntryMenu', null)"
              >
                <img src="../../../assets/svgs/close.svg" alt="" />
              </button>
            </template>
          </detail-menu>
        </div>
      </td>
    </tr>
    <entry-details
      v-show="user.id == userDetail"
      :userId="user.id"
      :userEntryDetail="user.userDetails"
    />
  </template>
  
  <script>
  import { mapState } from "vuex";
  import CheckBox from "../../UI/Checkbox.vue";
  import EntryDetails from "../partials/EntryDetails.vue";
  import DetailMenu from "../partials/DetailMenu.vue";
  
  export default {
    name: "TableValue",
    components: { CheckBox, EntryDetails, DetailMenu },
    props: ["user", "userDetail", "entryMenu"],
    emits: ["openDetail", "openEntryMenu", "deselected"],
    inject: ["getSelectAll", "getDuesPaid"],
    data() {
      return {
        userSelected: false,
        mounted: false,
      };
    },
    mounted() {
      if (this.selectedUsers.has(this.user.id)) {
        this.userSelected = true;
      }
    },
    watch: {
      selectAll(value) {
        // Change userSelected to true when the heading checkbox is checked
        if (value) {
          this.userSelected = true;
        }
      },
      userSelected(value, formerValue) {
        if ((formerValue, !value)) {
          this.$emit("deselected", false);
        }
        if (value && !this.selectedUsers.has(this.user.id)) {
          // If user is selected
          this.$store.commit("addUser", this.user);
        } else if (
          // Checks to avoid unnecessary $Store commit
          !value &&
          formerValue &&
          this.selectedUsers.has(this.user.id)
        ) {
          // If user is deselected (after being selected);
          this.$store.commit("removeUser", this.user);
        }
      },
      duesPaid(value, oldValue) {
        // Watch duesPaid to see if all selected dues have been paid, reset userSelected
        if (value != oldValue) {
          this.userSelected = false;
        }
      },
    },
    computed: {
      ...mapState(["selectedUsers"]),
      selectAll() {
        // Select All Checkbox from DataTable Heading Column
        return this.getSelectAll();
      },
      duesPaid() {
        return this.getDuesPaid();
      },
      paidStatusText() {
        let text = "";
        switch (this.user.payment_status) {
          case "paid":
            text = "Paid on";
            break;
          case "unpaid":
            text = "Dues on";
            break;
          case "overdue":
            text = "Dued on";
        }
        return text;
      },
      paymentStatusStyles() {
        // Styles for the statuses
        let styleObject;
        switch (this.user.payment_status) {
          case "paid":
            styleObject = {
              color: "#007F00",
              backgroundColor: "#CDFFCD",
            };
            break;
          case "unpaid":
            styleObject = {
              color: "#965E00",
              backgroundColor: "#FFECCC",
            };
            break;
          case "overdue":
            styleObject = {
              color: "#D30000",
              backgroundColor: "#FFE0E0",
            };
            break;
        }
        return styleObject;
      },
    },
  };
  </script>
  
  <style scoped>
  tr:first-child {
  }
  
  td {
    @apply py-3;
  }
  
  tr {
    @apply border-b border-solid;
    border-bottom-color: #d9d5ec;
  }
  </style>