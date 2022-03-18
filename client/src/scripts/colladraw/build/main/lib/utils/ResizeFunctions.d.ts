import { State } from "../../types/State";
declare const ResizeFunctions: {
    topLeft: (state: State, event: MouseEvent) => void;
    topRight: (state: State, event: MouseEvent) => void;
    bottomLeft: (state: State, event: MouseEvent) => void;
    bottomRight: (state: State, event: MouseEvent) => void;
    left: (state: State, event: MouseEvent) => void;
    right: (state: State, event: MouseEvent) => void;
    bottom: (state: State, event: MouseEvent) => void;
    top: (state: State, event: MouseEvent) => void;
};
export default ResizeFunctions;
