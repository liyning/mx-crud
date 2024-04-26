<!--
 * @Author: liyaning
 * @Date: 2024-04-16 20:41:50
 * @Description: 日期时间组件
-->
<template>
  <div :class="b()">
    <a-date-picker
      style="width:100%;"
      v-if="type==='date'"
      v-model="text"
      :size="size"
      :format="format"
      :clearable="disabled ? false : clearable"
      :valueFormat="valueFormat"
      :defaultValue="defaultValue?defaultValue:null"
      :defaultPickerValue="defaultPickerValue?defaultPickerValue:null"
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
      separator="至"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      :format="format"
      :clearable="disabled ? false : clearable"
      :valueFormat="valueFormat"
      :defaultValue="defaultValue?defaultValue:null"
      :defaultPickerValue="defaultPickerValue?defaultPickerValue:null"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
      :disabled="disabled"
    >
    </a-range-picker>
  </div>
</template>
<script>
import create from "../../core/create";
import props from "../../core/props.js";
import event from "../../core/event.js";
export default create({
  name: "date",
  mixins: [props(), event()],
  data() {
    return {
      text: "",
    };
  },
  props: {
    default: {
      type: Boolean,
      default: false,
    },
    value: {},
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
      default: "yyyy-MM-dd HH:mm:ss",
    },
    format: {},
    editable: {
      type: Boolean,
      default: true,
    },
  },
  methods: {},
});
</script>
<style scoped lang="scss"></style>
