import { useNavigate, useParams } from "react-router-dom";
import classes from "./AddNewPhoneComponent.module.scss"
import { FormControlLabel, FormGroup, MenuItem, Select, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import { addNewPhone, getOnePhone, updatePhone } from "../../../utils/phoneService";
import ErrorModal from "../../../UI/Modal/ErrorModal";
import { isValidUrl } from "../../../utils/Validator";

interface PhoneRom {
  romSize: number
}

interface CommunicationStandardList {
  standardName: string
}

const AddNewPhoneComponent = () => {

  const navigate = useNavigate();

  const [brand, setBrand] = useState<string>("");
  const [countOfSimCard, setcountOfSimCard] = useState<number>(1);
  const [used, setUsed] = useState<boolean>(false);

  const [romList, setRomList] = useState<PhoneRom[]>([]);
  const [communicationStandardList, setCommunicationStandardList] = useState<CommunicationStandardList[]>([]);

  const [model, setModel] = useState<string>("");
  const [mainPictureURL, setMainPictureURL] = useState<string>("");
  const [os, setOs] = useState<string>("");
  const [osVersion, setOsVersion] = useState("");
  const [screenSize, setScreenSize] = useState<number>();
  const [resolution, setResolution] = useState<string>("");
  const [mainCamera, setMainCamera] = useState<string>();
  const [frontCamera, setFrontCamera] = useState<number>();
  const [processor, setProcessor] = useState<string>("");
  const [ram, setRam] = useState<number>();
  const [countOfCores, setCountOfCores] = useState<number>();
  const [weight, setWeight] = useState<number>();
  const [batteryCapacity, setBatteryCapacity] = useState<number>();
  const [price, setPrice] = useState<number>();
  const [producingCountry, setProducingCountry] = useState<string>("");

  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

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
        setProducingCountry(response.producingCountry)
        setPrice(response.price)
        setCountOfCores(response.countOfCores)
        setRomList(response.romList)
        setCommunicationStandardList(response.communicationStandardList);
      })
    }
  }, [])

  if (phoneId) {
    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const data = {
        communicationStandardList: communicationStandardList,
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

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const data = {
        communicationStandardList: communicationStandardList,
        romList: romList,
        rating: 0.0,
        used: used,
        countOfSimCard: countOfSimCard,
        brand: brand,
        os: os,
        ...Object.fromEntries(formData),
      };

      if (data.model.length < 5) {
        errorMessages.push("Поле 'модель' повинно бути довштим за 5 символів!")
      } if (data.producingCountry.length < 3) {
        errorMessages.push("Поле 'країна виробник' повинно бути довштим за 5 символів!")
      } if (data.screenSize <= 0) {
        errorMessages.push("Поле 'розмір екрана' не повинно бути від'ємним або нуль!")
      } if (data.mainCamera.length < 1) {
        errorMessages.push("Поле 'Головна камера' повинно бути довштим за 1 символ!")
      } if (data.frontCamera <= 0) {
        errorMessages.push("Поле 'Фронтальна камера' не повинно бути від'ємним або нуль!")
      } if (data.processor.length < 5) {
        errorMessages.push("Поле 'Процесор' повинно бути довштим за 5 символів!")
      } if (data.weight <= 0) {
        errorMessages.push("Поле 'Вага' не повинно бути від'ємним або нуль!")
      } if (data.batteryCapacity <= 0) {
        errorMessages.push("Поле 'Ємність акумулятора' не повинно бути від'ємним або нуль!")
      } if (data.price <= 0) {
        errorMessages.push("Поле 'Ціна' не повинно бути від'ємним або нуль!")
      } if (data.countOfCores <= 0) {
        errorMessages.push("Поле 'Кількість ядер' не повинно бути від'ємним або нуль!")
      } if (data.osVersion <= 0) {
        errorMessages.push("Поле 'Версія ОС' не повинно бути від'ємним або нуль!")
      } if (data.ram <= 0) {
        errorMessages.push("Поле 'ОЗУ' не повинно бути від'ємним або нуль!")
      } if (!isValidUrl(data.mainPictureURL)) {
        errorMessages.push("Не коректна URL головної картинки!")
      } if (data.resolution.length < 7) {
        errorMessages.push("Поле 'Роздільна здатність' повинно бути довштим за 7 символів!")
      } if (data.brand.length == 0) {
        errorMessages.push("Поле 'Бренд' не обране!")
      } if (data.os == undefined) {
        errorMessages.push("Поле 'ОС' не обране!")
      } if (data.communicationStandardList.length === 0) {
        errorMessages.push("Поле 'Стандарт зв'язку' не обране!")
      } if (data.romList.length == 0) {
        errorMessages.push("Поле 'Ппз' не обране!")
      }

      if (errorMessages.length > 0) {
        setIsError(true);
        setErrorMessages(errorMessages);
        return;
      }


      addNewPhone(data);
      navigate("/admin/phone-managment");
    };
  }

  const handleRomSelection = (e: React.ChangeEvent<{ value: unknown }>) => {
    const selectedSizes = e.target.value as number[];
    const roms: PhoneRom[] = selectedSizes.map(size => ({ romSize: size }));
    setRomList(roms);
  };

  const handleCommunicationStandardSelection = (e: React.ChangeEvent<{ value: unknown }>) => {
    const selectedSizes = e.target.value as string[];
    const standarts: CommunicationStandardList[] = selectedSizes.map(standardName => ({ standardName: standardName }));
    setCommunicationStandardList(standarts);
  };

  function handleUsed() {
    setUsed(!used);
    console.log(used);
  }

  const closeErroModalHandler = () => {
    setErrorMessages([]);
    setIsError(false);
  }

  return (
    <div className={classes.container}>

      {isError && <ErrorModal message={errorMessages} onClose={closeErroModalHandler} />}
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
            <label htmlFor="producingCountry">Країна виробник</label>
            <input
              id="producingCountry"
              type="text"
              name="producingCountry"
              value={producingCountry}
              onChange={(e) => setProducingCountry(e.target.value)}
              placeholder="Країна виробник"
              className={classes.inputField}
            />
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="osVersion">Версія ос</label>
            <input
              id="osVersion"
              name="osVersion"
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
            <label htmlFor="os">Ос</label>
            <Select id="os"
              value={os}
              onChange={(e) => setOs(e.target.value as string)}>
              <MenuItem value="Ios">Ios</MenuItem>
              <MenuItem value="Android">Android</MenuItem>
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
            <label htmlFor="rom">Ппз</label>
            <Select
              id="rom"
              multiple={true}
              value={romList.map(rom => rom.romSize)} // Extracting the sizes from the PhoneRom array
              onChange={handleRomSelection} // Handling the ROM selection

              inputProps={{ id: 'select-multiple-chip', 'aria-label': 'brand' }}
            >
              <MenuItem value={16}>16 гб</MenuItem>
              <MenuItem value={32}>32 гб</MenuItem>
              <MenuItem value={64}>64 гб</MenuItem>
              <MenuItem value={128}>128 гб</MenuItem>
              <MenuItem value={256}>256 гб</MenuItem>
              <MenuItem value={512}>512 гб</MenuItem>
              <MenuItem value={1}>1 Тб</MenuItem>
            </Select>
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="communicationStandardList">Стандарти зв'язку</label>
            <Select
              id="communicationStandardList"
              multiple={true}
              value={communicationStandardList.map(standard => standard.standardName)} // Extracting the sizes from the PhoneRom array
              onChange={handleCommunicationStandardSelection} // Handling the ROM selection

              inputProps={{ id: 'select-multiple-chip', 'aria-label': 'brand' }}
            >
              <MenuItem value="2G (GPRS/EDGE)">2G (GPRS/EDGE)</MenuItem>
              <MenuItem value="3G (WCDMA/UMTS/HSPA)">3G (WCDMA/UMTS/HSPA)</MenuItem>
              <MenuItem value="4G (LTE)">4G (LTE)</MenuItem>
              <MenuItem value="5G">5G</MenuItem>

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