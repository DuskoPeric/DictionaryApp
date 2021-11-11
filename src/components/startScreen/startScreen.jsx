import React from "react";

const StartScreen = props => {
  return (
    <div>
      <button className="startQ" onClick={props.startQuiz}>
        Start Quiz
      </button>
    </div>
  );
};

export default StartScreen;
