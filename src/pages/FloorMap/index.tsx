import { FloorMapFrame } from './components/FloorMapFrame';
import { FloorMapPopover } from './components/FloorMapPopover';
import { StayerMapCanvas } from './components/StayerMapCanvas';
import { useFloorMapCanvas } from './hooks/useFloorMapCanvas';

function FloorMap() {
  const {
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    canvasRef,
    setCanvasElement,
    viewingRoomId,
    popoverRoom,
    displayPopover,
  } = useFloorMapCanvas();

  return (
    <FloorMapFrame>
      <title>滞在者マップ</title>
      <StayerMapCanvas
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onCanvasMounted={setCanvasElement}
        onMouseMoved={displayPopover}
      />
      {viewingRoomId !== 0 && canvasRef.current && popoverRoom && (
        <FloorMapPopover
          popoverRoom={popoverRoom}
          canvasClientHeight={canvasRef.current.clientHeight}
        />
      )}
    </FloorMapFrame>
  );
}

export default FloorMap;
