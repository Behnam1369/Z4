import { useState } from "react";
import "./App.css";
import Selector from "./components/Selector";

function App() {
  const arr = [
    { id: 1, name: "Tehran" },
    { id: 2, name: "Esfahan" },
    { id: 3, name: "Shiraz" },
    { id: 4, name: "Semnan" },
    { id: 5, name: "Ahwaz" },
    {
      id: 6,
      name: "Chaharmahal aand Bakhtiari va yeki as roostahaye ",
    },
    { id: 7, name: "Kashan" },
  ];

  const arr2 = [
    { id: 1, name: "تهران" },
    { id: 2, name: "اضفهان" },
    { id: 3, name: "شیراز" },
    { id: 4, name: "سمنان" },
    { id: 5, name: "اهواز" },
    {
      id: 6,
      name: "چهار محال و بختیاری ",
    },
    { id: 7, name: "کاشان" },
  ];

  const [cityId, setCityId] = useState(null);

  const selectionChanged = (id) => {
    console.log(`value from app: ${id}`);
    setCityId(id);
  };

  return (
    <div>
      <Selector
        data={arr}
        id="id"
        title="name"
        width={190}
        selectionChanged={selectionChanged}
        value={cityId}
      />
      <Selector
        data={arr2}
        id="id"
        title="name"
        width={290}
        selectionChanged={selectionChanged}
        value={cityId}
        fontFamily={"Iransans"}
        dir="rtl"
      />
      <button
        onClick={() => {
          alert(cityId);
        }}
      >
        Click here to get city Id
      </button>
    </div>
  );
}

export default App;
