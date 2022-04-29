<template>
  <div>
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
          v-if="pickerType === 0"
          type="date-time"
          :title="title"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @confirm="onConfirm"
          @cancel="showPicker = false"
      />

      <van-picker
          v-else-if="pickerType === 1"
          show-toolbar
          :title="title"
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
      />

      <van-datetime-picker
          v-if="pickerType === 2"
          type="time"
          :title="title"
          :formatter="formatter"
          @confirm="onConfirm"
          @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import {dateFormat} from "@/util/date";

export default {
  name: "datetime-picker",
  props:{
    title:String,
    pickerTitle:String,
    pickerType:Number,
    columns:Array,
  },
  data(){
    return{
      minDate: new Date(),
      maxDate: new Date(2025, 10, 1),
      showPicker: false,
      // columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    }
  },
  created() {
    // console.log(this.pickerType)
  },
  methods:{
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      }
      else if (type === 'day'){
        return `${val}日`;
      }
      else if (type === 'hour'){
        return `${val}时`;
      }
      else if (type === 'minute'){
        return `${val}分`;
      }
      return val;
    },
    onConfirm(value){
      if(this.pickerType === 0)
        value = dateFormat(value,'yyyy-MM-dd hh:mm:ss');
      else if(this.pickerType === 2){
        value = value+":00";
      }
      this.$emit('onConfirm',value,this.pickerTitle)
      this.showPicker = false;
    },
  }
}
</script>

<style scoped>

</style>
