<template>
    <div class="table-container pb-4 rounded-lg">
      <header id="table-header" class="mb-5 text-center sm:text-left">
        <h1
          class="text-[#6E6893] font-bold text-sm uppercase tracking-widest"
        >
          Table Heading
        </h1>
      </header>
      <tabs-component
        :tabs="tabsData.tabs"
        :activeTab="tabsData.activeTab"
        @changeTab="(tab) => (tabsData.activeTab = tab)"
      />
  
      <div
        class="w-full mt-5 rounded-lg bg-white overflow-scroll"
        style="box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2)"
      >
        <div class="min-w-[1100px] sm:min-w-0">
          <div
            class="border-b border-solid flex items-center justify-between px-5"
            style="border-color: #d9d5ec; height: 70px"
          >
            <div class="flex items-center">
              <filter-component
                @changeSort="(value) => updateSort(value)"
                @changeUsersFilter="(value) => updateUsersFilter(value)"
              />
  
              <div
                class="bg-[#F4F2FF] h-full rounded-md flex items center ml-5 border-solid border hover:border-solid hover:border hover:border-scelloo-primary focus-within:border-scelloo-primary box-border search-container-div"
                style="padding: 10px"
              >
                <img src="../../assets/svgs/search-icon.svg" alt="" />
                <input
                  type="search"
                  placeholder="Search Users by Name, Email or Date"
                  class="bg-none text-xs w-80 font-normal"
                  style="background-color: rgba(0, 0, 0, 0); margin-left: 10px"
                  id="search-input"
                  v-model="searchString"
                />
              </div>
            </div>
            <div
              class="bg-[rgba(109,91,208,1)] text-white flex items-center justify-center rounded-md text-base font-semibold leading-5 cursor-pointer"
              style="width: 99px; height: 40px"
              @click="payDues()"
            >
              PAY DUES
            </div>
          </div>
          <div class="table-el-container">
            <table class="w-full data-table">
              <tr
                class="bg-[#F4F2FF] border-b border-solid"
                style="border-bottom-color: #d9d5ec"
              >
                <td class="pl-5">
                  <check-box v-model="selectAll" />
                </td>
                <th
                  v-for="(heading, index) in headings"
                  :key="heading + index"
                  class="font-semibold tracking-wider uppercase text-xs text-[#6E6893] py-4 text-left"
                  :class="{ 'text-right': heading == 'Amount' }"
                >
                  {{ heading }}
                </th>
                <th></th>
                <th class="">
                  <img class="" src="../../assets/svgs/more-dot.svg" alt="" />
                </th>
              </tr>
  
              <table-value
                v-for="(user, index) in displayedData.data"
                :key="user.first_name + index"
                :user="user"
                :userDetail="userDetail"
                :entryMenu="entryMenu"
                @openDetail="(id) => (userDetail = id)"
                @openEntryMenu="(id) => (entryMenu = id)"
                @deselected="selectAll = false"
              />
            </table>
          </div>
  
          <div
            v-if="!queriedData.length"
            class="py-10 flex items-center justify-center font-semibold text-[#6E6893] tracking-wider"
          >
            NO USERS FOUND
          </div>
          <footer-component
            :firstDataIndex="displayedData.firstIndex"
            :lastDataIndex="displayedData.lastIndex"
            :dataLength="displayedData.length"
            @rowsperpage="(rows) => (rowsPerPage = rows)"
          >
            <!-- Buttons Are Provided by DataTable through slots to keep the logic in a single component -->
  
            <template #previousButton>
              <!-- Previous page button  -->
              <button
                @click="page = previousPage"
                :disabled="!previousPage"
                class="transition-all rotate-180 p-1"
                :class="{ 'hover:rotate-90': !previousPage }"
              >
                <img src="../../assets/svgs/caret.svg" alt="" />
              </button>
            </template>
  
            <template #nextButton>
              <!-- Next page button -->
              <button
                class="ml-14 transition-all p-1"
                :class="{ 'hover:rotate-90': !nextPage }"
                @click="page = nextPage"
                :disabled="!nextPage"
              >
                <img src="../../assets/svgs/caret.svg" alt="" />
              </button>
            </template>
          </footer-component>
        </div>
      </div>
    </div>
  </template>
  
<script lang="">
    import { mapState } from "vuex";
    import TabsComponent from "../tabs/TabsComponent.vue";
    import TableValue from "../table/partials/TableValue.vue";
    import CheckBox from "../UI/Checkbox.vue";
    import { createQueryCallback } from "../../utils/helpers";
    import FilterComponent from "../table/partials/FilterComponent.vue";
    import FooterComponent from "../table/partials/FooterComponent.vue";
    
    export default {
        components: {
        TabsComponent,
        TableValue,
        CheckBox,
        FilterComponent,
        FooterComponent,
        },
        provide() {
        // functions to create reactive provides
        return {
            getFilterSort: () => this.sort,
            getFilterUsers: () => this.filterUsers,
            getSelectAll: () => this.selectAll,
            getOpenDetailMenu: () => this.openDetailMenu,
            getDuesPaid: () => this.duesPaid,
        };
        },
        data() {
        return {
            selectAll: false,
            headings: ["Name", "User Status", "Payment Status", "Amount"],
            tabsData: {
            tabs: ["all", "paid", "unpaid", "overdue"],
            activeTab: "all",
            },
            sort: {
            label: "Sort By",
            options: [
                "Default",
                "First Name",
                "Last Name",
                "Email",
                "Due Date",
                "Last Login",
            ],
            value: "Default",
            },
            filterUsers: {
            label: "Users",
            options: ["All", "Active", "Inactive"],
            value: "All",
            },
            searchString: "",
            page: 1,
            rowsPerPage: 10,
            userDetail: 1,
            entryMenu: null,
            duesPaid: 0,
        };
        },
        methods: {
        resetPage() {
            this.page = 1;
            this.userDetail = null;
            this.selectAll = false;
        },
        updateSort(value) {
            this.sort.value = value;
        },
        updateUsersFilter(value) {
            this.filterUsers.value = value;
        },
        payDues() {
            this.duesPaid += this.selectedUsers.size;
            this.$store.dispatch("paySelectedDues");
            this.selectAll = false;
        },
        },
        computed: {
        ...mapState(["users", "selectedUsers"]),
        queriedData() {
            let querySearch = this.searchString;
            let queryFilter =
            this.filterUsers.value == "All"
                ? null
                : this.filterUsers.value == "Active";
            let tab = this.tabsData.activeTab;
            let queryCallback = createQueryCallback(querySearch, queryFilter, tab);
            this.resetPage();
            return this.$store.getters.getQueriedData(queryCallback, this.sort.value);
        },
        displayedData() {
            // Displayed Data returns an object with a data property, first and last index property
            const pageNumber = this.page;
            const rows = this.rowsPerPage;
            const firstDataIndex = (pageNumber - 1) * rows;
            const lastDataIndex = pageNumber * rows;
            const displayedSlice = this.queriedData.slice(
            firstDataIndex,
            lastDataIndex
            );
            return {
            data: displayedSlice,
            firstIndex: firstDataIndex,
            lastIndex: lastDataIndex,
            length: this.queriedData.length,
            };
        },
        previousPage() {
            const previousPage = this.page - 1;
            const firstPage = 1;
            return previousPage >= firstPage ? previousPage : undefined;
        },
        nextPage() {
            const nextPage = this.page + 1;
            const rows = this.rowsPerPage;
            const maxPage = Math.ceil(this.queriedData.length / rows);
            return nextPage <= maxPage ? nextPage : undefined;
        },
        },
        watch: {
        displayedData() {
            this.selectAll = false;
        },
        },
        mounted() {},
    };
</script>
  
  <style scoped>
  .table-container {
    user-select: none;
  }
  #search-input:focus-within {
    outline: none;
  }
  
  #search-input::placeholder {
    @apply text-[#6E6893];
  }
  
  .search-container-div {
    border-color: rgba(0, 0, 0, 0);
    transition: border-color 0.2s;
  }
  
  @media (max-width: 1024px) and (min-width: 640px) {
    .table-el-container {
      overflow: scroll;
    }
    .data-table {
      min-width: 1100px;
    }
  }
  </style>