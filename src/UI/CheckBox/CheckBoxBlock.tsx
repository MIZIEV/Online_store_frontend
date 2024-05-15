import React from "react";
import classes from "./CheckBoxBlock.module.scss"
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const CheckBoxBlock: React.FC = (props) => {

    const title = props.title;
    const dataArray = props.characteristicData;

    return (
        <div className={classes.container}>
            <FormGroup>
                <label className={classes.title}>{title}</label>
                {dataArray ? (
                    dataArray.map((data: any, index: number) => (
                        <FormControlLabel
                            key={index}
                            control={<Checkbox sx={{
                                '&.Mui-checked': {
                                    color: "#436850"
                                }
                            }} className={classes.checkboxStyle} />}
                            label={<span className={classes.checkBocLabel}>{data}</span>}
                        />
                    ))
                ) : (
                    <span>Loading...</span>
                )}
            </FormGroup>
        </div>
    )
}

export default CheckBoxBlock;