<template>
  <div class="cal_con">
    <div class="cal_header">
      <div class="cal_h_left">
        <div
          class="cal_h_btn"
          @click="preYear"
        >
          <svg class="cal_h_l_icon">
            <polyline
              points="6,0 2,4 6,8"
              style="fill:none;stroke:#909399;stroke-width:1"
            />
            <polyline
              points="10,0 6,4 10,8"
              style="fill:none;stroke:#909399;stroke-width:1"
            />
          </svg>
        </div>
        <div
          class="cal_h_btn"
          @click="preMonth"
        >
          <svg class="cal_h_l_icon">
            <polyline
              points="6,0 2,4 6,8"
              style="fill:none;stroke:#909399;stroke-width:1"
            />
          </svg>
        </div>
      </div>

      <div>
        <span class="cal_h_time">{{ year }} 年 </span>
        <span class="cal_h_time">{{ month }} 月</span>
      </div>

      <div class="cal_h_left">
        <div
          class="cal_h_btn"
          @click="nextMonth"
        >
          <svg class="cal_h_l_icon">
            <polyline
              points="2,0 8,4 2,8"
              style="fill:none;stroke:#909399;stroke-width:1"
            />
          </svg>
        </div>
        <div
          class="cal_h_btn"
          @click="nextYear"
        >
          <svg class="cal_h_l_icon">
            <polyline
              points="2,0 8,4 2,8"
              style="fill:none;stroke:#909399;stroke-width:1"
            />
            <polyline
              points="6,0 12,4 6,8"
              style="fill:none;stroke:#909399;stroke-width:1"
            />
          </svg>
        </div>
      </div>
    </div>

    <div class="cal_month">
      <div class="cal_m_weeks">
        <span
          v-for="w in weeks"
          :key="w"
          class="cal_m_day_cell"
        >{{w}}</span>
      </div>

      <div class="cal_m_days">
        <div
          v-for="(ds, index) in monthData"
          :key="index"
          class="cal_m_day_line"
        >
          <div
            v-for="d in ds"
            :key="d.day"
            class="cal_m_day_cell"
            :style="{color: getCellColor(d)}"
            @mouseenter="mouseenter(d, $event)"
            @mouseleave="mouseleave(d, $event)"
          >
            {{ d.day }}<slot :name="d.fullYear + '-' + d.month + '-' + d.day"></slot>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'C-alend',
  props: {
    date: {
      type: Date,
      default: () => new Date()
    }
  },
  data () {
    return {
      now: this.date,
      year: 0,
      month: 0,
      weeks: ["日", "一", "二", "三", "四", "五", "六"],
      monthData: [],
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1,
      currentDay: new Date().getDate()
    }
  },
  computed: {
  },
  mounted () {
    this.setYearMonth(this.now)
    this.generateMonth(this.now)
  },
  methods: {
    setYearMonth (now) {
      this.year = now.getFullYear()
      this.month = now.getMonth() + 1
    },
    preYear () {
      let n = this.now
      let date = new Date(n.getFullYear() - 1, n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds());

      this.setYearMonthInfos(date)
    },
    preMonth () {
      let n = this.now
      let date = new Date(n.getFullYear(), n.getMonth() - 1, n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds());

      this.setYearMonthInfos(date)
    },
    nextYear () {
      let n = this.now
      let date = new Date(n.getFullYear() + 1, n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds());

      this.setYearMonthInfos(date)
    },
    nextMonth () {
      let n = this.now
      let date = new Date(n.getFullYear(), n.getMonth() + 1, n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds());

      this.setYearMonthInfos(date)
    },
    setYearMonthInfos (date) {
      this.setYearMonth(date)
      this.generateMonth(date)
      this.now = date
      this.dateChange()
    },
    generateMonth (date) {
      date.setDate(1)
      // 星期 0 - 6， 星期天 - 星期6
      let weekStart = date.getDay()

      let endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      let dayEnd = endDate.getDate()
      // 星期 0 - 6， 星期天 - 星期6
      let weeEnd = endDate.getDay()

      let milsStart = date.getTime()
      let dayMils = 24 * 60 * 60 * 1000

      let monthDatas = []
      let current;
      // 上个月的几天
      for (let i = 0; i < weekStart; i++) {
        current = new Date(milsStart - (weekStart - i) * dayMils)
        monthDatas.push({
          type: -1,
          date: current,
          fullYear: current.getFullYear(),
          month: current.getMonth() + 1,
          day: current.getDate()
        })
      }
      // 当前月
      for (let i = 0; i < dayEnd; i++) {
        current = new Date(milsStart + i * dayMils)
        monthDatas.push({
          type: 0,
          date: current,
          fullYear: current.getFullYear(),
          month: current.getMonth() + 1,
          day: current.getDate()
        })
      }
      // 下个月的几天
      for (let i = 0; i < (6 - weeEnd); i++) {
        current = new Date(milsStart + i * dayMils)
        monthDatas.push({
          type: 1,
          date: current,
          fullYear: current.getFullYear(),
          month: current.getMonth() + 1,
          day: current.getDate()
        })
      }

      this.monthData = []
      for (let i = 0; i < monthDatas.length; i++) {
        let mi = i % 7;
        if (mi == 0) {
          this.monthData.push([])
        }
        this.monthData[Math.floor(i / 7)].push(monthDatas[i])
      }

      // 少于6行，补足6行
      if (this.monthData.length <= 5) {
        milsStart = current.getTime()
        let lastLine = []
        for (let i = 0; i < 7; i++) {
          current = new Date(milsStart + i * dayMils)
          lastLine.push({
            type: 1,
            date: current,
            fullYear: current.getFullYear(),
            month: current.getMonth() + 1,
            day: current.getDate()
          })
        }
        this.monthData.push(lastLine)
      }
    },

    getCellColor (d) {
      if (d.fullYear == this.currentYear && d.month == this.currentMonth && d.day == this.currentDay) {
        return "#409eff"
      }
      let color = d.type == -1 ? '#c0c4cc' : (d.type == 1 ? '#c0c4cc  ' : '')

      return color;
    },
    mouseenter (d, event) {
      this.$emit("enter", event, d)
    },
    mouseleave (d, event) {
      this.$emit("leave", event, d)
    },
    dateChange () {
      let fullYear = this.now.getFullYear()
      let month = this.now.getMonth()

      let startDay = new Date(fullYear, month, 1)
      let endDay = new Date(fullYear, month + 1, 0, 23, 59, 59)

      this.$emit("changeMonth", startDay, endDay)
    }
  }
}
</script>

<style scoped lang="less">
.cal_con {
  width: 100%;
  height: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #000000;
  font-weight: 900;
  border: 1px solid #e4e7ed;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  background: rgba(79, 79, 79,0,0.5);
  border-radius: 4px;
  margin: auto;
  font-size: 26px;
  .cal_header {
    height: 16px;
    padding: 6px;
    font-size: 14px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    justify-items: center;
    .cal_h_time {
      cursor: pointer;
    }
    .cal_h_time:hover {
      color: #409eff;
    }

    .cal_h_left {
      height: 100%;
      display: flex;

      .cal_h_btn {
        height: 100%;
        width: 24px;
        cursor: pointer;
      }


      .cal_h_l_icon {
        height: 8px;
        width: 12px;
        margin: auto;
      }
    }
  }

  .cal_month {
    font-size: 14px;
    text-align: center;
    height: calc(100% - 10px);

    .cal_m_day_cell {
      width: 24px;
      height: 24px;
      line-height: 50px;
      cursor: pointer;
      position: relative;
    }
    .cal_m_day_cell:hover {
      color: #409eff;
    }

    .cal_m_weeks {
      height: 20px;
      padding: 8px;
      display: flex;
      justify-content: space-around;
      justify-items: center;
      border-bottom: 1px solid #e4e7ed;
    }

    .cal_m_days {
      height: calc(100% - 19px);
      padding: 8px;
      display: flex;
      justify-content: space-around;
      justify-items: center;
      flex-wrap: wrap;
      .cal_m_day_line {
        width: 100%;
        display: flex;
        justify-content: space-around;
        justify-items: center;
      }
    }
  }
}
</style>
