<template>
  <div :style="setColor">
    <div v-if="show" class="bg-dark collapse show" id="navbarHeader" :style="setColor">
      <div class="container">
        <div class="row">
          <div class="col-sm-8 col-md-7 py-4">
            <h4 class="text-white">About</h4>
            <p class="text-muted">Actually, this calendar was created for testing my VueJS skills.
              Clicking on the white square helps you to choose header color theme</p>
          </div>
          <div class="col-sm-4 offset-md-1 py-4">
            <h4 class="text-white">Contact</h4>
            <ul class="list-unstyled">
              <li><a href="https://t.me/hidEncoder" class="text-white">Telegram</a></li>
              <li><a href="https://www.linkedin.com/in/andrew-murovanyi-a314ab163/"
                     class="text-white">Linkedin</a></li>

            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="navbar navbar-dark box-shadow" >
      <div class="container d-flex justify-content-evenly" >

        <a class="navbar-brand d-flex align-items-center"
           target="_blank"
        >

          <img src="../assets/logo.png" alt="logo" class="mr-3">
        </a>
        <header-swatch v-model="color" class="bordered rounded"></header-swatch>
        <button class="navbar-toggler collapsed ml-4"
                type="button" data-toggle="collapse"
                data-target="#navbarHeader"
                aria-controls="navbarHeader"
                aria-expanded="false"
                aria-label="Toggle navigation"
                @click="show = !show"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

      </div>
    </div>
  </div>
</template>

<script>
  import Swatches from 'vue-swatches'
  // Import the styles too, globally
  import "vue-swatches/dist/vue-swatches.min.css"
  export default {
    data(){
      return{
        color: '#343a40'
      }
    },
    props: {
      show: false,
    },
    methods: {
    },
    computed:{
      setColor(){
        let background = this.color;
        return {background}
      }
    },
    components:{
      headerSwatch: Swatches
    }
  }
</script>


<style scoped>
  .show{
    display: block;
  }
  .bordered{
    border: 2px solid beige;
  }
</style>
