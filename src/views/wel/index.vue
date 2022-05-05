<template>
  <div class="top">
    <ul class="top_content" @touchmove="touchmoves" ref="top3">
      <li class="menu_btn" v-for="item in topNav" :key="item.up.title">
        <span class="btn_logo">
            <img :src="item.up.url" alt="" @click="goView(item.up.to, item)" />
          </span>
        <span class="btn_title" @click="goView(item.up.to, item)">{{
            item.up.title
          }}</span>
        <span class="btn_logo">
            <img
                :src="item.down.url"
                :style="{ 'margin-top': '5px' }"
                alt=""
                @click="goView(item.down.to, item)"
            />
          </span>
        <span class="btn_title" @click="goView(item.down.to, item)">{{
            item.down.title
          }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
// topNav  图标
import img_account from "@/assets/img/home/account.png";
import img_course from "@/assets/img/home/course.png";
import img_feedback from "@/assets/img/home/feedback.png";
import img_gift from "@/assets/img/home/gift.png";
import img_news from "@/assets/img/home/news.png";
import img_notification from "@/assets/img/home/notification.png";
import img_questionaire from "@/assets/img/home/questionaire.png";
import img_organization from "@/assets/img/home/seek_organization.png";
import img_volunteer from "@/assets/img/home/seek_volunteer.png";
import img_test from "@/assets/img/home/test.png";
export default {
  name: "wel",
  data() {
    return {
      volunteer: [],
      top_scroll_items: [],
      too_many_btn: false,
      inputvalue: "",
      topNav: [
        {
          up: {
            url: img_volunteer,
            title: "做志愿",
            to: "/createVolunteer"
          },
          down: {
            url: img_organization,
            title: "找组织",
            to: "/createOrganization"
          }
        },
        {
          up: {
            url: img_course,
            title: "云课堂",
            to: "/cloudClassroom"
          },
          down: {
            url: img_test,
            title: "微测试",
            to: "/miniTestList"
          }
        },
        {
          up: {
            url: img_gift,
            title: "兑福利",
            to: "/exchangeBenefits"
          },
          down: {
            url: img_notification,
            title: "违规公示",
            to: "/violationList"
          }
        },
        {
          up: {
            url: img_account,
            title: "积分查询",
            to: "/IntegralQuery"
          },
          down: {
            url: img_feedback,
            title: "投诉建议",
            to: "/complaint/fromList"
          }
        },
        {
          up: {
            url: img_news,
            title: "新闻资讯",
            to: "/newslist"
          },
          down: {
            url: img_questionaire,
            title: "问卷调查",
            to: "/questionnaireList"
          }
        }
      ],
      myVolunteerNum: -1,
      myVolunteerNav: [],
      hotVolunteerNav: [],
      hotNewsNav: [],
      scrollLefts: "",
      scrollWidth: "",
      // 我参与的志愿
      participationVolunteerList: [],
      // 热门志愿
      hotVolunteerList: [],
      // 定位信息
      gpsmessage: {},
      // 当前地区有多少志愿者
      addressperson: 0
    };
  },
  components: {
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    goView(path) {
      if (path === "/") {
        this.$toast("功能即将上线，敬请期待~");
      }
      this.$router.push({
        path: path,
        query: {}
      });
    },
    touchmoves() {
      this.scrollLefts = this.$refs.top3.scrollLeft;
    },
    goNewsList() {
      this.$router.push({
        path: "/newsList"
        // query:{
        //   id: data.id
        // }
      });
    },
  },
};
</script>
<style scoped lang="stylus">
.main {
  width: 100%;
  /* height: 1400px; */
  background: #F8F8F8;
  letter-spacing: 1.5px;
  font-family: PingFang SC;
  font-weight: 500;
}

.input-box {
  width: 100%;
  text-align: center;
  flex:1;
}

.top_scroll_img {
  display: flex;
  flex-wrap: wrap;
  /* height: 355px; */
  background: #FFFFFF;
  border-radius: 10px

  .cube-slide {
    margin-left: 4%;
    width: 92%;
  }
}

.top {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  //margin-top: 16px;
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.select-box {
  display: flex;
  flex:1;
  border-radius: 10px;
  height: 30px;
  justify-content: center;
  margin: 0 13px;
  line-height: 30px;
  margin-bottom: 15px;
  margin-top: 15px;
}

.select-btn {
  flex-basis: 40px;
  background:#ffffff;
}

.input-box::-webkit-input-placeholder{
  text-align: center;
}

.selecticon-box {
  position: relative;
  left: -10px;
  display: flex;
  align-items: center;
  opacity: 0.7;
}

.selecticon {
  width: 15px;
}

.select-input {
  position: relative;
  left: -10px;
  width: 80%;
  background: #eaeaea;
  text-align: center;
}

.top_content {
  margin-left: 2%;
  width: 96%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 1px
  padding-bottom: 7px;
  overflow-y: hidden;
  overflow-x: hidden;
  //margin :auto
  //overflow-x: visible;

  //box-sizing: border-box;
  /* border: 1px solid rgba(237, 239, 244, 1); */
  //border-radius: 4px;

  .btn_logo {
    width: 75px
    height: 75px

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .btn_title {
    font-family: PingFang SC;
    margin-top: 3px;
    text-align: center;
    color: #333333;
    font-size: 11px;
    font-weight: bold;
    font-style: normal;
    letter-spacing: 1px;
    width: 100%;
    height: 15px;
  }
}

.top_3_content::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.div-soller {
  width: 80px;
  height: 5px;
  background-color: #6b6b6b45;
  margin: 10px auto 20px;
  border-radius: 5px;
}

.soller {
  position: relative;
  height: 100%;
  background-color: #3e7cff;
  border-radius: 5px;
}

.menu_btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* position: relative; */
  min-width: 20%;
}


.center {
  padding-left: 4%;
  padding-right: 4%;
  padding-top: 10px;
  padding-bottom: 45px
}

.center_1,
.center_2,
.center_3,
.center_4 {
  background: #FFFFFF;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 15px;
  margin-bottom: 20px;
  border-radius: 10px;
  padding-bottom: 10px;
}

.center_1 {
  margin-top: 10px;
}

.center_1_top,
.center_2_top,
.center_3_top {
  display: flex;
  width: 100%;
  align-items: center;

  .center-title {
    margin-left: 5px;
    font-family: PingFang SC;
    color: #333333;
    font-weight: bold;
    font-size: 13px;
  }
}

.color_block1 {
  width: 2px;
  height: 16px;
  background-color: #FC4426;
}

.color_block2 {
  width: 2px;
  height: 16px;
  background-color: #FC4426;
}

.color_block3 {
  width: 2px;
  height: 16px;
  background-color: #FC4426;
}

.center_1_top_right,
.center_2_top_right,
.center_3_top_right {
  font-size: 12px;
  margin-left: auto;
  display: flex;
  color: #999999;
}

.info_div {
  display: flex;
  align-items: center;
  margin-top: 15px;
  //padding: 1px;
  border-bottom: 1px solid #F8F8F8;
}

.info_div:first-child {
  margin-top: 0;
}

.bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  //height: 40px;
  background: #FFFFFF;
}
</style>
