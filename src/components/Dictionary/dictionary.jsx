import { useState } from "react";
import "./dictionary.css";
import AddQuestion from "../addQuestion/addQuestion";
import { firestore } from "./../../firebase.utils";
import { doc, setDoc, getDoc, collection } from "firebase/firestore/lite";

const Dictionary = ({ words, refreshDictionary }) => {
  const [showForm, setShowForm] = useState(false);
  const [notify, setNotify] = useState({ active: false, message: "" });
  const [search, setSearch] = useState("");
  const filteredWords = words.filter(function(word) {
    return (
      word.word.toLowerCase().includes(search) ||
      word.translate.toLowerCase().includes(search)
    );
  });

  const checkIsExistWord = data => {
    const found = words.find(word => word.word === data.word);
    return found ? true : false;
  };

  const checkScn = async pin => {
    const pinRef = await doc(firestore, "");
    const pinSnap = await getDoc(pinRef);
    const scn = pinSnap.data();
    return Number(pin) === scn.pin ? true : false;
  };

  const addWord = async data => {
    const validPin = await checkScn(data.pin);
    let isExist = true;
    isExist = checkIsExistWord(data);
    if (!data.word || !data.translate) {
      setNotify({
        active: true,
        message: "You must enter both a word and a translation"
      });
      return;
    }
    if (isExist) {
      setNotify({
        active: true,
        message: "That word already exists in the dictionary"
      });
      return;
    }
    if (!validPin) {
      setNotify({
        active: true,
        message: "You do not have permission to add words"
      });
      return;
    }

    const dataRef = await collection(firestore, "words");
    await setDoc(doc(dataRef), {
      word: data.word,
      translate: data.translate
    });
    setNotify(prevState => ({ ...prevState, active: false }));
    setShowForm(false);
    refreshDictionary();
  };
  const handleSearch = event => {
    setSearch(event.target.value.toLowerCase());
  };

  return (
    <div>
      <div className="dictionary">
        {!showForm && (
          <button
            onClick={() => {
              setShowForm(true);
            }}
            className="addQ"
          >
            Add word
          </button>
        )}
        {showForm && (
          <AddQuestion
            closeForm={() => {
              setShowForm(false);
              setNotify(prevState => ({ ...prevState, active: false }));
            }}
            addNewQuestion={data => {
              addWord(data);
            }}
            notify={notify}
          />
        )}
        <div className="search-word">
          <input
            type="text"
            placeholder="Search word"
            onChange={handleSearch}
          />
        </div>
        <div className="dictionary-row">
          <div className="head">#</div>
          <div className="head">Word</div>
          <div className="head">Translate</div>
        </div>
        {filteredWords.map((word, index) => (
          <div key={word.id} className="dictionary-row">
            <div>{index + 1}</div>
            <div>{word.word}</div>
            <div>{word.translate}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dictionary;
