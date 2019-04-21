<template>
  <v-chart :options="options"/>
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
          splitLine: {
            show: false
          }
        },
        toolbox: {
          left: "center",
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
            data: [
              {
                yAxis: 50
              },
              {
                yAxis: 100
              },
              {
                yAxis: 150
              },
              {
                yAxis: 200
              },
              {
                yAxis: 300
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
</style>
