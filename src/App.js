import { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [catFact, setCatFact] = useState("");
  const [name, setName] = useState("");
  const [ageData, setAgeData] = useState(null);
  const [generatedExcuse, setGeneratedExcuse] = useState("");

  const fetchCatFact = () => {
    Axios.get("https://catfact.ninja/fact").then(
      (res) => {
        setCatFact(res.data.fact);
      }
    );
  };

  const fetchAgeData = () => {
    Axios.get(`https://api.agify.io/?name=${name}`).then(
      (res) => {
        setAgeData(res.data);
      }
    );
  };

  const fetchExcuse = (excuse) => {
    Axios.get(`https://excuser-three.vercel.app/v1/excuse/${excuse}/`).then(
      (res) => {
        setGeneratedExcuse(res.data[0].excuse);
      }
    );
  };

  useEffect(() => {
    fetchCatFact();
  }, []);

  return (
    <div className="App">
      <button onClick={fetchCatFact}>Generate Cat Facts</button>
      <p>{catFact}</p>

      <hr></hr>
      <br></br>

      <input
        type="text"
        placeholder="Ex. John.."
        onChange={(event) => {
          setName(event.target.value);
        }}
      ></input>
      <button onClick={fetchAgeData}>Predict Age</button>
      <h3>Name: {ageData?.name}</h3>
      <h3>Predicted Age: {ageData?.age}</h3>
      <h3>Count: {ageData?.count}</h3>

      <hr></hr>
      <br></br>

      <h3>Generate An Excuse</h3>
      <button onClick={() => fetchExcuse("party")}>Party</button>
      <button onClick={() => fetchExcuse("family")}>Family</button>
      <button onClick={() => fetchExcuse("office")}>Office</button>
      <p>{generatedExcuse}</p>
    </div>
  );
}

export default App;
