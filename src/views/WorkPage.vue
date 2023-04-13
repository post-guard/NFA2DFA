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
                        width: 0;
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
                        width: 0;
                        top: 245px;
                        left: 40px;"
        >
        </a-input>

        <a-select v-model:value="F_NFA"
                  class="F_NFA"
                  :options="Q_NFA_option"
                  mode="multiple"
                  size="large"
                  :max-tag-count = 2


        >
        </a-select>


        <a-input
            size="large"
            :disabled=true
            addon-before="δ"
            style="
                        position: absolute;
                        width: 0;
                        top: 35px;
                        left: 270px;"
        >
        </a-input>

        <a-button class="button_addList_NFA"
                  size = "large"
                  @click = "button_addList_NFA_click"
                  style="width : 60px;
                         top : 35px;
                         left : 300px"
        >
            +
        </a-button>

          <a-button class="button_delList_NFA"
                    size = "large"
                    @click = "button_delList_NFA_click"
                    style="width : 60px;
                         top : 35px;
                         left : 300px"
          >
              -
          </a-button>

        <a-table v-model:value="delta_list_NFA"
                 class = "delta_list_NFA"
                 size="large"
                 :data-source="delta_list_NFA_data"
                 :columns="delta_list_NFA_columns"
                 :scroll="{ y: 125 }"
                 :pagination=false
                 style="width: 240px;
                        height: 0;
                        top : 65px;
                        left: 270px;
                        margin: 0"
        >
            <template #bodyCell="{column,record}">

                <a-select
                        placeholder = "A"
                        v-if = "column.key === 'start'"
                        v-model:value = "record.start"
                        :options = "Q_NFA_option"
                >
                </a-select>

                <a-select
                        placeholder = "2"
                        v-if = "column.key === 'state'"
                        v-model:value = "record.state"
                        :options = "T_NFA_option"
                >
                </a-select>

                <a-select
                        placeholder = "B"
                        v-if = "column.key === 'end'"
                        v-model:value = "record.end"
                        :options = "Q_NFA_option"
                >
                </a-select>

            </template>

        </a-table>








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

        <a-descriptions bordered
                        size="small"
                        :column=2

                        class="description_DFA">
            <a-descriptions-item label="Q" :span = "1">q1,q2,q3,q4,q5</a-descriptions-item>
            <a-descriptions-item label="T" :span = "1">q1,q2,q3</a-descriptions-item>
            <a-descriptions-item label="q0" :span = "1">q0</a-descriptions-item>
            <a-descriptions-item label="F" :span = "1">q1,q3</a-descriptions-item>
        </a-descriptions>
    </div>

      <a-button class="transfer"
                size = "large"
                @click = "transfer"
                style="width: 120px;
                       top:435px;
                       left: 480px;             "
                >
          <template #icon>
              <ArrowRightOutlined/>
          </template>
      </a-button>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import type {SelectProps} from "ant-design-vue";
import type {DefaultOptionType} from "ant-design-vue/es/vc-cascader";
import {ArrowRightOutlined} from "@ant-design/icons-vue"
import {message} from "ant-design-vue";

const Q_NFA = ref("");
const T_NFA = ref("");
const q0_NFA = ref("");
const F_NFA = ref([]);
const Q_NFA_option = ref<SelectProps['options']>();
const T_NFA_option = ref<SelectProps['options']>();

const delta_list_NFA_data = ref<{start: string, state: string, end: string}[]>([]);
//NFA_LIST
const delta_list_NFA_columns = ref([
    {
        title: 'start',
        dataIndex: 'start',
        key: 'start',
        customHeaderCell: () => ({
            style: {
                textAlign: 'center',  //头部单元格水平居中
            },
        }),
    },
    {
        title: 'state',
        dataIndex: 'state',
        key: 'state',
        customHeaderCell: () => ({
            style: {
                textAlign: 'center',  //头部单元格水平居中
            },
        }),
    },
    {
        title: 'end',
        dataIndex: 'end',
        key: 'end',
        customHeaderCell: () => ({
            style: {
                textAlign: 'center',  //头部单元格水平居中
            },
        }),
    },
]);


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


function button_addList_NFA_click(){

        message.success("Add transformation successfully");

        delta_list_NFA_data.value.push({
            start : '',
            state : '',
            end : ''
        })

}

function button_delList_NFA_click(){
    if (delta_list_NFA_data.value.length===0){
        message.error("List is empty");
    }
    else{

        delta_list_NFA_data.value.pop();
    }
}

</script>

<style  scoped>
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

.F_NFA {
    position: absolute;
    width: 170px;
    top: 245px;
    left: 70px;
}

.description_DFA{

    position:absolute;
    top:435px ;
    width:380px ;
    left: 120px;
    /*max-height: 100px;
    max-width: 380px;*/
}



</style>
