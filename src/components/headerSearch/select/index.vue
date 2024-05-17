<!--
 * @Author: liyaning
 * @Date: 2024-04-16 17:40:18
 * @Description: Select
-->
<template>
  <div :class="b()">
    <a-select
      style="width: 100%"
      v-model="text"
      :size="size"
      :multiple="multiple"
      :mode="multiple?'multiple':'default'"
      :allowClear="disabled ? false : clearable"
      :placeholder="placeholder"
      :maxTagCount="limit"
      :disabled="disabled"
      @focus="handleFocus"
      @blur="handleBlur"
      @select="handleClick"
      @change="handleChange"
    >
      <a-select-option
        v-for="(item, index) in dicData"
        :key="index"
        :disabled="item[disabledKey]"
        :value="item[valueKey]"
      >
      {{ getLabelText(item) }}
      </a-select-option>
    </a-select>
  </div>
</template>
<script>
import create from "../core/create";
import props from "../core/props.js";
import event from "../core/event.js";
export default create({
  name: "select",
  mixins: [props(), event()],
  props: {
    value: [Object, Array, Number, String],
    //  下拉分组数据子集的key，分组时必传
    groupChildren: {
      type: String,
      default: "",
    },
    remote: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: Boolean,
      default: true,
    },
    allowCreate: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
      default: 99,
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    multipleAll: {
      type: Boolean,
      default: false,
    },
    dicData: {
      type: Array,
    },
  },
  computed: {
    valueKey() {

      console.log('this.dicData', this.dicData)
      console.log('this.props.value', this.props.value)
      return this.props.value;
    },
  },
  data() {
    return {
    };
  },
  mounted(){
  },
  methods: {},
});
</script>
<style scoped lang="scss"></style>
