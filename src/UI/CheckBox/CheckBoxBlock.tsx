import React, { useState } from "react";
import classes from "./CheckBoxBlock.module.scss"
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const CheckBoxBlock: React.FC = (props) => {

    const title = props.title;
    const dataArray = props.characteristicData;
    const onFilterChange = props.onFilterChange;
    const filterKey = props.filterKey

    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const handleChackBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = event.target.value;
        const isChecked = event.target.checked;

        let newSelectedValues: string[];

        if (isChecked) {
            newSelectedValues = [...selectedValues, selectedValue];
        } else {
            newSelectedValues = selectedValues.filter(value => value !== selectedValue);
        }
        setSelectedValues(newSelectedValues);

        const filterParams = { [filterKey]: newSelectedValues }
        onFilterChange(filterParams);
    }

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
                            }} className={classes.checkboxStyle}
                                onChange={handleChackBoxChange}
                                value={data}
                            />}
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