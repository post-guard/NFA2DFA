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
}