import React, { useState } from "react";
import { Survey, SurveyQuestion } from "../types/Survey";

type Props = {
  survey: Survey;
  onSubmit: (answers: Record<string, any>) => void;
};

export default function FormBuilder({ survey, onSubmit }: Props) {
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const handleChange = (id: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(answers);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>{survey.title}</h2>
      <p>{survey.description}</p>
      {survey.questions.map((q) => (
        <div key={q.id} style={{ marginBottom: "1rem" }}>
          <label>
            {q.label}
            {q.required && <span style={{ color: "red" }}> *</span>}
          </label>
          <div>
            {q.type === "text" && (
              <input
                type="text"
                value={answers[q.id] || ""}
                required={q.required}
                onChange={(e) => handleChange(q.id, e.target.value)}
              />
            )}
            {(q.type === "multiple-choice" || q.type === "checkbox") &&
              q.options &&
              q.type === "multiple-choice" && (
                <select
                  value={answers[q.id] || ""}
                  required={q.required}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                >
                  <option value="">Select...</option>
                  {q.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}
            {q.type === "checkbox" &&
              q.options &&
              q.options.map((opt) => (
                <label key={opt} style={{ marginLeft: "1rem" }}>
                  <input
                    type="checkbox"
                    checked={answers[q.id]?.includes(opt) || false}
                    onChange={(e) => {
                      const prev = answers[q.id] || [];
                      if (e.target.checked) {
                        handleChange(q.id, [...prev, opt]);
                      } else {
                        handleChange(
                          q.id,
                          prev.filter((v: string) => v !== opt)
                        );
                      }
                    }}
                  />
                  {opt}
                </label>
              ))}
            {q.type === "rating" && (
              <input
                type="number"
                min={1}
                max={5}
                value={answers[q.id] || ""}
                required={q.required}
                onChange={(e) => handleChange(q.id, Number(e.target.value))}
              />
            )}
          </div>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}