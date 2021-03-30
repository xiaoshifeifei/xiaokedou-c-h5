<template>
  <div class="calendar">
    <div class="inner">
      <div class="month-bar">
        <van-icon name="arrow-left" size="18" color="#000" @click="onMonth(-1)"></van-icon>
        <span class="month">{{calendar.month}}</span>
        <van-icon name="arrow" size="18" color="#000" @click="onMonth(+1)"></van-icon>
      </div>
      <div class="week-bar">
        <span class="week" v-for='item in ["日","一","二","三","四","五","六"]' :key="item">{{item}}</span>
      </div>
      <div class="days" ref="ref_days" :style="{height: calendar.height+'px'}">
        <div
          ref="ref_day"
          class="wrapper"
          :class="{'inline':data_days[day],'day_active':day_i === i}"
          v-for="(day,i) in calendar.days"
          :key="i"
          @click="onDay(i)"
        >
          <i :class="isJoinLine(day,i)"></i>
          <div class="day" :class="i < calendar.week ? 'disabled':''">{{day}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props:{
    year:{
      type:[String,Number],
      default: new Date().getFullYear()
    },
    month:{
      type:[String, Number],
      default: new Date().getMonth() + 1
    }
  },
  data() {
    return {
      calendar: {
        year: 2012,
        month: 5,
        week: 0,
        time:'',
        days: [],
        height: 0,
        isScroll:false,
      },
      data_days:{
        2:{join_line:true},
        3:{join_line:true},
        4:{join_line:true},
        5:{join_line:true},
        6:{join_line:true},
        7:{join_line:true},
        8:{join_line:false},
        10:{}
      },
      day_i: null
    };
  },
  computed: {},
  mounted(){
     this.$nextTick(()=>{
       this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 滚动条偏移量
       window.addEventListener('scroll',this.onPageScore,false)
       const {year,month} = this
       this.initCalendar(year,month)
     })
     this.initData()
  },
  destroyed(){
      window.removeEventListener('scroll',this.onPageScore)
  },
  methods: {
    // 初始化 日历数组
    initCalendar(year, month) {
      this.calendar.year = year;
      this.calendar.month = month;
      // 获取当月第1天 星期几 = 上月剩下天数
      let week = this.getWeek(`${year},${month},1`);
      //获取当月天数
      let monthDays = this.getMonthDays(year, month);
      // 总天数 = 上月天数 + 当月天数
      let days = [];
      for (let i = 0; i < week + monthDays; i++) {
        let day = 0;
        if (i < week) {
          day = this.getPrevMonthDay(i);
        } else {
          day = i - week + 1;
        }
        days.push(day);
      }
      this.calendar.days = days;
      this.$nextTick(() => {
        this.initDom(week + monthDays);
      });
    },
    // 初始化 日期框 高度
    initDom(count) {
      let dom_day = this.$refs.ref_day[0];
      // 总高度
      this.calendar_h_max = Math.ceil(count / 7) * dom_day.offsetHeight;
      // 一行高度
      this.calendar_h_min = dom_day.offsetHeight;
      this.calendar.height = this.calendar_h_max;
    },
    // 日历滚动高度事件
    onPageScore() {
      this.calendar.isScroll = true;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop; // 滚动条偏移量
      let d = scrollTop - this.scrollTop;
      this.scrollTop = scrollTop;
      if (d < 0 && scrollTop > this.calendar_h_max)
        return (this.calendar.height = this.calendar_h_min);
      let { height } = this.calendar;
      let h = this.calendar_h_max - this.calendar_h_min;
      height -= d;
      if (height < this.calendar_h_min) height = this.calendar_h_min;
      else if (height > this.calendar_h_max) height = this.calendar_h_max;
      this.calendar.height = height;
    },
    getWeek(date) {
      let T = new Date(date);
      let week = T.getDay();
      this.calendar.week = T.getDay();
      this.calendar.time = T.getTime();
      return week;
    },
    // 获取上月剩于 日期
    getPrevMonthDay(index) {
      let { week, time } = this.calendar;
      let t = time - 24 * 3600 * 1000 * (week - index);
      let T = new Date(t);
      return T.getDate();
    },
    getMonthDays(year, month) {
      let isLeapYear = this.isLeapYear(year);
      switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          return 31;
          break;
        case 2:
          return isLeapYear ? 29 : 28;
          break;
        default:
          return 30;
          break;
      }
    },
    isLeapYear(year) {
      return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
    },
    onMonth(value) {
      let { year, month } = this.calendar;
      if ((month > 1 && value < 0) || (month < 12 && value > 0)) {
        month = parseInt(month) + value;
        this.day_i = null;
        this.calendar.month = month;
        this.calendar.height = this.calendar_h_max;
        this.initCalendar(year, month);
        this.$emit('onMonth',{year,month})
        this.initData()
      }
    },
    onDay(i) {
      const {year, week,month,days} = this.calendar;
      if (i < week) return;
      this.day_i = i;
      this.calendar.height = this.calendar_h_max;
      this.$emit('onDay',{year,month,day:days[i]})
    },
    isJoinLine(day, i) {
      const { data_days } = this;
      if (data_days[day] && data_days[day].join_line && (i + 1) % 7 !== 0) {
        return "join-line";
      }
      return "";
    },

    initData(){
      let arr = []
      for(let i = 0; i<10; i++){
        let d = this.getDay(arr)
        arr.push(d)
      }
      arr.sort( (a,b) => a-b)
      console.log(arr)
      let temp = []
      let start = arr[0]
      let data = []
      for ( let i = 0 ; i < arr.length; i++){
        if(start === arr[i]){
          temp.push(arr[i])
          start ++
          continue
        }else{
          data.push(temp)
          temp = [arr[i]]
          start = arr[i] +1
        }
      }
      data.push(temp)
      console.log(data)
      let dataObj = {}
      data.forEach( a => {
        a.forEach( (d,i) => {
          dataObj[d] = {}
          if(i === a.length -1){
            dataObj[d].join_line = false
          }else{
            dataObj[d].join_line = true
          }
        })
        
      })
      this.data_days = dataObj
      console.log(dataObj)
    },
    getDay(arr){
      let d = this.getRandom(1,28)
      let bool = arr.some( v => v===d)
      return bool ? this.getDay(arr) : d
    },
    getRandom(min,max){
      return Math.floor(Math.random()*max + min)
    }
  }
};
</script>
<style lang='scss' scoped>
$c-bg: #f8f8f8;
$c-primary: #146eeb;
$c-light: #999;
.calendar {
  background: white;
  padding-top: 30px;
  box-shadow: 0 3px 10px 3px $c-bg;
  .inner {
    width: 350px;
    margin: 0 auto;
  }
  .month-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    .month {
      font-size: 22px;
    }
  }
  .week-bar {
    display: flex;
    align-items: center;
    .week {
      width: 50px;
      text-align: center;
      padding-bottom: 30px;
      border-bottom: 1px solid #ccc;
    }
  }
  .days {
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    transition: height 0.3s;
    .wrapper {
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 0;
      .join-line {
        position: absolute;
        width: 100%;
        height: 30px;
        top: 10px;
        left: 50%;
        z-index: -1;
        background: #98c1f1;
      }
      .day {
        width: 30px;
        height: 30px;
        line-height: 30px;
        border-radius: 50%;
      }
      &.inline {
        .day {
          color: white;
          background: #98c1f1;
        }
      }
      &.day_active {
        .day {
          color: white;
          background: $c-primary;
          transition: all 0.3s;
        }
      }
    }

    .disabled {
      color: $c-light;
    }
  }
}
</style>