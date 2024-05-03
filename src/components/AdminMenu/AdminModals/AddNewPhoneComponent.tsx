import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postProduct, queryClient } from "../../../utils/http";
import classes from "./AddNewPhoneComponent.module.scss"
import { FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Switch } from "@mui/material";
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

  const [brand, setBrand] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);


    const data = {
      brand: brand,
      ...Object.fromEntries(formData),
    };


    mutate(data);
  };

  //const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  /* const handleOptionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
     setSelectedOptions(event.target.value as string[]);
   };*/

  const label = { inputProps: { 'aria-label': 'Switch demo' } };



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
              name="model"
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="main picture URL"
              name="mainPictureURL"
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="operation system"
              name="os"
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="version of operation system "
              name="osVersion"
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="screen size"
              name="screenSize"
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="resolution"
              name="resolution"
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="main camera"
              name="mainCamera"
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="front camera"
              name="frontCamera"
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="processor"
              name="processor"
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="count of cores"
              name="countOfCores"
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="ram"
              name="ram"
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="rom"
              name="rom"
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="weight"
              name="weight"
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="battery capacity"
              name="batteryCapacity"
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="count Of Sim Card"
              name="countOfSimCard"
            />
          </div>
          <div className={classes.inputContainer}>
            <input
              className={classes.inputField}
              type="text"
              placeholder="price"
              name="price"
            />
          </div>

          <div className={classes.inputContainer}>

            <Select label="Num of sim">
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
            </Select>
          </div>

          <div className={classes.inputContainer}>

            <Select label="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value as string)}>
              <MenuItem value="SAMSUNG">Samsung</MenuItem>
              <MenuItem value="XIAOMI">Xiaomi</MenuItem>
              <MenuItem value="APPLE">Apple</MenuItem>
            </Select>

          </div>

          <div className={classes.inputContainer}>
            <FormGroup>
              <FormControlLabel control={<Switch />} label="Is used?" />
            </FormGroup>
          </div>

          {/*<FormControl fullWidth>
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
        </FormControl>*/}


        </div>



        <button type="submit" >
          Зберегти
        </button>
      </form>
    </div>
  );
};

export default AddNewPhoneComponent;
