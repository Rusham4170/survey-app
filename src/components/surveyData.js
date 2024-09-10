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
          "type": "dropdown",
          "name": "question2",
          "choices": [
           "Item 1",
           "Item 2",
           "Item 3"
          ]
         },
         {
          "type": "tagbox",
          "name": "question1",
          "choices": [
           "Item 1",
           "Item 2",
           "Item 3"
          ]
         },
        {
          type: "boolean",
          name: "question1",
        },
        {
          type: "imagepicker",
          name: "question2",
          choices: [
            {
              value: "Image 1",
              imageLink: "https://surveyjs.io/Content/Images/examples/image-picker/lion.jpg",
            },
            {
              value: "Image 2",
              imageLink: "https://surveyjs.io/Content/Images/examples/image-picker/giraffe.jpg",
            },
            {
              value: "Image 3",
              imageLink: "https://surveyjs.io/Content/Images/examples/image-picker/panda.jpg",
            },
            {
              value: "Image 4",
              imageLink: "https://surveyjs.io/Content/Images/examples/image-picker/camel.jpg",
            },
          ],
          imageFit: "cover",
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
        {
          type: "radiogroup",
          name: "question5",
          title: "Radio Button question",
          description: "Select one option",
          choices: ["Item 1", "Item 2", "Item 3"],
        },
        {
          type: "checkbox",
          name: "question6",
          title: "Checkbox question",
          description: "Select all that apply",
          choices: ["Item 1", "Item 2", "Item 3"],
        },
      ],
    },
  ],
};

export default surveyData;
