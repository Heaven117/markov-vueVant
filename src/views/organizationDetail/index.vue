<template>
  <div class="organizationDetail">
    <topbar title="组织详情"></topbar>
    <div class="main">
      <div class="slide">
        <van-swipe  class="my-swipe" :autoplay="3000">
          <van-swipe-item v-for="(image, index) in data.photo" :key="index">
            <img v-lazy="image"  class="img"/>
          </van-swipe-item>
        </van-swipe>
      </div>

      <div class="basic-info">
        <div class="br-label">基础信息</div>
        <div class="main-info">
          <div class="info-item">
            <span class="label">志愿团徽标</span>
            <span class="value"><img :src="data.teamLogo" style="width: 50px;height: 50px"></span>
          </div>
          <p class="border-line"></p>
          <div class="info-item">
            <span class="label">志愿团名称</span>
            <span class="value">{{ this.data.name }}</span>
          </div>
          <p class="border-line"></p>
          <div class="info-item">
            <span class="label">志愿团创建人</span>
            <span class="value">{{ this.data.creatorName }}</span>
          </div>
          <p class="border-line"></p>
          <div class="info-item">
            <span class="label">组织口号</span>
            <span class="value">{{ this.data.slogan }}</span>
          </div>
          <p class="border-line"></p>
          <div class="info-item">
            <span class="label">审核说明</span>
            <span class="value">{{ this.data.auditInstruction }}</span>
          </div>
          <p class="border-line"></p>
          <div class="info-item">
            <span class="label">条件说明</span>
            <span class="value">{{ this.data.conditionInstruction }}</span>
          </div>
          <p class="border-line"></p>
          <div class="info-item">
            <span class="label">活动地址</span>
            <span class="value">
              {{locationAddress}}
            </span>
          </div>
          <p class="border-line"></p>
          <div class="info-item">
            <span class="label">创建时间</span>
            <span class="value">{{ gmtCreate }}</span>
          </div>
        </div>
      </div>

      <div class="brief-info">
        <div class="br-label">团内简介</div>
        <p class="brief">{{ this.data.info }}</p>
        <div class="br-label">图片简介</div>
        <p class="brief">{{ this.data.photoIntroduction }}</p>
      </div>

      <div class="general-info">
        <div class="br-label">综合情况</div>
        <div class="general-container">
          <div class="ranking-box">
            <div class="ranking-item">
              <div class="score">{{ this.data.score }}</div>
              <div class="general-label">综合得分</div>
            </div>
            <div class="ranking-item">
              <div class="ranking">{{ this.data.rank1 }}</div>
              <div class="general-label">隶属排名</div>
            </div>
            <div class="ranking-item">
              <div class="ranking">{{ this.data.rank2 }}</div>
              <div class="general-label">全市排名</div>
            </div>
          </div>
          <div class="echarts" id="echarts"></div>
        </div>
      </div>

      <div class="members">
        <div class="br-label">组织成员</div>
        <div class="member-container">
          <van-tabs>
            <van-tab v-for="item in teamMemberList" :key="item.id">
              <template #title>
                <li  class="list-item" :key="item.id">
                  <div><img class="user-img" :src="item.img" /></div>
                  <div class="user-name">{{ item.userName }}</div>
                  <div class="user-role">{{ item.levelInChinese }}</div>
                </li>
              </template>
            </van-tab>
          </van-tabs>
        </div>
      </div>

      <div class="operator">
        <div v-if="isPermission" class="operator-buttons">
          <button class="check-btn" @click="toMemberCheck">成员审核</button>
          <button class="manager-btn" @click="toMemberManage">成员管理</button>
        </div>

        <div v-if="isNotLeader" class="operator-buttons">
          <button
              v-if="isNotJoined"
              class="apply-button"
              @click="applyOrganization"
          >
            申请加入
          </button>
          <button v-else class="manager-btn" @click="quitOrganization">
            退出组织
          </button>
          <button  v-if="!isNotJoined" class="manager-btn" @click="$router.push('/administrator/volunteerList')">活动审核</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topbar from "@/components/topbar";
import * as echarts from "echarts";
import {
  getOrganizationDetail,
  quitOrganization,
  requestJoiningOrganization
} from "@/api/team";
const memberLevel=["TEAM_LEADER",'TEAM_VICE_LEADER','TEAM_MEMBER'];
export default {
  name: "organizationDetail",
  components: {
    topbar
  },
  data() {
    return {
      peoplesWidth: 0,
      isPermission: false, //是否拥有管理权限
      isNotJoined: true,
      isNotLeader: true,
      msg: "",
      memberLevelMap: {
        TEAM_LEADER: "团长",
        TEAM_VICE_LEADER: "副团长",
        TEAM_MEMBER: "成员"
      },
      data: {
        photos:[],
      },
      teamMemberList:[],
      radarData: [] //雷达图数据
    };
  },
  computed:{
    locationAddress(){
      return this.data.location + this.data.address;
    },
    gmtCreate(){
      return this.data.gmtCreate;
      // return this.data.gmtCreate.split(" ")[0];
    }
  },
  methods: {
    //验证管理员权限
    checkPermission() {
      this.isNotJoined = this.data.participatesStatus.status !== "ACKNOWLEDGED";
      if (!this.isNotJoined) {
        this.isPermission =
            this.data.participatesStatus.teamMemberRole !== "TEAM_MEMBER";
        this.isNotLeader =
            this.data.participatesStatus.teamMemberRole !== "TEAM_LEADER";
      }
      console.log("是否为管理员：", this.isPermission);
      console.log("是否非团长：", this.isNotLeader);
    },
    menuStyle() {
      this.peoplesWidth = this.data.teamMemberList.length * 70 + 20;
      for (var i = 0; i < this.data.teamMemberList.length; i++) {
        this.data.teamMemberList[i]["levelInChinese"] = this.memberLevelMap[
            this.data.teamMemberList[i].teamMemberRole
            ];
      }
    },
    showToast(str) {
      const toast = this.$createToast({
        time: 2000,
        type: "correct",
        txt: str,
        mask: false
      });
      toast.show();
    },
    toMemberCheck() {
      this.$router.push({
        name: "成员审核",
        params: {
          teamId: this.organizationId,
          teamName: this.data.name
        }
      });
    },
    toMemberManage() {
      this.$router.push({
        name: "成员管理",
        params: {
          organizationId: this.organizationId
        }
      });
    },
    applyOrganization() {
      this.showDialog(
          {
            content: "是否申请加入该组织",
            confirmBtn: "确定加入",
            cancelBtn: "取消加入"
          },
          () => {
            requestJoiningOrganization(this.organizationId).then(res => {
              if (res.data.code === 40300002) {
                this.showToast("您已经申请加入，请耐心等待通过哦~");
              } else if (res.data.code === 50001000) {
                this.showToast("不好意思，系统错误，请联系管理员~");
              } else {
                this.showToast("成功提交申请，请耐心等待通过哦~");
              }
            });
          }
      );
    },
    quitOrganization() {
      console.log(this.data.participatesStatus.userId)
      quitOrganization(
          this.data.participatesStatus.userId,
          this.organizationId
      ).then(res => {
        if (res.data.code === 40300002) {
          this.showToast("退出志愿团失败，token与您的身份不对应~");
        } else if (res.data.code === 50001000) {
          this.showToast("不好意思，系统错误，请联系管理员~");
        } else {
          this.showToast("您已成功退出组织~");
          // this.getOrganization();
        }
      });
      // this.showDialog(
      //   {
      //     content: "是否退出该组织",
      //     confirmBtn: "确定退出",
      //     cancelBtn: "取消退出"
      //   },
      //   () => {
      //     quitOrganization(
      //       this.data.participatesStatus.id,
      //       this.organizationId
      //     ).then(res => {
      //       if (res.data.code === 40300002) {
      //         this.showToast("退出志愿团失败，token与您的身份不对应~");
      //       } else if (res.data.code === 50001000) {
      //         this.showToast("不好意思，系统错误，请联系管理员~");
      //       } else {
      //         this.showToast("您已成功退出组织~");
      //         this.getOrganization();
      //       }
      //     });
      //   }
      // );
    },
    showDialog(config, cb) {
      this.$createDialog({
        type: "confirm",
        icon: "cubeic-alert",
        title: "提示",
        content: config.content,
        confirmBtn: {
          text: config.confirmBtn,
          active: true,
          disabled: false,
          href: "javascript:;"
        },
        cancelBtn: {
          text: config.cancelBtn,
          active: false,
          disabled: false,
          href: "javascript:;"
        },
        onConfirm: () => cb()
      }).show();
    },

    getOrganization() {
      getOrganizationDetail(this.organizationId).then(res => {
        this.data = res.data.data;
        this.teamMemberList = this.data.teamMemberList;
        this.data.teamLogo=['https://img01.yzcdn.cn/vant/leaf.jpg'];
        console.log(this.teamMemberList);
        this.teamMemberList.sort((a,b)=>{
          return memberLevel.indexOf(a.teamMemberRole) -memberLevel.indexOf(b.teamMemberRole);
        })

        this.msg = res.data.msg;
        this.menuStyle();
        this.checkPermission();
        this.radarData = [
          this.data.score1,
          this.data.score2,
          this.data.score3,
          this.data.score4,
          this.data.score5,
          this.data.score6
        ];
      })
      .then( ()=> {
        this.initEcharts();
      })
    },


    initEcharts() {
      var myChart = echarts.init(document.getElementById("echarts"));
      var option;

      option = {
        radar: {
          shape: "circle",
          indicator: [
            { name: "志愿", max: 10 },
            { name: "发起", max: 10 },
            { name: "人数", max: 10 },
            { name: "点赞", max: 10 },
            { name: "出勤", max: 10 },
            { name: "时间", max: 10 }
          ],
          radius: 50, //大小
          center: ["50%", "50%"],
          name: {
            textStyle: {
              color: "#000000" // 文字颜色
            }
          },
          splitArea: {
            areaStyle: {
              color: [] //圆环颜色
            }
          }
        },
        series: [
          {
            type: "radar",
            data: [
              {
                value: this.radarData,
                areaStyle: {
                  normal: {
                    color: "#FF9141" // 选择区域颜色
                  }
                }
              }
            ]
          }
        ]
      };

      option && myChart.setOption(option);
      console.log(option);
    }
  },
  created() {
    this.organizationId="1499334486407147522";
    // this.organizationId = this.$route.params.id;
    this.getOrganization();
  },
};
</script>

<style scoped>
.organizationDetail {
  background-color: #f8f8f8;
  min-height: 100vh;
  overflow: hidden;
}
.main {
  width: 95%;
  margin: 0 auto;
}
.slide {
  width: 100%;
  margin: 10px auto;
  border-radius: 10px;
}
/deep/ .cube-slide-item > a > img {
  width: 100%;
  height: 150px;
  border-radius: 10px;
}
.br-label {
  border-left: #fc4426 5px solid;
  height: 20px;
  line-height: 20px;
  font-size: 12pt;
  margin: 10px 0;
  padding-left: 10px;
}
.border-line {
  background-color: #f5f5f5;
  height: 2px;
  margin: 0 10px;
}
.basic-info {
  display: flex;
  flex-direction: column;
  margin: 10px 0;
}
.basic-info .main-info {
  background-color: #ffffff;
  padding: 10px;
  margin-bottom: 10px;
}
.main-info .info-item {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
}
.main-info .info-item .label {
  vertical-align: middle;
  color: #797979;
  font-size: 11pt;
}
.main-info .info-item .value {
  vertical-align: middle;
  font-size: 11pt;
  text-align: right;
  width: 50%;
  white-space: pre-wrap;
}
.brief {
  background-color: #ffffff;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 11pt;
  line-height: 20px;
}
.general-container {
  height: 200px;
  background-color: #ffffff;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  z-index: 2;
}
.general-container .echarts {
  width: 70%;
  padding: 0;
  z-index: 3;
  display: flex;
  align-items: center;
}
.general-container .ranking-box {
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
.ranking-box .ranking-item {
  margin: 5px 10px;
  text-align: center;
  vertical-align: middle;
}
.ranking-box .ranking-item .general-label {
  color: #999999;
  margin: 10px;
  font-size: 10pt;
}
.ranking-box .ranking-item .score {
  color: #ff2b09;
  font-size: 14pt;
}
.ranking-box .ranking-item .ranking {
  color: #4ba0ff;
  font-size: 14pt;
}

.member-container {
  white-space: nowrap;
  background-color: #ffffff;
  margin-bottom: 20px;
  width: 100%;
  /*height: 300px;*/
  overflow-x: auto;
}
/deep/ .van-tabs--line .van-tabs__wrap{
  height: 100%;
}
/deep/ .van-tabs__line{
  display: none;
}
.list-item {
  display: inline-block;
  width: 60px;
  text-align: center;
  margin-right: 10px;
}
.user-img {
  width: 40px;
  margin: 10px 0;
  border-radius: 50%;
}
.user-name {
  font-size: 8pt;
  margin: 3px 0;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
}
.user-role {
  margin: 3px 0;
  font-size: 8pt;
  color: #999999;
}
.operator {
  margin-bottom: 30px;
  width: 100%;
  font-size: 12pt;
}
.apply-button {
  margin-top: 20px;
  align-self: center;
  width: 90%;
  height: 50px;
  background-color: #fc4426;
  color: #ffffff;
  border-radius: 20px;
  border-style: none;
  letter-spacing: 3px;
}
.operator-buttons {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}
.check-btn {
  width: 40%;
  border-style: none;
  letter-spacing: 3px;
  border-radius: 20px;
  background-color: #fc4426;
  color: #ffffff;
}
.manager-btn {
  width: 40%;
  border-style: none;
  letter-spacing: 3px;
  border-radius: 20px;
  background-color: #fc4426;
  color: #ffffff;
}
.my-swipe{
  height: 200px;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.my-swipe .img{
  height: 200px;
  width: 100%;
}
</style>
