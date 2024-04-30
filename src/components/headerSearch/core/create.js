/*
 * @Author: liyaning
 * @Date: 2024-04-16 09:46:12
 * @Description: create方法
 */
import { COMPONENTNAME } from './constant';
export default function(component) {
  component.name = COMPONENTNAME + component.name;
  component.mixins = component.mixins || [];
  return component;
}
