import {State} from "../../types/State";
import Line from "../canvas_elements/Line";

const ResizeFunctions = {
  topLeft: (state: State, event: MouseEvent) => {
    ResizeFunctions.top(state, event);
    ResizeFunctions.left(state, event);
  },
  topRight: (state: State, event: MouseEvent) => {
    ResizeFunctions.top(state, event);
    ResizeFunctions.right(state, event);
  },
  bottomLeft: (state: State, event: MouseEvent) => {
    ResizeFunctions.bottom(state, event);
    ResizeFunctions.left(state, event);
  },
  bottomRight: (state: State, event: MouseEvent) => {
    ResizeFunctions.bottom(state, event);
    ResizeFunctions.right(state, event);
  },
  left: (state: State, event: MouseEvent) => {
    if (state.selectedElement) {
      state.selectedElement.width = state.selectedElement.width + state.selectedElement.x - event.offsetX;
      state.selectedElement.x = event.offsetX;
    }
  },
  right: (state: State, event: MouseEvent) => {
    if (state.selectedElement) {
      state.selectedElement.width = event.offsetX - state.selectedElement.x;
      if (state.selectedElement instanceof Line) {
        state.selectedElement.endX = event.offsetX;
      }
    }
  },
  bottom: (state: State, event: MouseEvent) => {
    if (state.selectedElement) {
      state.selectedElement.height = event.offsetY - state.selectedElement.y;
      if (state.selectedElement instanceof Line) {
        state.selectedElement.endY = event.offsetY;
      }
    }
  },
  top: (state: State, event: MouseEvent) => {
    if (state.selectedElement) {
      state.selectedElement.height = state.selectedElement.height + state.selectedElement.y - event.offsetY;
      state.selectedElement.y = event.offsetY;
    }
  },
}

export default ResizeFunctions;
