<!--
 * @Author: liyaning
 * @Date: 2024-04-28 20:41:50
 * @Description: 日期时间组件
-->
<template>
  <div :class="b()">
    <a-date-picker
      style="width:100%;"
      v-if="type==='date'"
      v-model="text"
      :size="size"
      :show-time="true"
      :allowClear="disabled ? false : allowClear"
      :valueFormat="valueFormat"
      :defaultValue="defaultValue"
      :defaultPickerValue="defaultPickerValue"
      :placeholder="placeholder"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
      :disabled="disabled"
    >
    </a-date-picker>
    <a-range-picker
      style="width:100%;"
      v-if="type==='range'"
      v-model="text"
      :size="size"
      :show-time="showTime"
      separator="~"
      :placeholder="[startPlaceholder,endPlaceholder]"
      :allowClear="disabled ? false : allowClear"
      :valueFormat="valueFormat"
      :defaultValue="defaultValue"
      :defaultPickerValue="defaultPickerValue"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
      :disabled="disabled"
    >
    </a-range-picker>
  </div>
</template>
<script>
import create from "../core/create";
import props from "../core/props.js";
import event from "../core/event.js";
export default create({
  name: "date",
  mixins: [props(), event()],
  data() {
    return {
      text: null,
    };
  },
  props: {
    default: {
      type: Boolean,
      default: false,
    },
    allowClear: {
      type: Boolean,
      default: true,
    },
    value: {},
    defaultValue:{
      default:null
    },
    defaultPickerValue:{
      default:null
    },
    showTime:{
      type:Object,
      default: { format: 'HH:mm:ss' },

    },
    startPlaceholder: {
      type: String,
      default() {
        return "开始日期";
      },
    },
    endPlaceholder: {
      type: String,
      default() {
        return "结束日期";
      },
    },
    defaultTime: {
      type: [Array, String],
    },
    pickerOptions: {
      type: Object,
      default: () => {},
    },
    type: {
      type: String,
      default: "date",
    },
    valueFormat: {
      type: String,
      default: "YYYY-MM-DD HH:mm:ss",
    },
    editable: {
      type: Boolean,
      default: true,
    },
  },
  methods: {},
});
</script>
<style scoped lang="scss"></style>
