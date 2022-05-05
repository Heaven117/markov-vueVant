<template>
  <div class="comp">
    <span class="top">
     <span class="title">{{ title }}</span>
    </span>
    <div class="bottom">
      <span class="difficulty">难度{{ difficulty }}</span>
      <span class="people_num">{{ people_num }}人已做</span>
      <span class="state" v-if="unsaved===true" :style="{color:'#FC4426'}">{{ state_text }}</span>
      <span class="state" v-if="done_time>0" :style="{color:'#4BA0FF'}">{{ state_text }}</span>
    </div>
  </div>
</template>

<style scoped>
.comp {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 37px;
  background: white;
  top: 0;
}

.top {
  position: relative;
  margin-bottom: 10px;
  display: flex;
  width: 100%;
}

.title {
  width: 100%;
  font-size: 15px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}


.bottom {
  position: relative;
  display: flex;
  width: 100%;
  margin-bottom: 10px;
}

.difficulty {
  color: #999999;
  font-size: 12px;
  font-weight: normal;
  width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.people_num {
  color: #999999;
  font-size: 12px;
  font-weight: normal;
  width: 100px;
}

.state {
  font-size: 12px;
  font-weight: normal;
}

</style>

<script>
export default {
  props: {
    id: String,
    title: String,
    difficulty: String,
    people_num: Number,
    unsaved: Boolean,
    done_time: Number
  },
  data() {
    return {
      state_text: ""
    };
  },
  methods: {
  },
  created() {
    if(this.unsaved){
      this.state_text="未做完"
    }else if(this.done_time>0){
      this.state_text="已做过"+String(Math.round(this.done_time))+"次"
    }
  }
};
</script>


