import React from "react";
import classes from "./CheckBoxBlock.module.scss"
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const CheckBoxBlock: React.FC = (props) => {

    const title = props.title;

    return (
        <div className={classes.container}>
            <FormGroup>
                <label className={classes.title}>{title}</label>
                <FormControlLabel control={<Checkbox sx={{
                    '&.Mui-checked': {
                        color: "#436850"
                    }
                }} className={classes.checkboxStyle} defaultChecked />}
                    label={<span className={classes.checkBocLabel}>Label</span>} />
                <FormControlLabel control={<Checkbox sx={{
                    '&.Mui-checked': {
                        color: "#436850"
                    }
                }} className={classes.checkboxStyle} defaultChecked />}
                    label={<span className={classes.checkBocLabel}>Label</span>} />
                <FormControlLabel control={<Checkbox sx={{
                    '&.Mui-checked': {
                        color: "#436850"
                    }
                }} className={classes.checkboxStyle} defaultChecked />}
                    label={<span className={classes.checkBocLabel}>Label</span>} />

            </FormGroup>
        </div>
    )
}

export default CheckBoxBlock;