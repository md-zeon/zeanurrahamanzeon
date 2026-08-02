export const contactHeader = {
  title1: "Let's work",
  title2: "together",
  paragraph:
    "Get in touch today if you're looking to launch a website, refine your existing site, or discuss a potential collaboration, and let's find solutions together.",
};

export const contactForm = {
  email: "hello@bjornflow.com",
  sections: [
    { label: "[for collaborators]", text: "I'm always open to partnering up with creatives, developers, agencies, and whoever is interested in my work. Send me an email and let's discuss." },
    { label: "[for questions]", text: "Have questions? Check out the FAQ below or feel free to contact me." },
  ],
  companyStage: {
    label: "Company stage",
    options: ["Early-stage startup", "Mid-stage startup", "Late-stage startup", "Scaleup", "Enterprise", "Not applicable"],
  },
  deadline: {
    label: "Do you have a deadline?",
    options: ["No, no rush", "<Month", "1-3 Months", "3-6 Months", "6+ Months", "Not applicable"],
  },
  budget: {
    label: "What is your Estimated budget?",
    options: ["Under €10,000", "€10,000 - €20,000", "€20,000 - €30,000", "€30,000+", "I'm not sure", "Not applicable"],
    note: "We'll confirm this together, don't worry.",
  },
  source: {
    label: "How did you hear about me?",
    options: ["Webflow partners", "AWWWARDS", "Search engine", "Social media", "Word of mouth", "News article or blog", "Other"],
  },
  submit: "Submit",
  success: "Thank you for your submission. I'll get back to you within 2 business days.",
  error: "Oops! Something went wrong while submitting the form.",
};

export const faq = {
  header: ["FREQUENTLY", "ASKED", "QUESTIONS"],
  caption: "FAQ_007",
  items: [
    {
      question: "What types of projects do you specialise in?",
      answer: [
        "I focus on marketing and ecommerce Webflow websites. I often work with teams migrating from other platforms, facing performance or collaboration issues, or simply wanting a custom Webflow build or improvements to their current site.",
        "My services include web design, development, immersive interactions, integrations, SEO, and optimisation.",
      ],
      answerHtml: true,
    },
    {
      question: "Do you only take on full design and development projects?",
      answer: [
        "No, while I offer end-to-end projects as well, I'm also happy to collaborate with other designers and teams. If you already have a Figma design, I can focus solely on development in Webflow. I also offer support for specific needs like SEO, performance optimisation, or adding new features to an existing site.",
      ],
    },
    {
      question: "What is your process for creating a website?",
      answer: [
        "Every project starts with a discovery call to understand your goals, priorities, and see if we're a good fit.",
        "If it's a full design and development project, we begin with planning and strategy, digging into your goals, audience, and market. Then we move into sitemap, wireframes, and content structure to make sure each page supports your message and conversion goals.",
        "Once the visual design is approved, I move on to development, interactions and animations, SEO, integrations, and launch, followed by post-launch support.",
        "You'll be involved throughout the process to ensure everything stays aligned.",
      ],
    },
    {
      question: "How much do you charge and how long does a project take?",
      answer: [
        "Most full-site projects start at €3,000 for development and €5,000+ for full design and development.",
        "Here's a general idea of timelines:",
        "- Landing page: 1–2 weeks or less\n- 5-page website: 2–5 weeks\n- Larger/advanced websites: 3–10+ weeks",
        "For updates to an existing site or more specific needs, pricing and timelines vary.",
        "Every quote is tailored to your goals and complexity. I'll always provide a clear breakdown upfront. Feel free to get in touch for an estimate.",
      ],
    },
    {
      question: "Can you integrate Webflow with platforms like Shopify, analytics tools, or CRMs?",
      answer: [
        "Yes! I handle all typical integrations, including analytics, CRMs, forms, and e-commerce.",
        "For Shopify, I use Smoothify to connect it with Webflow, combining Webflow's visual flexibility with Shopify's powerful commerce features, so you get the best of both worlds.",
      ],
    },
  ],
  contactText: "Can't find an answer to your question? Feel free to contact me.",
};
