<!--
 * @Author: liyaning
 * @Date: 2022-09-04 16:49:20
 * @Description: 
-->
<template>
  <div class="table-search" ref="tableSearch">
    <a-form
      :class="b('search')"
      :model="searchForm"
      layout="inline"
      :labelAlign="config.align"
      ref="searchForm"
      @submit="searchChange"
    >
      <a-row :gutter="48">
        <template v-for="(column, index) in $parent.searchOption">
            <a-col :md="6" :key="column.prop">
              <!-- 自定义列搜索 -->
              <template v-if="column.searchslot">
                <a-form-item
                  :prop="column.prop"
                  :key="index"
                  :label="(column.labelAlias || column.label) + ' :'"
                >
                  <!-- 内容插槽 -->
                  <slot
                    :name="column.prop + 'Search'"
                    :column="column"
                    :form="searchForm"
                  ></slot>
                </a-form-item>
              </template>
              <a-form-item
                :key="index"
                :prop="column.prop"
                v-else
                :label="(column.labelAlias || column.label) + ' :'"
              >
                <component
                  v-model="searchForm[column.prop]"
                  :ref="column.prop"
                  :is="getSearchType(column.type)"
                  :clearable="column.searchClearable"
                  :defaultTime="
                    column.searchDefaultTime || (column.more ? ['00:00:00', '23:59:59'] : '')
                  "
                  :disabled="column.searchDisabled"
                  :dic="$parent.DIC[column.prop]"
                  :filterable="column.searchFilterable"
                  :editable="column.editable"
                  :format="column.format"
                  :multiple="
                    config.searchMultiple.includes(column.type) &&
                    vaildData(column.searchMmultiple, false)
                  "
                  :placeholder="column.searchPlaceholder || ''"
                  :prop="column.prop"
                  :props="column.props || $parent.tableOption.props"
                  :size="$parent.controlSize"
                  :type="getType(column)"
                  :value-format="column.valueFormat"
                  :tpyeformat="column.tpyeformat"
                  :dicData="column.dicData"
                  :pickerOptions="column.pickerOptions"
                  :isSearch="true"
                  :clear="column.clear"
                  :maxlength="column.maxlength"
                ></component>
              </a-form-item>
            </a-col>
        </template>
        <a-col :md="8" :sm="24">
          <span class="table-page-search-submitButtons" :style="{ float: 'right', overflow: 'hidden' } || {} ">
            <a-button type="primary" @click="searchChange"><a-icon type="search" />查询</a-button>
            <a-button style="margin-left: 8px" @click="searchReset"><a-icon type="redo" />重置</a-button>
          </span>
        </a-col>
      </a-row>

    </a-form>
  </div>
</template>
<script>
import config from "./config.js";
import { getSearchType, getType } from "../../utils";
import { formInitVal } from "../../core/dataformat";
import create from "../../core/create";
export default create({
  name: "crud",
  data() {
    return {
      config,
      searchForm: {},
    };
  },
  created() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      this.getSearchType = getSearchType;
      this.getType = getType;
      this.dataformat();
    },
    // 搜索回调
    searchChange() {
      this.$parent.$emit("search-change", this.searchForm);
    },
    // 搜索清空
    searchReset() {
      this.$refs["searchForm"].resetFields();
      this.$parent.$emit("search-reset");
    },
    // 过滤searchForm默认
    dataformat() {
      this.searchForm = this.deepClone(formInitVal(this.$parent.searchOption).searchForm);
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
