/*
 * @Author: liyaning
 * @Date: 2024-04-16 09:46:12
 * @Description: create方法
 */
import bem from '../utils/bem';
import { COMPONENTNAME } from './constant';
export default function(component) {
  component.name = COMPONENTNAME + component.name;
  component.mixins = component.mixins || [];
  component.mixins.push(bem);
  return component;
}
