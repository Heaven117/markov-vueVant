<template>
  <div class="topBar">
    <van-nav-bar :title="title"
                 left-arrow
                 fixed
                 @click-left="back"
    >
      <template #right>
        <van-icon :name="rightIcon" size="18" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    rightIcon:String,
  },
  data() {
    return {
    };
  },
  computed: {

  },
  methods:{
    back(){
      this.$router.back()
    }
  }
};
</script>

<style scoped lang='scss'>
.topBar {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  font-weight: 900;
  text-align: center;
  background: white;
  position: sticky;
  z-index: 10;
  top: 0;
}

.back {
  position: absolute;
  left: 20px;
}

</style>
