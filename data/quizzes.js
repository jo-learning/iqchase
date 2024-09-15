// data/quizzes.js

export const quizzes = [
    {
      id: 1,
      title: 'JavaScript Basics',
      description: 'Test your knowledge of JavaScript fundamentals.',
      questions: [
        {
          question: 'What is a closure in JavaScript?',
          options: [
            'A function bundled with its lexical environment',
            'A new variable scope',
            'An if statement',
            'A function that returns a promise',
          ],
          answer: 'A function bundled with its lexical environment',
        },
        {
          question: 'Which of the following is a primitive data type?',
          options: ['Object', 'Array', 'String', 'Function'],
          answer: 'String',
        },
        {
          question: 'What does `typeof null` return in JavaScript?',
          options: ['"null"', '"undefined"', '"object"', '"number"'],
          answer: '"object"',
        },
      ],
    },
    {
      id: 2,
      title: 'React Fundamentals',
      description: 'A quiz to test your understanding of React.',
      questions: [
        {
          question: 'What is JSX?',
          options: [
            'A syntax extension for JavaScript',
            'A CSS preprocessor',
            'A new programming language',
            'A database query language',
          ],
          answer: 'A syntax extension for JavaScript',
        },
        {
          question: 'What is the purpose of `useEffect` hook?',
          options: [
            'To handle side effects in functional components',
            'To create state in class components',
            'To manage context',
            'To directly manipulate the DOM',
          ],
          answer: 'To handle side effects in functional components',
        },
        {
          question: 'What is the virtual DOM?',
          options: [
            'A copy of the real DOM that React uses for rendering optimization',
            'A backup of the DOM stored in local storage',
            'An alternative to the browser’s DOM API',
            'A new HTML element type',
          ],
          answer: 'A copy of the real DOM that React uses for rendering optimization',
        },
      ],
    },
  ];
  