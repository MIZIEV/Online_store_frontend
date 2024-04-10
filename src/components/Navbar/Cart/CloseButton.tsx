import classes from "./CartModal.module.scss";
import { Link } from "react-router-dom";

const CloseButton = () => {
  return (
    <Link to="..">
      <button className={classes.closeButton}>
        <span className={classes.closeIcon} aria-label="Close">
          {/* Green circle and "X" symbol styles */}
          <span className={classes.closeCircle}>
            <span className={classes.closeSymbol}>&#10006;</span>{" "}
            {/* "X" symbol using character code */}
          </span>
        </span>
      </button>
    </Link>
  );
};

export default CloseButton;
