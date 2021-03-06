import Vue from "vue";
import {Button} from "vant";
import { Form } from 'vant';
import { Field } from 'vant';
import { NavBar } from 'vant';
import { Picker } from 'vant';
import { Popup } from 'vant';
import { Icon } from 'vant';
import { DatetimePicker } from 'vant';
import { Uploader } from 'vant';
import { Toast } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { Lazyload } from 'vant';
import { Tab, Tabs } from 'vant';
import { PullRefresh } from 'vant';
import { RadioGroup, Radio } from 'vant';
import { Dialog } from 'vant';

Vue.use(Dialog);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(PullRefresh);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Lazyload);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Toast);
Vue.use(Uploader);
Vue.use(DatetimePicker);
Vue.use(Icon);
Vue.use(Popup);
Vue.use(Picker);
Vue.use(NavBar);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
