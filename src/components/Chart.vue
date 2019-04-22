<template>
  <div>
    <span class="current" v-bind:class="currentLevel">
      {{chartData[chartData.length-1][1]}}
    </span>
    <v-chart :options="options"/>
  </div>
</template>
<script>
import ECharts from "vue-echarts"; // refers to components/ECharts.vue in webpack

import "echarts";
// import 'echarts/lib/chart/line'
// https://ecomfe.github.io/echarts-examples/public/editor.html?c=line-aqi
export default {
  name: "Chart",
  components: {
    "v-chart": ECharts
  },
  props: {
    chartData: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  watch: {
    chartData: function(newVal, oldVal) { // watch it
      this.options.xAxis.data = this.chartData.map(item => item[0])
      this.options.series.data = this.chartData.map(item => item[1])
    }
  },
  computed: {
    currentLevel: function () {
      const lastMeasurement = this.chartData[this.chartData.length-1][1];
      let level = 'good'
      if (lastMeasurement > 50){
        level = 'ok'
      }
      if (lastMeasurement > 100){
        level = 'warn'
      }
      if (lastMeasurement > 150){
        level = 'high'
      }
      if (lastMeasurement > 200){
        level = 'bad'
      }
      if (lastMeasurement > 300){
        level = 'hazard'
      }
      return level;
    }
  },
  data() {
    return {
      options: {
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          data: this.chartData.map(item => item[0])
        },
        yAxis: {
          min: 0,
          max: 400,
        },
        toolbox: {
          left: 50,
          feature: {
            saveAsImage: {
              title: 'Save as .png'
            }
          }
        },
        visualMap: {
          top: 10,
          right: 10,
          pieces: [
            {
              gt: 0,
              lte: 50,
              color: "#096"
            },
            {
              gt: 50,
              lte: 100,
              color: "#ffde33"
            },
            {
              gt: 100,
              lte: 150,
              color: "#ff9933"
            },
            {
              gt: 150,
              lte: 200,
              color: "#cc0033"
            },
            {
              gt: 200,
              lte: 300,
              color: "#660099"
            },
            {
              gt: 300,
              color: "#7e0023"
            }
          ],
          outOfRange: {
            color: "#999"
          }
        },
        series: {
          name: "Air Quality Index",
          type: "line",
          data: this.chartData.map(item => item[1]),
          markLine: {
            silent: true,
            symbol: 'none',
            lineStyle: {
              color: '#aaa',
            },
            data: [
              {
                yAxis: 50
              },
              {
                yAxis: 150
              }
            ]
          }
        }
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-chart{
  width: 100%;
}
.current{
  border-radius: 10px;
  background-color: #999;
  font-size: 150%;
  color: white;
  padding-left: 10px;
  padding-right: 10px;
}
.current.good{background-color: #096}
.current.ok{background-color: #ffde33; color: black}
.current.warn{background-color: #ff9933}
.current.high{background-color: #cc0033}
.current.bad{background-color: #660099}
.current.hazard{background-color: #7e0023}
</style>
