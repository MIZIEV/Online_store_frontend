import classes from "./TextArea.module.scss";

const TextArea: React.FC<{ id: string; label: string }> = (props) => {
  return (
    <div className={classes.textarea}>
      <label htmlFor={props.id}>{props.label}</label>
      <textarea id={props.id} name={props.id} required />
    </div>
  );
};

export default TextArea;
