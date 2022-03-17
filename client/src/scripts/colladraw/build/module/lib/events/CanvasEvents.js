export default {
    ShapeClicked: (shape, mouseevent) => new CustomEvent('shape-clicked', {
        detail: { shape, mouseevent }
    }),
    ShapeSelected: (shape) => new CustomEvent('shape-selected', {
        detail: { shape }
    }),
    ShapeDeselected: (shape) => new CustomEvent('shape-deselected', {
        detail: { shape }
    }),
    ShapeMoved: (shape, mouseevent) => new CustomEvent('shape-moved', {
        detail: { shape, mouseevent }
    }),
    ShapeTransformed: (shape, transformation) => new CustomEvent('shape-transform', {
        detail: { shape, transformation }
    }),
    ShapeCreated: (shape) => new CustomEvent('shape-created', {
        detail: { shape }
    }),
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FudmFzRXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9ldmVudHMvQ2FudmFzRXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXdCQSxlQUFlO0lBQ2IsWUFBWSxFQUFFLENBQUMsS0FBWSxFQUFFLFVBQXNCLEVBQUUsRUFBRSxDQUFDLElBQUksV0FBVyxDQUEyQyxlQUFlLEVBQUU7UUFDakksTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRTtLQUM5QixDQUFDO0lBRUYsYUFBYSxFQUFFLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLFdBQVcsQ0FBbUIsZ0JBQWdCLEVBQUU7UUFDbkYsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFO0tBQ2xCLENBQUM7SUFFRixlQUFlLEVBQUUsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksV0FBVyxDQUFtQixrQkFBa0IsRUFBRTtRQUN2RixNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUU7S0FDbEIsQ0FBQztJQUVGLFVBQVUsRUFBRSxDQUFDLEtBQVksRUFBRSxVQUFzQixFQUFFLEVBQUUsQ0FBQyxJQUFJLFdBQVcsQ0FBMkMsYUFBYSxFQUFFO1FBQzdILE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUU7S0FDOUIsQ0FBQztJQUVGLGdCQUFnQixFQUFFLENBQUMsS0FBWSxFQUFFLGNBQW1DLEVBQUUsRUFBRSxDQUFDLElBQUksV0FBVyxDQUF3RCxpQkFBaUIsRUFBRTtRQUNqSyxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFO0tBQ2xDLENBQUM7SUFFRixZQUFZLEVBQUUsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksV0FBVyxDQUFtQixlQUFlLEVBQUU7UUFDakYsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFO0tBQ2xCLENBQUM7Q0FDSCxDQUFBIn0=