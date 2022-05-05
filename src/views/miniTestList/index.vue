<template>
  <div class="main">
    <!--      <searchbar class="search_bar" @search_changed="search_changed" @screen_changed="screen_changed" ref="search_bar" :needicon="true"></searchbar>-->
    <topbar title="微测试列表"></topbar>
    <div class="body">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-tabs v-model="active" sticky swipeable offset-top="40px">
            <van-tab v-for="(data, index) in tabTitle"
                    :key="data"
                    :name="index"
                    :title="data"
            >
              <div>
                <span class="no_content_message" v-if="testlist.length===0">目前没有符合条件的微测试哦~</span>
                <div class="content" @click="hide_screen">
                  <div class="testlist" v-for="item in testlist" :key="item.id">
                    <div class="testdiv">
                      <test_block :id="item.id"
                                  :title="item.title"
                                  :difficulty="item.difficulty"
                                  :people_num="item.people_num"
                                  :unsaved="item.unsaved"
                                  :done_time="item.done_time"
                                  @click.native="goDetails(item,data)"
                      ></test_block>
                    </div>
                  </div>
                </div>
              </div>
            </van-tab>
          </van-tabs>
      </van-pull-refresh>
    </div>

  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
}

.search_bar {
  margin-top: 5px;
  background: #FFFFFF;
}

.body {
  background-color: #f5f5f5;
  min-height: 100vh;
  margin: 0;
  flex: 1;
}
.content{
  height: 100vh;
}
.tabs{
}

.testlist {
  margin-left: 4%;
  width: 92%;
}

.testlist:last-child {
  padding-bottom: 20px;
}

.testdiv {
  border-radius: 10px;
  background: #FFFFFF;
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 15px 15px;
}

.no_content_message {
  position: absolute;
  width: 100%;
  margin-top: 160px;
  font-size: 14px;
  font-weight: bold;
  color: #666666;
  text-align: center;
  z-index: 200;
}
</style>

<script>
import topbar from "@/components/topbar/index.vue"
// import searchbar from "@/components/search-screening-bar/index.vue"
import test_block from "@/components/test-block/index.vue"
import {getMiniTestList, getMyMiniTestList} from "@/api/miniTest.js";
export default {
  name: 'miniTestList',
  components: {
    topbar,
    // searchbar,
    test_block,
  },
  data() {
    return {
      active: 0,
      tabTitle:['学习','测试'],
      isLoading: false,
      alltestlist: [],
      aftscreen_testlist: [],
      testlist: [],
      search_text: "",
      options: {
        pullDownRefresh: false,
        pullUpLoad: false
      },
      pullDownY: 0,
      isUserTest:false,
    }
  },
  methods: {
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.init();
        this.isLoading = false;
        this.$toast('刷新成功');
      }, 1000);
    },
    goDetails(data,tabTitle) {
      //如果筛选栏是打开的，则隐藏筛选栏
      // if (this.$refs.search_bar.get_screen_state()) {
      //   this.$refs.search_bar.hide_screen();
      //   return
      // }
      //如果不是从我的测验记录跳转则开始做题
      if(!this.isUserTest) {
        if(tabTitle === this.tabTitle[0]){
          this.$router.push({
            name: "微测试学习",
            params: {
              id: data.id
            }
          });
        }
        else {
          this.$router.push({
            name: "微测试",
            params: {
              id: data.id
            }
          });
        }
      }
      else{ //否则直接看答案
        this.$router.push({
          name: "测试结果",
          params: {
            id: data.id,
            recordId:data.recordId
          }
        });
      }
    },
    search_changed(text) {
      this.search_text = text;
      console.log("触发页面search_change事件:" + text)
      //没有搜索，只有筛选
      if (text === "") {
        this.testlist = this.aftscreen_testlist.concat()
      } else {
        //临时集合和关键词集合
        const temp = [];
        const words = text.split(' ');
        //console.log(words)
        //筛选后的每个测试
        for (var i = 0; i < this.aftscreen_testlist.length; i++) {
          let flag = true;
          //只要有一个关键词不包含就认为该测试不是要找的
          for (var j = 0; j < words.length; j++) {
            if (this.aftscreen_testlist[i].title.indexOf(words[j]) === -1) {
              flag = false;
              break;
            }
          }
          //如果是要找的，加入到临时集合
          if (flag) {
            temp.push(this.aftscreen_testlist[i])
          }
        }
        //将结果显示
        this.testlist = temp;
      }
      this.$refs.scroll.refresh()
      console.log("符合条件的测试数量:" + this.testlist.length)
    },
    number_equal(a, b) {
      return Math.abs(a - b) < 0.001
    },
    screen_changed(args) {
      //如果没有筛选条件
      if (this.json_a_has_b(args.screen_data,args.whole_data) ) {
        this.aftscreen_testlist = this.alltestlist.concat();
      } else {
        this.aftscreen_testlist = []
        //扫描每一条测试，难度和状态有一个条件不满足就不加入
        for (let i = 0; i < this.alltestlist.length; i++) {
          let flag = false;
          let thisTest = this.alltestlist[i];
          //难度条件
          if (this.array_a_has_b(args.screen_data.difficulty,args.whole_data.difficulty)  ) {
            flag = true;
          }
          for (let j = 0; j < args.screen_data.difficulty.length && !flag; j++) {
            let num = args.screen_data.difficulty[j];
            if ((thisTest.difficulty >= num && thisTest.difficulty < num + 0.999) || (this.number_equal(thisTest.difficulty, 5) && num === 4)) {
              flag = true;
            }
          }
          //难度条件已经不满足了
          if (!flag) {
            continue
          }
          flag = false;
          //状态条件
          if (this.array_a_has_b(args.screen_data.state, args.whole_data.state)) {
            flag = true;
          }
          for (let j = 0; j < args.screen_data.state.length && !flag; j++) {
            let num = args.screen_data.state[j];
            if ((num === 0 && thisTest.done_time > 0) || (num === 1 && thisTest.unsaved === true) || (num === 2 && thisTest.done_time === 0)) {
              flag = true;
            }
          }
          //若满足条件，加入筛选
          if (flag) {
            this.aftscreen_testlist.push(thisTest);
          }
        }
      }
      this.search_changed(this.search_text);
    },
    json_a_has_b(jsona,jsonb){
      for(let i in jsonb){
        for(let j=0;j<jsonb[i].length;j++){
          if(!(jsonb[i][j] in jsona[i])) return false;
        }
      }
      return true;
    },
    array_a_has_b(arra,arrb){
      for(let i=0;i<arrb.length;i++){
        if(!(arrb[i] in arra)) return false;
      }
      return true;
    },
    hide_screen() {
      // this.$refs.search_bar.hide_screen();
    },
    init(){
      // 判断是否是获取用户的测试列表
      this.isUserTest = window.sessionStorage.getItem("minitest");
      this.isUserTest=this.isUserTest==='history';
      if(this.isUserTest){
        this.title="测验记录";
      }
      let datalist;

      if (!this.isUserTest) {
        getMiniTestList().then((res) => {
          datalist = res;
          //数据规范，难度为1位小数，如4.0
          for (var i = 0; i < datalist.length; i++) {
            datalist[i].difficulty = Number(datalist[i].difficulty).toFixed(1)
          }
          this.testlist = datalist
          this.alltestlist = this.testlist.concat()
          this.aftscreen_testlist = this.testlist.concat()
          console.log(this.testlist)
        });
      }
      else {
        getMyMiniTestList().then((res) => {
          datalist = res;
          //数据规范，难度为1位小数，如4.0
          for (var i = 0; i < datalist.length; i++) {
            datalist[i].difficulty = Number(datalist[i].difficulty).toFixed(1)
          }
          this.testlist = datalist
          this.alltestlist = this.testlist.concat()
          this.aftscreen_testlist = this.testlist.concat()
          console.log(this.testlist)
        });
      }
    }
  },
  created() {
    this.init();
  }
}
</script>
