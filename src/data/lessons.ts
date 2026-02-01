// Lesson data for financial literacy courses
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
    {
      id: "lesson-6",
      title: "Retirement Savings: 401(k)",
      description:
        "Learn about 401(k) plans and how to start saving for retirement",
      xpReward: 50,
      questions: [
        {
          id: "q6-1",
          type: "multiple-choice",
          question: "What is a 401(k)?",
          options: [
            "A type of savings account",
            "A retirement savings plan offered by employers",
            "A credit card",
            "A loan for buying a house",
          ],
          correctAnswer: 1,
          explanation:
            "A 401(k) is an employer-sponsored retirement savings plan that allows you to save and invest a portion of your paycheck before taxes are taken out.",
        },
        {
          id: "q6-2",
          type: "true-false",
          question: "Contributions to a 401(k) are made with pre-tax dollars.",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation:
            "Yes, 401(k) contributions are made pre-tax, which can lower your taxable income and potentially reduce your tax bill.",
        },
        {
          id: "q6-3",
          type: "multiple-choice",
          question: "What is the main benefit of a 401(k)?",
          options: [
            "Instant access to your money",
            "Tax advantages and potential employer matching",
            "Higher interest rates than savings accounts",
            "No contribution limits",
          ],
          correctAnswer: 1,
          explanation:
            "401(k)s offer tax benefits and many employers match a portion of your contributions, effectively giving you free money for retirement.",
        },
        {
          id: "q6-4",
          type: "multiple-choice",
          question:
            "When can you typically withdraw money from a 401(k) without penalty?",
          options: [
            "Anytime",
            "After age 59½",
            "After 5 years of contributions",
            "When you lose your job",
          ],
          correctAnswer: 1,
          explanation:
            "You can withdraw funds penalty-free after age 59½, though you may have to pay income taxes on the withdrawal.",
        },
        {
          id: "q6-5",
          type: "true-false",
          question:
            "You can contribute to a 401(k) even if your employer doesn't offer matching.",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation:
            "Yes, you can still contribute to your 401(k) for the tax benefits and long-term growth, even without employer matching.",
        },
      ],
    },
    {
      id: "lesson-7",
      title: "Investing in Stocks",
      description: "Understand the basics of stock market investing",
      xpReward: 50,
      questions: [
        {
          id: "q7-1",
          type: "multiple-choice",
          question: "What is a stock?",
          options: [
            "A type of bond",
            "A share of ownership in a company",
            "A savings account",
            "A loan from the bank",
          ],
          correctAnswer: 1,
          explanation:
            "A stock represents a share of ownership in a company. When you buy stock, you're buying a small piece of that company.",
        },
        {
          id: "q7-2",
          type: "true-false",
          question: "Stock prices can go up and down.",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation:
            "Yes, stock prices fluctuate based on company performance, market conditions, and investor sentiment.",
        },
        {
          id: "q7-3",
          type: "multiple-choice",
          question: "What is diversification in investing?",
          options: [
            "Putting all your money in one stock",
            "Spreading investments across different assets",
            "Only investing in bonds",
            "Selling stocks quickly",
          ],
          correctAnswer: 1,
          explanation:
            "Diversification means spreading your investments across different stocks, bonds, or other assets to reduce risk.",
        },
        {
          id: "q7-4",
          type: "multiple-choice",
          question: "What does 'buy low, sell high' mean?",
          options: [
            "Buy expensive stocks and sell cheap ones",
            "Buy stocks when prices are low and sell when they're high",
            "Only buy stocks from big companies",
            "Never sell stocks",
          ],
          correctAnswer: 1,
          explanation:
            "This is a basic investing principle: purchase assets at a low price and sell them at a higher price to make a profit.",
        },
        {
          id: "q7-5",
          type: "true-false",
          question: "Investing in stocks is risk-free.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "Stock investing carries risk - you could lose money if stock prices fall. However, it also has the potential for growth.",
        },
      ],
    },
    {
      id: "lesson-8",
      title: "Credit Cards vs Debit Cards",
      description: "Know the difference and when to use each",
      xpReward: 50,
      questions: [
        {
          id: "q8-1",
          type: "multiple-choice",
          question:
            "What is the main difference between credit and debit cards?",
          options: [
            "Credit cards are plastic, debit cards are metal",
            "Credit cards borrow money, debit cards use your own money",
            "Debit cards have higher limits",
            "Credit cards don't require a PIN",
          ],
          correctAnswer: 1,
          explanation:
            "Credit cards allow you to borrow money from the card issuer, while debit cards deduct money directly from your bank account.",
        },
        {
          id: "q8-2",
          type: "true-false",
          question: "Using a credit card builds your credit score.",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation:
            "Responsible credit card use can help build your credit score by showing lenders you can manage debt.",
        },
        {
          id: "q8-3",
          type: "multiple-choice",
          question: "When should you use a debit card?",
          options: [
            "When you want to build credit",
            "When you have the money in your account",
            "For large purchases you can't afford",
            "To get cash back rewards",
          ],
          correctAnswer: 1,
          explanation:
            "Use a debit card when you have the funds available in your account to avoid overdraft fees or debt.",
        },
        {
          id: "q8-4",
          type: "multiple-choice",
          question:
            "What happens if you don't pay your credit card bill on time?",
          options: [
            "Nothing",
            "You get late fees and interest charges",
            "Your card is automatically canceled",
            "You get a refund",
          ],
          correctAnswer: 1,
          explanation:
            "Late payments can result in fees, higher interest rates, and damage to your credit score.",
        },
        {
          id: "q8-5",
          type: "true-false",
          question: "Debit cards offer the same rewards as credit cards.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "While some debit cards offer rewards, credit cards generally provide more extensive rewards programs.",
        },
      ],
    },
    {
      id: "lesson-9",
      title: "Understanding Mortgages and Loans",
      description: "Learn about different types of loans and home financing",
      xpReward: 50,
      questions: [
        {
          id: "q9-1",
          type: "multiple-choice",
          question: "What is a mortgage?",
          options: [
            "A type of savings account",
            "A loan specifically for buying a home",
            "A credit card",
            "A retirement account",
          ],
          correctAnswer: 1,
          explanation:
            "A mortgage is a loan used to purchase real estate, secured by the property itself.",
        },
        {
          id: "q9-2",
          type: "true-false",
          question: "All mortgages have the same interest rate.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "Mortgage rates vary based on your credit score, loan type, market conditions, and other factors.",
        },
        {
          id: "q9-3",
          type: "multiple-choice",
          question:
            "What is the difference between a fixed-rate and adjustable-rate mortgage?",
          options: [
            "Fixed-rate mortgages have no interest, adjustable-rate do",
            "Fixed-rate mortgages keep the same rate, adjustable-rate can change",
            "Adjustable-rate mortgages are only for first-time buyers",
            "Fixed-rate mortgages are shorter term",
          ],
          correctAnswer: 1,
          explanation:
            "Fixed-rate mortgages maintain the same interest rate throughout the loan term, while adjustable-rate mortgages can fluctuate.",
        },
        {
          id: "q9-4",
          type: "multiple-choice",
          question: "What is PMI?",
          options: [
            "Personal Mortgage Insurance",
            "Primary Mortgage Interest",
            "Private Mortgage Insurance",
            "Public Mortgage Investment",
          ],
          correctAnswer: 2,
          explanation:
            "PMI is Private Mortgage Insurance, required for conventional loans with less than 20% down payment to protect the lender.",
        },
        {
          id: "q9-5",
          type: "true-false",
          question: "You can pay off your mortgage early without penalty.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "Some mortgages have prepayment penalties that charge fees for paying off the loan early. Always check your loan terms.",
        },
      ],
    },
    {
      id: "lesson-10",
      title: "IRA Accounts",
      description: "Learn about Individual Retirement Accounts",
      xpReward: 50,
      questions: [
        {
          id: "q10-1",
          type: "multiple-choice",
          question: "What does IRA stand for?",
          options: [
            "Individual Retirement Account",
            "Investment Retirement Account",
            "Internal Revenue Account",
            "International Retirement Association",
          ],
          correctAnswer: 0,
          explanation:
            "IRA stands for Individual Retirement Account, a tax-advantaged savings plan for retirement.",
        },
        {
          id: "q10-2",
          type: "true-false",
          question: "Contributions to a traditional IRA are tax-deductible.",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation:
            "Traditional IRA contributions are often tax-deductible, reducing your taxable income.",
        },
        {
          id: "q10-3",
          type: "multiple-choice",
          question:
            "What is the main difference between a traditional and Roth IRA?",
          options: [
            "Traditional IRAs have higher contribution limits",
            "Roth IRAs offer tax-free withdrawals in retirement",
            "Traditional IRAs are only for self-employed individuals",
            "Roth IRAs require employer matching",
          ],
          correctAnswer: 1,
          explanation:
            "Roth IRAs allow tax-free withdrawals in retirement, while traditional IRAs provide tax deductions now.",
        },
        {
          id: "q10-4",
          type: "multiple-choice",
          question: "What is the contribution limit for IRAs in 2024?",
          options: ["$3,000", "$6,000", "$7,000", "$10,000"],
          correctAnswer: 2,
          explanation:
            "The 2024 IRA contribution limit is $7,000 for those under 50.",
        },
        {
          id: "q10-5",
          type: "true-false",
          question:
            "You can withdraw money from an IRA at any time without penalty.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "Early withdrawals from traditional IRAs before age 59½ incur a 10% penalty plus taxes.",
        },
      ],
    },
    {
      id: "lesson-11",
      title: "Social Security Benefits",
      description: "Understanding Social Security retirement benefits",
      xpReward: 50,
      questions: [
        {
          id: "q11-1",
          type: "multiple-choice",
          question:
            "At what age can you start receiving Social Security benefits?",
          options: ["55", "62", "65", "70"],
          correctAnswer: 1,
          explanation:
            "You can start receiving Social Security benefits as early as age 62.",
        },
        {
          id: "q11-2",
          type: "true-false",
          question: "Your Social Security benefit amount is fixed for life.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "Benefits are adjusted annually for inflation using the Consumer Price Index.",
        },
        {
          id: "q11-3",
          type: "multiple-choice",
          question:
            "What happens if you delay claiming Social Security past your full retirement age?",
          options: [
            "Your benefits decrease",
            "Your benefits increase by 8% per year",
            "Your benefits stay the same",
            "You lose eligibility",
          ],
          correctAnswer: 1,
          explanation:
            "Delaying benefits past full retirement age increases them by about 8% per year.",
        },
        {
          id: "q11-4",
          type: "multiple-choice",
          question: "How is your Social Security benefit calculated?",
          options: [
            "Based on your highest earning year only",
            "Based on your average indexed monthly earnings",
            "Randomly assigned",
            "Based on your current salary",
          ],
          correctAnswer: 1,
          explanation:
            "Benefits are calculated using your average indexed monthly earnings over your working years.",
        },
        {
          id: "q11-5",
          type: "true-false",
          question: "Social Security benefits are not taxable.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "Up to 85% of Social Security benefits may be taxable depending on your income.",
        },
      ],
    },
    {
      id: "lesson-12",
      title: "Pension Plans",
      description: "Learn about defined benefit pension plans",
      xpReward: 50,
      questions: [
        {
          id: "q12-1",
          type: "multiple-choice",
          question: "What is a defined benefit pension plan?",
          options: [
            "A plan where you contribute a fixed amount",
            "A plan where the employer promises a specific monthly benefit",
            "A plan that invests in stocks",
            "A plan for early retirement",
          ],
          correctAnswer: 1,
          explanation:
            "Defined benefit plans guarantee a specific monthly benefit based on salary and years of service.",
        },
        {
          id: "q12-2",
          type: "true-false",
          question:
            "Pension plans are becoming less common in the private sector.",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation:
            "Many companies have switched to 401(k) plans, making traditional pensions less common.",
        },
        {
          id: "q12-3",
          type: "multiple-choice",
          question: "Who bears the investment risk in a pension plan?",
          options: [
            "The employee",
            "The employer",
            "Both equally",
            "The government",
          ],
          correctAnswer: 1,
          explanation:
            "The employer bears the investment risk in defined benefit pension plans.",
        },
        {
          id: "q12-4",
          type: "multiple-choice",
          question: "What is vesting in a pension plan?",
          options: [
            "When you start contributing",
            "When you become eligible for the full benefit",
            "When the plan is funded",
            "When you retire",
          ],
          correctAnswer: 1,
          explanation:
            "Vesting is when you become eligible for the full pension benefit, often after several years.",
        },
        {
          id: "q12-5",
          type: "true-false",
          question: "Pension benefits are always paid as a lump sum.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "Pensions typically provide monthly payments for life, though lump sum options may exist.",
        },
      ],
    },
    {
      id: "lesson-13",
      title: "Long-term Investment Strategies",
      description: "Planning investments for retirement",
      xpReward: 50,
      questions: [
        {
          id: "q13-1",
          type: "multiple-choice",
          question: "What is dollar-cost averaging?",
          options: [
            "Investing a fixed amount regularly",
            "Investing all at once",
            "Selling investments gradually",
            "Timing the market",
          ],
          correctAnswer: 0,
          explanation:
            "Dollar-cost averaging involves investing a fixed amount at regular intervals.",
        },
        {
          id: "q13-2",
          type: "true-false",
          question:
            "Time in the market is more important than timing the market.",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation:
            "Staying invested long-term generally outperforms trying to time market movements.",
        },
        {
          id: "q13-3",
          type: "multiple-choice",
          question: "What is a target-date fund?",
          options: [
            "A fund that invests in specific dates",
            "A fund that automatically adjusts asset allocation as you age",
            "A fund for short-term goals",
            "A fund that guarantees returns",
          ],
          correctAnswer: 1,
          explanation:
            "Target-date funds automatically shift from stocks to bonds as the target date approaches.",
        },
        {
          id: "q13-4",
          type: "multiple-choice",
          question: "What percentage of salary should you save for retirement?",
          options: ["5-10%", "10-15%", "15-20%", "25% or more"],
          correctAnswer: 2,
          explanation:
            "Financial experts often recommend saving 15-20% of your salary for retirement.",
        },
        {
          id: "q13-5",
          type: "true-false",
          question: "You should stop investing once you retire.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "Many retirees continue investing to ensure their savings last throughout retirement.",
        },
      ],
    },
    {
      id: "lesson-14",
      title: "Bonds and Fixed Income",
      description: "Understanding bonds as investment vehicles",
      xpReward: 50,
      questions: [
        {
          id: "q14-1",
          type: "multiple-choice",
          question: "What is a bond?",
          options: [
            "A share of company ownership",
            "A loan to a government or corporation",
            "A type of mutual fund",
            "A retirement account",
          ],
          correctAnswer: 1,
          explanation:
            "A bond is essentially an IOU from a government or corporation that promises to pay back borrowed money with interest.",
        },
        {
          id: "q14-2",
          type: "true-false",
          question: "Bonds are generally riskier than stocks.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "Bonds are generally considered less risky than stocks, providing more stable returns.",
        },
        {
          id: "q14-3",
          type: "multiple-choice",
          question: "What does bond duration measure?",
          options: [
            "How long until the bond matures",
            "How sensitive the bond is to interest rate changes",
            "The bond's credit rating",
            "The bond's yield",
          ],
          correctAnswer: 1,
          explanation:
            "Duration measures how much a bond's price will change with a 1% change in interest rates.",
        },
        {
          id: "q14-4",
          type: "multiple-choice",
          question: "What is a Treasury bond?",
          options: [
            "A bond issued by corporations",
            "A bond issued by the U.S. government",
            "A bond issued by state governments",
            "A bond issued by foreign governments",
          ],
          correctAnswer: 1,
          explanation:
            "Treasury bonds are debt securities issued by the U.S. Department of the Treasury.",
        },
        {
          id: "q14-5",
          type: "true-false",
          question:
            "Bond prices and interest rates move in the same direction.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "When interest rates rise, bond prices fall, and vice versa.",
        },
      ],
    },
    {
      id: "lesson-15",
      title: "Mutual Funds and ETFs",
      description: "Learn about pooled investment vehicles",
      xpReward: 50,
      questions: [
        {
          id: "q15-1",
          type: "multiple-choice",
          question: "What is a mutual fund?",
          options: [
            "A single stock",
            "A pool of money from many investors used to buy securities",
            "A type of bond",
            "A savings account",
          ],
          correctAnswer: 1,
          explanation:
            "Mutual funds pool money from many investors to purchase a diversified portfolio of stocks, bonds, or other securities.",
        },
        {
          id: "q15-2",
          type: "true-false",
          question: "ETFs trade like stocks throughout the day.",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation:
            "Exchange-traded funds (ETFs) trade on stock exchanges and can be bought and sold throughout the trading day.",
        },
        {
          id: "q15-3",
          type: "multiple-choice",
          question:
            "What is the main difference between mutual funds and ETFs?",
          options: [
            "ETFs are only for bonds, mutual funds for stocks",
            "Mutual funds are actively managed, ETFs are usually passive",
            "ETFs have higher fees",
            "Mutual funds trade on exchanges",
          ],
          correctAnswer: 1,
          explanation:
            "While there are actively managed ETFs, most ETFs are passively managed index funds, while mutual funds can be either.",
        },
        {
          id: "q15-4",
          type: "multiple-choice",
          question: "What is an expense ratio?",
          options: [
            "The fund's total return",
            "The annual fee charged by the fund",
            "The minimum investment required",
            "The fund's dividend yield",
          ],
          correctAnswer: 1,
          explanation:
            "The expense ratio is the annual fee charged by the fund as a percentage of assets.",
        },
        {
          id: "q15-5",
          type: "true-false",
          question: "Index funds are a type of actively managed fund.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "Index funds are passively managed and aim to replicate the performance of a market index.",
        },
      ],
    },
    {
      id: "lesson-16",
      title: "Diversification Strategies",
      description: "Spreading risk across investments",
      xpReward: 50,
      questions: [
        {
          id: "q16-1",
          type: "multiple-choice",
          question: "What is the main benefit of diversification?",
          options: [
            "Guaranteed higher returns",
            "Reducing overall portfolio risk",
            "Eliminating all investment risk",
            "Increasing trading frequency",
          ],
          correctAnswer: 1,
          explanation:
            "Diversification helps reduce the impact of any single investment's poor performance on your overall portfolio.",
        },
        {
          id: "q16-2",
          type: "true-false",
          question:
            "Putting all your money in one stock is an example of good diversification.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "Concentrating investments in one asset increases risk and is the opposite of diversification.",
        },
        {
          id: "q16-3",
          type: "multiple-choice",
          question: "What is asset allocation?",
          options: [
            "Buying only stocks",
            "How you divide your investments among different asset classes",
            "Selling all investments at once",
            "Investing only in bonds",
          ],
          correctAnswer: 1,
          explanation:
            "Asset allocation refers to how you spread your investments across stocks, bonds, cash, and other assets.",
        },
        {
          id: "q16-4",
          type: "multiple-choice",
          question: "What is correlation in investing?",
          options: [
            "How investments perform relative to each other",
            "The total return of a portfolio",
            "The fees charged by brokers",
            "The tax rate on investments",
          ],
          correctAnswer: 0,
          explanation:
            "Correlation measures how closely the returns of two investments move together.",
        },
        {
          id: "q16-5",
          type: "true-false",
          question: "Diversification eliminates the risk of loss.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "While diversification reduces risk, it cannot eliminate all investment risk.",
        },
      ],
    },
    {
      id: "lesson-17",
      title: "Risk Management",
      description: "Understanding and managing investment risk",
      xpReward: 50,
      questions: [
        {
          id: "q17-1",
          type: "multiple-choice",
          question: "What is investment risk?",
          options: [
            "The chance of losing money",
            "The amount of money invested",
            "The time horizon of investment",
            "The tax rate on gains",
          ],
          correctAnswer: 0,
          explanation:
            "Investment risk refers to the possibility that an investment will not perform as expected.",
        },
        {
          id: "q17-2",
          type: "true-false",
          question: "Higher potential returns always mean higher risk.",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation:
            "Generally, investments with higher potential returns also carry higher risk.",
        },
        {
          id: "q17-3",
          type: "multiple-choice",
          question: "What is volatility?",
          options: [
            "The total return of an investment",
            "The fluctuation in an investment's price",
            "The dividend yield",
            "The expense ratio",
          ],
          correctAnswer: 1,
          explanation:
            "Volatility measures how much an investment's price fluctuates over time.",
        },
        {
          id: "q17-4",
          type: "multiple-choice",
          question: "What is a stop-loss order?",
          options: [
            "An order to buy more shares",
            "An order to sell if price drops below a certain level",
            "An order to hold forever",
            "An order to reinvest dividends",
          ],
          correctAnswer: 1,
          explanation:
            "A stop-loss order automatically sells a security if its price falls below a specified level.",
        },
        {
          id: "q17-5",
          type: "true-false",
          question: "Risk tolerance is the same for everyone.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "Risk tolerance varies by individual based on factors like age, goals, and financial situation.",
        },
      ],
    },
    {
      id: "lesson-18",
      title: "Building Credit Score",
      description: "How to improve and maintain good credit",
      xpReward: 50,
      questions: [
        {
          id: "q18-1",
          type: "multiple-choice",
          question: "What is a credit score?",
          options: [
            "Your bank account balance",
            "A number representing your creditworthiness",
            "Your annual income",
            "Your debt-to-income ratio",
          ],
          correctAnswer: 1,
          explanation:
            "A credit score is a numerical representation of your creditworthiness based on your credit history.",
        },
        {
          id: "q18-2",
          type: "true-false",
          question:
            "Payment history is the most important factor in your credit score.",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation:
            "Payment history accounts for about 35% of your credit score.",
        },
        {
          id: "q18-3",
          type: "multiple-choice",
          question: "How often should you check your credit report?",
          options: ["Never", "Once a year", "Monthly", "Weekly"],
          correctAnswer: 1,
          explanation:
            "You can check your credit report for free once per year from each of the three major bureaus.",
        },
        {
          id: "q18-4",
          type: "multiple-choice",
          question: "What is credit utilization?",
          options: [
            "How much you spend on credit cards",
            "The ratio of your credit used to credit available",
            "Your monthly payment amount",
            "Your interest rate",
          ],
          correctAnswer: 1,
          explanation:
            "Credit utilization is the percentage of your available credit that you're currently using.",
        },
        {
          id: "q18-5",
          type: "true-false",
          question:
            "Closing old credit card accounts can hurt your credit score.",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation:
            "Closing accounts can increase your credit utilization ratio and shorten your credit history length.",
        },
      ],
    },
    {
      id: "lesson-19",
      title: "Credit Card Rewards",
      description: "Maximizing benefits from credit cards",
      xpReward: 50,
      questions: [
        {
          id: "q19-1",
          type: "multiple-choice",
          question: "What are credit card rewards?",
          options: [
            "Monthly fees",
            "Benefits earned for using the card",
            "Interest charges",
            "Late payment penalties",
          ],
          correctAnswer: 1,
          explanation:
            "Credit card rewards are benefits like cash back, points, or miles earned on purchases.",
        },
        {
          id: "q19-2",
          type: "true-false",
          question: "All credit cards offer the same rewards.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "Different cards offer different rewards programs tailored to specific spending categories.",
        },
        {
          id: "q19-3",
          type: "multiple-choice",
          question: "What is a sign-up bonus?",
          options: [
            "A fee for opening an account",
            "Rewards earned for meeting spending requirements after opening",
            "Monthly maintenance fee",
            "Interest on purchases",
          ],
          correctAnswer: 1,
          explanation:
            "Sign-up bonuses are extra rewards offered for spending a certain amount within a timeframe after opening an account.",
        },
        {
          id: "q19-4",
          type: "multiple-choice",
          question: "What is the best strategy for maximizing rewards?",
          options: [
            "Using the card for all purchases",
            "Matching spending to the card's bonus categories",
            "Carrying a balance",
            "Paying annual fees only",
          ],
          correctAnswer: 1,
          explanation:
            "Focus spending on categories that earn the highest rewards for your card.",
        },
        {
          id: "q19-5",
          type: "true-false",
          question: "Rewards points never expire.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "Rewards expiration policies vary by card issuer; some expire after a period of inactivity.",
        },
      ],
    },
    {
      id: "lesson-20",
      title: "Debt Management",
      description: "Strategies for managing and reducing debt",
      xpReward: 50,
      questions: [
        {
          id: "q20-1",
          type: "multiple-choice",
          question: "What is the debt avalanche method?",
          options: [
            "Paying off smallest debts first",
            "Paying off highest interest debts first",
            "Consolidating all debt",
            "Ignoring minimum payments",
          ],
          correctAnswer: 1,
          explanation:
            "The debt avalanche method focuses on paying off debts with the highest interest rates first.",
        },
        {
          id: "q20-2",
          type: "true-false",
          question: "Debt consolidation always saves money.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "While consolidation can simplify payments, it may not always reduce costs if the new rate is higher.",
        },
        {
          id: "q20-3",
          type: "multiple-choice",
          question: "What is a debt-to-income ratio?",
          options: [
            "Monthly debt payments divided by income",
            "Total debt divided by assets",
            "Credit score calculation",
            "Interest rate on loans",
          ],
          correctAnswer: 0,
          explanation:
            "DTI ratio compares your monthly debt payments to your gross monthly income.",
        },
        {
          id: "q20-4",
          type: "multiple-choice",
          question:
            "What should you do if you can't pay your credit card bill?",
          options: [
            "Ignore it",
            "Contact the issuer to discuss options",
            "Close the account",
            "Transfer the balance",
          ],
          correctAnswer: 1,
          explanation:
            "Contact your card issuer immediately to discuss hardship options or payment plans.",
        },
        {
          id: "q20-5",
          type: "true-false",
          question:
            "Paying only the minimum payment is a good debt management strategy.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "Minimum payments keep you in debt longer and cost more in interest.",
        },
      ],
    },
    {
      id: "lesson-21",
      title: "Card Security",
      description: "Protecting your cards and personal information",
      xpReward: 50,
      questions: [
        {
          id: "q21-1",
          type: "multiple-choice",
          question: "What is card skimming?",
          options: [
            "A way to earn rewards",
            "A fraud method using devices to steal card data",
            "A type of credit limit",
            "A payment method",
          ],
          correctAnswer: 1,
          explanation:
            "Card skimming involves criminals using devices to capture card information from the magnetic stripe.",
        },
        {
          id: "q21-2",
          type: "true-false",
          question: "You should share your PIN with family members.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "Never share your PIN; it's meant to be personal and secure.",
        },
        {
          id: "q21-3",
          type: "multiple-choice",
          question: "What should you do if your card is lost or stolen?",
          options: [
            "Wait to see if it's used",
            "Report it immediately to your issuer",
            "Try to find it yourself",
            "Change your address",
          ],
          correctAnswer: 1,
          explanation:
            "Report lost or stolen cards immediately to minimize potential fraud.",
        },
        {
          id: "q21-4",
          type: "multiple-choice",
          question: "What is two-factor authentication?",
          options: [
            "Using two credit cards",
            "A security process requiring two forms of verification",
            "Paying in two installments",
            "Having two PINs",
          ],
          correctAnswer: 1,
          explanation:
            "2FA requires two different forms of verification, like a password plus a code sent to your phone.",
        },
        {
          id: "q21-5",
          type: "true-false",
          question: "Online purchases are less secure than in-store purchases.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "With proper security measures, online purchases can be just as secure as in-store ones.",
        },
      ],
    },
    {
      id: "lesson-22",
      title: "Home Equity Loans",
      description: "Borrowing against your home's value",
      xpReward: 50,
      questions: [
        {
          id: "q22-1",
          type: "multiple-choice",
          question: "What is home equity?",
          options: [
            "The size of your house",
            "The difference between your home's value and mortgage balance",
            "Your monthly mortgage payment",
            "Your property taxes",
          ],
          correctAnswer: 1,
          explanation:
            "Home equity is the portion of your home you actually own, calculated as home value minus mortgage balance.",
        },
        {
          id: "q22-2",
          type: "true-false",
          question: "Home equity loans are secured by your home.",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation:
            "Home equity loans use your home as collateral, so defaulting can result in foreclosure.",
        },
        {
          id: "q22-3",
          type: "multiple-choice",
          question:
            "What is the difference between a home equity loan and HELOC?",
          options: [
            "HELOCs have variable rates, loans have fixed rates",
            "Loans are for purchases, HELOCs are for any use",
            "HELOCs provide a lump sum, loans provide a line of credit",
            "All of the above",
          ],
          correctAnswer: 3,
          explanation:
            "Home equity loans provide a lump sum with fixed rates, while HELOCs offer a line of credit with variable rates.",
        },
        {
          id: "q22-4",
          type: "multiple-choice",
          question:
            "What is typically the maximum LTV ratio for home equity loans?",
          options: ["50%", "75%", "90%", "100%"],
          correctAnswer: 2,
          explanation:
            "Lenders typically allow up to 90% loan-to-value ratio for home equity loans.",
        },
        {
          id: "q22-5",
          type: "true-false",
          question:
            "Home equity loans always have lower interest rates than credit cards.",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation:
            "Home equity loans generally have much lower interest rates than credit cards.",
        },
      ],
    },
    {
      id: "lesson-23",
      title: "Personal Loans",
      description: "Understanding unsecured personal loans",
      xpReward: 50,
      questions: [
        {
          id: "q23-1",
          type: "multiple-choice",
          question: "What is a personal loan?",
          options: [
            "A loan for buying a car",
            "An unsecured loan for various purposes",
            "A loan for education",
            "A loan secured by property",
          ],
          correctAnswer: 1,
          explanation:
            "Personal loans are unsecured loans that can be used for various purposes like debt consolidation or home improvements.",
        },
        {
          id: "q23-2",
          type: "true-false",
          question: "Personal loans require collateral.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "Personal loans are typically unsecured, meaning they don't require collateral.",
        },
        {
          id: "q23-3",
          type: "multiple-choice",
          question: "What factors affect personal loan interest rates?",
          options: [
            "Credit score only",
            "Income and debt levels",
            "Loan amount and term",
            "All of the above",
          ],
          correctAnswer: 3,
          explanation:
            "Interest rates are influenced by credit score, income, debt levels, loan amount, and repayment term.",
        },
        {
          id: "q23-4",
          type: "multiple-choice",
          question: "What is the typical repayment term for personal loans?",
          options: ["1-3 years", "5-7 years", "10-15 years", "20-30 years"],
          correctAnswer: 0,
          explanation:
            "Personal loans usually have shorter terms of 1-7 years, with most being 1-3 years.",
        },
        {
          id: "q23-5",
          type: "true-false",
          question: "You can prepay personal loans without penalty.",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation:
            "Most personal loans allow prepayment without penalties, though some may have restrictions.",
        },
      ],
    },
    {
      id: "lesson-24",
      title: "Student Loans",
      description: "Managing education financing",
      xpReward: 50,
      questions: [
        {
          id: "q24-1",
          type: "multiple-choice",
          question: "What are the two main types of student loans?",
          options: [
            "Federal and private",
            "Subsidized and unsubsidized",
            "Short-term and long-term",
            "Secured and unsecured",
          ],
          correctAnswer: 0,
          explanation:
            "Student loans are primarily categorized as federal (government-backed) or private (from banks/lenders).",
        },
        {
          id: "q24-2",
          type: "true-false",
          question:
            "Federal student loans offer income-driven repayment plans.",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation:
            "Federal loans provide income-driven repayment options that adjust payments based on income.",
        },
        {
          id: "q24-3",
          type: "multiple-choice",
          question: "What is loan forgiveness?",
          options: [
            "Canceling the loan entirely",
            "Reducing monthly payments",
            "Extending the loan term",
            "Converting to grants",
          ],
          correctAnswer: 0,
          explanation:
            "Loan forgiveness cancels remaining debt after meeting certain requirements, like public service work.",
        },
        {
          id: "q24-4",
          type: "multiple-choice",
          question: "What is the grace period for federal student loans?",
          options: ["3 months", "6 months", "9 months", "12 months"],
          correctAnswer: 1,
          explanation:
            "Federal student loans have a 6-month grace period after leaving school before payments begin.",
        },
        {
          id: "q24-5",
          type: "true-false",
          question: "Private student loans can be discharged in bankruptcy.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "Private student loans are generally not dischargeable in bankruptcy, unlike federal loans.",
        },
      ],
    },
    {
      id: "lesson-25",
      title: "Auto Loans",
      description: "Financing vehicle purchases",
      xpReward: 50,
      questions: [
        {
          id: "q25-1",
          type: "multiple-choice",
          question: "What is a good debt-to-income ratio for auto loans?",
          options: ["10% or less", "20% or less", "36% or less", "50% or less"],
          correctAnswer: 2,
          explanation:
            "Lenders typically prefer a DTI ratio of 36% or less for auto loans.",
        },
        {
          id: "q25-2",
          type: "true-false",
          question: "Auto loans are secured by the vehicle.",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation:
            "Auto loans are secured loans, meaning the vehicle serves as collateral.",
        },
        {
          id: "q25-3",
          type: "multiple-choice",
          question: "What is negative equity?",
          options: [
            "When you owe more than the car is worth",
            "When the car depreciates",
            "When interest rates are low",
            "When you pay cash",
          ],
          correctAnswer: 0,
          explanation:
            "Negative equity occurs when you owe more on the loan than the car's current market value.",
        },
        {
          id: "q25-4",
          type: "multiple-choice",
          question: "What is the typical loan term for auto loans?",
          options: ["2-3 years", "5-7 years", "10-15 years", "20 years"],
          correctAnswer: 1,
          explanation:
            "Most auto loans have terms of 5-7 years, though shorter terms are available.",
        },
        {
          id: "q25-5",
          type: "true-false",
          question: "Leasing a car is the same as buying with a loan.",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "Leasing involves renting the car for a set period, while loans involve ownership.",
        },
      ],
    },
  ],
};

// Helper to create a course-specific copy of a lesson with a unique ID
function createCourseLesson(
  lesson: Lesson,
  coursePrefix: string,
  lessonNumber: number,
): Lesson {
  return {
    ...lesson,
    id: `${coursePrefix}-lesson-${lessonNumber}`,
    questions: lesson.questions.map((q, idx) => ({
      ...q,
      id: `${coursePrefix}-q${lessonNumber}-${idx + 1}`,
    })),
  };
}

export const retirementCourse: Course = {
  id: "retirement-savings",
  title: "Retirement Savings",
  description: "Plan for your financial future",
  lessons: [
    createCourseLesson(budgetingCourse.lessons[5], "retirement", 1), // 401(k)
    createCourseLesson(budgetingCourse.lessons[9], "retirement", 2), // IRA Accounts
    createCourseLesson(budgetingCourse.lessons[10], "retirement", 3), // Social Security Benefits
    createCourseLesson(budgetingCourse.lessons[11], "retirement", 4), // Pension Plans
    createCourseLesson(budgetingCourse.lessons[12], "retirement", 5), // Long-term Investment Strategies
  ],
};

export const investingCourse: Course = {
  id: "investing-basics",
  title: "Investing Basics",
  description: "Learn the fundamentals of investing",
  lessons: [
    createCourseLesson(budgetingCourse.lessons[6], "investing", 1), // Investing in Stocks
    createCourseLesson(budgetingCourse.lessons[13], "investing", 2), // Bonds and Fixed Income
    createCourseLesson(budgetingCourse.lessons[14], "investing", 3), // Mutual Funds and ETFs
    createCourseLesson(budgetingCourse.lessons[15], "investing", 4), // Diversification Strategies
    createCourseLesson(budgetingCourse.lessons[16], "investing", 5), // Risk Management
  ],
};

export const creditCourse: Course = {
  id: "credit-debit",
  title: "Credit & Debit Cards",
  description: "Master the use of credit and debit cards",
  lessons: [
    createCourseLesson(budgetingCourse.lessons[7], "credit", 1), // Credit Cards vs Debit Cards
    createCourseLesson(budgetingCourse.lessons[17], "credit", 2), // Building Credit Score
    createCourseLesson(budgetingCourse.lessons[18], "credit", 3), // Credit Card Rewards
    createCourseLesson(budgetingCourse.lessons[19], "credit", 4), // Debt Management
    createCourseLesson(budgetingCourse.lessons[20], "credit", 5), // Card Security
  ],
};

export const loansCourse: Course = {
  id: "loans-mortgages",
  title: "Loans & Mortgages",
  description: "Understand different types of loans and borrowing",
  lessons: [
    createCourseLesson(budgetingCourse.lessons[8], "loans", 1), // Understanding Mortgages and Loans
    createCourseLesson(budgetingCourse.lessons[21], "loans", 2), // Home Equity Loans
    createCourseLesson(budgetingCourse.lessons[22], "loans", 3), // Personal Loans
    createCourseLesson(budgetingCourse.lessons[23], "loans", 4), // Student Loans
    createCourseLesson(budgetingCourse.lessons[24], "loans", 5), // Auto Loans
  ],
};

// All courses for searching
export const allCourses: Course[] = [
  budgetingCourse,
  retirementCourse,
  investingCourse,
  creditCourse,
  loansCourse,
];

export function getLessonById(lessonId: string): Lesson | undefined {
  for (const course of allCourses) {
    const lesson = course.lessons.find((l) => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
}

export function getCourseByLessonId(lessonId: string): Course | undefined {
  for (const course of allCourses) {
    const lesson = course.lessons.find((l) => l.id === lessonId);
    if (lesson) return course;
  }
  return undefined;
}

export function getNextLesson(currentLessonId: string): Lesson | undefined {
  const course = getCourseByLessonId(currentLessonId);
  if (!course) return undefined;

  const currentIndex = course.lessons.findIndex(
    (lesson) => lesson.id === currentLessonId,
  );
  if (currentIndex === -1 || currentIndex === course.lessons.length - 1) {
    return undefined;
  }
  return course.lessons[currentIndex + 1];
}
