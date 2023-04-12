import type {NFA} from "@/models/NFA";
import {DFA} from "@/models/DFA";
import {State} from "@/models/State";
import Queue from "@/utils/Queue";
import type {InputItem} from "@/models/InputItem";

/**
 * 比较两个状态集合是否相等
 * @param set1 集合1
 * @param set2 集合2
 */
function setEquals(set1: Set<State>, set2: Set<State>): boolean {
    if (set1 == null && set2 == null) {
        return true;
    }

    if (set1 == null || set2 == null || set1.size != set2.size) {
        return false;
    }

    for(const i of set1) {
        for(const j of set2) {
            if (i.label != j.label) {
                return false;
            }
        }
    }

    return true;
}

export function NFA2DFA(nfa: NFA): DFA {
    const dfa = new DFA();
    //NFA的初态就是DFA的初态
    dfa.startState = nfa.startState;
    dfa.states.add(dfa.startState);
    //NFA的输入字母表就是DFA的输入字母表
    dfa.inputItems = nfa.inputItems;

    const firstSet = new Set<State>();
    firstSet.add(dfa.startState);
    //状态集到状态的映射（因为DFA是一个个状态，而下面算法得到的是一个个状态集）
    const map = new Map<Set<State>, State>();
    map.set(firstSet, dfa.startState);

    const queue = new Queue<Set<State>>();
    const flagMap = new Map<Set<State>, Number>();
    queue.enqueue(firstSet);
    flagMap.set(firstSet, 0);

    let i = 0;
    while (queue.isEmpty()) {
        let temp = queue.peek();
        if (temp != undefined) {
            for(const input of nfa.inputItems) {
                const nextSet = new Set<State>();
                for (const s of temp) {
                    const nextStates = nfa.table.get(s)?.get(input);
                    if (nextStates != undefined) {
                        nextStates.forEach((i) => nextSet.add(i));
                    }
                }

                //遍历队列，防止状态集重复
                let repeated = false;
                queue.forEach((value) => {
                    if (setEquals(value, nextSet)) {
                        repeated = true;
                    }
                });

                //不重复且没处理过这个状态集，就把得到的新集合入队
                if (!repeated && (flagMap.get(nextSet) == undefined || flagMap.get(nextSet) == 0)) {
                    queue.enqueue(nextSet);
                    flagMap.set(nextSet, 0);

                    //判定当前状态（集）是否是终态
                    let isEndState = false;
                    for(const s of nextSet) {
                        if (nfa.endStates.has(s)) {
                            isEndState = true;
                            break;
                        }
                    }
                    const newState = new State("q" + i);
                    i++;
                    dfa.states.add(newState);
                    if (isEndState) {
                        dfa.endStates.add(newState);
                    }

                    map.set(nextSet, newState);
                }

                const set = map.get(temp);
                if (set != undefined) {
                    if (dfa.table.get(set) == undefined) {
                        dfa.table.set(set, new Map<InputItem, State>());
                    }
                    const map2 = dfa.table.get(set);
                    if (map2 != undefined) {
                        const newState = map.get(nextSet);
                        if (newState != undefined) {
                            map2.set(input, newState);
                        }
                    }
                }

            }
        }

        temp = queue.peek();
        if (temp != undefined) {
            flagMap.set(temp, 1);
        }
        queue.dequeue();
    }

    return dfa;

}