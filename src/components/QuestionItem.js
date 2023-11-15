import React, { useState, useEffect } from "react";

function QuestionItem({ question, onDeleteQuestion }) {
  const { id, prompt, answers, correctIndex } = question;
  const [selectedCorrectIndex, setSelectedCorrectIndex] = useState(correctIndex);

  useEffect(() => {
    // Update the selectedCorrectIndex state when the correctIndex prop changes
    setSelectedCorrectIndex(correctIndex);
  }, [correctIndex]);

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleDeleteClick = () => {
    // onDeleteQuestion callback with the question id
    onDeleteQuestion(id);
  };

  const handleCorrectIndexChange = (event) => {
    const newCorrectIndex = parseInt(event.target.value, 10);

    // Update the state when the dropdown value changes
    setSelectedCorrectIndex(newCorrectIndex);

    // Send a PATCH request to update the correctIndex on the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: newCorrectIndex,
      }),
    })
      .then((response) => response.json())
      .then((updatedQuestion) => {
        console.log("Question updated:", updatedQuestion);
      })
      .catch((error) => console.error("Error updating question:", error));
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={selectedCorrectIndex} onChange={handleCorrectIndexChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;

