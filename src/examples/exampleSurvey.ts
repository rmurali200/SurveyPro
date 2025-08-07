import { Survey } from "../types/Survey";

export const exampleSurvey: Survey = {
  id: "survey1",
  title: "Customer Satisfaction Survey",
  description: "We value your feedback. Please answer the following questions.",
  questions: [
    {
      id: "q1",
      type: "text",
      label: "What is your name?",
      required: true,
    },
    {
      id: "q2",
      type: "multiple-choice",
      label: "How satisfied are you with our service?",
      options: ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"],
      required: true,
    },
    {
      id: "q3",
      type: "checkbox",
      label: "Which products do you use?",
      options: ["Product A", "Product B", "Product C"],
    },
    {
      id: "q4",
      type: "rating",
      label: "Rate your overall experience (1-5):",
      required: true,
    },
  ],
};