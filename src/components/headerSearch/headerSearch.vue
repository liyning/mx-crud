<!--
 * @Author: liyaning
 * @Date: 2024-04-29 16:49:20
 * @Description: 
-->
<template>
  <div class="table-search">
    <a-form
      :class="b('search')"
      :form="searchForm"
      layout="inline"
      :labelAlign="config.labelAlign"
      @submit="searchChange"
    >
      <a-row :gutter="48">
        <template v-for="(column, index) in searchOption" >
            <a-col :md="6" :key="column.prop">
              <!-- 自定义列搜索 -->
              <template v-if="getType(column) == 'slot'">
                <a-form-item
                  :prop="column.prop"
                  :key="index"
                  :label="(column.labelAlias || column.label) + ' :'"
                >
                  <!-- 内容插槽 -->
                  <slot
                    :name="column.slot"
                    :column="column"
                    :form="searchForm"
                  ></slot>
                </a-form-item>
              </template>
              <a-form-item
                :key="index"
                :prop="column.prop"
                v-else
                :label="`${column.label}：`"
              >
                <component
                  v-model="searchForm[column.prop]"
                  :ref="column.prop"
                  :is="getSearchType(column.type)"
                  :allowClear="column.allowClear"
                  :defaultTime="
                    column.defaultTime || (column.more ? ['00:00:00', '23:59:59'] : '')
                  "
                  :disabled="column.disabled"
                  :filterable="column.searchFilterable"
                  :format="column.format"
                  :multiple="
                    config.multiple.includes(column.type) &&
                    vaildData(column.multiple, false)
                  "
                  :placeholder="column.placeholder || placeholderTxt(column)"
                  :prop="column.prop"
                  :size="config.size"
                  :type="getType(column)"
                  :value-format="column.valueFormat"
                  :typeformat="column.typeformat"
                  :dicData="column.dicData"
                  :pickerOptions="column.pickerOptions"
                  :showSearch="true"
                  :clear="column.clear"
                  :maxlength="column.maxlength || config.maxlength"
                ></component>
              </a-form-item>
            </a-col>
        </template>
        <span class="table-page-search-submitButtons" v-if="showSearchBtn">
          <a-button type="primary" @click="searchChange"><a-icon type="search" />查询</a-button>
          <a-button style="margin-left: 8px" @click="searchReset"><a-icon type="redo" />重置</a-button>
        </span>
      </a-row>

    </a-form>
  </div>
</template>
<script>
import config from "./config.js";
import { getSearchType, getType, deepClone,vaildData } from "./utils";
import { formInitVal } from "./core/dataformat";
import create from "./core/create";
export default create({
  name: "headerSearch",
  data() {
    return {
      vaildData,
      config,
      searchForm: {},
    };
  },
  props: {
    searchOption: {
      type: Array,
      default: () => [],
    },
    showSearchBtn:{
      type: Boolean,
      default: false,
    }
  },
  created() {
    this.init();
  },
  methods: {
    placeholderTxt(item) {
      let placeholder = `请输入${item.label}`;
      if(item.type === 'select'){
        placeholder = `请选择${item.label}`
      }
      if(item.type === 'range'){
        placeholder = ['开始日期','结束日期']
      }
      return placeholder;
    },
    // 初始化
    init() {
      this.getSearchType = getSearchType;
      this.getType = getType;
      this.dataformat();
    },
    // 搜索回调
    searchChange() {
      this.$emit("search-change", this.searchForm);
    },
    // 搜索清空
    searchReset() {
      this.dataformat();
      this.$emit("search-change", this.searchForm);
    },
    // 过滤searchForm默认
    dataformat() {
      this.searchForm = deepClone(formInitVal(this.searchOption).searchForm);
    },
  },
});
</script>
<style scoped>
 /* 数据列表 搜索条件 */
.table-search .ant-form-inline .ant-form-item{
  display: flex;
  margin-bottom: 20px;
  margin-right: 0;
}
/deep/ .ant-form-inline .ant-form-item > .ant-form-item-label{
  line-height: 32px;
  padding-right: 8px;
  width: auto;
}
/deep/ .ant-form-inline .ant-form-item > .ant-form-item-control-wrapper {
        flex: 1 1;
        display: inline-block;
        vertical-align: middle;
}
/deep/ .ant-form-inline .ant-form-item .ant-form-item-control {
        height: 32px;
        line-height: 32px;
}
.table-search .table-page-search-submitButtons {
    display: block;
    margin-bottom: 24px;
    white-space: nowrap;
  }
/* .table-search {
  .ant-form-inline {
    .ant-form-item {
      display: flex;
      margin-bottom: 20px;
      margin-right: 0;
      > .ant-form-item-label {
        line-height: 32px;
        padding-right: 8px;
        width: auto;
      }
      .ant-form-item-control-wrapper {
        flex: 1 1;
        display: inline-block;
        vertical-align: middle;
      }
      .ant-form-item-control {
        height: 32px;
        line-height: 32px;
      }
    }
  }

  .table-page-search-submitButtons {
    display: block;
    margin-bottom: 24px;
    white-space: nowrap;
  }
} */
</style>
