"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Line_1 = __importDefault(require("../canvas_elements/Line"));
const ResizeFunctions = {
    topLeft: (state, event) => {
        ResizeFunctions.top(state, event);
        ResizeFunctions.left(state, event);
    },
    topRight: (state, event) => {
        ResizeFunctions.top(state, event);
        ResizeFunctions.right(state, event);
    },
    bottomLeft: (state, event) => {
        ResizeFunctions.bottom(state, event);
        ResizeFunctions.left(state, event);
    },
    bottomRight: (state, event) => {
        ResizeFunctions.bottom(state, event);
        ResizeFunctions.right(state, event);
    },
    left: (state, event) => {
        if (state.selectedElement) {
            state.selectedElement.width = state.selectedElement.width + state.selectedElement.x - event.offsetX;
            state.selectedElement.x = event.offsetX;
        }
    },
    right: (state, event) => {
        if (state.selectedElement) {
            state.selectedElement.width = event.offsetX - state.selectedElement.x;
            if (state.selectedElement instanceof Line_1.default) {
                state.selectedElement.endX = event.offsetX;
            }
        }
    },
    bottom: (state, event) => {
        if (state.selectedElement) {
            state.selectedElement.height = event.offsetY - state.selectedElement.y;
            if (state.selectedElement instanceof Line_1.default) {
                state.selectedElement.endY = event.offsetY;
            }
        }
    },
    top: (state, event) => {
        if (state.selectedElement) {
            state.selectedElement.height = state.selectedElement.height + state.selectedElement.y - event.offsetY;
            state.selectedElement.y = event.offsetY;
        }
    },
};
exports.default = ResizeFunctions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzaXplRnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi91dGlscy9SZXNpemVGdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxtRUFBMkM7QUFFM0MsTUFBTSxlQUFlLEdBQUc7SUFDdEIsT0FBTyxFQUFFLENBQUMsS0FBWSxFQUFFLEtBQWlCLEVBQUUsRUFBRTtRQUMzQyxlQUFlLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsUUFBUSxFQUFFLENBQUMsS0FBWSxFQUFFLEtBQWlCLEVBQUUsRUFBRTtRQUM1QyxlQUFlLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsQyxlQUFlLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0QsVUFBVSxFQUFFLENBQUMsS0FBWSxFQUFFLEtBQWlCLEVBQUUsRUFBRTtRQUM5QyxlQUFlLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsV0FBVyxFQUFFLENBQUMsS0FBWSxFQUFFLEtBQWlCLEVBQUUsRUFBRTtRQUMvQyxlQUFlLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyQyxlQUFlLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0QsSUFBSSxFQUFFLENBQUMsS0FBWSxFQUFFLEtBQWlCLEVBQUUsRUFBRTtRQUN4QyxJQUFJLEtBQUssQ0FBQyxlQUFlLEVBQUU7WUFDekIsS0FBSyxDQUFDLGVBQWUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUNwRyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQztJQUNELEtBQUssRUFBRSxDQUFDLEtBQVksRUFBRSxLQUFpQixFQUFFLEVBQUU7UUFDekMsSUFBSSxLQUFLLENBQUMsZUFBZSxFQUFFO1lBQ3pCLEtBQUssQ0FBQyxlQUFlLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDdEUsSUFBSSxLQUFLLENBQUMsZUFBZSxZQUFZLGNBQUksRUFBRTtnQkFDekMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQzthQUM1QztTQUNGO0lBQ0gsQ0FBQztJQUNELE1BQU0sRUFBRSxDQUFDLEtBQVksRUFBRSxLQUFpQixFQUFFLEVBQUU7UUFDMUMsSUFBSSxLQUFLLENBQUMsZUFBZSxFQUFFO1lBQ3pCLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDdkUsSUFBSSxLQUFLLENBQUMsZUFBZSxZQUFZLGNBQUksRUFBRTtnQkFDekMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQzthQUM1QztTQUNGO0lBQ0gsQ0FBQztJQUNELEdBQUcsRUFBRSxDQUFDLEtBQVksRUFBRSxLQUFpQixFQUFFLEVBQUU7UUFDdkMsSUFBSSxLQUFLLENBQUMsZUFBZSxFQUFFO1lBQ3pCLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDdEcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztTQUN6QztJQUNILENBQUM7Q0FDRixDQUFBO0FBRUQsa0JBQWUsZUFBZSxDQUFDIn0=