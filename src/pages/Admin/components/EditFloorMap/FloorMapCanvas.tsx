export const FloorMapCanvas = (props: {
  buildingImagePath: string;
  canvasWidth: number;
  canvasHeight: number;
}) => {
  // 背景のフロアマップは描画処理が不要なため canvas ではなく img で表示する
  // (width/height を指定して、重ねている他の canvas と同じ縦横比にする)
  return (
    <div className='absolute border-x-4 border-b-4'>
      <img
        className='w-full bg-white'
        src={`/floor_maps${props.buildingImagePath}`}
        width={props.canvasWidth}
        height={props.canvasHeight}
        alt='フロアマップ'
      />
    </div>
  );
};
