<template>
    <transition>
      <tr>
        <td colspan="7" class="p-0">
          <table class="w-full bg-[#F4F2FF]">
            <tr
              class="bg-[rgba(242,240,249,1)] border-b border-solid"
              style="border-bottom-color: #d9d5ec"
            >
              <th
                v-for="(heading, index) in headings"
                :key="heading + index + userId"
                class="
                  text-xs
                  font-semibold
                  text-[#6E6893]
                  uppercase
                  py-4
                  tracking-wider
                "
              >
                <h5 class="flex" :class="{ 'pl-24': index == 0 }">
                  <span class="flex" :class="{ relative: heading == 'detail' }">
                    {{ heading }}
                    <img
                      v-if="heading == 'detail'"
                      src="../../../assets/svgs/info-icon.svg"
                      alt=""
                      class="ml-1"
                      :class="{ 'detail-heading-hover': heading == 'detail' }"
                    />
                    <tool-tip v-if="heading == 'detail'" className="tool-tip" />
                  </span>
                </h5>
              </th>
            </tr>
            <tr
              v-for="(deet, index) in userDeets"
              :key="deet + index"
              class="detail-row border-b border-solid last:border-b-0 select-text"
              style="border-color: #d9d5ec"
            >
              <td
                class="
                  pl-24
                  py-3
                  text-sm
                  tracking-wider
                  text-[#6E6893]
                  font-normal
                  w-52
                "
              >
                12/02/2020
              </td>
              <td
                class="
                  first:pl-24
                  py-3
                  text-sm text-[#25213B]
                  font-normal
                  leading-4
                "
                style="width: 300px"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Ultricies.
              </td>
              <td
                class="
                  pr-20
                  text-sm text-[#25213B]
                  font-normal
                  leading-4
                "
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus,
                sed purus eu semper morbi id nunc, adipiscing vitae. Ultricies
                suspendisse vestibulum.
              </td>
            </tr>
          </table>
          <div
            v-if="!userDeets.length"
            class="
              py-10
              flex
              items-center
              justify-center
              font-semibold
              text-[#6E6893]
              tracking-wider
              bg-[#F4F2FF]
            "
          >
            NO RECORDS FOUND
          </div>
        </td>
      </tr>
    </transition>
  </template>
  
  <script>
  import ToolTip from "../../UI/Tooltip.vue";
  
  export default {
    name: "EntryDetails",
    props: ["userId", "userEntryDetail"],
    components: {
      ToolTip,
    },
    data() {
      return {
        headings: ["date", "user activity", "detail"],
      };
    },
    computed: {
      userDeets() {
        let deets = [];
        for (let i = 0; i < this.userEntryDetail; i++) {
          deets.push(i);
        }
        return deets;
      },
    },
  };
  </script>
  
  <style scoped>
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.1s ease;
  }
  
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
  
  .v-enter-from {
    height: 0;
  }
  
  .v-leave-to {
    height: auto;
  }
  
  :global(.detail-heading-hover:hover + .tool-tip) {
    display: block;
  }
  
  :global(.detail-heading-hover + .tool-tip) {
    display: none;
  }
  </style>