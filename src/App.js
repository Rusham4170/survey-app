// App.js
import React from "react";
import EVXSurvey from "./components/EVXSurvey";
import surveyData from "./components/surveyData";

function App() {
  return <EVXSurvey surveyData={surveyData} />;
}

export default App;
