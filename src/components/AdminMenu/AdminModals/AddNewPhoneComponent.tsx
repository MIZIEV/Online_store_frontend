import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postProduct, queryClient } from "../../../utils/http";
import classes from "./AddNewPhoneComponent.module.scss"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

const AddNewPhoneComponent = () => {
  const navigate = useNavigate();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: postProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/admin");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    mutate(data);
  };

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setSelectedOptions(event.target.value as string[]);
  };



  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>

        <h2>Додати новий смартфон</h2>

        <div className={classes.inputsContainer}>

          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="model"
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="main picture URL"
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="operation system"
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="version of operation system "
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="screen size"
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="resolution"
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="main camera"
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="front camera"
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="processor"
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="count of cores"
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="ram"
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="rom"
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="weight"
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="battery capacity"
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="count O fSim Card"
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="price"
            />
          </div>
          
          <Select label="Num of sim">
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
          </Select>

          <FormControl fullWidth>
            <InputLabel id="multi-select-dropdown-label">Select Options</InputLabel>
            <Select
                labelId="multi-select-dropdown-label"
                id="multi-select-dropdown"
                multiple
                value={selectedOptions}
                onChange={handleOptionChange}
                renderValue={(selected) => (selected as string[]).join(', ')}
            >
                <MenuItem value="Option 1">Option 1</MenuItem>
                <MenuItem value="Option 2">Option 2</MenuItem>
                <MenuItem value="Option 3">Option 3</MenuItem>
            </Select>
        </FormControl>
        

        </div>



        <button type="submit" >
          Зберегти
        </button>
      </form>
    </div>
  );
};

export default AddNewPhoneComponent;
