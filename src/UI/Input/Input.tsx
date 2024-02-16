import classes from './Input.module.scss'

const Input: React.FC<{ id: string; label: string; type: string }> = (
  props
) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.id}>{props.label}</label>
      <input id={props.id} name={props.id} type={props.type} required />
    </div>
  );
};

export default Input;
