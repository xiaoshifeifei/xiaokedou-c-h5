<template>
  <div class="wrap" style="position: relative;">
    <div class="main">
      <div class="bglutu">
        <div class="top">
          <img src="../../assets/img/dkyy.png" />
          <p class="p2">小客抖</p>
          <p class="p3">让你的店铺流量飞起来</p>
        </div>
      </div>

      <!-- v-if="browser.versions.android" -->
      <div @click="android()" class="bottom">
        <img src="../../assets/img/android.png" alt />
      </div>
      <!-- <div @click="android()" v-if="browser.versions.ios" class="bottom" >
        <img
          src="https://hzlimg.oss-cn-hangzhou.aliyuncs.com/zhiliao/202007/23/20200723165025.png"
          alt
        />
      </div> -->
    </div>
    <div v-if="flag" class="zhez">
      <img class="right-share" src="../../assets/img/rightbg.png" alt />
    </div>
  </div>
</template>

<script>
import api from '@/api/user';
import validate from '../../utils/validate';
export default {
  data() {
    return {
      url:
        'http://bytetest.oss-cn-zhangjiakou.aliyuncs.com/client/20200921/166c27cc3021adc2e53eeaa99b243c06.apk',
      browser: {
        versions: {
          android: '',
          ios: '',
        },
      },
      msg: '',
      flag: '',
      oldUrl: '',
      qdId: '',
      versionNoType: '',
    };
  },
  //   beforeRouteEnter(to, from, next) {
  //     next(vm => {
  //       vm.oldUrl = from.path;
  //     });
  //   },
  mounted() {
    // this.$nextTick(() => {
    //     if (this.oldUrl == '/') {
    //         this.$toast({
    //             message: '您好，您还未报名，请联系渠道商进行报名！！！',
    //             duration: 5000
    //         });
    //         return false
    //     } else {
    //         this.Down();
    //     }
    // })

    // var str=window.location.href
    // if(str.indexOf('from=singlemessage')!=-1){
    //   window.location.href='http://lutuchoujiangweb.hizhiliao.cn/#/down?'
    // }

    // var qdCode = validate.getQueryVariable('qdId');
    // this.qdId = qdCode;

    this.flag = this.isWeixin();
    this.browser = {
      versions: (function() {
        var u = navigator.userAgent,
          app = navigator.appVersion;
        return {
          //移动终端浏览器版本信息
          trident: u.indexOf('Trident') > -1, //IE内核
          presto: u.indexOf('Presto') > -1, //opera内核
          webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
          mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
          iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
          iPad: u.indexOf('iPad') > -1, //是否iPad
          webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        };
      })(),
      language: (navigator.browserLanguage || navigator.language).toLowerCase(),
    };
    // if (this.qdId == null) {
    //   this.$toast({
    //     message: "您好，您还未报名，请联系渠道商进行报名！！！",
    //     duration: 5000
    //   });
    //   return false;
    // }

    if (this.browser.versions.mobile) {
      var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
      if (this.browser.versions.ios) {
        this.versionNoType = 1;
      }
      if (this.browser.versions.android) {
        this.versionNoType = 0;
      }
    } else {
      this.versionNoType = 0;
    }

    this.Down();
  },
  methods: {
    // iphone() {
    //   alert("该应用只支持android");
    // },
    android() {
      // window.location.href = this.url;
      // if (this.isWeixin()) {
      //   alert("请点击右上角通过浏览器打开");
      // } else {
      //   //是否在安卓浏览器打开
      //   window.location.href = this.url;
      // }

      if (this.browser.versions.mobile) {
        var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
        if (this.browser.versions.ios) {
          //是否在IOS浏览器打开
          alert('该应用只支持android');
        }
        if (this.browser.versions.android) {
          // if (this.isWeixin()) {
          //   alert("请点击右上角通过浏览器打开");
          // } else {
          //   //是否在安卓浏览器打开
          //   window.location.href = this.url;
          // }
          if (this.url != '') {
            window.location.href = this.url;
          } else {
            this.$toast('您好，当前无最新版本');
          }
        }
      } else {
        if (this.url != '') {
          window.location.href = this.url;
        } else {
          this.$toast('您好，当前无最新版本');
        }
      }
    },
    isWeixin() {
      var ua = navigator.userAgent.toLowerCase();
      console.log(ua);
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
      } else {
        return false;
      }
    },
    async Down() {
      let res = await api.down({
        client_system: 0,
      });
      if (res.code == 0) {
        this.url = res.data.url;
      } else {
        this.$toast(res.msg);
      }
    },
  },
};
</script>
<style scoped>
body,
div,
button,
span,
p,
a {
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.bglutu {
  width: 100%;
  height: 760px;
  background-image: url('../../assets/img/dkybg.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.top {
  /* padding-left: 60px;
  padding-top: 40px; */
  padding-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.top img {
  width: 128px;
  height: 128px;
  float: left;
}

.top .right {
  float: left;
  margin-left: 30px;
}

.p1 {
  width: 40px;
  height: 8px;
  background: rgba(21, 119, 180, 1);
  opacity: 1;
  border-radius: 6px;
  margin-top: 20px;
}

.p2 {
  font-size: 36px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: left;
}

.p3 {
  font-size: 26px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  opacity: 0.8;
}

.bottom {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: 18%;
  cursor: pointer;
}

.bottom img {
  width: 400px;
  height: 100px;
}

.right-share {
  position: absolute;
  right: 0;
  top: 0;
  width: 520px;
  height: 500px;
  /* background-color:#333;
  opacity: 0.8; */
}

.zhez {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: table;
  visibility: visible;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
