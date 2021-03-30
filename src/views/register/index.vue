<template>
  <div class="Box1 wraps">
    <div class="mains">
      <img class="imgone" src="../../assets/img/dkytitle.png" alt />
      <!-- <img class="imgtwo" src="../../assets/img/newtwo.png" alt /> -->
      <div class="imgtwo">
        不用愁店铺流量，不用愁客户营销， 这里通通给你解决！
      </div>
      <div class="from-box flex middle center">
        <div class="from">
          <div class="input-box flex middle center">
            <div class="from-input" style="flex:1;">
              <van-field
                v-model="phone"
                placeholder="请输入手机号"
                error-message
                type="number"
              />
            </div>
          </div>
          <div class="input-box flex middle center">
            <div class="from-input" style="flex:1;">
              <van-field
                v-model="password"
                placeholder="请输入6-20位密码"
                error-message
              />
            </div>
          </div>

          <div class="input-box flex middle center">
            <div class="from-input" style="flex:1;">
              <van-field
                v-model="code"
                placeholder="请输入验证码"
                error-message
                type="number"
              />
            </div>
            <div v-if="isShowGetCode" @click="getCode()" class="code-btn">
              获取验证码
            </div>
            <div v-else class="code-btn">已获取({{ countdown }}s)</div>
          </div>

          <div class="input-box flex middel center">
            <div @click="signUp" class="from-inputh flex middle center">
              立即注册
            </div>
          </div>
        </div>
        <!-- <div v-else class="activity-no">
          <p style="color:#fff;">{{ text }}</p>
          <img src="../../assets/img/noactivity.png" alt />
        </div> -->
      </div>
      <!-- <img class="imgthree" src="../../assets/img/newthree.png" alt /> -->
    </div>
    <div class="myClass" @click="xiazai">
          已注册，直接下载
        </div>
    <!-- 弹窗 -->
    <div class="message" v-if="isSuccess">
      <div class="message-dialog">
        <div class="message-content">
          <div class="message-header">
            <img src="../../assets/img/titleicon.png" alt />
          </div>
          <div class="message-body">
            <div class="message-body-content">
              <p class="message-title">注册成功</p>
              <p class="message-xq">
                下载小客抖即可聚焦用户群体和增加粉丝粘性，登录需与提交用户信息一致哦！
              </p>
            </div>
          </div>
          <div class="message-footer flex middle center">
            <div @click="goToDown()" class="message-bg-box message-bg">
              立即下载
            </div>
          </div>
        </div>
        <img
          @click.prevent="closeBtn()"
          class="close"
          src="../../assets/img/close.png"
          alt
        />
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/user';
import validate from '../../utils/validate';
export default {
  data() {
    return {
      isNo: false,
      id: '',
      intermeId: '',
      huoDongSm: '',
      phone: '',
      code: '',
      password: '',
      countdown: 60,
      timer: '',
      isShowGetCode: true,
      isSuccess: false,
      isCanjia: false,
      isEnd: false,
      tel: '18060703873',
      text: '暂无活动!',
      type: '',
      yqCode: '', //邀请
      qdId: '',
      ysfexclusivelink: '',
      downUrl: '',
    };
  },
  mounted() {
    let yqCode = validate.getQueryVariable('yq_code');
    console.log(yqCode)
    if (yqCode != null) {
      this.yqCode = yqCode;
    }else{
      this.$toast.loading({
        message:'啊哦,您还没有邀请码!',
        forbidClick:true,
        icon: 'like-o',
        duration:0
      })
    }
  },
  methods: {
     xiazai(){
      this.$router.push({ path: `/down` })
    },
    closeBtn() {
      this.isSuccess = false;
      this.phone = '';
      this.code = '';
    },

    async getCode() {
      if (!validate.mobile(this.phone, this)) {
      } else {
        this.countDown();
        this.isShowGetCode = false;
        let res = await api.getCode({ tel: this.phone });
        if (res.code == 0) {
          this.$toast({
            message: res.msg,
            duration: 2000,
          });
        } else {
          this.$toast(res.data);
        }
      }
    },
    countDown() {
      const self = this;
      this.timer = setInterval(() => {
        self.countdown--;
        if (self.countdown === 0) {
          clearInterval(self.timer);
          self.countdown = 60;
          self.isShowGetCode = true;
        }
      }, 1000);
    },

    async signUp() {
      if (!validate.mobile(this.phone, this)) {
      } else {
        let passwordValid = validate.passwordValid(this.password);
        if (passwordValid.bPwd && passwordValid.degreeNumber == 1) {
        } else {
          console.log(passwordValid)
          this.$toast(passwordValid.msg);
          return false;
        }
        if (this.code == '') {
          this.$toast('请输入验证码');
          return false;
        }
        let res = await api.signUp({
          tel: this.phone,
          password: this.password,
          code: this.code,
          yq_code: this.yqCode,
        });
        if (res.code == 0) {
          this.isSuccess = true;
          // this.downUrl = res.data.mzlAppDownload;
        } else {
          // this.$toast(res.msg);
        }
      }
    },
    closeMsg() {
      this.isCanjia = false;
      this.phone = '';
      this.code = '';
    },
    closeMsg1() {
      this.isCanjia = false;
    },
    goToDown() {
      // window.location.href = this.downUrl;
      this.$router.push({ path: `/down` });
    },
    callPhone() {
      // window.location.href = "tel://" + phoneNumber ;
      this.$router.push({
        path: `/huodonglc/${this.id}/${this.qdId}`,
      });
    },
  },
};
</script>
<style>
.Box1 .van-field__control {
  color: #999 !important;
}
.Box1 input[type='text']::placeholder {
  color: #999 !important;
}
</style>
<style scoped lang="less" type="text/less">
.Box1 {
  width: 100%;
  min-height: 100%;
  z-index: 1;
  // background-color: #e84143;

  background-image: url('../../assets/img/dkyboxBg.png');

  // background-image: url('../../assets/img/hdbg.png');

  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  .title {
    padding-top: 40px;
    position: relative;
    height: 730px;
    .pc {
      background: linear-gradient(180deg, #ffffff, #ffc280);
      -webkit-background-clip: text;
      color: transparent;
      font-weight: bold;
      letter-spacing: 5px;
      // text-shadow: 5px 2px 2px #fff #ffc280;
    }
    .p1 {
      font-size: 105px;
    }
    .p2 {
      font-size: 80px;
      // margin-top: 10px;
      margin-bottom: 30px;
    }
    .pcx {
      font-size: 37px;
      font-family: HYYakuHei, HYYakuHei-75W;
      font-weight: bold;
      color: #ffcf9b;
      text-shadow: 0px 9px 8px 0px rgba(240, 51, 40, 0.5);
      letter-spacing: 5px;
    }
    .p3 {
      margin-bottom: 20px;
    }
    .p4 {
      margin-bottom: 100px;
    }
    .bannerBox {
      padding: 0 60px;
      .banner {
        height: 117px;
        line-height: 100px;
        text-align: center;
        background-image: url('../../assets/img/banner.png');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        font-size: 26px;
        font-family: FZLanTingHei-B-GBK, FZLanTingHei-B-GBK-Regular;
        font-weight: bold;
        color: #ffea97;
        letter-spacing: 2px;
      }
    }
    .phone-btn {
      position: absolute;
      // top: -120px;
      right: 0;
      width: 110px;
      height: 110px;
      background-image: url('../../assets/img/btnphone.png');
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
  .mains {
    // background-color: #fff1b6 !important;
    .imgone {
      margin-top: 130px;
      width: 622px;
      height: 268px;
    }
    .imgtwo {
      margin-top: 50px;
      margin-bottom: 67px;
      text-align: center;
      font-size: 36px;
      font-family: PingFang SC;
      font-weight:bold;
      color: #ffffff;
      opacity: 1;
      padding: 0 90px;
      letter-spacing: 3px;
    }
    .imgthree {
      width: 610px;
      height: 376px;
      margin-top: 30px;
    }
    .zanw {
      height: 600px;
      width: 100%;
    }
    .huodong {
      margin-top: 120px;
      .title-huodong {
        font-size: 40px;
        font-family: Source Han Sans CN, Source Han Sans CN-Bold;
        font-weight: bold;
        text-align: center;
        color: #e74435;
      }
      .text-box {
        padding-left: 111px;
        padding-right: 100px;
        padding-top: 20px;
        letter-spacing: 10px;
        .div-html {
          font-size: 32px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: bold;
          text-align: left;
          color: #e74435;
          line-height: 39px;
        }
        p {
          font-size: 32px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: bold;
          text-align: left;
          color: #e74435;
          line-height: 39px;
        }
        .p-middle {
          margin-top: 10px;
          margin-bottom: 10px;
        }
      }
    }
    .from-box {
      // margin-top:10px;
      // position: relative;
      .activity-no {
        img {
          width: 346px;
          height: 286px;
        }
        p {
          margin-top: 35px;
          font-size: 26px;
          font-family: Source Han Sans CN, Source Han Sans CN-Bold;
          font-weight: 700;
          text-align: center;
          color: #e74435;
        }
      }
      .from {
        // width: 750px;
        // height: 546px;
        // background-image: url("../../assets/img/frombg.png");
        // background-position: center;
        // background-size: 100% 100%;
        // background-repeat: no-repeat;
        width: 550px;
        // height: 199px;
        background: #eef2ff;
        border-radius: 10px;
        // position:absolute;
        // top: 50%;
        // left: 50%;
        // transform: translate(-50%,-50%);
        .from-title {
          margin-top: 70px;
          img {
            width: 32px;
            height: 32px;
          }
          .from-text {
            margin-left: 20px;
            margin-right: 20px;
            font-size: 35px;
            font-family: PingFang SC, PingFang SC-Bold;
            font-weight: bold;
            color: #333333;
          }
        }
        .input-box {
          margin-top: 15px;
          padding: 0 20px !important;
          margin-bottom: 15px;
          .from-input {
            width: 580px;
            // height: 76px;
            background: #fff !important;
            font-size: 28px;
            .van-cell {
              background: #fff !important;
              height: 36px;
              padding: 0;
              padding-top: 7px;
              padding-left: 10px;
              color: #999999 !important;
              // border-radius: 15px;
            }
          }
          .from-inputh {
            width: 580px;
            height: 75px;
            background: #4D77F5 !important;
            color: #fff;
            border-radius: 10px;
            font-size: 28px !important;
          }
          .code-btn {
            width: 200px;
            height: 75px;
            line-height: 80px;
            text-align: center;
            background: #4D77F5;
            border-radius: 10px;
            color: #ffffff;
            margin-left: 10px;
            font-size: 28px;
          }
          .new-input {
            padding-left: 20px;
            width: 100%;
            height: 76px;
            border-radius: 10px;
          }
        }
      }
    }
  }

  // 弹窗
  // 弹窗
  .message {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: table;
    visibility: visible;
    background-color: rgba(0, 0, 0, 0.6);
    .message-dialog {
      width: 622px;
      height: 495px;
      background: #ffffff;
      border-radius: 20px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 9999;
      .close {
        position: absolute;
        left: 50%;
        bottom: -120px;
        transform: translateX(-50%);
        z-index: -1;
        height: 200px;
      }
      .message-content {
        max-width: 540px;
        margin: 0px auto;
        background-color: #fff;
        border-radius: 20px;
        box-sizing: border-box;
        .message-header {
          img {
            margin-top: -112px;
            width: 320px;
            height: 224px;
          }
        }
        .message-body {
          position: relative;
          max-height: 300px;
          overflow: auto !important;
          .message-body-content {
            .message-title {
              text-align: center;
              font-size: 32px;
              font-family: PingFang SC, PingFang SC-Bold;
              font-weight: bold;
              text-align: center;
              color: #333333;
              margin-bottom: 32px;
              margin-top: 35px;
            }
            .message-xq {
              margin-bottom: 70px;
              font-size: 24px;
              font-family: PingFang SC, PingFang SC-Regular;
              text-align: center;
              color: #333333;
            }
          }
        }
        .message-footer {
          margin-bottom: 46px;
          .message-bg-box {
            height: 76px;
            line-height: 76px;
            background-image: url('../../assets/img/btn.png');
            background-position: center;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            color: #fff;
            font-size: 28px;
            font-family: PingFang SC, PingFang SC-Bold;
            font-weight: bold;
            text-align: center;
          }
          .message-bg {
            width: 542px;
          }
          .message-new {
            width: 311px;
          }
          .message-new-xz {
            width: 200px;
            margin-left: 20px;
          }
        }
      }
    }
  }
}
.wraps {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  // height: 100%;
}
.popup-noprize {
  width: 80%;
  height: 300px;
  .popupContent-img1 {
    font-size: 32px;
    font-weight: 700;
  }
  .popupContent-1 {
    width: 80%;
    height: 70px;
    margin: 60px auto 0;
    border-radius: 25px;
    line-height: 70px;
    font-size: 30px;
    font-weight: 700;
    background-color: yellow;
  }
}
.myClass {
  width: 250px;
  height: 50px;
  line-height: 51px;
  margin-left: 18%;
  text-align: center;
  margin-top: 20px;
  font-size: 25px;
  color: #fff;
  font-weight: 700;
  background-color: #4D77F5;
  border-radius: 5px;
}
</style>
