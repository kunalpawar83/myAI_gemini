import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(question);
    axios
      .post("https://backend-ai-gemini.vercel.app//api/gemini", {
        question: question,
      })
      .then((response) => {
        setResponse(response.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const speakHandler = () => {
    const tell = new SpeechSynthesisUtterance(response);
    window.speechSynthesis.speak(tell);
  };
  return (
    <div className="App">
      <div className="box">
        <div className="profile-pic">
          <img
            className="pic"
            src={require("./assets/user.jpg")}
            alt="profile pic"
          />
        </div>
        <p className="label">Question</p>
        <textarea
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />
        <button onClick={submitHandler}>Send</button>
      </div>
      <div className="box">
        <div className="profile-pic">
          <img
            className="pic"
            src={require("./assets/gemini.jpg")}
            alt="profile pic"
          />
        </div>
        <p className="label">Response</p>
        <textarea value={response} />
        <button onClick={speakHandler}>Speak</button>
      </div>
    </div>
  );
}

export default App;
