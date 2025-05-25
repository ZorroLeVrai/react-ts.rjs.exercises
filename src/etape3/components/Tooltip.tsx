import styles from "./Tooltip.module.css";

export interface TooltipProps {
  position: {
    x: number;
    y: number;
  };
  texts: string[];
}

const Tooltip = ({ position, texts }: TooltipProps) => {
  const { x, y } = position;

  return (
    <div data-testid="progressbar_tooltip" className={styles.tooltip} style={{ top: y, left: x }}>
      {texts.map((text, index) => <div key={index}>{text}</div>)}
    </div>
  )
};

export default Tooltip;