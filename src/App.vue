<template>
  <div id="app">
    <h1>Current Air Quality</h1>
    <Chart class="chart" v-bind:chart-data="chartData"/>
    <p>{{status}}</p>
    <p>
      <a href="#" v-on:click="fetchData('beijingair')">Load Beijing Data</a> | 
      <a href="#" v-on:click="fetchData('cgshanghaiair')">Load Shangai data</a>
    </p>
    <p>
      <strong>
        VueJS + Echarts to display pollution data from Twitter, more at
        <a href="https://miguelrincon.github.io" target="_blank">miguelrincon.github.io</a>
      </strong>
    </p>
  </div>
</template>

<script>

import Chart from './components/Chart.vue'
import {authenticate, getData} from './lib/requests';

export default {
  name: 'app',
  components: {
    Chart
  },
  data() {
    return {
      chartData: [['', 0], [''], 0, [''], 0],
      status: '',
      screenName: '',
      time: ''
    }
  },
  created: function() {
    this.fetchData();
  },

  methods: {
    fetchData: function(screenName = 'cgshanghaiair') {
      this.status = 'Authenticating to Twitter API...';
      authenticate()
        .then((response) => {
          let token = response.data.access_token;
          this.status = `Loading data from @${screenName}...`;
          return getData(token, screenName, 100)
            .then((response) => {
              let data = response.data.reverse().map((val) => {
                let dataPoint = val.text.split('; ');
                let time = dataPoint[0];
                let pm25 = parseInt(dataPoint[2]);
                return [time, pm25]
              })

              let time = new Date()
              this.status = `Data loaded from @${screenName} at ${time.getHours()}:${time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()}`;
              this.chartData = data;
            });
        })
        .catch((error) => {
          this.status = 'Error loading the data! Please try later...'
        })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100%;
}
.chart{
  width:100%;
}
</style>
