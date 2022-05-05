<template>
  <div class="comp">
    <div class="testContent">
      <div class="testTitle">{{data.title}}</div>
      <div class="answer">
        <!-- 选择 -->
        <span v-if="parseInt(data.type) !== 2">
          <div class="cube-radio-group border-top-1px border-bottom-1px">
          <div v-for="option in data.options" :key="option" >
            <div v-if="check(option)===1" class="cube-radio cube-radio-right">{{option}}</div>
            <div v-else-if="check(option)===2" class="cube-radio cube-radio-wrong">{{option}}</div>
            <div v-else class="cube-radio">{{option}}</div>
          </div>
          </div>
        </span>
        <!-- 长文本 -->
        <span v-else-if="parseInt(data.type) === 2">
          <div class="cube-textarea textareaBox">{{userAnswer[0]}}</div>
        </span>
      </div>
    </div>

    <div class="analysisBox" v-if="!isCorrect()">
      <div class="analysisTitle">错误解析</div>
      <div class="analysisAnswer" v-if="parseInt(answer.type) !== 2">
        <span class="yourAnswer">您的答案 : <span v-for="ua in userAnswer"> {{ua.slice(0,1)}} </span></span>
        <span class="rightAnswer">正确答案 : <span v-for="ca in answer"> {{ca.slice(0,1)}} </span></span>
      </div>
      <div class="analysisContent">
        解析：{{data.analysis}}
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: "answer-block",
  props:{
    data:Object,
    userAnswer:Array,
  },
  data(){
    return{
      answer:[],
    }
  },
  created() {
    this.answer = this.data.answer;
  },
  methods:{
    check(option) {
      if (this.answer && this.userAnswer) {
        var rightAnswer = this.answer;//正确答案数组
        var userAnswer = this.userAnswer;//用户答案数组

        for (let j in rightAnswer) {
          if (option === rightAnswer[j]) {
            return 1;
          }
        }
        for (let i in userAnswer) {
          if (userAnswer[i] === option) {
            return 2;
          }
        }
        return 0;//0 未被选择 1 正确答案 2 错误答案
      }
      return 0;
    },
    isCorrect() {
      if (this.answer && this.userAnswer) {
        var rightAnswer = this.answer;//正确答案数组
        var userAnswer = this.userAnswer;//用户答案数组

        if (parseInt(this.data.type)=== 0) {
          /*单选题*/
          if (userAnswer[0] === rightAnswer[0]) return true;
          else return false;

        } else if (parseInt(this.data.type) === 1) {
          /*多选题*/
          for (let index = 0; index < rightAnswer.length;index++) {
            if (userAnswer[index] !== rightAnswer[index]) {
              return false;
            }
          }
          return true;
        } else {
          /*填空题*/
          if (this.userAnswer[0] === rightAnswer) return true;
          else return false;
        }
      }
      return true;
    },
  }
}
</script>

<style scoped>
.comp{
  position: relative;
  width: 100%;
  height: 100%;
  white-space: normal;
  font-size: 15px;
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
.answer .cube-radio-group{
  z-index: 1;
  overflow: hidden;
  background-color: #fff;
}
.answer .cube-radio,.cube-checkbox, .textareaBox  {
  background-color: #f8f8f8;
  margin-top: 20px;
  line-height: 250%;
  color: #666;
  padding-left: 30px;
}
.answer .cube-radio-right{
  background-color: #DBFFD0;
  border: #8BE470 1px solid;
  color: #3CCA10;
}
.answer .cube-radio-wrong{
  background-color: #FFE8E4;
  border: #FD9685 1px solid;
  color: #FC4426;
}

.analysisBox{
  border: 1px black dashed;
  padding: 10px 10px 20px 10px;
  margin: 20px;
  background-color: #f8f8f8;
}
.analysisBox .analysisTitle{
  color: black;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
}
.analysisBox .analysisAnswer{
  font-size: 13px;
  margin-bottom: 10px;
}
.analysisBox .analysisAnswer .yourAnswer{
  color: #FC4426;
  margin-right: 20px;
}
.analysisBox .analysisAnswer .rightAnswer{
  color: #3CCA10 ;
}
.analysisBox .analysisContent{
  color: #666666 ;
  font-size: 13px;
  line-height: 18px;
  text-align: left;
  margin-bottom: 30px;
}
</style>
