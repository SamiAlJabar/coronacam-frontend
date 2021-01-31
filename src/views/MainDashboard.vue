<template>
  <div>
    <div>
      <v-layout row wrap style="margin-bottom: 55px;">
        <!-- <v-flex lg1 md1 hidden-sm-and-down></v-flex> -->
        <v-flex lg12 md12 sm12 xs12>
          <div v-if="dataLoaded" style="text-align: left; margin-bottom: 20px; font-size: 40px">
            <v-layout wrap align-center class="top-gapper">
              <v-flex md3 sm12 xs12 class="total-box">
                <v-card class="card-height border_radius">
                  <v-layout wrap>
                    <v-flex md3 sm3 xs3>
                      <div class="icon-box floating">
                        <v-icon style="color: var(--primaryButton) !important">social_distance</v-icon>
                      </div>
                    </v-flex>
                    <v-flex md9 sm9 xs9>
                      <div class="empty-box">
                        <h3>
                          Social Distancing Current Violations
                          <br>
                          <span class="a">{{this.violationData.current_violations_sd}}</span>
                        </h3>
                      </div>
                    </v-flex>
                  </v-layout>
                  
                </v-card>
              </v-flex>
              <v-flex md3 sm12 xs12 class="total-box">
                <v-card class="card-height border_radius">
                  <v-layout wrap>
                    <v-flex md3 sm3 xs3>
                      <div class="icon-box floating">
                        <v-icon style="color: var(--primaryButton) !important">coronavirus</v-icon>
                      </div>
                    </v-flex>
                    <v-flex md9 sm9 xs9>
                      <div class="empty-box">
                        <h3>
                          Average Social Distancing Violations 
                          <br>
                          <span class="a">{{this.violationData.average_violations_sd.toFixed(2)}}</span>
                        </h3>
                      </div>
                    </v-flex>
                  </v-layout>
                  
                </v-card>
              </v-flex>
              <v-flex md3 sm12 xs12 class="total-box">
                <v-card class="card-height border_radius">
                  <v-layout wrap>
                    <v-flex md3 sm3 xs3>
                      <div class="icon-box floating">
                        <v-icon style="color: var(--primaryButton) !important">masks</v-icon>
                      </div>
                    </v-flex>
                    <v-flex md9 sm9 xs9>
                      <div class="empty-box">
                        <h3>
                          Mask Current Violation 
                          <br>
                          <span class="a">{{this.violationData.current_violations_masks}}</span>
                        </h3>
                      </div>
                    </v-flex>
                  </v-layout>
                  
                </v-card>
              </v-flex>
              <v-flex md3 sm12 xs12 class="total-box">
                <v-card class="card-height border_radius">
                  <v-layout wrap>
                    <v-flex md3 sm3 xs3>
                      <div class="icon-box floating">
                        <v-icon style="color: var(--primaryButton) !important">coronavirus</v-icon>
                      </div>
                    </v-flex>
                    <v-flex md9 sm9 xs9>
                      <div class="empty-box">
                        <h3>
                         Mask Average Violation 
                          <br>
                          <span class="a">{{this.violationData.average_violations_masks.toFixed(2)}}</span>
                        </h3>
                      </div>
                    </v-flex>
                  </v-layout>
                  
                </v-card>
              </v-flex>
              <v-flex md12 sm12 xs12 class="total-box">
                <v-card class="border_radius">
                  <v-layout class="text-center" wrap style="text-align: center !important;">
                    <v-flex md12 sm12 xs12 style="padding: 8px;">
                      <h3 md12 class="custom-title" style="color: var(--primary); padding: 8px;">
                        <!-- <v-icon style="color: var(--error); margin-right: 10px;">fiber_manual_record</v-icon>STORE CAMERA<v-icon style=" margin-left: 10px; color: var(--primaryButton)">camera</v-icon> -->
                        <v-icon class="color-change-animation" style="margin-bottom: 2px; color: var(--error); margin-right: 4px;">fiber_manual_record</v-icon>STORE CAMERA
                      </h3>
                    </v-flex>

                    <v-flex class="wrap_video" md6 sm12 xs12>

                      <iframe md12 src="http://localhost:5000/video_social_distance"></iframe>
                    </v-flex>
                    <v-flex class="wrap_video" md6 sm12 xs12>
                      <iframe md12 src="http://localhost:5000/video_mask"></iframe>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
            <!-- <v-layout
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
                    <bar-chart></bar-chart>
                  </div>
                </v-card>
              </v-flex>
            </v-layout> -->
          </div>
        </v-flex>
      </v-layout>
      <v-snackbar
        v-model="snackbar"
        :bottom="'bottom'"
        :right="'right'"
        :timeout="6000"
        :vertical="'vertical'"
        style="text-align: left !important"
      >
        {{ alertMessage }}
        <v-btn color="primaryButton" flat @click="snackbar = false">Close</v-btn>
      </v-snackbar>
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
      dataLoaded: false,
      drawerBalance: null,
      snackbar: null,
      alertMessage: null,
      currentChange: 1,
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
          this.violationData = JSON.parse(responsess.data.data);
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
    setInterval(async function () {
      await this.getViolationData();
    }.bind(this), 100); 
  }
};
</script>
<style lang="scss" scoped>
.wrap_video {
    width: 600px; 
    height: 600px;
    overflow: hidden;
}
iframe {
    width: 100% !important; //76.92% !important;
    height: 100% !important;//76.92% !important;
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
}
.card-height {
  height: 100px !important;
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
