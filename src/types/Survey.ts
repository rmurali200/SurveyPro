export type SurveyQuestion = {
  id: string;
  type: "text" | "multiple-choice" | "checkbox" | "rating";
  label: string;
  options?: string[]; // Only for multiple-choice or checkbox
  required?: boolean;
};

export type Survey = {
  id: string;
  title: string;
  description?: string;
  questions: SurveyQuestion[];
};
