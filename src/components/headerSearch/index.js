/*
 * @Author: liyaning
 * @Date: 2024-04-16 19:27:32
 * @Description:
 */
import Input from './input';
import Select from './select';
import Date from './date';



const install = function(Vue){
    //全局注册组件 组件名为组件的name
    [Input, Select, Date].map(component => {
        Vue.component(component.name, component);
    }); 
}

export default {
    version:"1.0.0", 
    install,
}