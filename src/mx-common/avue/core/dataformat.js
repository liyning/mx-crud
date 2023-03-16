import { validatenull } from '../utils';
import { COMPONENTNAME } from './constant';
/**
 * 计算级联属性
 */
export const calcCascader = (list = []) => {
  list.forEach((ele, index) => {
    if (ele.cascaderItem) {
      // 拷贝 cascaderItem
      const cascader = [...ele.cascaderItem];
      let parentProp = ele.prop;
      list[index].cascader = [...cascader];
      cascader.forEach((citem, cindex) => {
        const columnIndex = index + cindex + 1;
        list[columnIndex].parentProp = parentProp;
        list[columnIndex].cascaderChange = ele.cascaderChange;
        list[columnIndex].cascader = [...cascader].splice(cindex + 1);
        parentProp = list[columnIndex].prop;
      });
    }
  });
  return list;
};

/**
 * 计算空白列row
 */
let count = 0;
export const calcCount = (ele, spanDefault = 12, init = false) => {
  if (init) count = 0;
  const spanAll = 24;
  count = count + (ele.span || spanDefault) + (ele.offset || 0);
  if (count === spanAll) {
    count = 0;
  } else if (count > spanAll) {
    count = 0 + (ele.span || spanDefault) + (ele.offset || 0);
  } else if (ele.row && count !== spanAll) {
    ele.count = spanAll - count;
    count = 0;
  }
  return ele;
};
/**
* 日期控件集合
*/
export const dateList = [
  'dates',
  'date',
  'datetime',
  'datetimerange',
  'daterange',
  'week',
  'month',
  'dategrpup',
  'year'
];
/**
 * 初始化数据格式
 * value变化时调用
 * 当特殊组件的value变化时，格式化为期望的 string[]、number[]
 */
export const initVal = ({ type, multiple, dataType, value }) => {
  if (
    (['select', 'tree'].includes(type) && multiple) ||
    ['checkbox', 'cascader', 'dynamic', 'upload'].includes(type)
  ) {
    if (Array.isArray(value)) return value;
    else if (!validatenull(value)) {
      const list = (value || '').split(',') || [];
      if (dataType === 'number') {
        return list.map(ele => Number(ele));
      } else {
        return list;
      }
    } else {
      return [];
    }
  }
  return value;
};

/**
 * 行编辑框获取动态组件
 */
export const getCellType = type => {
  // 原avue组件
  let result = 'input';
  if (['select', 'radio', 'checkbox'].includes(type)) {
    result = 'select';
  } else if (['time', 'timerange'].includes(type)) {
    result = 'time';
  } else if (dateList.includes(type)) {
    result = 'date';
  } else if (['cascader'].includes(type)) {
    result = 'cascader';
  } else if (['number'].includes(type)) {
    result = 'input-number';
  } else if (['switch'].includes(type)) {
    result = 'switch';
  } else if (type === 'network') {
    result = 'network';
  } else if (type === 'dimension') {
    result = 'dimension';
  }
  return COMPONENTNAME + result;
};

/**
 * 动态获取组件
 */
export const getComponent = (type, component) => {
  // 原avue组件
  let result = 'input';
  if (!validatenull(component)) {
    result = component;
  } else if (type === 'select') {
    result = 'select';
  } else if (type === 'radio') {
    result = 'radio';
  } else if (type === 'checkbox') {
    result = 'checkbox';
  } else if (['time', 'timerange'].includes(type)) {
    result = 'time';
  } else if (
    [
      'dates',
      'date',
      'datetime',
      'datetimerange',
      'daterange',
      'week',
      'month',
      'dategrpup',
      'year'
    ].includes(type)
  ) {
    result = 'date';
  } else if (type === 'cascader') {
    result = 'cascader';
  } else if (type === 'number') {
    result = 'input-number';
  } else if (type === 'password') {
    result = 'input';
  } else if (type === 'switch') {
    result = 'switch';
  } else if (type === 'rate') {
    result = 'rate';
  } else if (type === 'upload') {
    result = 'upload';
  } else if (type === 'silder') {
    result = 'silder';
  } else if (type === 'dynamic') {
    result = 'dynamic';
  } else if (type === 'icon-select') {
    result = 'icon-select';
  } else if (type === 'color') {
    result = 'color';
  } else if (type === 'network') {
    result = 'network';
  } else if (type === 'dimension') {
    result = 'dimension';
  }
  return COMPONENTNAME + result;
};

/**
 * 表格初始化值
 */

export const formInitVal = (list = []) => {
  const tableForm = {};
  const searchForm = {};
  list.forEach(ele => {
    if (
      ele.type === 'checkbox' ||
      ele.type === 'cascader' ||
      ele.type === 'dynamic' ||
      ele.type === 'dates' ||
      (ele.type === 'upload' && ele.listType !== 'picture-img') ||
      ele.multiple ||
      ele.range ||
      ele.dataType === 'array'
    ) {
      tableForm[ele.prop] = [];
      if (ele.search) searchForm[ele.prop] = [];
    } else if (
      ['number', 'rate', 'silder'].includes(ele.type) ||
      ele.dataType === 'number'
    ) {
      tableForm[ele.prop] = 0;
      if (ele.search) {
        searchForm[ele.prop] = 0;
      }
    } else {
      tableForm[ele.prop] = '';
      if (ele.search) {
        searchForm[ele.prop] = '';
      }
    }
    // 表单默认值设置
    if (!validatenull(ele.valueDefault)) tableForm[ele.prop] = ele.valueDefault;
    // 搜索表单默认值设置
    if (!validatenull(ele.searchDefault)) {
      searchForm[ele.prop] = ele.searchDefault;
    }
  });
  return {
    tableForm,
    searchForm
  };
};

export const getPlaceholder = function(column, type) {
  const placeholder = column.placeholder;
  const label = column.label;
  if (type === 'search') {
    const searchPlaceholder = column.searchPlaceholder;
    if (!validatenull(searchPlaceholder)) {
      return searchPlaceholder;
    } else {
      return label;
    }
  } else if (validatenull(placeholder)) {
    if (['select', 'checkbox', 'radio', 'tree'].includes(column.type)) {
      return `请选择`;
    } else {
      return '';
    }
  }

  return placeholder;
};

export const getType = column => {
  const type = column.type;
  const more = column.more || false;
  if (more) {
    if (type === 'date') {
      return 'daterange';
    } else if (type === 'datetime') {
      return 'datetimerange';
    } else if (type === 'time') {
      return 'timerange';
    } else {
      return type;
    }
  }
  return type;
};
