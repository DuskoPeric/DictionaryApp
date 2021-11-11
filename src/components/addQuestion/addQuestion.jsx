import { useState } from "react";
import "./addQuestion.css";

const AddQuestion = ({ closeForm, addNewQuestion, notify }) => {
  const [word, setWord] = useState("");
  const [translate, setTranslate] = useState("");
  const [pin, setPin] = useState("");
  const handleChange = event => {
    if (event.target.name === "word") {
      setWord(event.target.value);
    } else if (event.target.name === "translate") {
      setTranslate(event.target.value);
    } else {
      setPin(event.target.value);
    }
  };
  return (
    <div>
      <div className="form">
        <input
          type="text"
          placeholder="Word"
          onChange={handleChange}
          name="word"
        />
        <input
          type="text"
          placeholder="Translate"
          onChange={handleChange}
          name="translate"
        />
        <input
          type="text"
          placeholder="SCN"
          onChange={handleChange}
          name="pin"
        />
        <div className="action-holder">
          <button
            onClick={() => {
              addNewQuestion({ word, translate, pin });
            }}
          >
            Add
          </button>
          <button className="cancel" onClick={closeForm}>
            Cancel
          </button>
        </div>
        {notify.active && (
          <div>
            <p>{notify.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddQuestion;
