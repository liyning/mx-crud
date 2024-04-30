<template>
  <div class="about">
    <!-- 搜索组件 -->
    <HeaderSearch v-model="searchForm" ref="headerSearch">
      <template
        v-for="item in searchOption"
        slot-scope="{ column }"
        :slot="item.prop + 'Search'"
      >
        <!-- 搜索 自定义slot -->
        <slot v-if="item.searchslot" :column="column" :name="item.prop + 'Search'"></slot>
      </template>
    </HeaderSearch>
  </div>
</template>
<script type="text/javascript">
import HeaderSearch from "../components/headerSearch/headerSearch";
export default{
  name: "AboutView",
  components: { HeaderSearch },
  computed: {
    // 返回所有的配置项  包括children里面的配置
    propOption() {
      let result = [];
      const ctx = this;
      // 递归查找所有的属性配置
      function findProp(list) {
        list.forEach((ele) => {
          if (ele.prop) {
            result.push(ele);
          }
          if (ele.children) {
            ctx.isChild = true;
            findProp(ele.children);
          }
        });
      }
      findProp(this.columnOption);
      return result;
    },
  },
  data() {
    return {
      searchForm: {}, // 搜索表单
      searchOption: [], // 搜索的配置
    };
  },

  created() {
  },
  methods: {
    // 搜索
    searchChange() {
      this.$refs.headerSearch.searchChange();
    },
    // 重置搜索条件
    searchReset() {
      this.$refs.headerSearch.searchReset();
    },
  },
}
</script>
