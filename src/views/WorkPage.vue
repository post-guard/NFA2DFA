<template>
  <div class="workPage">
    <div class="DFABox">

      <div class="DFADivideLine">
        <a-divider style="border-color: #181818" >
          <h2>
            DFA
          </h2>

        </a-divider>
      </div>

      <div class="verticalDivider">
        <a-divider type="vertical" style="border-color: #181818">
aa
        </a-divider>
      </div>


    </div>

    <div class="NFABox">
      <div class="NFADivideLine">
        <a-divider style="border-color: #181818" >
          <h2>
            NFA
          </h2>

        </a-divider>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const DFA_Q = ref("");
</script>

<style scoped>
.workPage{
  position: absolute;
  width: 1080px;
  height: 720px;


}

.DFABox{
  position: absolute;
  width: 540px;
  height: 720px;
  top: 0px;
  left: 0px;

}

.DFADivideLine{


  position: absolute;

  width: 540px;
  height: 40px;
  top: 360px;
  left: 0px;

}

.NFABox{
  position: absolute;
  width: 540px;
  height: 720px;
  top: 0px;
  left: 540px;

}

.NFADivideLine{


  position: absolute;

  width: 540px;
  height: 40px;
  top: 360px;
  left: 0px;

}

.verticalDivider{
  position: absolute;

  height: 400px;
  width: 60px;
  top: 20px;
  left: 400px;
}
</style>