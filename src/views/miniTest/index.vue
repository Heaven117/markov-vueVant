<template>
  <div class="miniTestBox">
    <topbar title="微测试"></topbar>
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
          <mini-test-block
              :data="data"
              :index="index"
              :total="total"
              @finished="finished"
              @submit="submit"
          />
        </van-tab>
      </van-tabs>

  </div>
</template>

<script>
import topbar from "@/components/topbar/index.vue";
import miniTestBlock from "./component/miniTest-block";
import qidPopup from "./component/qidPopup";
import {getTestDetail, submitMiniTest} from "@/api/miniTest";
import {Dialog} from "vant";

export default {
  components:{
    topbar,
    miniTestBlock,
    qidPopup,
  },
  data() {
    return {
      id:"",
      total:0,
      showPopup:false,
      qIndex:[],
      active:0,
      // 是否是答案验证页
      correctPage:false,
      // 测试卷数据
      content:[],
      // 用户答案
      formData:[],
    }
  },
  methods:{
    //展示题号弹出层
    qidPopupShow(){
      this.$refs.qidPopup.showPopup = true;
    },
    // 点击题号切换标签
    changeTab(index){
      this.active = index;
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
        console.log("有单子没填写")
      } else {
        console.log(this.formData)
        submitMiniTest(this.id,this.formData)
            .then( res =>{
              console.log(res);
              Dialog.alert({
                title: '提交成功',
              }).then(()=>{
                this.$router.push({
                  name:"测试结果",
                  params:{
                    id:this.id,
                    recordId:res
                  }
                })
              })
            })
            .catch( () =>{
              Dialog.alert({
                title: '提交失败',
              }).then(()=>{
                this.$router.push({
                  name:"微测试",
                  params:{id:this.id}
                });
              })
            })
      }
    },
    // 做题后
    finished(index,data){
      // 弹出框 样式改变
      this.qIndex[index] = "qIndex qIndex-select";
      if(!(data instanceof Array)) {
        this.formData[index].answer.push(data)
      }else{
        this.formData[index].answer = data;
      }
    },

  },
  created() {
    this.id = this.$route.params.id ? this.$route.params.id: sessionStorage.getItem('miniTestId');
    sessionStorage.setItem('miniTestId',this.id)
    getTestDetail(this.id).then(res =>{
      this.content = res;
      this.total = res.length;
      this.content.forEach((item, index) => {
        this.formData.push({
          qnum:index+1,
          qid: item.qid,
          answer: []
        })
        this.qIndex[index] = 'qIndex'
      })
    })
    // console.log(this.formData)
  },
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


