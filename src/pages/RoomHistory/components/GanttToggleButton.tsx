interface GanttToggleButtonProps {
  isGantt: boolean;
  onToggled: () => void;
}

export function GanttToggleButton({ isGantt, onToggled }: GanttToggleButtonProps) {
  const imagePath = isGantt ? '/ganttAnother.png' : '/gantt.png';

  return (
    <button onClick={onToggled}>
      <img src={imagePath} alt='stayer' width={27} height={27} />
    </button>
  );
}
