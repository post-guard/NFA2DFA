<template>
  <div class="workPage">

    <div class="NFABox">

      <div class="DFADivideLine">
        <a-divider style="border-color: #181818" >
          <h2>
            NFA
          </h2>

        </a-divider>
      </div>

      <div class="verticalDivider_up">
        <a-divider type="vertical" style="border-color: #181818;height: 360px;">

        </a-divider>
      </div>

      <div class="verticalDivider_down">
        <a-divider type="vertical" style="border-color: #181818;height: 360px;">

        </a-divider>
      </div>

      <div class="NFAInput">
        <a-input v-model:value="Q_NFA"
                 id="Q_NFA"

                 placeholder="eg: q0,q1,..."
                 size="large"
                 allow-clear
                 addon-before="Q"
                 style="
                        position: absolute;
                        width: 200px;
                        top: 35px;
                        left: 40px;"
        >
        </a-input>

        <a-input v-model:value="T_NFA"
                 id="T_NFA"

                 placeholder="eg: a,b,..."
                 size="large"
                 allow-clear
                 addon-before="T"
                 style="
                        position: absolute;
                        width: 200px;
                        top: 105px;
                        left: 40px;"
        >
        </a-input>

        <a-input
            size="large"
            :disabled = true
            addon-before="q0"
            style="
                        position: absolute;
                        width: 0px;
                        top: 175px;
                        left: 40px;"
        >
        </a-input>

        <a-select v-model:value="q0_NFA"
                  id="q0_NFA"
                  :options = "q0_NFA_option"

                  size="large"
                  allow-clear
                  addon-before="q0"
                  style="
                        position: absolute;
                        width: 165px;
                        top: 175px;
                        left: 75px;"
        >
        </a-select>


        <a-input v-model:value="F_NFA"
                 id="F_NFA"

                 placeholder="eg: q3,q4,..."
                 size="large"
                 allow-clear
                 addon-before="F"
                 style="
                        position: absolute;
                        width: 200px;
                        top: 245px;
                        left: 40px;"
        >
        </a-input>

      </div>


    </div>

    <div class="DFABox">
      <div class="DFADivideLine">
        <a-divider style="border-color: #181818 " >
          <h2>
            DFA
          </h2>

        </a-divider>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import type {SelectProps} from "ant-design-vue";

const Q_DFA = ref("");
const q0_NFA_option = ref<SelectProps['options']>([
    {
  /*value : 'q0',
  label : 'q0',*/
      //TODO:需要编写一个对Q的输入进行分词的方法，然后导入options选择列表中
},
]);
</script>

<style scoped>
.workPage{
  position: absolute;
  width: 1080px;
  height: 720px;


}

.NFABox{
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

.DFABox{
  position: absolute;
  width: 540px;
  height: 720px;
  top: 0px;
  left: 540px;

}

.DFADivideLine{


  position: absolute;

  width: 540px;
  height: 40px;
  top: 360px;
  left: 0px;

}

.verticalDivider_up{
  position: absolute;

  height: 340px;
  width: 20px;
  top: 20px;
  left: 530px;
}

.verticalDivider_down{
  position: absolute;

  height: 340px;
  width: 20px;
  top: 360px;
  left: 530px;
}

.NFAInput{
  position: absolute;

  height: 320px;
  width: 540px;
  top: 400px;
  left: 0px;
}

</style>
