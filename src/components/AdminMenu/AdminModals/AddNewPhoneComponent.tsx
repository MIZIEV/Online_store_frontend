import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postProduct, queryClient } from "../../../utils/http";
import classes from "./AddNewPhoneComponent.module.scss"
import { FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Switch } from "@mui/material";
import { useState } from "react";

const AddNewPhoneComponent = () => {

  const navigate = useNavigate();

  const [brand, setBrand] = useState<string>("");
  const [countOfSimCard, setcountOfSimCard] = useState<number>(1);
  const [used, setUsed] = useState<boolean>(false);

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
    const data = {
      rating: 0.0,
      used: used,
      countOfSimCard: countOfSimCard,
      brand: brand,
      ...Object.fromEntries(formData),
    };
    mutate(data);
  };

  function handleUsed() {
    setUsed(!used);
    console.log(used);
  }

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>

        <h1>Додати новий смартфон</h1>

        <div className={classes.inputsContainer}>

          <div className={classes.inputContainer}>
            <label htmlFor="model">Model </label>
            <input
              id="model"
              name="model"
              type="text"
              placeholder="model"
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="mainPictureURL">Main picture URL</label>
            <input
              id="mainPictureURL"
              name="mainPictureURL"
              type="text"
              placeholder="main picture URL"
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="os">Operation system</label>
            <input
              id="os"
              type="text"
              name="os"
              placeholder="operation system"
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="osVersion">Os version</label>
            <input
              id="osVersion"
              name="osVersion"
              type="text"
              placeholder="version of operation system "
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="">Screen size</label>
            <input
              id="screenSize"
              type="text"
              name="screenSize"
              placeholder="screen size"
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="resolution">Resolution</label>
            <input
              id="resolution"
              type="text"
              name="resolution"
              placeholder="resolution"
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="mainCamera">Main camera</label>
            <input
              id="mainCamera"
              type="text"
              name="mainCamera"
              placeholder="main camera"
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="frontCamera">Front camera</label>
            <input
              id="frontCamera"
              name="frontCamera"
              type="text"
              placeholder="front camera"
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="processor">Processor</label>
            <input
              id="processor"
              name="processor"
              type="text"
              placeholder="processor"
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="countOfCores">Count of cores</label>
            <input
              id="countOfCores"
              name="countOfCores"
              type="text"
              placeholder="count of cores"
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="ram">Ram</label>
            <input
              id="ram"
              name="ram"
              type="text"
              placeholder="ram"
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="rom">Rom</label>
            <input
              id="rom"
              name="rom"
              type="text"
              placeholder="rom"
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="weight">Weight</label>
            <input
              id="weight"
              name="weight"
              type="text"
              placeholder="weight"
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="batteryCapacity">Battery capacity</label>
            <input
              id="batteryCapacity"
              name="batteryCapacity"
              type="text"
              placeholder="battery capacity"
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="price">Price</label>
            <input
              id="price"
              name="price"
              type="text"
              placeholder="price"
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="countOfSim">Count of sim cards</label>
            <Select id="countOfSim"
              value={countOfSimCard}
              onChange={(e) => setcountOfSimCard(e.target.value as number)}>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="brand">Brand</label>
            <Select id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value as string)}>
              <MenuItem value="SAMSUNG">Samsung</MenuItem>
              <MenuItem value="XIAOMI">Xiaomi</MenuItem>
              <MenuItem value="APPLE">Apple</MenuItem>
            </Select>
          </div>

          <div className={classes.inputContainer}>
            <FormGroup>
              <FormControlLabel control={<Switch
                checked={used}
                onChange={handleUsed}

                sx={{
                  '& .MuiSwitch-thumb': {
                    backgroundColor: '#436850'
                  },
                  '& .Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#767676'
                  },
                  '& .MuiSwitch-track': {
                    backgroundColor: '#adbc9f'
                  }
                }}
              />} label="Is used?" />
            </FormGroup>
          </div>
        </div>

        <div className={classes.bottomSection}>
          <button type="submit" >
            Зберегти
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewPhoneComponent;