import classes from "./Input.module.scss";

const Input: React.FC<{
  id: string;
  label: string;
  type: string;
  value?: string | undefined | number;
  min?: string;
  step?: string;
}> = (props) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        name={props.id}
        type={props.type}
        defaultValue={props.value}
        min={props.min}
        step={props.step}
        required
      />
    </div>
  );
};

export default Input;
