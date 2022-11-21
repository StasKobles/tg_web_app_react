import React, { useCallback, useEffect, useState } from "react";
import "./Form.css";
import { useTelegram } from "../../hooks/useTelegram";

const Form = () => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [subject, setSubject] = useState("physical");
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      country,
      city,
      subject,
    };
    tg.sendData(JSON.stringify(data));
  }, [country, city, subject]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);

    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  useEffect(() => {
    tg.MainButton.setParams({ text: "Send your data" });
  }, []);

  useEffect(() => {
    if (!city || !country) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      
    }
  }, [country, city]);

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  };
  const onChangeCity = (e) => {
    setCity(e.target.value);
  };
  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };
  return (
    <div className={"form"}>
      <h3>Input your data</h3>
      <input
        type="text"
        className={"input"}
        placeholder={"Country"}
        value={country}
        onChange={onChangeCountry}
      />
      <input
        type="text"
        className={"input"}
        placeholder={"City"}
        value={city}
        onChange={onChangeCity}
      />
      <select value={subject} onChange={onChangeSubject} className={"select"}>
        <option value={"legal"}>Entity</option>
        <option value={"physical"}>Psychical person</option>
      </select>
    </div>
  );
};

export default Form;
