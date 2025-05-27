import React, { useState } from 'react'
import type { TooltipProps } from '../components/Tooltip';
import type { ProgressStatusProps } from '../components/ProgressStatus';
import { useTranslation } from 'react-i18next';
import type { MousePosition } from '../types';

/* Higher Order Component to add a tooltip to a React component*/
/* renderTooltip uses a render prop to render its component */

interface EnhancedComponentProps extends ProgressStatusProps {
  totalTime: string; // e.g., "2h30"
  timeToComplete: string; // e.g., "1h15"
}

type RenderToolTipFunctionType = (MousePosition: MousePosition, texts: string[]) => React.ReactElement<TooltipProps>;


const withToolTip = (Component: React.ComponentType<ProgressStatusProps>, renderTooltip: RenderToolTipFunctionType) => {
  const EnhancedComponent = (props: EnhancedComponentProps) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { totalTime, timeToComplete } = props;
    const { t } = useTranslation();
    const generatedTooltipText = generateTooltipText(t("total_time", {time: totalTime}), t("remaining_time", {time: timeToComplete}));

    const mouseOver = () => setShowTooltip(true);
    const mouseOut = () => setShowTooltip(false);
    const mouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!showTooltip)
        return;
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    return (
      <>
        <div onMouseEnter={mouseOver} onMouseLeave={mouseOut} onMouseMove={mouseMove}>
          <Component {...props} />
          {showTooltip && renderTooltip(mousePosition, generatedTooltipText)}
        </div>
      </>
    );
  };

  return EnhancedComponent;
}

function generateTooltipText(totalTime: string, timeToComplete: string): string[] {
  return [
    totalTime,
    timeToComplete
  ];
}

export default withToolTip;