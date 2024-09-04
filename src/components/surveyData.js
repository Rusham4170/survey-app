// SurveyData.js
const surveyData = {
  title: "Title",
  description: "Description below title",
  pages: [
    {
      name: "Name",
      elements: [
        {
          type: "text",
          name: "FirstName",
          title: { default: "Single line Input", ar: "أدخل اسمك الأول" },
          description: "Description",
          placeholder: "Placeholder text",
        },
        {
          type: "text",
          name: "question1",
          title: { default: "Single line Input with required condition", ar: "أدخل اسمك الأول" },
          description: "Description",
          isRequired: true,
          placeholder: "Placeholder text",
        },
        {
          type: "comment",
          name: "LastName",
          title: "Long Text",
          description: "Description",
          placeholder: "Placeholder text",
        },
        {
          type: "rating",
          name: "question2",
          title: "Rating type question with labelled buttons, number of button is set to 5",
        },
        {
          type: "rating",
          name: "question3",
          title: "rating type question with stars, no of stars is set to 6",
          rateType: "stars",
          rateCount: 6,
          rateMax: 6,
        },
        {
          type: "rating",
          name: "question4",
          title: "rating type question with smileys, no of smileys is set to 4",
          rateType: "smileys",
          rateCount: 4,
          rateMax: 4,
        },
      ],
    },
  ],
};

export default surveyData;
