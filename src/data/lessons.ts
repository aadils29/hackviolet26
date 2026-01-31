// Lesson data for MVP - Budgeting Basics course
export interface Question {
  id: string;
  type: "multiple-choice" | "true-false";
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  questions: Question[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export const budgetingCourse: Course = {
  id: "budgeting-basics",
  title: "Budgeting Basics",
  description: "Master the fundamentals of managing your money",
  lessons: [
    {
      id: "lesson-1",
      title: "What is a Budget?",
      description: "Learn the basics of budgeting",
      xpReward: 50,
      questions: [
        {
          id: "q1-1",
          type: "multiple-choice",
          question: "What is a budget?",
          options: [
            "A plan for how you'll spend your money",
            "A list of things you want to buy",
            "Your bank account balance",
            "A type of savings account",
          ],
          correctAnswer: 0,
          explanation:
            "A budget is a plan that helps you track and manage how you spend your money each month.",
        },
        {
          id: "q1-2",
          type: "true-false",
          question: "Budgeting is only for people who don't have much money.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "Budgeting is beneficial for everyone, regardless of income level. It helps you make intentional decisions about your money.",
        },
        {
          id: "q1-3",
          type: "multiple-choice",
          question: "What is the main benefit of having a budget?",
          options: [
            "It makes you rich instantly",
            "It helps you understand where your money goes",
            "It eliminates all your expenses",
            "It automatically saves money for you",
          ],
          correctAnswer: 1,
          explanation:
            "A budget gives you visibility into your spending patterns and helps you make informed financial decisions.",
        },
        {
          id: "q1-4",
          type: "multiple-choice",
          question: "How often should you review your budget?",
          options: [
            "Once a year",
            "Only when you get a raise",
            "Regularly, at least monthly",
            "Never, once it's set",
          ],
          correctAnswer: 2,
          explanation:
            "Regular review helps you stay on track and adjust for changes in your income or expenses.",
        },
        {
          id: "q1-5",
          type: "true-false",
          question: "A budget restricts your freedom with money.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "A budget actually gives you more freedom by helping you prioritize what matters most to you.",
        },
      ],
    },
    {
      id: "lesson-2",
      title: "Income vs Expenses",
      description: "Understanding money in and money out",
      xpReward: 50,
      questions: [
        {
          id: "q2-1",
          type: "multiple-choice",
          question: "What is 'income'?",
          options: [
            "Money you spend on bills",
            "Money you receive (salary, gifts, etc.)",
            "Money in your savings account",
            "Money you owe others",
          ],
          correctAnswer: 1,
          explanation:
            "Income is any money that comes to you, including wages, tips, gifts, and investment returns.",
        },
        {
          id: "q2-2",
          type: "multiple-choice",
          question: "Which of these is a 'fixed expense'?",
          options: [
            "Grocery shopping",
            "Entertainment",
            "Rent or mortgage payment",
            "Dining out",
          ],
          correctAnswer: 2,
          explanation:
            "Fixed expenses stay the same each month, like rent, insurance, or car payments.",
        },
        {
          id: "q2-3",
          type: "true-false",
          question: "Variable expenses change from month to month.",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation:
            "Variable expenses like groceries, gas, and entertainment can fluctuate based on your choices and needs.",
        },
        {
          id: "q2-4",
          type: "multiple-choice",
          question: "What is 'net income'?",
          options: [
            "Your total salary before taxes",
            "Money left after all deductions",
            "Your yearly bonus",
            "Money from side jobs only",
          ],
          correctAnswer: 1,
          explanation:
            "Net income is your take-home pay after taxes and other deductions are removed.",
        },
        {
          id: "q2-5",
          type: "multiple-choice",
          question: "If you spend more than you earn, you have a:",
          options: [
            "Budget surplus",
            "Budget deficit",
            "Balanced budget",
            "Investment portfolio",
          ],
          correctAnswer: 1,
          explanation:
            "A budget deficit means you're spending more than you make, which can lead to debt.",
        },
      ],
    },
    {
      id: "lesson-3",
      title: "The 50/30/20 Rule",
      description: "A simple framework for budgeting",
      xpReward: 50,
      questions: [
        {
          id: "q3-1",
          type: "multiple-choice",
          question: "What does the '50' in the 50/30/20 rule represent?",
          options: [
            "Needs (essentials)",
            "Wants (non-essentials)",
            "Savings and debt repayment",
            "Entertainment",
          ],
          correctAnswer: 0,
          explanation:
            "50% of your income should go to needs - essential expenses like rent, utilities, and groceries.",
        },
        {
          id: "q3-2",
          type: "multiple-choice",
          question:
            "Which category does 'dining out' fall under in the 50/30/20 rule?",
          options: [
            "Needs (50%)",
            "Wants (30%)",
            "Savings (20%)",
            "None of the above",
          ],
          correctAnswer: 1,
          explanation:
            "Dining out is a 'want' because you could prepare food at home instead.",
        },
        {
          id: "q3-3",
          type: "true-false",
          question:
            "The 20% for savings includes emergency fund contributions.",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation:
            "The 20% savings category includes emergency funds, retirement savings, and extra debt payments.",
        },
        {
          id: "q3-4",
          type: "multiple-choice",
          question: "If you earn $3,000/month, how much should go to 'wants'?",
          options: ["$600", "$900", "$1,500", "$1,200"],
          correctAnswer: 1,
          explanation:
            "30% of $3,000 is $900, which is the amount recommended for wants.",
        },
        {
          id: "q3-5",
          type: "true-false",
          question:
            "The 50/30/20 rule works perfectly for everyone without adjustment.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "The 50/30/20 rule is a guideline. You may need to adjust based on your situation, especially in high cost-of-living areas.",
        },
      ],
    },
    {
      id: "lesson-4",
      title: "Tracking Your Spending",
      description: "Know where every dollar goes",
      xpReward: 50,
      questions: [
        {
          id: "q4-1",
          type: "multiple-choice",
          question: "Why is tracking spending important?",
          options: [
            "To impress your friends",
            "To identify spending patterns and leaks",
            "Banks require it",
            "It's not important",
          ],
          correctAnswer: 1,
          explanation:
            "Tracking helps you see where your money actually goes and find areas to improve.",
        },
        {
          id: "q4-2",
          type: "multiple-choice",
          question: "What is a 'spending leak'?",
          options: [
            "A broken wallet",
            "Small, unnoticed expenses that add up",
            "A bank error",
            "A type of investment",
          ],
          correctAnswer: 1,
          explanation:
            "Spending leaks are small purchases (like daily coffee) that seem minor but add up significantly over time.",
        },
        {
          id: "q4-3",
          type: "true-false",
          question: "You should track only large purchases, not small ones.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "Small purchases often add up to more than we realize. Tracking everything gives the full picture.",
        },
        {
          id: "q4-4",
          type: "multiple-choice",
          question: "Which is NOT a good method for tracking spending?",
          options: [
            "Using a budgeting app",
            "Keeping receipts and logging them",
            "Guessing at the end of the month",
            "Reviewing bank statements regularly",
          ],
          correctAnswer: 2,
          explanation:
            "Guessing leads to inaccurate tracking. Use actual records for best results.",
        },
        {
          id: "q4-5",
          type: "multiple-choice",
          question: "How can subscription services become spending leaks?",
          options: [
            "They're always too expensive",
            "We often forget about ones we don't use",
            "They don't count as expenses",
            "They're illegal",
          ],
          correctAnswer: 1,
          explanation:
            "Unused subscriptions quietly drain money. Regular review helps catch these.",
        },
      ],
    },
    {
      id: "lesson-5",
      title: "Adjusting Your Budget",
      description: "Flexibility is key to success",
      xpReward: 50,
      questions: [
        {
          id: "q5-1",
          type: "multiple-choice",
          question: "When should you adjust your budget?",
          options: [
            "Never, budgets should be fixed",
            "Only when you get a raise",
            "When your income or expenses change",
            "Every day",
          ],
          correctAnswer: 2,
          explanation:
            "Life changes, and your budget should adapt to reflect new circumstances.",
        },
        {
          id: "q5-2",
          type: "true-false",
          question:
            "It's okay if you don't stick to your budget perfectly every month.",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation:
            "Budgets are guides, not strict rules. The goal is progress, not perfection.",
        },
        {
          id: "q5-3",
          type: "multiple-choice",
          question: "What should you do if you overspend in one category?",
          options: [
            "Give up on budgeting",
            "Ignore it and hope for the best",
            "Adjust other categories to compensate",
            "Start over next year",
          ],
          correctAnswer: 2,
          explanation:
            "If you overspend in one area, try to reduce spending elsewhere to stay on track.",
        },
        {
          id: "q5-4",
          type: "multiple-choice",
          question: "What's a good first step when you need to cut expenses?",
          options: [
            "Cancel all subscriptions immediately",
            "Stop buying food",
            "Review your 'wants' category first",
            "Get a second job",
          ],
          correctAnswer: 2,
          explanation:
            "Start by looking at non-essential 'wants' - these are usually easier to reduce than needs.",
        },
        {
          id: "q5-5",
          type: "true-false",
          question:
            "A budget that worked last year will always work this year.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "Circumstances change (inflation, life events, goals), so budgets need regular updates.",
        },
      ],
    },
  ],
};

export function getLessonById(lessonId: string): Lesson | undefined {
  return budgetingCourse.lessons.find((lesson) => lesson.id === lessonId);
}

export function getNextLesson(currentLessonId: string): Lesson | undefined {
  const currentIndex = budgetingCourse.lessons.findIndex(
    (lesson) => lesson.id === currentLessonId,
  );
  if (
    currentIndex === -1 ||
    currentIndex === budgetingCourse.lessons.length - 1
  ) {
    return undefined;
  }
  return budgetingCourse.lessons[currentIndex + 1];
}
