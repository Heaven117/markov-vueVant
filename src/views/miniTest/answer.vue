<template>
  <div class="miniTestBox">
    <topbar title="微测试答案解析"></topbar>
    <!--    题号框-->
    <qid-popup
        :length="content.length"
        :q-index="qIndex"
        :correctPage="correctPage"
        :active="active"
        @changTab="changeTab"
        ref="qidPopup"
    />

    <!--    测试卷-->
    <van-tabs v-model="active" swipeable
              line-width="0" line-height="0"
    >
      <van-tab  v-for="(data, index) in content"
                :key="data.title"
                :name="index"
      >
        <template #title>
          <div class="topNav">
            <span v-if="data.type == 0" class="questionType">单选题</span>
            <span v-else-if="data.type == 1" class="questionType">多选题</span>
            <span v-else-if="data.type == 2" class="questionType">填空题</span>

            <div class="topNav-right" @click="qidPopupShow">
              <img class="navImg" src="../../assets/img/myInfo/file.png">
              <span class="questionIndex">{{index+1}}</span>
              <span class="questionTotal">/ {{total}}</span>
            </div>
          </div>
        </template>
        <answer-block
            v-if="userAnswer.length>0"
            :data="data"
            :user-answer="userAnswer[index].answer"
        />
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import topbar from "@/components/topbar/index.vue";
import qidPopup from "./component/qidPopup";
import answerBlock from "./component/answer-block";
import {getTestDetail, getUserAnswerByRecordId} from "@/api/miniTest";

export default {
  components: {
    topbar,
    qidPopup,
    answerBlock
  },
  data() {
    return {
      showPopup:false,
      active:0,
      qIndex:[],
      correctPage:true,

      // 问卷的数据
      recordId:null,
      id:null,
      total:null,
      content: [],
      //用户答案
      userAnswer:[],
    }
  },
  created() {
    // this.id = this.$route.params.id;
    // this.recordId = this.$route.params.recordId;
    this.id=1
    this.recordId="1521481074860232705"
    Promise.all([
      getTestDetail(this.id)
          .then(res =>{
            this.content = res;
            this.total = res.length;
            this.qindex = 1;/*初始赋值*/
            // console.log(this.content)
          }),
      getUserAnswerByRecordId(this.recordId)
          .then(res =>{
            this.userAnswer = res;
            // console.log(this.userAnswer)
          })
    ]).then(()=>{
      this.initCheck()
    })
  },
  methods: {
    //展示题号弹出层
    qidPopupShow(){
      this.$refs.qidPopup.showPopup = true;
    },
    // 点击题号切换标签
    changeTab(index){
      this.active = index;
    },
    // 初始化题号样式
    initCheck(){
      this.content.forEach((item,index) => {
        if(this.isCorrect(index)) this.qIndex[index] = 'qIndex  qIndex-right'
        else this.qIndex[index] = 'qIndex  qIndex-wrong'
      })
      // console.log(this.qIndex)
    },
    // 最终答案判断对错
    isCorrect(j) {
      if (this.content[j] && this.userAnswer[j]) {
        var rightAnswer = this.content[j].answer;//正确答案数组
        var userAnswer = this.userAnswer[j].answer;//用户答案数组

        if (parseInt(this.content[j].type) === 0) {
          /*单选题*/
          if (userAnswer[0] === rightAnswer[0]) return true;
          else return false;

        } else if (parseInt(this.content[j].type) === 1) {
          /*多选题*/
          for (let index = 0; index < rightAnswer.length;index++) {
            if (userAnswer[index] !== rightAnswer[index]) {
              return false;
            }
          }
          return true;
        } else {
          /*填空题*/
          if (this.userAnswer[j].answer[0] === rightAnswer) return true;
          else return false;
        }
      }
      return true;
    },
  }
};


</script>
<style scoped>
/deep/ .van-tabs__nav{
  padding: 0;
}
/deep/ .van-tab{
  width: 100%;
  padding: 0;
}
/deep/ .van-tab__text{
  width: 100%;
}
.topNav{
  width: 100%;
  display: flex;
  align-items:center;
  background-color: #F8F8F8;
  height: 35px;
  justify-content: space-between;
}
.questionType{
  color: #4BA0FF;
  display: flex;
  justify-content: start;
  margin-left: 15px;
}
.topNav-right{
  margin-right: 10px;
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
</style>



