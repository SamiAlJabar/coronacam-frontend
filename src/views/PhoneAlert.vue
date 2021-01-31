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
                <v-card flat style="padding: 10px 10px 70px 10px;">
                  <div class="procedures">
                    <div style="float: left">
                      <v-text-field
                        type="number"
                        style="width: 200px;"
                        label="Enter your phone number"
                        hide-details="auto"
                        v-model="phoneNumber"
                      ></v-text-field>
                    </div>
                    <div style="float: left; margin-left: 10px;">
                      <v-btn
                        class="ma-2"
                        color="primaryButton"
                        @click="submit"
                      >
                        SAVE
                      </v-btn>
                    </div>
                  </div>
                </v-card>
              </v-flex>
            </v-layout>
          </div>
        </v-flex>
      </v-layout>
    </div>
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
</template>

<script>
import axios_py from "../axios_instance_python.js";

export default {
  data() {
    return {
      alertMessage: null,
      snackbar: false,
      dataLoaded: false,
      phoneNumber: null,
    };
  },
  methods: {
    async submit() {
      if(!this.phoneNumber) {
        this.alertMessage = "Please enter your phone number";
        this.snackbar = true;
        return;
      }
      try {
          let response = await axios_py.post('/savePhoneNumber', { data: this.phoneNumber});
          this.alertMessage = "Phone Number saved successfully!";
          this.snackbar = true;
          this.phoneNumber = null;
      } catch(e) {
        console.log("errorooror: ", e);
        this.alertMessage = "Something went wront! Please try again later.";
        this.snackbar = true;
      }
    }
  },
  async mounted() {
    this.dataLoaded = true; 
  }
};
</script>
<style lang="scss" scoped>
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
