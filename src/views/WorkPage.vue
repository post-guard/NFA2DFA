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

            <div class="NFAOutput">
                <a-image
                         style="
                         position : absolute;
                         left: 90px ;
                         width : 360px;
                         height : 360px "
                         v-model:src="pic_NFA"
                         >

                </a-image>
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
                          @change="q0InputChange"
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
                          :max-tag-count=2
                          @change="FInputChange"

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
                          size="large"
                          @click="button_addList_NFA_click"
                          style="width : 60px;
                         top : 35px;
                         left : 300px"
                >
                    +
                </a-button>

                <a-button class="button_delList_NFA"
                          size="large"
                          @click="button_delList_NFA_click"
                          style="width : 60px;
                         top : 35px;
                         left : 300px"
                >
                    -
                </a-button>

                <a-table v-model:value="delta_list_NFA"
                         class="delta_list_NFA"
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
                                placeholder="A"
                                v-if="column.key === 'start'"
                                v-model:value="record.start"
                                :options="Q_NFA_option"
                                @change="DeltaInputChange"
                        >
                        </a-select>

                        <a-select
                                placeholder="2"
                                v-if="column.key === 'input'"
                                v-model:value="record.input"
                                :options="T_NFA_option"
                                @change="DeltaInputChange"
                        >
                        </a-select>

                        <a-select
                                placeholder="B"
                                v-if="column.key === 'end'"
                                v-model:value="record.end"
                                :options="Q_NFA_option"
                                @change="DeltaInputChange"
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

            <div class="DFAOutput">
                <a-image
                    style="
                         position : absolute;
                         left: 90px ;
                         width : 360px;
                         height : 360px "
                    v-model:src="pic_DFA"
                >

                </a-image>
            </div>


            <a-descriptions bordered
                            size="small"
                            :column=2
                            class="description_DFA">
                <a-descriptions-item label="Q" :span="1"
                                     v-model:value="Q_DFA"
                >{{ Q_DFA }}
                </a-descriptions-item>
                <a-descriptions-item label="T" :span="1"
                                     v-model:value="T_DFA"
                >{{ T_DFA }}
                </a-descriptions-item>
                <a-descriptions-item label="q0" :span="1"
                                     v-model:value="q0_DFA"
                >{{ q0_DFA }}
                </a-descriptions-item>
                <a-descriptions-item label="F" :span="1"
                                     v-model:value="F_DFA"
                >{{ F_DFA }}
                </a-descriptions-item>
                <a-descriptions-item label="δ" :span="2">

                    <a-table v-model:value="delta_list_DFA"
                             class="delta_list_DFA"
                             size="large"
                             :data-source="delta_list_DFA_data"
                             :columns="delta_list_NFA_columns"
                             :scroll="{ y: 100 }"
                             :pagination=false
                    >

                    </a-table>

                </a-descriptions-item>
            </a-descriptions>
        </div>

        <a-button class="transfer"
                  size="large"
                  @click="transfer"
                  style="width: 120px;
                       top:435px;
                       left: 480px;"
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
import {NFA} from "@/models/NFA"
import {DFA} from "@/models/DFA"
import {State} from "@/models/State";
import {InputItem} from "@/models/InputItem";
import {NFA2DFA} from "@/utils/NFA2DFA";
import type {IGraphvizPacket} from "@/types/global";

const Q_NFA = ref<string>("");
const T_NFA = ref<string>("");
const q0_NFA = ref<string>("");
const F_NFA = ref<string[]>([]);
const Q_NFA_option = ref<SelectProps['options']>();
const T_NFA_option = ref<SelectProps['options']>();


const Q_DFA = ref<string>("");
const T_DFA = ref<string>("");
const q0_DFA = ref<string>("");
const F_DFA = ref<string>("");


const delta_list_NFA = ref();
const delta_list_DFA = ref();

const pic_NFA = ref("https://photo.16pic.com/00/89/83/16pic_8983799_b.jpg");
const pic_DFA = ref("https://photo.16pic.com/00/89/83/16pic_8983799_b.jpg");

export interface DeltaListItem {
    start: string;
    input: string;
    end: string;
}

const delta_list_NFA_data = ref<DeltaListItem[]>([]);
const delta_list_DFA_data = ref<DeltaListItem[]>([]);
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
        title: 'input',
        dataIndex: 'input',
        key: 'input',
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

const nfa: NFA = new NFA();
let dfa: DFA = new DFA();

function QInputChange() {
    const states = Q_NFA.value.split(/[,，]/);

    nfa.states.clear();

    let options: DefaultOptionType[] = [];

    for (let state of states) {
        if (state.length == 0) {
            continue;
        }

        options.push({
            label: state,
            value: state
        });

        nfa.states.add(new State(state));
    }

    Q_NFA_option.value = options;
}

function TInputChange() {
    const terminators = T_NFA.value.split(/[,，]/);

    nfa.inputItems.clear();

    let options: DefaultOptionType[] = [];

    for (let terminator of terminators) {
        if (terminator.length == 0) {
            continue;
        }

        options.push({
            label: terminator,
            value: terminator
        });

        nfa.inputItems.add(new InputItem(terminator));
    }

    T_NFA_option.value = options;
}

function q0InputChange() {
    if (q0_NFA.value != '') {
        for (const state of nfa.states) {
            if (state.label == q0_NFA.value) {
                nfa.startState = state;
            }
        }
    }
}

function FInputChange() {
    const FInput: string[] = F_NFA.value;

    nfa.endStates.clear();

    for (let fInput of FInput) {
        if (FInput.length === 0) {
            continue;
        }
        console.log(fInput);
        nfa.endStates.add(new State(fInput));
    }
    console.log(nfa.endStates);

}


function DeltaInputChange() {

    nfa.table.clear();

    const listData = delta_list_NFA_data.value;

    for (let data of listData) {

        if (listData.length == 0) {
            break;
        }


        let startState: State = new State('');
        for (let value of nfa.states) {
            if (value.label === data.start) {
                startState = value;
                break;
            }
        }

        let stateInputItem = new InputItem('');
        for (let value of nfa.inputItems) {
            if (value.text === data.input) {
                stateInputItem = value;
                break;
            }
        }

        let endState = new State('');
        for (let value of nfa.states) {
            if (value.label === data.end) {
                endState = value;
                break;
            }
        }

        const endSet = new Set([endState]);

        const transferMap = new Map<InputItem, Set<State>>([[stateInputItem, endSet]]);

        /*对形如[初态,[输入，[终态集]]集]集*/
        const temp_nfa_value: Map<InputItem, Set<State>> | undefined = nfa.table.get(startState);
        //console.log("look"+temp_nfa_value);
        if (temp_nfa_value !== undefined) {//如果初态存在，获得[输入，[终态集]]集

            const temp_nfa_value2: Set<State> | undefined = temp_nfa_value.get(stateInputItem);

            if (temp_nfa_value2 !== undefined) {//如果输入存在，获得[终态集]

                temp_nfa_value2.add(endState);

            } else {//如果输入不存在，就添加[输入，[终态集]]集

                temp_nfa_value.set(stateInputItem, endSet);

            }
        } else {//如果初态不存在，就新建[初态,[输入，[终态集]]集]集
            nfa.table.set(startState, transferMap);
        }

    }
}


function button_addList_NFA_click() {

    message.success("Add transformation successfully");

    delta_list_NFA_data.value.push({
        start: '',
        input: '',
        end: ''
    });
}

function button_delList_NFA_click() {
    if (delta_list_NFA_data.value.length === 0) {
        message.error("List is empty");
    } else {
        delta_list_NFA_data.value.pop();
    }
}

async function transfer() {

    console.log(nfa);

    const result:IGraphvizPacket = await window.electronAPI.invokeGraphviz(nfa.toDotString());
    //TODO:待转换正确后需要继续调试
    if(result.isSuccessful){
        message.success("transfer successfully");

        if(result.imgBuffer!==undefined){
            pic_NFA.value = 'data: image/jpeg'+ ';base64,' + result.imgBuffer.toString('base64');
        }

        else{
            pic_NFA.value = "https://photo.16pic.com/00/89/83/16pic_8983799_b.jpg"
        }



    }
    else {
        message.error("transfer failed");
    }

    dfa = NFA2DFA(nfa);

    console.log(dfa);

    arrangeDFA();

}


function arrangeDFA() {

    Q_DFA.value = '';
    T_DFA.value = '';
    q0_DFA.value = '';
    F_DFA.value = '';


    for (let state of dfa.states) {
        Q_DFA.value += ("," + state.label);
    }
    Q_DFA.value = Q_DFA.value.substring(1);


    for (let state of dfa.inputItems) {
        T_DFA.value += ("," + state.text);
    }
    T_DFA.value = T_DFA.value.substring(1);


    q0_DFA.value = dfa.startState.label;


    for (let state of dfa.endStates) {
        F_DFA.value += ("," + state.label);
    }
    F_DFA.value = F_DFA.value.substring(1);


    let delta_list_DFA_start = '';
    let delta_list_DFA_input = '';
    let delta_list_DFA_end = '';

    dfa.table.forEach((value, start, map) => {

        delta_list_DFA_start = start.label;

        value.forEach((end, InputItem, map2) => {

            delta_list_DFA_input = InputItem.text;

            delta_list_DFA_end = end.label;

            delta_list_DFA_data.value.push({
                start: delta_list_DFA_start,
                input: delta_list_DFA_input,
                end: delta_list_DFA_end
            });


        })


    })


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
    top: 0;
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

.description_DFA {

    position: absolute;
    top: 435px;
    width: 380px;
    left: 120px;
    /*max-height: 100px;
    max-width: 380px;*/
}


</style>
