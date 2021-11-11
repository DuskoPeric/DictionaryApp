import { useEffect, useState } from "react";
import "./App.css";
import { firestore } from "./firebase.utils";
import { collection, getDocs } from "firebase/firestore/lite";
import StartScreen from "./components/startScreen/startScreen";
import QuizContent from "./components/quizContent/quizContent";
import Dictionary from "./components/Dictionary/dictionary";

function App() {
  const [allwords, setAllwords] = useState([]);
  const [activeScreen, setActiveScreen] = useState("home");

  const getDataList = async () => {
    const dataRef = await collection(firestore, "words");
    const snapshot = await getDocs(dataRef);
    let data = [];
    snapshot.forEach(doc => {
      data.push({ id: doc.id, ...doc.data() });
    });
    setAllwords(data);
  };

  useEffect(() => {
    getDataList();
  }, []);

  return (
    <div className="App">
      <h1>Dictionary Quiz</h1>
      <div className="routes">
        <button
          className={activeScreen === "home" ? "active" : ""}
          onClick={() => {
            setActiveScreen("home");
          }}
        >
          Home
        </button>
        <button
          className={activeScreen === "dictionary" ? "active" : ""}
          onClick={() => {
            setActiveScreen("dictionary");
          }}
        >
          Dictionary
        </button>
      </div>
      {activeScreen === "home" && (
        <StartScreen
          startQuiz={() => {
            setActiveScreen("quiz");
          }}
        />
      )}
      {activeScreen === "quiz" && <QuizContent allWords={allwords} />}
      {activeScreen === "dictionary" && (
        <Dictionary words={allwords} refreshDictionary={getDataList} />
      )}
    </div>
  );
}

export default App;
