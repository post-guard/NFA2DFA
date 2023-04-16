import type {NFA} from "@/models/NFA";
import {DFA} from "@/models/DFA";
import {State} from "@/models/State";
import Queue from "@/utils/Queue";
import type {InputItem} from "@/models/InputItem";

/**
 * 从状态集合生成表示状态集合的字符串
 * @param set 需要生成的状态集合
 */
function getStatesString(set: Set<State>): string {
    let result = "";
    for (const item of set) {
        result += item.label + ",";
    }
    if (result.length >= 2) {
        result = result.substring(0, result.length - 1);
    }

    return "[" + result + "]";
}

interface Pair {
    set: Set<State>;
    state: State;
}

/**
 * 从NFA自动机转换成DFA自动机
 * @param nfa 需要转换的NFA自动机
 */
export function NFA2DFA(nfa: NFA): DFA {
    const dfa = new DFA();
    //NFA的输入字母表就是DFA的输入字母表
    dfa.inputItems = nfa.inputItems;

    // dfa的第一个状态
    const firstSet = new Set<State>();
    firstSet.add(nfa.startState);
    dfa.startState = new State(getStatesString(firstSet));
    const queue = new Queue<Pair>();
    queue.enqueue({
        set: firstSet,
        state: dfa.startState
    });

    while (!queue.isEmpty()) {
        const top = queue.peek();
        if (top != undefined) {
            dfa.states.add(top.state);

            // 判断是否为中止状态
            let isEndState = false;
            for(const s of top.set) {
                for(const endState of nfa.endStates) {
                    if (s.label == endState.label) {
                        isEndState = true;
                        break;
                    }
                }

                if (isEndState) {
                    break;
                }
            }

            if (isEndState) {
                dfa.endStates.add(top.state);
            }


            for (const input of dfa.inputItems) {
                const nextStates = new Set<State>();
                for (const s of top.set) {
                    const set = nfa.table.get(s)?.get(input);
                    if (set != undefined) {
                        set.forEach((i) => {
                            nextStates.add(i);
                        });
                    }
                }

                // 如果下一个集合是空集就不处理
                if (nextStates.size != 0) {
                    let transferMap: Map<InputItem, State>;
                    const temp = dfa.table.get(top.state);
                    if (temp != undefined) {
                        transferMap = temp;
                    } else {
                        transferMap = new Map<InputItem, State>();
                        dfa.table.set(top.state, transferMap);
                    }

                    // 查找下一个状态是否已经存在
                    let nextState: State | undefined = undefined;
                    for (const s of dfa.states) {
                        const states = s.label.substring(1, s.label.length - 1).split(/,/);

                        // 首先判断集合中元素的个数是否相等
                        if (states.length != nextStates.size) {
                            continue;
                        }

                        let contained = true;
                        for(const state of nextStates) {
                            let has = false;
                            for (const str of states) {
                                if (state.label == str) {
                                    has = true;
                                    break;
                                }
                            }

                            if (!has) {
                                contained = false;
                                break;
                            }
                        }

                        if (contained) {
                            nextState = s;
                            break;
                        }
                    }

                    if (nextState == undefined) {
                        const nextStateString = getStatesString(nextStates);
                        nextState = new State(nextStateString);
                        transferMap.set(input, nextState);

                        // 不存在的状态还需要扔到队列中处理
                        queue.enqueue({
                            set: nextStates,
                            state: nextState
                        });
                    } else {
                        transferMap.set(input, nextState);
                    }
                }
            }

            queue.dequeue();
        }
    }

    return dfa;
}