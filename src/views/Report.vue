<template>
  <div>
    <div>
      <v-layout row wrap style="margin-bottom: 55px;">
        <!-- <v-flex lg1 md1 hidden-sm-and-down></v-flex> -->
        <v-flex lg12 md12 sm12 xs12>
          <div v-if="dataLoaded" style="text-align: left; margin-bottom: 20px; font-size: 40px">
            <v-layout
              wrap
              class="elevation-2 side-gapper top-gapper border_radius text-center"
              style="background-color: white;"
            >
              <v-flex md12 sm12 xs12>
                <v-card flat style="padding: 10px;">
                  <h3 class="custom-title" style="color: var(--primary); padding: 8px; margin: 5px;">
                    <v-icon style="color: var(--primaryButton)">bar_chart</v-icon>STATISTICS<v-icon style="color: var(--primaryButton)">bar_chart</v-icon>
                  </h3>
                  <div class="procedures small">
                    <bar-chart :chartdata="chartdata" ></bar-chart>
                  </div>
                </v-card>
              </v-flex>
            </v-layout>
          </div>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import BarChart  from '../BarChart.js'
import axios_py from "../axios_instance_python.js";

export default {
  components: {
    BarChart
  },
  data() {
    return {
      chartdata: null,
      dbData: [
        {
          month: "January"

        }
      ],
      dataLoaded: false,
      violationData: {
        sdViolation: 1,
        maskViolation: 1,
        monthlyViolation: 1,
        totalViolation: 1,
      },
    };
  },
  methods: {
    async getViolationData() {
      try {
          let responsess = await axios_py.get('/getViolations')
          let detectChange = JSON.parse(responsess.data.data);
          this.violationData.sdViolation = detectChange.violations;
          return;
          if(detectChange && (detectChange.violations - this.currentChange > 7 || this.currentChange - detectChange.violations > 7)) {
            this.violationData.sdViolation = this.violationData.sdViolation + 1;
            this.currentChange = detectChange.violations;
          }
      } catch(e) {
        console.log("errorooror: ", e);
      }
    },
  },
  async mounted() {
    this.dataLoaded = true;
    this.chartdata = {
      labels: ['January'],
      datasets: [
        {
          label: '1',
          backgroundColor: '#4ee352',
          data: [40]
        },
        {
          label: '2',
          backgroundColor: '#4ee352',
          data: [35]
        },
        {
          label: '3',
          backgroundColor: '#4ee352',
          data: [23]
        }
      ]
    };
    // setInterval(async function () {
    //   await this.getViolationData();
    // }.bind(this), 5000); 
  }
};
</script>
<style lang="scss" scoped>
.card-height {
  height: 180px !important;
}
.empty-box {
  margin: 10px;
  height: 80px;
  text-align: right !important;
  float: right;
}
.icon-box {
  background-color: var(--primary);
  margin-left: 10px;
  height: 70%;
  width: 100%;
  margin-top: -22px;
  border-radius: 5px;
  box-shadow: 2px 2px 9px 0px rgba(0, 0, 0, 0.212);
  transition: 0.2s;
}

.custom-height {
  height: 75px;
}
.v-card-padding {
  padding: 8px;
  margin: 15px;
}
.v-card-padding-pic {
  padding: 0px;
  margin: 15px;
}
.procedures {
  padding: 15px;
}
.procedures > h4 {
  font-size: 20px;
}
.procedures > p {
  font-size: 13px;
}

.electrical_service,
.plumbing_service,
.ac_service,
.generator_service,
.it_service,
.cctv_service {
  font-size: 11px !important;
  padding: 5px;
  transition: 0.2s;
}
.electrical_service > img,
.plumbing_service > img,
.ac_service > img,
.generator_service > img,
.it_service > img,
.cctv_service > img {
  width: 32px;
  transition: 0.2s;
}

// SERVICES ICON CHANGE ON HOVER
.electrical_service:hover,
.plumbing_service:hover,
.ac_service:hover,
.generator_service:hover,
.it_service:hover,
.cctv_service:hover {
  cursor: pointer;
  transition: 0.2s;
  font-size: 0px !important;
  img {
    width: 45px;
    transition: 0.2s;
  }
}
.floating {
  animation: float1 2s ease-in-out infinite;
}
@keyframes float1 {
	0% {
		box-shadow: 0 5px 5px 0px rgba(0,0,0,0.6);
		transform: translatey(0px);
	}
	50% {
		box-shadow: 0 15px 5px 0px rgba(0,0,0,0.2);
		transform: translatey(-3px);
	}
	100% {
		box-shadow: 0 5px 5px 0px rgba(0,0,0,0.6);
		transform: translatey(0px);
	}
}
.color-change-animation {
  animation: color-change 1s infinite;
}
@keyframes color-change {
  0% { color: red; }
  20% { color: var(--primaryButton); }
  100% { color: red; }
}
</style>
