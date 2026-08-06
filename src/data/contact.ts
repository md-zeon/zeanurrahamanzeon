/** Copy for the contact page hero header. */
export const contactHeader = {
  title1: "Let's work",
  title2: "together",
  paragraph:
    "Have an idea you want to build? Looking for a developer who ships real products, not just concepts? Send a message — let's find a solution together.",
};

/**
 * Contact form config: contact email, info sidebar sections, the select
 * option lists (company stage / deadline / budget / source), and the
 * submit/success/error copy.
 */
export const contactForm = {
  email: "zeon.cse@gmail.com",
  sections: [
    {
      label: "[for collaborations]",
      text: "I'm always open to partnering up with developers, designers, agencies, and anyone working on interesting problems. Send me an email and let's discuss.",
    },
    {
      label: "[for questions]",
      text: "Have questions about a project or how I work? Check out the FAQ below or feel free to contact me.",
    },
  ],
  companyStage: {
    label: "Company stage",
    options: [
      "Early-stage startup",
      "Mid-stage startup",
      "Late-stage startup",
      "Scaleup",
      "Enterprise",
      "Not applicable",
    ],
  },
  deadline: {
    label: "Do you have a deadline?",
    options: [
      "No, no rush",
      "<Month",
      "1-3 Months",
      "3-6 Months",
      "6+ Months",
      "Not applicable",
    ],
  },
  budget: {
    label: "What is your Estimated budget?",
    options: [
      "Under $1,000",
      "$1,000 - $5,000",
      "$5,000 - $10,000",
      "$10,000+",
      "Hourly / Retainer",
      "I'm not sure",
    ],
    note: "We'll confirm this together, don't worry.",
  },
  source: {
    label: "How did you hear about me?",
    options: [
      "GitHub",
      "LinkedIn",
      "Search engine",
      "Social media",
      "Word of mouth",
      "Blog or article",
      "Other",
    ],
  },
  submit: "Submit",
  success:
    "Thank you for your submission. I'll get back to you within 2 business days.",
  error: "Oops! Something went wrong while submitting the form.",
};

/**
 * FAQ data: the stacked heading words, caption chip, the Q&A items
 * (answers may contain `- ` bullet lines), and the "can't find an answer"
 * contact prompt.
 */
export const faq = {
  header: ["FREQUENTLY", "ASKED", "QUESTIONS"],
  caption: "FAQ_007",
  items: [
    {
      question: "What type of projects do you build?",
      answer: [
        "I focus on web products that solve real problems: developer tools, marketplaces, real-time platforms, and anything that needs a clean API and a polished interface.",
        "I don't tie myself to a single stack. I pick the tools that fit each project — authentication, real-time features, and AI integrations included when the product calls for them — and I adapt quickly when a new stack is involved.",
      ],
      answerHtml: true,
    },
    {
      question: "Do you only take on full end-to-end projects?",
      answer: [
        "No. I'm just as happy to take a specific slice: a frontend, an API, a database schema, or a code review. I also enjoy collaborating on existing codebases and contributing to open source.",
        "If you already have a design or a partial build, I can work from where you are rather than starting over.",
      ],
    },
    {
      question: "What is your process for creating a website or app?",
      answer: [
        "Every project starts with a discovery call to understand the goals, users, and scope, and to check that we're a good fit.",
        "Then I move into architecture: data models, API design, and component structure, so the build has a solid foundation from day one.",
        "Development happens in reviewable stages — you see real progress as it ships, not a big reveal at the end.",
        "After launch I stay available for fixes, enhancements, and ongoing support.",
      ],
    },
    {
      question: "How much do you charge and how long does a project take?",
      answer: [
        "Small features and fixes start around $300, and complete applications generally start from $1,500 depending on scope.",
        "Here's a general idea of timelines:",
        "- Landing page: 1–2 weeks or less\n- Marketing or brochure site: 1–3 weeks\n- Full-stack MVP: 3–8 weeks\n- Complex real-time platforms: 8+ weeks",
        "Every quote is tailored to your goals and complexity, and I'll always provide a clear breakdown upfront.",
      ],
    },
    {
      question: "Can you work with my existing stack or infrastructure?",
      answer: [
        "Almost certainly. I'm at home in the modern JavaScript ecosystem, and I'm comfortable picking up new languages, frameworks, and services as a project requires.",
        "When I encounter a stack I haven't used, I don't start from scratch — I map its core concepts onto fundamentals I already know, so I can contribute quickly and safely to an existing codebase.",
      ],
    },
  ],
  contactText:
    "Can't find an answer to your question? Feel free to contact me.",
};
