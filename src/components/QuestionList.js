import React, { useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";
import QuestionForm from "./QuestionForm";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState("List");

  useEffect(() => {
    if (currentPage === "List") {
    fetch("http://localhost:4000/questions")
    .then((response) => response.json())
    .then((data) => setQuestions(data))
    .catch((error) => console.error("Error fetching questions:", error));
    }
  }, [currentPage]); 

  const handleDeleteQuestion = (questionId) => {
    // filtering out the deleted question from the array
    const updatedQuestions = questions.filter((question) => question.id !== questionId);
    setQuestions(updatedQuestions);

    // DELETE request
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "DELETE",
    })
    .then((response) => response.json())
    .then((data) => console.log("Question deleted:", data))
    .catch((error) => console.error("Error deleting question:", error));
  };

  const handleAddQuestion = (addedQuestion) => {
    // update state with the newly added question
    setQuestions((prevQuestions) => [...prevQuestions, addedQuestion]);

    // switch back to the "List" page after adding a question
    setCurrentPage("List");

  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      {currentPage === "Form" && (
      <QuestionForm onAddQuestion={handleAddQuestion} />
      )}
      <ul>
        {/* display QuestionItem components here after fetching */}
        {questions.map((question) => (
          <QuestionItem 
          key={question.id} 
          question={question} 
          onDeleteQuestion={handleDeleteQuestion}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
