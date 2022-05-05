<template>
  <div class="CreateOriganizationBox">
    <topbar title="创建组织"></topbar>

    <div class="contain">
      <van-form @submit="onSubmit">
        <van-field
            v-model="model.name"
            name="name"
            label="组织名字"
            placeholder="请输入组织名字"
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
            v-model="model.slogan"
            name="slogan"
            label="组织口号"
            placeholder="请输入组织口号"
            :rules="[{ required: true}]"
        />
        <van-field
            name="typeList"
            label="组织类型"
        >
          <template #input>
            <van-checkbox-group v-model="model.typeList" >
              <van-checkbox v-for="item in typeListOption"
                            :key="item"
                            :name="item" shape="square"
                            class="checkbox"
              >
                {{item}}
              </van-checkbox>
            </van-checkbox-group>
          </template>
        </van-field>

        <div class="title">条件说明</div>
        <van-field
            name="conditionInstruction"
            v-model="model.conditionInstruction"
            rows="2"
            autosize
            type="textarea"
            maxlength="300"
            placeholder="请输入条件说明"
            show-word-limit
        />
        <div class="title">审核说明</div>
        <van-field
            name="auditInstruction"
            v-model="model.auditInstruction"
            rows="2"
            autosize
            type="textarea"
            maxlength="300"
            placeholder="请输入审核说明"
            show-word-limit
        />
        <div class="title">志愿者详情</div>
        <van-field
            name="info"
            v-model="model.info"
            rows="2"
            autosize
            type="textarea"
            maxlength="300"
            placeholder="请输入志愿者详情"
            show-word-limit
        />

        <div class="title">图片上传</div>
        <van-field name="photo">
          <template #input>
            <van-uploader v-model="model.photo"
                          :max-size="1 * 1024 * 1024"
                          @oversize="onOversize"/>
          </template>
        </van-field>
        <div class="title">图片介绍</div>
        <van-field
            name="photoIntroduction"
            v-model="model.photoIntroduction"
            rows="2"
            autosize
            type="textarea"
            maxlength="300"
            placeholder="请输入图片介绍"
            show-word-limit
        />

        <div class="title">徽标上传</div>
        <van-field name="teamLogo">
          <template #input>
            <van-uploader v-model="model.teamLogo"
                          :max-count="1"
                          :max-size="1 * 1024 * 1024"
                          @oversize="onOversize"
            />
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
             :columns="colunmsOption"
             @onConfirm="pickerConfirm"
    />

  </div>
</template>

<script>
import topbar from "@/components/topbar/index.vue";
import pickers from "@/components/pickers/pickers";
import {insertTeam,getTeamTypeListOption} from "@/api/team";

export default {
  components:{
    topbar,
    pickers
  },
  data() {
    return {
      typeListOption: [],
      model: {
        creatorId: JSON.parse(window.localStorage.getItem("userMsg")).userId,
        creatorName: JSON.parse(window.localStorage.getItem("userMsg")).userName,
        name: "",
        address: "",
        location: "",
        slogan:"",
        conditionInstruction:"",
        auditInstruction:"",
        info: "",
        typeList: [],
        photo: [],
        photoIntroduction:"",
        teamLogo:[],
      },
      //选择器类型 0-日期选择器 1-单列选择 2-时分选择
      title:"",
      pickerType:0,
      pickerTitle:"",
      //选择数组  0-typeListOption
      optionType:-1,
    };
  },
  created() {
    getTeamTypeListOption().then( res =>{
      this.typeListOption = res.data;
    })
  },
  methods: {
    onSubmit() {
      this.model.userId = `${
          JSON.parse(window.localStorage.getItem("userMsg")).userId
      }`;
      console.log('submit', this.model);
      insertTeam(this.model).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.$toast("创建成功");
          setTimeout(() => {
            this.$router.push("/wel/index");
            //延迟时间：3秒
          }, 2000);
        } else {
          this.$toast("创建失败");
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
      sessionStorage.setItem("organizationMsg", JSON.stringify(this.model));
      // 跳转到定位界面
      this.$router.push({ name: "gpsPage", params: { from: "创建组织" } });
    },
    //图片大小限制
    onOversize(file){
      console.log(file)
      this.$toast('文件大小不能超过 1MB');
    }

  },
  computed:{
    colunmsOption(){
      switch (this.optionType) {
        case 0:{
          return this.typeListOption;
        }
      }
      return null;
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === "gpsPage") {
        vm.model = JSON.parse(sessionStorage.getItem("organizationMsg"));
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
.checkbox{
  margin: 10px 0;
}
</style>
