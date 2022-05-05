<template>
  <div class="comp">
    <div class="testContent">
      <div class="testTitle">{{data.title}}</div>
      <div class="answer">
        <!-- 单选 -->
        <span v-if="parseInt(data.type) === 0">
          <van-radio-group
              v-model="userData"
          >
            <van-radio v-for="option in data.options"
                       :name="option"
                       :key="option"
                       @click="finished(index,userData)"
                       class="select-option"
            >
              {{option}}
            </van-radio>
          </van-radio-group>
        </span>
        <!-- 复选 -->
        <span v-else-if="parseInt(data.type) === 1">
          <van-checkbox-group
              v-model="userData"
          >
            <van-checkbox
                v-for="option in data.options"
                :name="option" :key="option"
                shape="square"
                class="select-option"
                @click="finished(index,userData)"
            >
              {{option}}
            </van-checkbox>
          </van-checkbox-group>
        </span>
        <!-- 长文本 -->
        <span v-else-if="parseInt(data.type) === 2">
          <van-field
              v-model="textData"
              rows="3"
              autosize
              type="textarea"
              placeholder="请输入"
              class="textareaBox"
              @blur="finished(index,textData)"
          />
        </span>
      </div>
    </div>
    <!-- 提交 -->
    <div class="submitBtn" v-if="(index+1) === total">
      <van-button type="info"
                  @click="submit()"
      >
        提 交
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    data: Object,
    index:Number,
    total:Number
  },
  data() {
    return {
      // 用户答案
      userData:[],
      textData:"",
    }
  },
  methods:{
    submit() {
      this.$emit('submit');
    },

    processFormData(){
      for (let index in this.userData) {
        if (parseInt(this.data.type) === 1) {
          this.model[index].answer = this.userData[index];
        } else {
          this.model[index].answer = []
          this.model[index].answer[0] = this.userData[index]
        }
      }
    },
    finished(index,data){
      this.$emit('finished',index,data);
    },
  },
  created() {
  }
};
</script>

<style scoped>
.comp{
  position: relative;
  width: 100%;
  height: 100%;
  white-space: normal;
  font-size: 15px;
}
.topNav-right .navImg{
  width: 16px;
  height: 18px;
  margin-right: 3px;
}
.topNav-right .questionIndex{
  color: #4BA0FF;
  margin: 0 3px;
}
.topNav-right .questionTotal{
  color: #999999;
  margin: 0 3px;
}

.testContent{
  padding: 20px;
}
.testTitle{
  word-wrap:break-word;
  word-break:break-all;
  overflow: hidden;
  position: relative;
  text-align: left;
  line-height: 30px;
  margin-bottom: 20px;
}
.submitBtn{
  width: 100%;
  position: sticky;
  display: flow;
  float: bottom;
  margin: 20px;
}
.select-option{
  margin: 10px 0;
}

</style>


