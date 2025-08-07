import React from "react";
import FormBuilder from "../src/components/FormBuilder";
import { exampleSurvey } from "../src/examples/exampleSurvey";

export default function Home() {
  const handleSubmit = (answers: Record<string, any>) => {
    alert("Survey submitted! Answers: " + JSON.stringify(answers, null, 2));
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <FormBuilder survey={exampleSurvey} onSubmit={handleSubmit} />
    </div>
  );
}