/*
 * @Author: liyaning
 * @Date: 2024-04-16 09:34:38
 * @Description: 
 */
import components from "./components"
import mixin from "./mixins/mixin";
import { deepClone, vaildData,validatenull,setPx } from "./utils";
import "./styles/index.scss"; // 自定义样式

const install = function(Vue){
    //全局注册组件 组件名为组件的name
    components.map(component => {
        Vue.component(component.name, component);
    }); 
    Vue.prototype.deepClone = deepClone;
    Vue.prototype.vaildData = vaildData;   
    Vue.prototype.validatenull = validatenull;
    Vue.prototype.setPx = setPx;
}

export default {
    version:"1.0.0", 
    install,
    mixin
}