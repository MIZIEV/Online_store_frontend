import classes from "./TextArea.module.scss";

const TextArea: React.FC<{
  id: string;
  label: string;
  value?: string | undefined | number;
}> = (props) => {
  return (
    <div className={classes.textarea}>
      <label htmlFor={props.id}>{props.label}</label>
      <textarea id={props.id} name={props.id} value={props.value} required />
    </div>
  );
};

export default TextArea;
