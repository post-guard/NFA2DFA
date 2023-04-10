import type {State} from "@/models/State";
import type {InputItem} from "@/models/InputItem";

export class Pair {
    public state : State;
    public inputItem : InputItem;

    public constructor(state : State, inputItem: InputItem) {
        this.state = state;
        this.inputItem = inputItem;
    }

    public toString(): string {
        return `${this.state.label}-${this.inputItem.text}`;
    }
}