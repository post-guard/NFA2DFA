import {State} from "@/models/State";
import type {InputItem} from "@/models/InputItem";

export class DFA {
    public states : Set<State>;
    public inputItems : Set<InputItem>;
    public table : Map<State, Map<InputItem, State>>;
    public startState : State;
    public endStates: Set<State>;

    public constructor() {
        this.states = new Set<State>();
        this.inputItems = new Set<InputItem>();
        this.table = new Map<State, Map<InputItem, State>>();
        this.startState = new State("");
        this.endStates = new Set<State>();
    }

    public toDotString(): string {
        let result = "digraph {\n";

        result+="node [shape = plaintext]\n" + "start;\n"


        result+="node [shape = doublecircle]\n"
        this.endStates.forEach((state)=>{
            result+=`"${state.label}" `;
        });
        result += ";\n";

        result += "node [shape = circle]\n";
        result += `start -> "${this.startState.label}"\n`;

        this.table.forEach((map, state) => {
            map.forEach((endState, input) => {
               result += `  "${state.label}" -> "${endState.label}" [label=${input.text}]\n`;
            });
        });

        result += "}\n";
        return result;
    }
}
