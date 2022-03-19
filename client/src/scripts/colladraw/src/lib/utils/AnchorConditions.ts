import {CanvasGrid} from "../../types/CanvasGrid";

const fixEventOffset = (event: MouseEvent, gridPixelMerge: number): {
  offsetX: number;
  offsetY: number;
} => {
  return {
    offsetX: event.offsetX + gridPixelMerge - (event.offsetX % gridPixelMerge),
    offsetY: event.offsetY + gridPixelMerge - (event.offsetY % gridPixelMerge)
  };
}

export default {
  topLeft: (grid: CanvasGrid, gripMargin: number, event: MouseEvent, gridPixelMerge: number) => {
    const {offsetX, offsetY} = fixEventOffset(event, gridPixelMerge);

    return grid.some(row => {
      return row.some(cell => {
        return cell && offsetX - gripMargin < cell.x && cell.x < offsetX + gripMargin && offsetY - gripMargin < cell.y && cell.y < offsetY + gripMargin
      })
    })
  },
  topRight: (grid: CanvasGrid, gripMargin: number, event: MouseEvent, gridPixelMerge: number) => {
    const {offsetX, offsetY} = fixEventOffset(event, gridPixelMerge);

    return grid.some(row => {
      return row.some(cell => {
        return cell && offsetX - gripMargin < cell.x + cell.width && cell.x + cell.width < offsetX + gripMargin && offsetY - gripMargin < cell.y && cell.y < offsetY + gripMargin
      })
    })
  },
  bottomLeft: (grid: CanvasGrid, gripMargin: number, event: MouseEvent, gridPixelMerge: number) => {
    const {offsetX, offsetY} = fixEventOffset(event, gridPixelMerge);

    return grid.some(row => {
      return row.some(cell => {
        return cell && offsetX - gripMargin < cell.x && cell.x < offsetX + gripMargin && offsetY - gripMargin < cell.y + cell.height && cell.y + cell.height < offsetY + gripMargin
      })
    })
  },
  bottomRight: (grid: CanvasGrid, gripMargin: number, event: MouseEvent, gridPixelMerge: number) => {
    const {offsetX, offsetY} = fixEventOffset(event, gridPixelMerge);

    return grid.some(row => {
      return row.some(cell => {
        return cell && offsetX - gripMargin < cell.x + cell.width && cell.x + cell.width < offsetX + gripMargin && offsetY - gripMargin < cell.y + cell.height && cell.y + cell.height < offsetY + gripMargin
      })
    })
  },
  left: (grid: CanvasGrid, gripMargin: number, event: MouseEvent, gridPixelMerge: number) => {
    const {offsetX, offsetY} = fixEventOffset(event, gridPixelMerge);

    return grid.some(row => {
      return row.some(cell => {
        return cell && offsetX - gripMargin < cell.x && cell.x < offsetX + gripMargin && offsetY - gripMargin < cell.y + cell.height / 2 && cell.y + cell.height / 2 < offsetY + gripMargin
      })
    })
  },
  right: (grid: CanvasGrid, gripMargin: number, event: MouseEvent, gridPixelMerge: number) => {
    const {offsetX, offsetY} = fixEventOffset(event, gridPixelMerge);

    return grid.some(row => {
      return row.some(cell => {
        return cell && offsetX - gripMargin < cell.x + cell.width && cell.x + cell.width < offsetX + gripMargin && offsetY - gripMargin < cell.y + cell.height / 2 && cell.y + cell.height / 2 < offsetY + gripMargin
      })
    })
  },
  bottom: (grid: CanvasGrid, gripMargin: number, event: MouseEvent, gridPixelMerge: number) => {
    const {offsetX, offsetY} = fixEventOffset(event, gridPixelMerge);

    return grid.some(row => {
      return row.some(cell => {
        return cell && offsetX - gripMargin < cell.x + cell.width / 2 && cell.x + cell.width / 2 < offsetX + gripMargin && offsetY - gripMargin < cell.y + cell.height && cell.y + cell.height < offsetY + gripMargin
      })
    })
  },
  top: (grid: CanvasGrid, gripMargin: number, event: MouseEvent, gridPixelMerge: number) => {
    const {offsetX, offsetY} = fixEventOffset(event, gridPixelMerge);

    return grid.some(row => {
      return row.some(cell => {
        return cell && offsetX - gripMargin < cell.x + cell.width / 2 && cell.x + cell.width / 2 < offsetX + gripMargin && offsetY - gripMargin < cell.y
      })
    })
  },
}
