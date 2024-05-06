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
            <label htmlFor="model">Модель </label>
            <input
              id="model"
              name="model"
              type="text"
              placeholder="назва моделі"
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="mainPictureURL">URL головної картинки</label>
            <input
              id="mainPictureURL"
              name="mainPictureURL"
              type="text"
              placeholder="URL"
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="os">Операційна система</label>
            <input
              id="os"
              type="text"
              name="os"
              placeholder="Операційна система"
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="osVersion">Версія ос</label>
            <input
              id="osVersion"
              name="osVersion"
              type="text"
              placeholder="Версія ос "
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="">Розмір екрану</label>
            <input
              id="screenSize"
              type="text"
              name="screenSize"
              placeholder="розмір екрану"
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="resolution">Роздільна здатність</label>
            <input
              id="resolution"
              type="text"
              name="resolution"
              placeholder="роздільна здатність"
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="mainCamera">Головна камера</label>
            <input
              id="mainCamera"
              type="text"
              name="mainCamera"
              placeholder="Головна камера"
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="frontCamera">Фронтальна камера</label>
            <input
              id="frontCamera"
              name="frontCamera"
              type="text"
              placeholder="Фронтальна камера"
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="processor">Процесор</label>
            <input
              id="processor"
              name="processor"
              type="text"
              placeholder="Процесор"
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="countOfCores">Кількість ядер</label>
            <input
              id="countOfCores"
              name="countOfCores"
              type="text"
              placeholder="Кількість ядер"
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="ram">Озу</label>
            <input
              id="ram"
              name="ram"
              type="text"
              placeholder="Озу"
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="rom">Озп</label>
            <input
              id="rom"
              name="rom"
              type="text"
              placeholder="Озп"
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="weight">Вага</label>
            <input
              id="weight"
              name="weight"
              type="text"
              placeholder="Вага "
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="batteryCapacity">Ємність акумулятора</label>
            <input
              id="batteryCapacity"
              name="batteryCapacity"
              type="text"
              placeholder="Ємність акумулятора"
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="price">Ціна</label>
            <input
              id="price"
              name="price"
              type="text"
              placeholder="Ціна"
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="countOfSim">Кількість сім карток</label>
            <Select id="countOfSim"
              value={countOfSimCard}
              onChange={(e) => setcountOfSimCard(e.target.value as number)}>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="brand">Бренд</label>
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
              />} label="Вживаний?" />
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