<template>
  <div class="miniTestBox">
    <topbar title="微测试学习"></topbar>
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
              duration="0.1"
    >
      <van-tab  v-for="(data, index) in content"
                :key="data.title"
                :name="index"
      >
        <template #title>
          <div class="topNav">
            <div class="typeNav">
              <span v-if="parseInt(data.type) === 0" class="questionType">单选题</span>
              <span v-else-if="parseInt(data.type) === 1" class="questionType">多选题</span>
              <span v-else-if="parseInt(data.type) === 2" class="questionType">填空题</span>
            </div>
            <div class="nextBtn" >
              <van-button type="info" size="mini"
                          @click="nextQuestion(index)"
              >确定</van-button>
            </div>
            <div class="topNav-right" @click="qidPopupShow">
              <img class="navImg" src="../../assets/img/myInfo/file.png">
              <span class="questionIndex">{{index+1}}</span>
              <span class="questionTotal">/ {{total}}</span>
            </div>
          </div>
        </template>
        <div v-if="!makeFlag[index]">
          <mini-test-block
              :data="data"
              :index="index"
              :total="total"
              @finished="finished"
              @submit="submit"
          />
        </div>
        <div v-else>
          <answer-block
              :data="data"
              :user-answer="formData[index].answer"
          />
        </div>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import topbar from "@/components/topbar/index.vue";
import qidPopup from "./component/qidPopup";
import miniTestBlock from "./component/miniTest-block";
import answerBlock from "./component/answer-block";
import {getStudyDetail, submitMiniTest} from "@/api/miniTest";
import {Dialog} from "vant";

export default {
  components: {
    topbar,
    qidPopup,
    miniTestBlock,
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
      // 测试卷数据
      content: [],
      //用户答案
      formData:[],
      //做题记录
      makeFlag:[],
    }
  },
  created() {
    // this.id = this.$route.params.id;
    this.id=1
    getStudyDetail(this.id)
      .then(res =>{
        this.content = res;
        this.total = res.length;
        // console.log(this.content)
        this.content.forEach((item, index) => {
          this.formData.push({
            qnum:index+1,
            qid: item.qid,
            answer: []
          })
          this.qIndex[index] = 'qIndex'
        })
        for(let i = 0; i < this.total; i++) this.makeFlag[i] = false;
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
    // 最终答案判断对错
    isCorrect(j) {
      if (this.content[j] && this.formData[j]) {
        var rightAnswer = this.content[j].answer;//正确答案数组
        var userAnswer = this.formData[j].answer;//用户答案数组

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
    // 做题后
    finished(index,data){
      if(!(data instanceof Array)) {
        this.formData[index].answer.push(data)
      }else{
        this.formData[index].answer = data;
      }
      // console.log(this.formData)
    },
    // 下一题 验证答案
    nextQuestion(index){
      this.makeFlag.splice(index,1,true);
      //更改样式
      if(this.isCorrect(index)) this.qIndex[index] = 'qIndex  qIndex-right'
      else this.qIndex[index] = 'qIndex  qIndex-wrong'
    },
    // 表单判空
    searchNull() {
      return this.formData.some(
          (item, index) => this.formData[index].answer.length === 0);
    },
    // 提交
    submit() {
      if (this.searchNull()) {
        this.$toast("题目尚未写完");
        console.log("题目尚未写完")
      } else {
        Dialog.alert({
          title: '完成学习',
        }).then(()=>{
          this.$router.push('/miniTestList');
        })
      }
    }
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
.nextBtn{
  margin-left: auto;
  margin-right: 20px;
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



