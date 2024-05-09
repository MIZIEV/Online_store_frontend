import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postProduct, queryClient } from "../../../utils/http";
import classes from "./AddNewPhoneComponent.module.scss"
import { FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import { getOnePhone, updatePhone } from "../../../utils/phoneService";

interface PhoneRom {
  romSize: number
}

const AddNewPhoneComponent = () => {

  const navigate = useNavigate();

  const [brand, setBrand] = useState<string>("");
  const [countOfSimCard, setcountOfSimCard] = useState<number>(1);
  const [used, setUsed] = useState<boolean>(false);

  const [romList, setRomList] = useState<PhoneRom[]>([]);

  const [model, setModel] = useState("");
  const [mainPictureURL, setMainPictureURL] = useState("");
  const [os, setOs] = useState("");
  const [osVersion, setOsVersion] = useState("");
  const [screenSize, setScreenSize] = useState();
  const [resolution, setResolution] = useState("");
  const [mainCamera, setMainCamera] = useState();
  const [frontCamera, setFrontCamera] = useState();
  const [processor, setProcessor] = useState();
  const [ram, setRam] = useState();
  const [countOfCores, setCountOfCores] = useState();
  const [weight, setWeight] = useState();
  const [batteryCapacity, setBatteryCapacity] = useState();
  const [price, setPrice] = useState();


  const { phoneId } = useParams();


  let handleSubmit;

  useEffect(() => {
    if (phoneId) {
      getOnePhone(Number(phoneId)).then((response) => {


        setBrand(response.brand);
        setcountOfSimCard(response.countOfSimCard);
        setUsed(response.used);


        setMainPictureURL(response.mainPictureURL)
        setModel(response.model)
        setOs(response.os)
        setOsVersion(response.osVersion)
        setScreenSize(response.screenSize)
        setResolution(response.resolution)
        setMainCamera(response.mainCamera)
        setFrontCamera(response.frontCamera)
        setProcessor(response.processor)
        setRam(response.ram)
        setWeight(response.weight)
        setBatteryCapacity(response.batteryCapacity)
        setPrice(response.price)
        setCountOfCores(response.countOfCores)
        setRomList(response.romList)
      })
    }
  },[])

  if (phoneId) {
    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const data = {
        romList: romList,
        rating: 0.0,
        used: used,
        countOfSimCard: countOfSimCard,
        brand: brand,
        ...Object.fromEntries(formData),
      };
      updatePhone(Number(phoneId), data);
      navigate("/admin/phone-managment");
    };
  } else {

    const { mutate, isPending, isError } = useMutation({
      mutationFn: postProduct,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        navigate("/admin/phone-managment");
      },
    });
    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const data = {
        romList: romList,
        rating: 0.0,
        used: used,
        countOfSimCard: countOfSimCard,
        brand: brand,
        ...Object.fromEntries(formData),
      };
      mutate(data);
    };
  }



  const handleRomSelection = (e: React.ChangeEvent<{ value: unknown }>) => {
    const selectedSizes = e.target.value as number[];
    const roms: PhoneRom[] = selectedSizes.map(size => ({ romSize: size }));
    setRomList(roms);
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
              value={model}
              onChange={(e) => setModel(e.target.value)}
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
              value={mainPictureURL}
              onChange={(e) => setMainPictureURL(e.target.value)}
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
              value={os}
              onChange={(e) => setOs(e.target.value)}
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
              value={osVersion}
              onChange={(e) => setOsVersion(e.target.value)}
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
              value={screenSize}
              onChange={(e) => setScreenSize(e.target.value)}
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
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
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
              value={mainCamera}
              onChange={(e) => setMainCamera(e.target.value)}
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
              value={frontCamera}
              onChange={(e) => setFrontCamera(e.target.value)}
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
              value={processor}
              onChange={(e) => setProcessor(e.target.value)}
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
              value={countOfCores}
              onChange={(e) => setCountOfCores(e.target.value)}
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
              value={ram}
              onChange={(e) => setRam(e.target.value)}
              placeholder="Озу"
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="weight">Вага</label>
            <input
              id="weight"
              name="weight"
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
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
              value={batteryCapacity}
              onChange={(e) => setBatteryCapacity(e.target.value)}
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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

          <div className={classes.inputContainer}>
            <label htmlFor="rom">Озу</label>
            <Select
              id="rom"
              multiple={true}
              value={romList.map(rom => rom.romSize)} // Extracting the sizes from the PhoneRom array
              onChange={handleRomSelection} // Handling the ROM selection

              inputProps={{ id: 'select-multiple-chip', 'aria-label': 'brand' }}
            >
              <MenuItem value={2}>2 гб</MenuItem>
              <MenuItem value={4}>4 гб</MenuItem>
              <MenuItem value={6}>6 гб</MenuItem>
              <MenuItem value={8}>8 гб</MenuItem>
              <MenuItem value={10}>10 гб</MenuItem>
              <MenuItem value={12}>12 гб</MenuItem>
              <MenuItem value={16}>16 гб</MenuItem>
              <MenuItem value={18}>18 гб</MenuItem>
              <MenuItem value={24}>24 гб</MenuItem>
              <MenuItem value={32}>32 гб</MenuItem>
            </Select>
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