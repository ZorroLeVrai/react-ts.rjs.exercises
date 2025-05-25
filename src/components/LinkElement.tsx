import { Link } from "react-router-dom";
import styles from "./LinkElement.module.css";

interface LinkElementProps {
  to: string;
  text: string;
}

const LinkElement = ({ to, text }: LinkElementProps) => {
  return (
    <span className={styles.marginRight}>
      <Link to={to}>{text}</Link>
    </span>
  );
};

export default LinkElement;