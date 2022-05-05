<template>
  <div class="CreateVolunteerBox">
    <topbar title="创建志愿"></topbar>

    <div class="contain">
      <van-form @submit="onSubmit">
        <van-field
            v-model="model.activityName"
            name="activityName"
            label="志愿主题"
            placeholder="请输入志愿主题"
            :rules="[{ required: true}]"
        />
        <van-field
            v-model="model.rewardPoints"
            type="number"
            name="rewardPoints"
            label="活动积分"
            placeholder="请输入活动积分"
            :rules="[{ required: true}]"
        />
        <van-field
            v-model="model.location"
            readonly clickable is-link
            name="location"
            label="活动所在地"
            placeholder="请选择活动地址"
            @click="showMap"
        />
        <van-field
            v-model="model.address"
            name="address"
            label="详细地址"
            placeholder="请输入详细地址"
            :rules="[{ required: true}]"
        />
        <van-field
            readonly clickable is-link
            name="startTime"
            v-model="model.startTime"
            label="活动开始时间"
            placeholder="选择活动开始时间"
            @click="showPicker($event,0)"
        />
        <van-field
            readonly clickable is-link
            name="endTime"
            v-model="model.endTime"
            label="活动结束时间"
            placeholder="选择活动结束时间"
            @click="showPicker($event,0)"
        />
        <van-field
            readonly clickable is-link
            name="attendanceStart"
            v-model="model.attendanceStart"
            label="打卡开始时间"
            placeholder="选择打卡开始时间"
            @click="showPicker($event,2)"
        />
        <van-field
            readonly clickable is-link
            name="attendanceEnd"
            v-model="model.attendanceEnd"
            label="打卡结束时间"
            placeholder="选择打卡结束时间"
            @click="showPicker($event,2)"
        />
        <van-field
            readonly clickable is-link
            name="type"
            :value="model.type.text"
            label="服务类型分类"
            placeholder="选择服务类型分类"
            @click="showPicker($event,1,0)"
        />
        <van-field
            readonly clickable is-link
            name="teamId"
            :value="model.teamId.text"
            label="所属组织"
            placeholder="选择所属组织"
            @click="showPicker($event,1,1)"
        />

        <div class="title">活动内容</div>
        <van-field
            v-model="model.activityInfo"
            rows="2"
            autosize
            type="textarea"
            maxlength="300"
            placeholder="请输入留言"
            show-word-limit
        />

        <div class="title">图片上传</div>
        <van-field name="imgsList">
          <template #input>
            <van-uploader v-model="model.imgsList" />
          </template>
        </van-field>

        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>

    <!--  时间选择  -->
    <pickers ref="showPicker"
             :title="title"
             :picker-title="pickerTitle"
             :picker-type="pickerType"
             :columns="this.optionType === 0? userTypeOption: teamOption"
             @onConfirm="pickerConfirm"
    />

  </div>
</template>

<script>
import topbar from "@/components/topbar/index.vue";
import pickers from "@/components/pickers/pickers";
import { insertActivity } from "@/api/activity";
import {getUserOrganizationInvolved} from "@/api/team";
const UTO = [
  {text:"定时性自愿者", value:"REGULAR_VOLUNTEER"},
  {text:"福利类自愿者", value:"WELFARE_VOLUNTEER"},
  {text:"辅助性自愿者", value:"AUXILIARY_VOLUNTEER"},
  {text:"其他类型志愿者", value:"OTHER"},
]
export default {
  components:{
    topbar,
    pickers
  },
  data() {
    return {
      model: {
        activityName: "",
        rewardPoints: "",
        address: "",
        location: "",
        startTime: null,
        endTime: "",
        attendanceStart: "",
        attendanceEnd: "",
        type: {},
        teamId: {},
        activityInfo: "",
        imgsList: [{ url: 'https://img01.yzcdn.cn/vant/leaf.jpg' }],

      },
      //选择器类型 0-时间选择器 1-usertype选择 2-teamId选择
      title:"",
      pickerType:0,
      pickerTitle:"",
      //选择数组  0-userTypeOption 1-teamOption
      optionType:-1,
      userTypeOption:UTO,
      teamOption:[],
    };
  },
  created() {
    getUserOrganizationInvolved().then(res =>{
      const data = res.data.data;
      data.forEach(item =>{
        this.teamOption.push({
          text:item.name,
          value:item.id
        })
      })
    })
  },
  methods: {
    onSubmit() {
      this.model.userId = `${
          JSON.parse(window.localStorage.getItem("userMsg")).userId
      }`;
      this.model.type = this.model.type.value;
      this.model.teamId = this.model.teamId.value;
      console.log('submit', this.model);

      insertActivity(this.model).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.$toast.success("创建成功")

          setTimeout(() => {
            this.$router.push("/myIssue");
            //延迟时间：3秒
          }, 2000);
        }
      });
    },
    //选择器函数
    showPicker(e,pickerType,optionType){
      this.title = e.target.placeholder;
      this.optionType = optionType;
      this.pickerType = pickerType;
      this.pickerTitle = e.target.name;
      this.$refs.showPicker.showPicker = true;
    },
    pickerConfirm(value,pickerTitle){
      for (let item in this.model){
        if(item === pickerTitle){
          this.model[item] = value;
        }
      }
    },

    // 定位地图
    showMap() {
      sessionStorage.setItem("pageMsg", JSON.stringify(this.model));
      // 跳转到定位界面
      this.$router.push({ name: "gpsPage", params: { from: "创建志愿" } });
    },

  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === "gpsPage") {
        vm.model = JSON.parse(sessionStorage.getItem("pageMsg"));
        vm.gpsMsg = vm.$route.params;
        console.log(vm.$route.params,"B",to, from)
        vm.model.location = vm.$route.params.address;
        vm.model.longitude =
            vm.$route.params.location && vm.$route.params.location.split(",")[0];
        vm.model.latitude =
            vm.$route.params.location && vm.$route.params.location.split(",")[1];
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.contain {
  background-color: #f5f5f5;
  padding: 20px 15px;
  min-height: 95vh;
  margin: 0;
}
.title {
  font-size: 15px;
  font-weight: bold;
  color: #333333;
  background-color: #f5f5f5;
  width: 100%;
  padding: 0;
  margin-top: 10px;
  margin-bottom: 5px;
}
</style>
