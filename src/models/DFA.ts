import {State} from "@/models/State";
import type {InputItem} from "@/models/InputItem";
import type {Pair} from "@/models/Pair";

export class DFA {
    public states : Set<State>;
    public inputItems : Set<InputItem>;
    public table : Map<Pair, State>;
    public startState : State;
    public endStates: Set<State>;

    public constructor() {
        this.states = new Set<State>();
        this.inputItems = new Set<InputItem>();
        this.table = new Map<Pair, State>();
        this.startState = new State("");
        this.endStates = new Set<State>();
    }
}