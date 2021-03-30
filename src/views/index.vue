<template>
  <div class="Boxs wrap" v-show="isShow">
    <div class="main">
      <div class="dy-vidio">
        <div id="mse"></div>
      </div>
      <div class="dy-bg"></div>
      <div class="dy-content">
        <div class="dy-title flex middle">
          <img class="account_avatar" :src="vidioData.avatar" alt="" />
          <span class="dy-span overflow-dian">{{ vidioData.store_name }}</span>
        </div>
        <div class="dy-zwen">
          {{ vidioData.des }}
        </div>
      </div>
    </div>
    <button class="dy-footer" @click="goToDouYingShopping" v-preventReClick>
      <!-- <div class="dy-btn">发布视频</div> -->
      <div class="dy-btn">分享获好礼</div>
    </button>
  </div>
</template>

<script>
import Player from 'xgplayer';
import api from '@/api/user';
import validate from '../utils/validate';
export default {
  name: 'index',
  data() {
    return {
      title: '嗨知了',
      code: '', //授权
      state: '', //活动ID
      vidioData: {},
      share_url: '',
      dyuser_id: '', //用户ID
      isShow: false,
      timestamp: '',
    };
  },
  mounted() {
    var code = validate.getQueryVariable('code');
    // var state = validate.getQueryVariable('state');
    this.timestamp = new Date().getTime() + Math.random();
    console.log(code);
    if (code != null) {
      this.code = code;
    }
    // if (state != null) {
    //   this.state = state;
    // }
    // this.authorization();
    this.getVideo();
  },
  methods: {
    playVideo() {
      let player = new Player({
        id: 'mse',
        url: this.vidioData.video.url,
        fluid: true,
        height: 400,
        poster: this.vidioData.video.cover,
        // poster:
        //   'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599566325118&di=3b03de3fbf010f9055ec4bd5d24f529f&imgtype=0&src=http%3A%2F%2Fa1.att.hudong.com%2F66%2F36%2F14300000953850128253365526441.jpg',
      });
    },
    async getVideo() {
      let res = await api.getVideoData({
        code: this.code,
      });
      if (res.code == 0) {
        this.isShow = true;
        this.vidioData = res.data;
        this.playVideo();
      } else {
        // this.$toast(res.msg);
      }
    },
    async authorization() {
      let res = await api.login({ code: this.code });
      if (res.code == 0) {
        this.dyuser_id = res.data.dyuser_id;
        this.getVideo();
      } else {
        // this.$toast(res.msg);
      }
    },
    async sendVideo() {
      // setTimeout(() => {
      //   this.$toast.loading({
      //     message: '转发中...',
      //     forbidClick: true,
      //     duration: 5000,
      //   });
      // }, 1500);
      let res = await api.sendVideoData({
        code: this.code,
      });
      if (res.code == 0) {
        // this.$toast.loading({
        //   message: res.data.share_url,
        //   forbidClick: true,
        //   duration:0,
        // });
        this.share_url = res.data.share_url;
        let scheme = `${this.share_url}`;
        this.jumpApp(scheme);
        // window.location.href = `snssdk1128:/${this.share_url}?timestamp=${this.timestamp}`;
      } else {
        // this.$toast(res.msg);
      }
    },
    jumpApp(t) {
      // var e = navigator.userAgent.toLowerCase(),
      //   n = e.match(/cpu iphone os (.*?) like mac os/);
      // if (((n = null !== n ? n[1].replace(/_/g, '.') : 0), parseInt(n) >= 9)) {
      //   window.location.href = schema;
      // } else {
      //   var a = document.createElement('a');
      //   a.setAttribute('href', schema);
      //   a.click();
      //   document
      //     .querySelector('body')
      //     .append(
      //       "<iframe id='app_iframe' src='".concat(
      //         schema,
      //         "'style='display:none'></iframe>"
      //       )
      //     );
      // }

      try {
        var e = navigator.userAgent.toLowerCase(),
          n = e.match(/cpu iphone os (.*?) like mac os/);
        if (
          ((n = null !== n ? n[1].replace(/_/g, '.') : 0), parseInt(n) >= 9)
        ) {
          window.location.href = t;
        } else {
          var a = document.createElement('a');
          a.setAttribute('href', t);
          a.click();

          var r = document.createElement('iframe');
          (r.src = t), (r.style.display = 'none'), document.body.appendChild(r);
        }
      } catch (e) {
        window.location.href = t;
      }
    },

    goToDouYingShopping() {
      this.sendVideo();
      // window.location.href = 'snssdk1128://share/user/1767670736226221';
      // var tmp = 'snssdk1128://aweme/detail/1767670736226221';
      // app.startActivity({
      //   data: tmp,
      // });
    },
  },
};
</script>
<style>
.xgplayer-skin-default {
  border-radius: 10px;
  -moz-box-shadow: 2px 2px 5px #333333;
  -webkit-box-shadow: 2px 2px 5px #333333;
  box-shadow: 2px 2px 5px #333333;
}
.xgplayer-skin-default .xgplayer-poster {
  border-radius: 10px;
  -moz-box-shadow: 2px 2px 5px #333333;
  -webkit-box-shadow: 2px 2px 5px #333333;
  box-shadow: 2px 2px 5px #333333;
}
</style>
<style lang="less">
.Boxs {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  .dy-vidio {
    background-color: #0f0d0f;
    padding: 20px;
    padding-top: 40px;
    #id {
      border-radius: 10px;
    }
  }
  .dy-bg {
    background-color: #fff;
    width: 100%;
    height: 100px;
    border-radius: 200px 200px 0 0;
    margin-top: -100px;
  }
  .dy-content {
    padding: 40px;
    .dy-title {
      // border-bottom: 3px dashed #cccccc;
      // padding-bottom: 30px;
      img {
        width: 80px;
        height: 80px;
        background: transparent;
        border-radius: 50%;
      }
      .dy-span {
        font-size: 36px;
        color: #576b95;
        margin-left: 20px;
      }
    }
    .dy-zwen {
      padding-top: 20px;
      letter-spacing: 4px;
      font-size: 30px;
      text-align: left;
    }
  }
  .dy-footer {
    padding: 30px;
    .dy-btn {
      background-color: #cc1f03;
      height: 100px;
      border-radius: 50px;
      line-height: 100px;
      text-align: center;
      color: #fff;
      font-size: 32px;
      font-weight: bold;
    }
  }
}
</style>
<style>
button {
  margin: 0;
  padding: 0;
  outline: none;
  border-radius: 0;
  background-color: transparent;
  line-height: inherit;
  /* width: max-content; */
}
button:after {
  border: none;
}
</style>
