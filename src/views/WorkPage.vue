<template>
  <div class="workPage">

    <div class="NFABox">

      <div class="NFADivideLine">
        <a-divider style="border-color: #181818">
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
                 @change="QInputChange"
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
                 @change="TInputChange"
                 style="
                        position: absolute;
                        width: 200px;
                        top: 105px;
                        left: 40px;"
        >
        </a-input>

        <a-input
            size="large"
            :disabled=true
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
                  :options="Q_NFA_option"

                  size="large"

                  addon-before="q0"
                  style="
                        position: absolute;
                        width: 165px;
                        top: 175px;
                        left: 75px;"
        >
        </a-select>


        <a-input
            size="large"
            :disabled=true
            addon-before="F"
            style="
                        position: absolute;
                        width: 0px;
                        top: 245px;
                        left: 40px;"
        >
        </a-input>

        <a-select v-model:value="F_NFA"
                  id="F_NFA"
                  :options="Q_NFA_option"

                  size="large"

                  addon-before="F"
                  style="
                        position: absolute;
                        width: 170px;
                        top: 245px;
                        left: 70px;"
        >
        </a-select>


        <a-input
            size="large"
            :disabled=true
            addon-before="δ"
            style="
                        position: absolute;
                        width: 0px;
                        top: 35px;
                        left: 270px;"
        >
        </a-input>

        <a-select v-model:value="delta_start_NFA"
                  id="delta_start_NFA"
                  :options="Q_NFA_option"

                  size="large"
                  placeholder="start"

                  style="
                        position: absolute;
                        width: 75px;
                        top: 35px;
                        left: 300px;"
        >

        </a-select>


        <a-select v-model:value="delta_sign_NFA"
                  id="delta_sign_NFA"
                  :options="T_NFA_option"

                  size="large"
                  placeholder="sign"

                  style="
                        position: absolute;
                        width: 75px;
                        top: 35px;
                        left: 375px;"
        >

        </a-select>


        <a-select v-model:value="delta_end_NFA"
                  id="delta_end_NFA"
                  :options="Q_NFA_option"

                  size="large"
                  placeholder="end"

                  style="
                        position: absolute;
                        width: 75px;
                        top: 35px;
                        left: 450px;"
        >

        </a-select>

      </div>


    </div>

    <div class="DFABox">
      <div class="DFADivideLine">
        <a-divider style="border-color: #181818 ">
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
import type {DefaultOptionType} from "ant-design-vue/es/vc-cascader";

const Q_NFA = ref("");
const T_NFA = ref("");
const q0_NFA = ref("");
const F_NFA = ref("");
const Q_NFA_option = ref<SelectProps['options']>();
const T_NFA_option = ref<SelectProps['options']>();

function QInputChange() {
  const states = Q_NFA.value.split(/[,，]/);

  let options: DefaultOptionType[] = [];

  for (let state of states) {
    if (state.length == 0) {
      continue;
    }

    options.push({
      label: state,
      value: state
    });
  }

  Q_NFA_option.value = options;
}

function TInputChange() {
  const terminators = T_NFA.value.split(/[,，]/);

  let options: DefaultOptionType[] = [];

  for (let terminator of terminators) {
    if (terminator.length == 0) {
      continue;
    }

    options.push({
      label: terminator,
      value: terminator
    });
  }

  T_NFA_option.value = options;
}
</script>

<style scoped>
.workPage {
  position: absolute;
  width: 1080px;
  height: 720px;


}

.NFABox {
  position: absolute;
  width: 540px;
  height: 720px;
  top: 0;
  left: 0;

}

.NFADivideLine {


  position: absolute;

  width: 540px;
  height: 40px;
  top: 360px;
  left: 0;

}

.DFABox {
  position: absolute;
  width: 540px;
  height: 720px;
  top: 0;
  left: 540px;

}

.DFADivideLine {


  position: absolute;

  width: 540px;
  height: 40px;
  top: 360px;
  left: 0;

}

.verticalDivider_up {
  position: absolute;

  height: 340px;
  width: 20px;
  top: 20px;
  left: 530px;
}

.verticalDivider_down {
  position: absolute;

  height: 340px;
  width: 20px;
  top: 360px;
  left: 530px;
}

.NFAInput {
  position: absolute;

  height: 320px;
  width: 540px;
  top: 400px;
  left: 0;
}

</style>
