import withToolTip from "../hoc/withToolTip"
import ProgressStatus from "./ProgressStatus"
import Tooltip from "./Tooltip"
import type { MousePosition } from "./types"

const renderTooltip = (mousePosition: MousePosition, texts: string[]) => {
  return <Tooltip position={mousePosition} texts={texts} />
}

const ProgressStatusWithTooltip = withToolTip(
  ProgressStatus,
  renderTooltip
);

export default ProgressStatusWithTooltip;