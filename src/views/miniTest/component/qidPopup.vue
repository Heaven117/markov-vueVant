<template>
  <van-popup position="bottom"
             ref="myPopup"
             v-model="showPopup"
  >
    <div class="cube-extend-popup-content">
      <div class="popup-title" v-if="!correctPage">
        <span class="circle-blue"></span>
        <span class="text">已作答</span>
        <span class="circle-white"></span>
        <span class="text">未作答</span>
      </div>
      <div class="popup-title" v-else-if="correctPage">
        <span class="circle-green"></span>
        <span class="text">正确</span>
        <span class="circle-red"></span>
        <span class="text">错误</span>
      </div>

      <div class="popup-content">
        <span v-for="i in length" :key="i">
          <span :class="qIndex[i-1]" @click="changeTab(i-1)" >{{i}}</span>
        </span>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: "qidPopup",
  props:{
    length:Number,
    qIndex:Array,
    active:Number,
    correctPage:Boolean,
  },
  data(){
    return{
      showPopup:false,
    }
  },
  methods:{
    changeTab(index){
      this.$emit('changTab',index);
      this.showPopup = false;
    },
  }

}
</script>

<style scoped>
.cube-extend-popup-content{
  background-color: white;
  /*height: 200px;*/
  border-radius: 20px 20px 0 0;
}
.popup-title{
  display: flex;
  justify-content: center;
  padding-top: 20px;
}
.popup-title .circle-blue{
  width: 10px;
  height: 10px;
  border-radius: 100%;
  border: 1px #55A5FF solid;
  background-color: #E6F2FF;
  margin-right: 5px;
}
.popup-title .circle-white{
  width: 10px;
  height: 10px;
  border-radius: 100%;
  border: 1px #CCCCCC solid;
  background-color: white;
  margin-left: 20px;
  margin-right: 5px;
}
.popup-title .circle-green{
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: #DBFFD0;
  border: #8BE470 1px solid;
  color: #3CCA10;
  margin-right: 5px;
}
.popup-title .circle-red{
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: #FFE8E4;
  border: #FD9685 1px solid;
  color: #FC4426;
  margin-left: 20px;
  margin-right: 5px;
}
.popup-title .text{
  font-size: 12px;
  color: #999999;
}
.popup-content{
  display: flex;
  align-content: space-around;
  justify-content: left;
  flex-wrap:wrap;

  padding: 10px 5px;

}
.popup-content .qIndex{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: 1px #CCCCCC solid;
  background-color: white;
  color: #666666;
  margin: 10px;
}
.popup-content .qIndex-select{
  border: 1px #55A5FF solid;
  background-color: #E6F2FF;
  color: #4BA0FF;
}
.popup-content .qIndex-right{
  background-color: #DBFFD0;
  border: #8BE470 1px solid;
  color: #3CCA10;
}
.popup-content .qIndex-wrong{
  background-color: #FFE8E4;
  border: #FD9685 1px solid;
  color: #FC4426;
}
</style>
