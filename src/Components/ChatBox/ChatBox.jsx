import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "./chatbox.css";
import ListIcon from "@mui/icons-material/List";
import { Button, Card, Col, Row } from "react-bootstrap";
import PersonIcon from "@mui/icons-material/Person";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import MicIcon from "@mui/icons-material/Mic";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import MultipleValueTextInput from "react-multivalue-text-input";
import Loaders from "../Loaders";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useDispatch, useSelector } from "react-redux";
import { Extra_Id } from "../../store/actions";
import CancelIcon from "@mui/icons-material/Cancel";
import Spinners from "../Spinners";
import Modals from "../Modals";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { Link } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import onImageHandlers from "../ImageUploader";
import { BallTriangle } from "react-loader-spinner";
const ChatBox = () => {
  const imageRef = useRef();
  const [imageUrl, setImageUrl] = useState(null);
  const [imageToTextLoader, setImageToTextLoader] = useState(false);
  const [show, setShow] = useState(false);

  const scrollRef = useRef();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [tanvir, setTanvir] = useState("");
  const [increament, setIncreament] = useState("");
  const [ll, setLL] = useState("");
  const [metrics, setMetrics] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [msgLoader, setMsgLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [puubmedLoader, setPubmedLoader] = useState(false);
  const [puubmedError, setPubmeError] = useState("");
  const [library, setLibrary] = useState(
    localStorage.getItem("articles")
      ? JSON.parse(localStorage.getItem("articles"))
      : []
  );

  const [automessage, setAutoMessage] = useState([]);
  const [store, setStore] = useState([]);
  const [gptData, setGptData] = useState([]);
  const [converId, setConverId] = useState();
  const [allconversation, setAllConversation] = useState([]);
  const [delError, setDelError] = useState("");
  const [delErrorLoader, setDelErrorLoader] = useState(false);

  const [extraLoaders, setExtraLoaders] = useState(false);

  const [ageData, setAgeData] = useState("");
  const [weightData, setWeightData] = useState("");
  const [heightData, setHeightData] = useState("");
  const [sysmtomsData, setSysmtomsData] = useState("");
  const [allergiesData, setAllergiesData] = useState("");
  const [medicationData, setMedicationData] = useState("");
  const [temperatureData, setTemperatureData] = useState("");
  const [heartRateData, setHeartRateData] = useState("");
  const [respiratoryData, setRespiratoryData] = useState("");
  const [oxygenData, setOxygenData] = useState("");

  const [waistData, setWaistData] = useState("");

  const [hipData, setHipData] = useState("");

  const [systolicData, setSystolicData] = useState("");

  const [diAstolicData, setDiastolicData] = useState("");

  const [albuminData, setAlbuminData] = useState("");

  const [altData, setAltData] = useState("");

  const [astData, setAstData] = useState("");
  const [bunData, setBunData] = useState("");

  const [calciumData, setCalciumData] = useState("");
  const [creatineData, setCreatineData] = useState("");
  const [glucoseData, setGlucoseData] = useState("");
  const [hbaData, setHbaData] = useState("");
  const [potassiumData, setPotassiumData] = useState("");
  const [sodiumData, setSodiumData] = useState("");
  const [trigData, setTrigData] = useState("");
  const [ldlData, setLdlData] = useState("");
  const [hdlData, setHdlData] = useState("");
  const [egfrData, setEgfrData] = useState("");

  //gpt credential usestate for frontend start from here

  const [ages, setAges] = useState(
    localStorage.getItem("age") ? JSON.parse(localStorage.getItem("age")) : ""
  );
  const [weight, setWeight] = useState(
    localStorage.getItem("weight")
      ? JSON.parse(localStorage.getItem("weight"))
      : ""
  );
  const [heights, setHeight] = useState(
    localStorage.getItem("height")
      ? JSON.parse(localStorage.getItem("height"))
      : ""
  );
  const [heightsInc, setHeightInc] = useState(
    localStorage.getItem("inc") ? JSON.parse(localStorage.getItem("inc")) : ""
  );
  const [symtoms, setSytoms] = useState(
    localStorage.getItem("sysmtoms")
      ? JSON.parse(localStorage.getItem("sysmtoms"))
      : []
  );
  const [allergies, setAllergies] = useState(
    localStorage.getItem("allergies")
      ? JSON.parse(localStorage.getItem("allergies"))
      : []
  );
  const [medication, setMedication] = useState(
    localStorage.getItem("medication")
      ? JSON.parse(localStorage.getItem("medication"))
      : []
  );
  const [temperature, setTemperature] = useState(
    localStorage.getItem("temperature")
      ? JSON.parse(localStorage.getItem("temperature"))
      : ""
  );
  const [heartRate, setHeartRate] = useState(
    localStorage.getItem("heartrate")
      ? JSON.parse(localStorage.getItem("heartrate"))
      : ""
  );
  const [respiratory, setRespiratory] = useState(
    localStorage.getItem("respiratory")
      ? JSON.parse(localStorage.getItem("respiratory"))
      : ""
  );
  const [oxygen, setOxygen] = useState(
    localStorage.getItem("oxygen")
      ? JSON.parse(localStorage.getItem("oxygen"))
      : ""
  );
  const [waist, setWaist] = useState(
    localStorage.getItem("waist")
      ? JSON.parse(localStorage.getItem("waist"))
      : ""
  );
  const [hip, setHip] = useState(
    localStorage.getItem("hip") ? JSON.parse(localStorage.getItem("hip")) : ""
  );
  const [systolic, setSystolic] = useState(
    localStorage.getItem("systolic")
      ? JSON.parse(localStorage.getItem("systolic"))
      : ""
  );
  const [diastolic, setDiastolic] = useState(
    localStorage.getItem("diastolic")
      ? JSON.parse(localStorage.getItem("diastolic"))
      : ""
  );
  const [albumin, setAlbumin] = useState(
    localStorage.getItem("albumin")
      ? JSON.parse(localStorage.getItem("albumin"))
      : ""
  );
  const [alt, setAlt] = useState(
    localStorage.getItem("alt") ? JSON.parse(localStorage.getItem("alt")) : ""
  );
  const [ast, setAst] = useState(
    localStorage.getItem("ast") ? JSON.parse(localStorage.getItem("ast")) : ""
  );
  const [bun, setBun] = useState(
    localStorage.getItem("bun") ? JSON.parse(localStorage.getItem("bun")) : ""
  );
  const [calcium, setCalcium] = useState(
    localStorage.getItem("calcium")
      ? JSON.parse(localStorage.getItem("calcium"))
      : ""
  );
  const [creatine, setCreatine] = useState(
    localStorage.getItem("creatine")
      ? JSON.parse(localStorage.getItem("creatine"))
      : ""
  );
  const [glucose, setGlucose] = useState(
    localStorage.getItem("glucose")
      ? JSON.parse(localStorage.getItem("glucose"))
      : ""
  );
  const [hba, setHba] = useState(
    localStorage.getItem("hba") ? JSON.parse(localStorage.getItem("hba")) : ""
  );
  const [potassium, setPotassium] = useState(
    localStorage.getItem("potassium")
      ? JSON.parse(localStorage.getItem("potassium"))
      : ""
  );
  const [sodium, setSodium] = useState(
    localStorage.getItem("sodium")
      ? JSON.parse(localStorage.getItem("sodium"))
      : ""
  );
  const [trig, setTrig] = useState(
    localStorage.getItem("trig") ? JSON.parse(localStorage.getItem("trig")) : ""
  );
  const [ldl, setLdl] = useState(
    localStorage.getItem("ldl") ? JSON.parse(localStorage.getItem("ldl")) : ""
  );
  const [hdl, setHdl] = useState(
    localStorage.getItem("hdl") ? JSON.parse(localStorage.getItem("hdl")) : ""
  );
  const [egfr, setEgfr] = useState(
    localStorage.getItem("egfr") ? JSON.parse(localStorage.getItem("egfr")) : ""
  );

  const { user } = useSelector((state) => state.auth);
  const { text } = useSelector((state) => state.voice);

  const onChangeHandler = (e) => {
    setValue(e.target.value);
    //console.log(e.target.value);
  };
  useEffect(() => {
    setValue(text);
  }, [text]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIncreament("");
    setPubmeError("");

    // const sendData = {
    //   message: value,
    // };

    const sendData = {
      converId: converId,
      token: user.token ? user.token : null,
      extraId: user.id ? user.id : tanvir,
      message:
        ageData +
        "" +
        weightData +
        "" +
        heightData +
        "" +
        sysmtomsData +
        "" +
        allergiesData +
        "" +
        medicationData +
        "" +
        temperatureData +
        "" +
        heartRateData +
        "" +
        respiratoryData +
        "" +
        oxygenData +
        "" +
        waistData +
        "" +
        hipData +
        "" +
        systolicData +
        "" +
        diAstolicData +
        "" +
        albuminData +
        "" +
        altData +
        "" +
        astData +
        "" +
        bunData +
        "" +
        calciumData +
        "" +
        creatineData +
        "" +
        glucoseData +
        "" +
        hbaData +
        "" +
        potassiumData +
        "" +
        sodiumData +
        "" +
        trigData +
        "" +
        ldlData +
        "" +
        hdlData +
        "" +
        egfrData,
      text: value,
      messages: gptData,
      image: imageUrl,
    };

    setIsLoading(true);
    setStore((store) => [
      ...store,
      { user: value },
      { gpt: "" },
      { automessage: automessage },
    ]);
    setValue("");

    setTimeout(async () => {
      try {
        const { data } = await axios.post(
          process.env.REACT_APP_SERVER_URL + "/gpt",
          sendData,
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
        );

        //send request for auto generator message
        const autoSendData = {
          text: value,
          converId: converId,
          token: user.token ? user.token : null,
          extraId: user.id ? user.id : tanvir,
        };
        try {
          var { data: auto } = await axios.post(
            process.env.REACT_APP_SERVER_URL + "/autogpt",
            autoSendData,
            {
              headers: {
                Authorization: "Bearer " + user.token,
              },
            }
          );
        } catch (err) {
          setIncreament(err.response.data.message);
          setIsLoading(false);
        }

        //send request for auto generator message

        //send request for symptoms
        const symptomsData = {
          text: value,
        };
        try {
          var { data: symptomss } = await axios.post(
            process.env.REACT_APP_SERVER_URL + "/symptomsgpt",
            symptomsData,
            {
              headers: {
                Authorization: "Bearer " + user.token,
              },
            }
          );
        } catch (err) {
          setIncreament(err.response.data.message);
          setIsLoading(false);
        }

        const filterSymptoms = symptomss.result.filter(
          (item) => item != "null"
        );
        console.log(filterSymptoms);

        setSytoms(filterSymptoms);
        localStorage.setItem("sysmtoms", JSON.stringify(filterSymptoms));

        //send request for symptoms

        const autoPrint = [
          auto.result[1] || null,
          auto.result[2] || null,
          auto.result[3] || null,
          auto.result[4] || null,
        ];

        setMessage(data.result.choices[0].message.content);
        setAutoMessage(autoPrint);
        setIsLoading(false);

        //send request for pubmed
        const pubmeDataData = {
          text: value,
        };
        try {
          setLibrary([]);
          localStorage.removeItem("articles");
          setPubmedLoader(true);
          const { data: pubmed } = await axios.post(
            process.env.REACT_APP_SERVER_URL + "/pubmed",
            pubmeDataData
          );
          setLibrary(pubmed.articles);

          localStorage.setItem("articles", JSON.stringify(pubmed.articles));
          setPubmedLoader(false);
        } catch (err) {
          setPubmeError(err.response.data.message);
          setPubmedLoader(false);
        }
        const dbData = {
          converId: converId,
          automessage: autoPrint,
          gpt: data.result.choices[0].message.content,
          user: value,
          userId: user.id ? user.id : tanvir,
          token: user.token ? user.token : null,
        };

        //for db request
        try {
          await axios.post(
            process.env.REACT_APP_SERVER_URL + "/message",
            dbData
          );
        } catch (err) {
          setIncreament(err.response.data.message);
        }
        const extraData = {
          converId: converId,
          user:
            ageData +
            "" +
            weightData +
            "" +
            heightData +
            "" +
            sysmtomsData +
            "" +
            allergiesData +
            "" +
            medicationData +
            "" +
            temperatureData +
            "" +
            heartRateData +
            "" +
            respiratoryData +
            "" +
            oxygenData +
            "" +
            waistData +
            "" +
            hipData +
            "" +
            systolicData +
            "" +
            diAstolicData +
            "" +
            albuminData +
            "" +
            altData +
            "" +
            astData +
            "" +
            bunData +
            "" +
            calciumData +
            "" +
            creatineData +
            "" +
            glucoseData +
            "" +
            hbaData +
            "" +
            potassiumData +
            "" +
            sodiumData +
            "" +
            trigData +
            "" +
            ldlData +
            "" +
            hdlData +
            "" +
            egfrData,
          userId: user.id ? user.id : tanvir,
          token: user.token ? user.token : null,
        };
        try {
          await axios.post(
            process.env.REACT_APP_SERVER_URL + "/extra",
            extraData
          );
        } catch (err) {
          console.log(err.response.data.message);
        }
      } catch (err) {
        setIncreament(err.response.data.message);
        setIsLoading(false);
      }

      setAgeData("");
      setWeightData("");
      setHeightData("");
      setSysmtomsData("");
      setAllergiesData("");
      setMedicationData("");
      setTemperatureData("");
      setHeartRateData("");
      setRespiratoryData("");
      setOxygenData("");
      setWaistData("");
      setHipData("");
      setSystolicData("");
      setDiastolicData("");
      setAlbuminData("");
      setAltData("");
      setAstData("");
      setBunData("");
      setCalciumData("");
      setCreatineData("");
      setGlucoseData("");
      setHbaData("");
      setPotassiumData("");
      setSodiumData("");
      setTrigData("");
      setLdlData("");
      setHdlData("");
      setEgfrData("");
    }, 1000);
  };
  // below for conversation id
  useEffect(() => {
    const conData = {
      userId: user.id ? user.id : tanvir,
      first: "I am first",
      // message: value,
      // token: user.token ? user.token : null,
    };
    const fetchData = async () => {
      try {
        const { data } = await axios.post(
          process.env.REACT_APP_SERVER_URL + "/conversation",
          conData
        );
        setConverId(data.con);
      } catch (err) {
        console.log(err);
      }
    };

    setTimeout(() => {
      fetchData();
    }, 300);
  }, [user, tanvir]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const conData = {
          userId: user.id ? user.id : tanvir,
          // message: value,
          // token: user.token ? user.token : null,
        };

        const { data } = await axios.post(
          process.env.REACT_APP_SERVER_URL + "/getconver",
          conData
        );
        setAllConversation(data.conver);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [converId]);

  useEffect(() => {
    if (message) {
      setStore((store) => [
        ...store,
        { user: "" },
        { gpt: message },
        { automessage: automessage },
      ]);
    }

    //test
    const fetchData = async () => {
      const sendData = {
        userId: user.id ? user.id : tanvir,
      };

      try {
        const { data } = await axios.post(
          process.env.REACT_APP_SERVER_URL + "/gpts",
          sendData
        );

        const renderData = data.result.map((item) => ({
          role: "user",
          content: item.user,
        }));
        setGptData(renderData);
        setAutoMessage([]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    //tst
  }, [message]);

  useEffect(() => {
    const fetchData = async () => {
      const sendData = {
        userId: user.token ? user.id : tanvir,
        converId: converId,
      };

      setMsgLoader(true);

      try {
        const { data } = await axios.post(
          process.env.REACT_APP_SERVER_URL + "/gpts",
          sendData
        );
        //extra for api

        //extra for api

        setStore(data.result);
        setMsgLoader(false);
      } catch (err) {
        setMsgLoader(false);
        console.log(err.response.data.message);
      }
    };

    setTimeout(() => {
      fetchData();
    }, 300);
  }, [user, tanvir, converId, delError]);

  useEffect(() => {
    const easin = localStorage.getItem("userId")
      ? JSON.parse(localStorage.getItem("userId"))
      : null;
    if (!easin) {
      localStorage.setItem("userId", JSON.stringify(uuidv4()));
    }

    setTimeout(() => {
      const data = localStorage.getItem("userId")
        ? JSON.parse(localStorage.getItem("userId"))
        : null;
      setTanvir(data);

      dispatch(Extra_Id(data));
    }, 500);
  }, [tanvir]);

  //age extra start

  useEffect(() => {
    const fetchData = () => {
      const finalData = "My age is " + ages + " years ";
      setAgeData(finalData);
      localStorage.setItem("age", JSON.stringify(ages));
    };

    const timerId = setTimeout(() => {
      if (ages) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [ages]);

  useEffect(() => {
    const fetchData = () => {
      const finalData = "My weight is " + weight + (metrics ? " Ibs " : " Kg ");

      setWeightData(finalData);
      localStorage.setItem("weight", JSON.stringify(weight));
    };

    const timerId = setTimeout(() => {
      if (weight) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [weight]);

  useEffect(() => {
    const fetchData = () => {
      const finalData =
        "My height is " +
        heights +
        (metrics ? " ft " : " m ") +
        heightsInc +
        (metrics ? " in " : " cm ");

      setHeightData(finalData);
      localStorage.setItem("height", JSON.stringify(heights));
      localStorage.setItem("inc", JSON.stringify(heightsInc));
    };

    const timerId = setTimeout(() => {
      if (heights && heightsInc) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [heights, heightsInc]);

  useEffect(() => {
    const fetchData = async () => {
      const mySymtoms = symtoms.map((item) => item);

      const finalData =
        "I am suffering with some symtoms my symtoms are " + mySymtoms + " ";

      setSysmtomsData(finalData);

      localStorage.setItem("sysmtoms", JSON.stringify(symtoms));
    };

    const timerId = setTimeout(() => {
      if (symtoms.length > 0) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [symtoms]);

  useEffect(() => {
    const fetchData = () => {
      const mySymtoms = allergies.map((item) => item);

      const finalData = "I have allergies like " + mySymtoms + " allergies ";

      setAllergiesData(finalData);

      localStorage.setItem("allergies", JSON.stringify(allergies));
    };

    const timerId = setTimeout(() => {
      if (allergies.length > 0) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [allergies]);

  useEffect(() => {
    const fetchData = () => {
      const mySymtoms = medication.map((item) => item);

      const finalData = "I have some medications like  " + mySymtoms + " ";

      setMedicationData(finalData);

      localStorage.setItem("medication", JSON.stringify(medication));
    };

    const timerId = setTimeout(() => {
      if (medication.length > 0) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [medication]);

  useEffect(() => {
    const fetchData = () => {
      const finalData =
        "My body temperature is " +
        temperature +
        (metrics ? " degrees Fahrenheit (°F) " : "  degrees Celsius (°C) ");

      setTemperatureData(finalData);
      localStorage.setItem("temperature", JSON.stringify(temperature));
    };

    const timerId = setTimeout(() => {
      if (temperature) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [temperature]);

  useEffect(() => {
    const fetchData = () => {
      const finalData = "My heart rate is " + heartRate + " BPM ";
      setHeartRateData(finalData);

      localStorage.setItem("heartrate", JSON.stringify(heartRate));
    };

    const timerId = setTimeout(() => {
      if (heartRate) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [heartRate]);

  useEffect(() => {
    const fetchData = () => {
      const finalData =
        "My respiratory rate is " + respiratory + " breaths per minutes ";

      setRespiratoryData(finalData);
      localStorage.setItem("respiratory", JSON.stringify(respiratory));
    };

    const timerId = setTimeout(() => {
      if (respiratory) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [respiratory]);

  useEffect(() => {
    const fetchData = () => {
      const finalData = "My oxygen saturation is " + oxygen + " % ";
      setOxygenData(finalData);
      localStorage.setItem("oxygen", JSON.stringify(oxygen));
    };

    const timerId = setTimeout(() => {
      if (oxygen) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [oxygen]);

  useEffect(() => {
    const fetchData = () => {
      const finalData =
        "My waist circumference is " +
        waist +
        (metrics ? " inches (in) " : " centimeters (cm) ");

      setWaistData(finalData);
      localStorage.setItem("waist", JSON.stringify(waist));
    };

    const timerId = setTimeout(() => {
      if (waist) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [waist]);

  useEffect(() => {
    const fetchData = () => {
      const finalData =
        "My hip circumference is " +
        hip +
        (metrics ? " inches (in) " : " centimeters (cm) ");

      setHipData(finalData);
      localStorage.setItem("hip", JSON.stringify(hip));
    };

    const timerId = setTimeout(() => {
      if (hip) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [hip]);

  useEffect(() => {
    const fetchData = () => {
      const finalData = "My Systolic Blood Pressure is " + systolic + "  mmHg ";
      setSystolicData(finalData);
      localStorage.setItem("systolic", JSON.stringify(systolic));
    };

    const timerId = setTimeout(() => {
      if (systolic) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [systolic]);

  useEffect(() => {
    const fetchData = () => {
      const finalData =
        "My Diastolic Blood Pressure is " + diastolic + "  mmHg ";

      setDiastolicData(finalData);
      localStorage.setItem("diastolic", JSON.stringify(diastolic));
    };

    const timerId = setTimeout(() => {
      if (diastolic) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [diastolic]);

  useEffect(() => {
    const fetchData = () => {
      const finalData =
        "My Albumin lab test result is " +
        albumin +
        (metrics ? " g/dL " : " g/L ");
      setAlbuminData(finalData);
      localStorage.setItem("albumin", JSON.stringify(albumin));
    };

    const timerId = setTimeout(() => {
      if (albumin) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [albumin]);

  useEffect(() => {
    const fetchData = () => {
      const finalData =
        "My amount of alt in the blood from lab test result is " +
        alt +
        "  U/L ";
      setAltData(finalData);
      localStorage.setItem("alt", JSON.stringify(alt));
    };

    const timerId = setTimeout(() => {
      if (alt) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [alt]);

  useEffect(() => {
    const fetchData = () => {
      const finalData = "My ast lab test result is " + ast + "  U/L ";

      setAstData(finalData);
      localStorage.setItem("ast", JSON.stringify(ast));
    };

    const timerId = setTimeout(() => {
      if (ast) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [ast]);

  useEffect(() => {
    const fetchData = () => {
      const finalData =
        "My bun lab test result is " + bun + (metrics ? " mg/dL " : " mmol/L ");

      setBunData(finalData);
      localStorage.setItem("bun", JSON.stringify(bun));
    };

    const timerId = setTimeout(() => {
      if (bun) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [bun]);

  useEffect(() => {
    const fetchData = () => {
      const finalData = "My calcium is " + calcium + " from lab test result ";
      setCalciumData(finalData);
      localStorage.setItem("calcium", JSON.stringify(calcium));
    };

    const timerId = setTimeout(() => {
      if (calcium) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [calcium]);

  useEffect(() => {
    const fetchData = () => {
      const finalData =
        "My creatinine lab test result is " +
        creatine +
        (metrics ? " mg/dL " : " μmol/L ");
      setCreatineData(finalData);
      localStorage.setItem("creatine", JSON.stringify(creatine));
    };

    const timerId = setTimeout(() => {
      if (creatine) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [creatine]);

  useEffect(() => {
    const fetchData = () => {
      const finalData =
        "My glucose lab test result is " +
        glucose +
        (metrics ? " mg/dL " : " mmol/L ");
      setGlucoseData(finalData);
      localStorage.setItem("glucose", JSON.stringify(glucose));
    };

    const timerId = setTimeout(() => {
      if (glucose) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [glucose]);

  useEffect(() => {
    const fetchData = () => {
      const finalData =
        "My hba1c level from lab test result is " + hba + " mmol/ml ";
      setHbaData(finalData);
      localStorage.setItem("hba", JSON.stringify(hba));
    };

    const timerId = setTimeout(() => {
      if (hba) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [hba]);

  useEffect(() => {
    const fetchData = () => {
      const finalData =
        "My potassium lab test result is " +
        potassium +
        (metrics ? " mEq/L " : " mmol/L ");
      setPotassiumData(finalData);
      localStorage.setItem("potassium", JSON.stringify(potassium));
    };

    const timerId = setTimeout(() => {
      if (potassium) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [potassium]);

  useEffect(() => {
    const fetchData = () => {
      const finalData =
        "My sodium lab test result is " +
        sodium +
        (metrics ? " mEq/L " : " mmol/L ");
      setSodiumData(finalData);
      localStorage.setItem("sodium", JSON.stringify(sodium));
    };

    const timerId = setTimeout(() => {
      if (sodium) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [sodium]);

  useEffect(() => {
    const fetchData = () => {
      const finalData =
        "My triglycerides lab test result is " +
        trig +
        (metrics ? " mg/dL " : " mmol/L ");
      setTrigData(finalData);
      localStorage.setItem("trig", JSON.stringify(trig));
    };

    const timerId = setTimeout(() => {
      if (trig) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [trig]);

  useEffect(() => {
    const fetchData = () => {
      const finalData =
        "My LDL cholesterol level from lab test result is " +
        ldl +
        (metrics ? " mg/dL " : " mmol/L ");
      setLdlData(finalData);
      localStorage.setItem("ldl", JSON.stringify(ldl));
    };

    const timerId = setTimeout(() => {
      if (ldl) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [ldl]);

  useEffect(() => {
    const fetchData = () => {
      const finalData =
        "My HDL cholesterol level from lab test result is " +
        hdl +
        (metrics ? " mg/dL " : " mmol/L ");
      setHdlData(finalData);
      localStorage.setItem("hdl", JSON.stringify(hdl));
    };

    const timerId = setTimeout(() => {
      if (hdl) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [hdl]);

  useEffect(() => {
    const fetchData = () => {
      const finalData =
        "My eGFR lab test result is " + egfr + " mL/min/1.73m2 ";
      setEgfrData(finalData);
      localStorage.setItem("egfr", JSON.stringify(egfr));
    };

    const timerId = setTimeout(() => {
      if (egfr) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [egfr]);

  useEffect(() => {
    if (imageUrl) {
      setImageToTextLoader(false);
      setIsLoading(true);

      const fetchData = async () => {
        setMessage("");
        try {
          // this is for the vision api
          const sendData = {
            converId: converId,
            image: imageUrl,
            token: user.token ? user.token : null,
            extraId: user.id ? user.id : tanvir,
          };
          let data;
          try {
            data = (
              await axios.post(
                process.env.REACT_APP_SERVER_URL + "/imagetotext",
                sendData
              )
            ).data;
            setIsLoading(false);
          } catch (err) {
            setIncreament(err.response.data.message);
            setIsLoading(false);
          }

          setMessage(data.result.choices[0].message.content);

          const databaseData = {
            automessage: [null, null, null, null, null],
            converId: converId,
            gpt: data.result.choices[0].message.content,
            user: "",
            userId: user.id ? user.id : tanvir,
            token: user.token ? user.token : null,
          };

          try {
            await axios.post(
              process.env.REACT_APP_SERVER_URL + "/message",
              databaseData
            );
          } catch (err) {
            console.log(err);
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }
  }, [imageUrl]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [store, isLoading, automessage]);

  const newChatHandler = async () => {
    setDelError("");
    localStorage.removeItem("age");
    localStorage.removeItem("weight");
    localStorage.removeItem("height");
    localStorage.removeItem("inc");
    localStorage.removeItem("sysmtoms");
    localStorage.removeItem("allergies");
    localStorage.removeItem("medication");
    localStorage.removeItem("temperature");
    localStorage.removeItem("heartrate");
    localStorage.removeItem("respiratory");
    localStorage.removeItem("oxygen");
    localStorage.removeItem("waist");
    localStorage.removeItem("hip");
    localStorage.removeItem("systolic");
    localStorage.removeItem("diastolic");
    localStorage.removeItem("albumin");
    localStorage.removeItem("alt");
    localStorage.removeItem("ast");
    localStorage.removeItem("bun");
    localStorage.removeItem("calcium");
    localStorage.removeItem("creatine");
    localStorage.removeItem("glucose");
    localStorage.removeItem("hba");
    localStorage.removeItem("potassium");
    localStorage.removeItem("sodium");
    localStorage.removeItem("trig");
    localStorage.removeItem("ldl");
    localStorage.removeItem("hdl");
    localStorage.removeItem("egfr");

    setExtraLoaders(true);
    try {
      const conData = {
        userId: user.id ? user.id : tanvir,
        token: user.token,
        // message: value,
        // token: user.token ? user.token : null,
      };

      const { data } = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/conversation",
        conData
      );
      setConverId(data.con);
      setExtraLoaders(false);
    } catch (err) {
      setIncreament(err.response.data.message);
      setExtraLoaders(false);
    }
  };

  //create new conversation
  const createNewConver = async (id) => {
    setConverId(id);
    setDelError("");
    //nes
    setAgeData("");
    setWeightData("");
    setHeightData("");
    setSysmtomsData("");
    setAllergiesData("");
    setMedicationData("");
    setTemperatureData("");
    setHeartRateData("");
    setRespiratoryData("");
    setOxygenData("");
    setWaistData("");
    setHipData("");
    setSystolicData("");
    setDiastolicData("");
    setAlbuminData("");
    setAltData("");
    setAstData("");
    setBunData("");
    setCalciumData("");
    setCreatineData("");
    setGlucoseData("");
    setHbaData("");
    setPotassiumData("");
    setSodiumData("");
    setTrigData("");
    setLdlData("");
    setHdlData("");
    setEgfrData("");
    //nes
    localStorage.removeItem("age");
    localStorage.removeItem("weight");
    localStorage.removeItem("height");
    localStorage.removeItem("inc");
    localStorage.removeItem("sysmtoms");
    localStorage.removeItem("allergies");
    localStorage.removeItem("medication");
    localStorage.removeItem("temperature");
    localStorage.removeItem("heartrate");
    localStorage.removeItem("respiratory");
    localStorage.removeItem("oxygen");
    localStorage.removeItem("waist");
    localStorage.removeItem("hip");
    localStorage.removeItem("systolic");
    localStorage.removeItem("diastolic");
    localStorage.removeItem("albumin");
    localStorage.removeItem("alt");
    localStorage.removeItem("ast");
    localStorage.removeItem("bun");
    localStorage.removeItem("calcium");
    localStorage.removeItem("creatine");
    localStorage.removeItem("glucose");
    localStorage.removeItem("hba");
    localStorage.removeItem("potassium");
    localStorage.removeItem("sodium");
    localStorage.removeItem("trig");
    localStorage.removeItem("ldl");
    localStorage.removeItem("hdl");
    localStorage.removeItem("egfr");
  };

  const onDeleteChatHandler = async () => {
    localStorage.setItem("articles", JSON.stringify([]));
    setLibrary([]);
    setSytoms([]);
    //new
    setAgeData("");
    setWeightData("");
    setHeightData("");
    setSysmtomsData("");
    setAllergiesData("");
    setMedicationData("");
    setTemperatureData("");
    setHeartRateData("");
    setRespiratoryData("");
    setOxygenData("");
    setWaistData("");
    setHipData("");
    setSystolicData("");
    setDiastolicData("");
    setAlbuminData("");
    setAltData("");
    setAstData("");
    setBunData("");
    setCalciumData("");
    setCreatineData("");
    setGlucoseData("");
    setHbaData("");
    setPotassiumData("");
    setSodiumData("");
    setTrigData("");
    setLdlData("");
    setHdlData("");
    setEgfrData("");
    //new

    localStorage.removeItem("age");
    localStorage.removeItem("weight");
    localStorage.removeItem("height");
    localStorage.removeItem("inc");
    localStorage.removeItem("sysmtoms");
    localStorage.removeItem("allergies");
    localStorage.removeItem("medication");
    localStorage.removeItem("temperature");
    localStorage.removeItem("heartrate");
    localStorage.removeItem("respiratory");
    localStorage.removeItem("oxygen");
    localStorage.removeItem("waist");
    localStorage.removeItem("hip");
    localStorage.removeItem("systolic");
    localStorage.removeItem("diastolic");
    localStorage.removeItem("albumin");
    localStorage.removeItem("alt");
    localStorage.removeItem("ast");
    localStorage.removeItem("bun");
    localStorage.removeItem("calcium");
    localStorage.removeItem("creatine");
    localStorage.removeItem("glucose");
    localStorage.removeItem("hba");
    localStorage.removeItem("potassium");
    localStorage.removeItem("sodium");
    localStorage.removeItem("trig");
    localStorage.removeItem("ldl");
    localStorage.removeItem("hdl");
    localStorage.removeItem("egfr");

    setIncreament("");
    const sendData = {
      converId: converId,
    };

    setDelErrorLoader(true);
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/deletemessage",
        sendData
      );
      setDelError(data.message);
      setDelErrorLoader(false);
    } catch (err) {
      setIncreament(err.response.data.message);
      setDelErrorLoader(false);
    }
  };

  const onVoiceHandler = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      console.log("Text-to-speech is not supported in this browser.");
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const image = await onImageHandlers(file, setImageToTextLoader);
    setImageUrl(image);
  };

  const onImageHandler = () => {
    imageRef.current.click();
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <div className="c-containers">
        <Row className="chat">
          <Col xs={12} sm={12} md={6} lg={7}>
            <div className="chat-left">
              {/* chat */}
              {msgLoader || imageToTextLoader ? (
                <>
                  {msgLoader ? (
                    <Loaders />
                  ) : (
                    <div className="loaders">
                      <span>
                        <BallTriangle
                          height={100}
                          width={100}
                          radius={5}
                          color="#4fa94d"
                          ariaLabel="ball-triangle-loading"
                          wrapperClass={{}}
                          wrapperStyle=""
                          visible={true}
                        />
                      </span>
                      <span>File Loading</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="text mt-2">
                  <>
                    <div className="sender">
                      <div className="ellepse">
                        {" "}
                        <img
                          className="msg-logo"
                          src="/assests/b.png"
                          alt=""
                        />{" "}
                      </div>
                      <div className="message">
                        <p>Hello there! I'm Dr. Mega.</p>
                        <div className="shape"></div>
                      </div>
                    </div>
                    <div className="sender">
                      <div className="ellepse">
                        {" "}
                        <img
                          className="msg-logo"
                          src="/assests/b.png"
                          alt=""
                        />{" "}
                      </div>
                      <div className="message">
                        <p>How can I help?</p>
                        <div className="shape"></div>
                      </div>
                    </div>
                  </>

                  {store.map((item, index) => (
                    <div ref={scrollRef} key={index}>
                      {item.user && (
                        <div className="sender own">
                          <div className="ellepse">
                            <PersonIcon />
                          </div>
                          <div
                            style={
                              item.spam
                                ? {
                                    border: "4px",
                                    borderStyle: "solid",
                                    borderColor: "red",
                                  }
                                : {}
                            }
                            className="message"
                          >
                            <p>{item.user}</p>
                            <div className="shapes"></div>
                          </div>
                        </div>
                      )}
                      {item.gpt && (
                        <>
                          <div className="sender">
                            <div className="ellepse">
                              {" "}
                              <img
                                className="msg-logo"
                                src="/assests/b.png"
                                alt=""
                              />{" "}
                            </div>
                            <div className="message">
                              {item.gpt.split(".").map((itemData, ii) => (
                                <p key={ii}>{itemData}</p>
                              ))}
                              <span
                                onClick={() => onVoiceHandler(item.gpt)}
                                style={{
                                  cursor: "pointer",
                                  marginRight: "-1rem",
                                }}
                                className="d-flex justify-content-end text-primary"
                              >
                                <VolumeUpIcon
                                  style={{
                                    fontSize: "24px",
                                  }}
                                />
                              </span>
                              <div className="shape"></div>
                            </div>
                          </div>
                        </>
                      )}
                      {item.automessage &&
                        item.automessage.map((item, i) => {
                          if (item !== null) {
                            return (
                              <div key={i}>
                                <div className="sender own ">
                                  <div class="alert alert-primary" role="alert">
                                    {item}
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        })}
                    </div>
                  ))}
                  {isLoading && (
                    <div ref={scrollRef} className="sender">
                      <div className="ellepse">
                        {" "}
                        <img
                          className="msg-logo"
                          src="/assests/b.png"
                          alt=""
                        />{" "}
                      </div>
                      <div className="message">
                        <p className="loading"></p>
                        <div className="shape"></div>
                      </div>
                    </div>
                  )}

                  {/* chat end */}
                </div>
              )}
              <form onSubmit={onSubmitHandler} className="input-text">
                <Form.Control
                  required
                  value={value}
                  onChange={onChangeHandler}
                  className="b-input"
                  type="text"
                  placeholder="Send a message"
                />
                <input
                  ref={imageRef}
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <button
                  disabled={msgLoader || imageToTextLoader}
                  className="send-btn"
                  type="submit"
                >
                  <span> Send</span>
                  <span>
                    <img className="btn-image" src="/assests/send.png" alt="" />
                  </span>
                </button>
                <DropdownButton
                  style={{ width: "80px", color: "red", marginRight: "10px" }}
                  variant="danger"
                  title={delErrorLoader ? <Spinners /> : <ListIcon />}
                  id="dropdown-basic-button"
                >
                  <Dropdown.Item onClick={handleShow}>
                    <button
                      disabled={isLoading}
                      type="button"
                      style={{ width: "100px" }}
                    >
                      <MicIcon />
                    </button>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <button
                      disabled={msgLoader || imageToTextLoader}
                      onClick={onDeleteChatHandler}
                      style={{ backgroundColor: "red", width: "100px" }}
                      type="button"
                    >
                      <span className="clear-btns">
                        {delErrorLoader ? <Spinners /> : "Clear Chat"}
                      </span>
                    </button>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <button
                      title="Attach File"
                      disabled={isLoading}
                      style={{ backgroundColor: "blue", width: "100px" }}
                      type="button"
                    >
                      <span className="clear-btns">
                        <AttachFileIcon onClick={onImageHandler} />
                      </span>
                    </button>
                  </Dropdown.Item>
                </DropdownButton>
              </form>
              <div className="new-btns d-flex gap-2">
                <button
                  disabled={msgLoader || imageToTextLoader}
                  style={{ backgroundColor: "#ff1744" }}
                  onClick={newChatHandler}
                  type="button"
                >
                  <span>{extraLoaders ? <Spinners /> : "New Chat +"}</span>
                </button>{" "}
                {allconversation.map((item, index) => (
                  <button
                    style={{
                      backgroundColor:
                        item._id === converId ? "#008000" : "#073b4c",
                    }}
                    onClick={() => createNewConver(item._id)}
                    key={item._id}
                    type="button"
                  >
                    <span>Chat {index + 1}</span>
                  </button>
                ))}
              </div>
              <div style={{ marginBottom: "-10px" }} className="alerts mt-2">
                {increament && (
                  <div class="alert alert-danger" role="alert">
                    {increament}
                  </div>
                )}
                {!increament && delError && (
                  <div class="alert alert-success" role="alert">
                    {delError}
                  </div>
                )}
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={5} className="chat-right">
            <Row className="mt-3">
              <Col md={12} className="top mb-3">
                <h3>
                  <LibraryAddIcon
                    style={{ color: "#1976D2", fontSize: "28px" }}
                  />{" "}
                  DR.MEGA Library
                </h3>
              </Col>
              <Col md={12} className="mt-2">
                {!puubmedLoader && (
                  <Col>
                    <div class="alert alert-primary" role="alert">
                      After you start your conversation, Dr. Mega will collect
                      research materials here.
                    </div>
                  </Col>
                )}
                {puubmedError && !library && (
                  <Col>
                    <Card className="text-center">{puubmedError}</Card>
                  </Col>
                )}
              </Col>
            </Row>

            <Row className="mt-3">
              {puubmedLoader ? (
                <Col className="d-flex gap-1 justify-content-center" md={12}>
                  <span>
                    <Audio
                      height="100"
                      width="100"
                      color="#4fa94d"
                      ariaLabel="audio-loading"
                      wrapperStyle={{}}
                      wrapperClass="wrapper-class"
                      visible={true}
                    />
                  </span>
                </Col>
              ) : (
                <Col md={12} className="top">
                  {library?.map((item, i) => (
                    <Card className="p-3 m-3 rounded">
                      <h4 className="articles">{item.title}</h4>
                      <Card.Body className="d-flex flex-column gap-2">
                        <Link target={"_blank"} to={item.link}>
                          <p>PMID : {item.pmid}</p>
                        </Link>
                        <Link target={"_blank"} to={item.link}>
                          <Button>Read on Pubmed</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  ))}
                </Col>
              )}
            </Row>

            <Row className="mt-3">
              <Col md={12} className="top">
                <h3>
                  <MedicalServicesIcon
                    style={{ color: "#1976D2", fontSize: "28px" }}
                  />{" "}
                  Medical Information
                </h3>
                <p>
                  Provide your medical information for more personalized and
                  informative suggestions.
                </p>
                <div className="btns2">
                  <button onClick={() => setMetrics(true)}> IMPERIAL</button>
                  <button onClick={() => setMetrics(false)}>METRICS(SI)</button>
                </div>
              </Col>
            </Row>

            <div className="core">
              <h3>
                <span>
                  <img
                    style={{ width: "20px" }}
                    src="/assests/circle.png"
                    alt=""
                  />
                </span>
                <span> Core</span>
              </h3>
              <div className="mt-4 top-input">
                <div className="input-items">
                  <div className="form-group">
                    <label>Age</label>
                    <input
                      onChange={(e) => setAges(e.target.value)}
                      data-toggle="tooltip"
                      data-placement="left"
                      title="Your age"
                      type="number"
                      value={ages}
                      min={0}
                      className="form-control"
                    />
                    <span className="year">yr</span>
                  </div>

                  <div className="form-group">
                    <label>Weight</label>
                    <input
                      onChange={(e) => setWeight(e.target.value)}
                      data-toggle="tooltip"
                      data-placement="left"
                      title="Weight"
                      min={0}
                      value={weight}
                      type="number"
                      className="form-control"
                    />
                    <span className="year"> {metrics ? "Ibs" : "kg"} </span>
                  </div>
                </div>

                {/* second */}
                <div className="input-items">
                  <div className="d-flex gap-2">
                    <div className="form-groups">
                      <label>Height</label>
                      <input
                        onChange={(e) => setHeight(e.target.value)}
                        value={heights}
                        type="number"
                        min={0}
                        className="form-control "
                      />
                      <span className="years">{metrics ? "ft" : "m"}</span>
                    </div>
                    <div className="form-groups">
                      <label></label>
                      <input
                        onChange={(e) => setHeightInc(e.target.value)}
                        min={0}
                        type="number"
                        className="form-control"
                        value={heightsInc}
                      />
                      <span className="years">{metrics ? "inc" : "cm"}</span>
                    </div>
                  </div>
                  <div className="form-groupss">
                    <MultipleValueTextInput
                      values={symtoms}
                      onItemAdded={(item, allItems) => setSytoms(allItems)}
                      className="random"
                      placeholder="Symptoms"
                      deleteButton={<CancelIcon />}
                    />
                  </div>
                </div>
                {/* second */}

                <div className="input-items">
                  <div className="form-groupss">
                    <div>
                      <MultipleValueTextInput
                        values={allergies}
                        onItemAdded={(item, allItems) => setAllergies(allItems)}
                        name="item-input"
                        className="random ps-2"
                        placeholder="Allergies"
                        deleteButton={<CancelIcon />}
                      />
                    </div>
                  </div>

                  <div className="form-groupss">
                    <div>
                      <MultipleValueTextInput
                        values={medication}
                        onItemAdded={(item, allItems) =>
                          setMedication(allItems)
                        }
                        name="item-input"
                        className="random ps-2"
                        placeholder="Medications"
                        deleteButton={<CancelIcon />}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* vital start */}
            <div className="mt-3">
              <div className="vitals">
                <h3 className="d-flex align-items-center gap-3">
                  <span>
                    <img
                      style={{ width: "26px" }}
                      src="/assests/vital.png"
                      alt=""
                    />
                  </span>{" "}
                  <span className="v-text">Vitals</span>{" "}
                </h3>

                <div className="top-input">
                  <div className="input-items mt-3">
                    <div className="form-group">
                      <label>Temperature</label>
                      <input
                        value={temperature}
                        onChange={(e) => setTemperature(e.target.value)}
                        data-toggle="tooltip"
                        data-placement="left"
                        title="Temperature in Fahrenheit. Normal body temperature is 98.6°F (37°C)."
                        type="number"
                        min={0}
                        className="form-control "
                      />
                      <span className="year">{metrics ? "°F" : "°C"}</span>
                    </div>

                    <div className="form-group3">
                      <label>Heart Rate</label>
                      <input
                        value={heartRate}
                        onChange={(e) => setHeartRate(e.target.value)}
                        data-toggle="tooltip"
                        data-placement="left"
                        title="Heart Rate is the number of times your heart beats
                       per minute. A normal resting heart rate for adults is 
                       between 60 and 100 beats per minute."
                        min={0}
                        type="number"
                        className="form-control"
                      />
                      <span className="year">BPM</span>
                    </div>
                  </div>

                  <div className="input-items">
                    <div className="form-groupres">
                      <label>Response Rate</label>
                      <input
                        value={respiratory}
                        onChange={(e) => setRespiratory(e.target.value)}
                        data-toggle="tooltip"
                        data-placement="left"
                        title="Respiratory Rate is the number of breaths you take per
                       minute. A normal respiratory rate for adults is between 12
                       and 16 to 20 breaths per minute."
                        type="number"
                        min={0}
                        className="form-control "
                      />
                      <span className="year">breaths per minutes</span>
                    </div>

                    <div
                      className="form-group
                "
                    >
                      <label>Oxygen Saturation</label>
                      <input
                        value={oxygen}
                        onChange={(e) => setOxygen(e.target.value)}
                        data-toggle="tooltip"
                        data-placement="left"
                        title="Oxygen Saturation: fraction of oxygen-saturated hemoglobin
                       relative to total hemoglobin in the blood. Normal oxygen 
                       saturation is 95% to 100%."
                        min={0}
                        type="number"
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="input-items">
                    <div className="form-group">
                      <label>Waist Circumference</label>
                      <input
                        value={waist}
                        onChange={(e) => setWaist(e.target.value)}
                        data-toggle="tooltip"
                        data-placement="left"
                        title="Waist Circumference is the measurement around the 
                      narrowest part of the waist. It is used to determine if
                       a person has a healthy weight."
                        type="number"
                        min={0}
                        className="form-control "
                      />
                      <span className="year">{metrics ? "in" : "cm"}</span>
                    </div>

                    <div className="form-group">
                      <label>Hip Circumference</label>
                      <input
                        value={hip}
                        onChange={(e) => setHip(e.target.value)}
                        data-toggle="tooltip"
                        data-placement="left"
                        title="Hip Circumference is the measurement around the widest
                       part of the hips. It is used to determine if a person has a healthy weight"
                        min={0}
                        type="number"
                        className="form-control"
                      />
                      <span className="year">{metrics ? "in" : "cm"}</span>
                    </div>
                  </div>

                  <div className="input-items">
                    <div className="form-groupresb">
                      <label>Systolic Blood Pressure</label>
                      <input
                        value={systolic}
                        onChange={(e) => setSystolic(e.target.value)}
                        data-toggle="tooltip"
                        data-placement="left"
                        title="Systolic Blood Pressure is the top number in a blood pressure
                       reading. It measures the pressure in your arteries when your heart beats.
                        Normal systolic blood pressure is less than 120 mm Hg."
                        type="number"
                        min={0}
                        className="form-control "
                      />
                      <span className="year">mmHg</span>
                    </div>

                    <div className="form-groupresb">
                      <label>Diastolic Blood Pressure</label>
                      <input
                        value={diastolic}
                        onChange={(e) => setDiastolic(e.target.value)}
                        data-toggle="tooltip"
                        data-placement="left"
                        title="Diastolic Blood Pressure is the bottom number in a blood
                       pressure reading. It measures the pressure in your arteries when
                        your heart rests between beats. Normal diastolic blood pressure is less than 80 mm Hg."
                        min={0}
                        type="number"
                        className="form-control"
                      />

                      <span className="year">mmHg</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* vital end */}

            {/* lav start */}

            <div className="mt-5">
              <div className="vitals">
                <h3 className="d-flex align-items-center gap-2">
                  <span>
                    <img
                      style={{ width: "26px" }}
                      src="/assests/d.png"
                      alt=""
                    />
                  </span>{" "}
                  <span className="v-text">Lab Test Results</span>{" "}
                </h3>

                <div className="top-input mt-3 mb-5">
                  <div className="input-items mt-3">
                    <div className="form-group3">
                      <label>Albumin</label>
                      <input
                        value={albumin}
                        onChange={(e) => setAlbumin(e.target.value)}
                        data-toggle="tooltip"
                        data-placement="left"
                        title="Albumin is a protein made by the liver. It helps keep fluid in
                       the blood vessels. Low albumin levels may be a sign of liver disease,
                        malnutrition, or other conditions. The normal range is 3.4 to 5.4 g/dL."
                        type="number"
                        min={0}
                        className="form-control "
                      />
                      <span className="year">{metrics ? "g/dL" : "g/L"}</span>
                    </div>

                    <div className="form-group3">
                      <label>ALT</label>
                      <input
                        value={alt}
                        onChange={(e) => setAlt(e.target.value)}
                        data-toggle="tooltip"
                        data-placement="left"
                        title="An alanine transaminase (ALT) blood test measures the
                       amount of ALT in your blood. ALT levels in your blood can 
                       increase when your liver is damaged. The normal range is 7 
                       to 56 U/L."
                        min={0}
                        type="number"
                        className="form-control"
                      />
                      <span className="year">U/L</span>
                    </div>
                  </div>

                  <div className="input-items">
                    <div className="form-group3">
                      <label>AST</label>
                      <input
                        value={ast}
                        onChange={(e) => setAst(e.target.value)}
                        data-toggle="tooltip"
                        data-placement="left"
                        title="An aspartate transaminase (AST) blood test measures the 
                      amount of AST in your blood. AST levels in your blood can increase
                       when your liver is damaged. The normal range is 13 to 39 U/L."
                        type="number"
                        min={0}
                        className="form-control "
                      />
                      <span className="year">U/L</span>
                    </div>

                    <div className="form-group4">
                      <label>BUN</label>
                      <input
                        value={bun}
                        onChange={(e) => setBun(e.target.value)}
                        data-toggle="tooltip"
                        data-placement="left"
                        title="A blood urea nitrogen (BUN) test reveals important
                       information about how well your kidneys are working. A normal
                        range is 7 to 20 mg/dL or 25 mg/dL."
                        min={0}
                        type="number"
                        className="form-control"
                      />
                      <span className="year">
                        {metrics ? "mg/dL" : "mmol/L"}
                      </span>
                    </div>
                  </div>

                  <div className="input-items">
                    <div className="form-group">
                      <label>Calcium</label>
                      <input
                        value={calcium}
                        onChange={(e) => setCalcium(e.target.value)}
                        data-toggle="tooltip"
                        data-placement="left"
                        title="Calcium is a mineral that is important for building strong
                       bones and teeth. A normal range is 8.5 to 10.5 mg/dL."
                        type="number"
                        min={0}
                        className="form-control "
                      />
                      <span className="year"></span>
                    </div>

                    <div className="form-group4">
                      <label>Creatinine</label>
                      <input
                        value={creatine}
                        onChange={(e) => setCreatine(e.target.value)}
                        data-toggle="tooltip"
                        data-placement="left"
                        title="A creatinine test is a measure of how well your kidneys are
                       performing their job of filtering waste from your blood. A normal
                        range is 0.7 to 1.3 mg/dL."
                        min={0}
                        type="number"
                        className="form-control"
                      />
                      <span className="year">
                        {metrics ? "mg/dL" : "μmol/L"}
                      </span>
                    </div>
                  </div>

                  <div className="input-items">
                    <div className="form-group4">
                      <label>Glucose</label>
                      <input
                        value={glucose}
                        onChange={(e) => setGlucose(e.target.value)}
                        data-toggle="tooltip"
                        data-placement="left"
                        title="The serum glucose test measures the amount of glucose in
                       your blood. Glucose is a type of sugar that your body uses for
                        energy. A normal range is 70 to 105 mg/dL. A fasting blood 
                        sugar level of 100 mg/dL or higher is considered a sign of diabetes."
                        type="number"
                        min={0}
                        className="form-control "
                      />
                      <span className="year">
                        {" "}
                        {metrics ? "mg/dL" : "mmol/L"}
                      </span>
                    </div>

                    <div className="form-group5">
                      <label>HbA1c</label>
                      <input
                        value={hba}
                        onChange={(e) => setHba(e.target.value)}
                        data-toggle="tooltip"
                        data-placement="left"
                        title="Hemoglobin A1C is a blood test that shows your average
                       blood sugar level for the past 2 to 3 months. A normal range
                        is 4.0 to 5.6 percent."
                        min={0}
                        type="number"
                        name="form-control"
                      />
                      <span className="year">mmol/mol</span>
                    </div>
                  </div>

                  <div className="input-items">
                    <div className="form-group4">
                      <label>Potassium</label>
                      <input
                        value={potassium}
                        onChange={(e) => setPotassium(e.target.value)}
                        data-toggle="tooltip"
                        data-placement="left"
                        title="Potassium is an electrolyte that helps your muscles work
                       properly. A normal range is 3.5 to 5.0 mEq/L."
                        type="number"
                        min={0}
                        className="form-control "
                      />
                      <span className="year">
                        {metrics ? "mEq/L" : "mmol/L"}
                      </span>
                    </div>

                    <div className="form-group4">
                      <label>Sodium</label>
                      <input
                        value={sodium}
                        onChange={(e) => setSodium(e.target.value)}
                        data-toggle="tooltip"
                        data-placement="left"
                        title="Sodium is an electrolyte that helps your muscles work 
                      properly. A normal range is 135 to 145 mEq/L."
                        min={0}
                        type="number"
                        className="form-control"
                      />
                      <span className="year">
                        {metrics ? "mEq/L" : "mmol/L"}
                      </span>
                    </div>
                  </div>

                  <div className="input-items">
                    <div className="form-group4">
                      <label>Triglycerides</label>
                      <input
                        value={trig}
                        onChange={(e) => setTrig(e.target.value)}
                        data-toggle="tooltip"
                        data-placement="left"
                        title="Triglycerides are a type of fat found in your blood.
                       A normal range is 40 to 160 mg/dL."
                        type="number"
                        min={0}
                        className="form-control "
                      />
                      <span className="year">
                        {metrics ? "mg/dL" : "mmol/L"}
                      </span>
                    </div>

                    <div className="form-group4">
                      <label>LDL</label>
                      <input
                        value={ldl}
                        onChange={(e) => setLdl(e.target.value)}
                        data-toggle="tooltip"
                        data-placement="left"
                        title="Low-density lipoprotein (LDL) is sometimes called 'bad'
                       cholesterol. A normal range is less than 100 mg/dL."
                        min={0}
                        type="number"
                        className="form-control"
                      />
                      <span className="year">
                        {" "}
                        {metrics ? "mg/dL" : "mmol/L"}
                      </span>
                    </div>
                  </div>

                  <div className="input-items">
                    <div className="form-group4">
                      <label>HDL</label>
                      <input
                        value={hdl}
                        onChange={(e) => setHdl(e.target.value)}
                        data-toggle="tooltip"
                        data-placement="left"
                        title="High-density lipoprotein (HDL) is sometimes called 'good'
                       cholesterol. A normal range is 40 to 60 mg/dL."
                        type="number"
                        min={0}
                        className="form-control "
                      />
                      <span className="year">
                        {" "}
                        {metrics ? "mg/dL" : "mmol/L"}
                      </span>
                    </div>

                    <div className="form-group6">
                      <label>eGFR</label>
                      <input
                        value={egfr}
                        onChange={(e) => setEgfr(e.target.value)}
                        data-toggle="tooltip"
                        data-placement="left"
                        title="Estimated Glomerular Filtration Rate (eGFR) is a measure of 
                      how well your kidneys are working. A normal
                       range is 90 to 120 mL/min/1.73m2."
                        min={0}
                        type="number"
                        className="form-control"
                      />
                      <span className="year">mL/min/1.73m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* lab end */}
            <div className="result"></div>
          </Col>
        </Row>
      </div>
      <Modals show={show} handleClose={handleClose} handleShow={handleShow} />
    </>
  );
};

export default ChatBox;
