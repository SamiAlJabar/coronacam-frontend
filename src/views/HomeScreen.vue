<template>
  <div style="background-color: var(--background);">
    <v-layout text-md-center>
      <v-flex
        lg12
        md12
        hidden-sm-and-down
        class="backgroundImage"
      >
      <div class="text-center">
        <v-btn
          outlined
          type="button" @click="goto('/dashboard')" style="margin-top: 60vh" color="primaryButton"
        >
          ENTER
        </v-btn>
      </div>      
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { required, numeric } from "vuelidate/lib/validators";
import axios from "../axios_instance.js";

export default {
  data() {
    return {
      
    };
  },
  methods: {
    //
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Acme&display=swap");
.v-tabs__slider-wrapper > .v-tabs__slider {
  background-color: var(--accent) !important;
}
.imageCus {
  width: 75px;
}
.backgroundImage {
  position: fixed;
  width: 100%;
  height: 100vh;
  background-image: url('../../src/assets/wall.png');
  background-position:start;
  background-repeat:no-repeat;
  background-size:cover;
}
.v-btn {
  animation: float 2s ease-in-out infinite;
}
@keyframes float {
	0% {
		box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
		transform: translatey(0px);
	}
	50% {
		box-shadow: 0 25px 15px 0px rgba(0,0,0,0.2);
		transform: translatey(-10px);
	}
	100% {
		box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
		transform: translatey(0px);
	}
}
</style>
