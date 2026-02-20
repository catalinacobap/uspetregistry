/** US states for dropdown - exact list */
const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming", "District of Columbia",
];

type SingleStep = { type: "single"; question: string; options: { value: string; label: string }[] };
type MultiStep = { type: "multi"; question: string; options: { value: string; label: string }[] };
type DropdownStep = { type: "dropdown"; question: string; options: string[] };
type EmailStep = { type: "email"; title: string };
type EligibleStep = { type: "eligible"; title: string };
type TherapistStep = { type: "therapist"; title: string };
type FinalizingStep = { type: "finalizing"; title: string };
type PrequalStep = { type: "prequal"; title: string };
type PackageStep = { type: "package"; title?: string };
type SpeedStep = { type: "speed"; question: string };
type CheckoutStep = { type: "checkout"; title: string };
type HowItWorksStep = { type: "howItWorks" };
type EsaHousingStep = { type: "esaHousing" };
type FairHousingStep = { type: "fairHousing" };
type SaveMoneyStep = { type: "saveMoney" };
type MentalHealthIntroStep = { type: "mentalHealthIntro"; title: string };

export type StepConfig =
  | SingleStep
  | MultiStep
  | DropdownStep
  | EmailStep
  | EligibleStep
  | TherapistStep
  | FinalizingStep
  | PrequalStep
  | PackageStep
  | SpeedStep
  | CheckoutStep
  | HowItWorksStep
  | EsaHousingStep
  | FairHousingStep
  | SaveMoneyStep
  | MentalHealthIntroStep;

export const REGISTER_STEPS: StepConfig[] = [
  // 1️⃣ Pet Qualification
  {
    type: "single",
    question: "Do you already have a pet?",
    options: [
      { value: "yes", label: "Yes — I already have a pet I want to register" },
      { value: "no", label: "No — I plan to get one soon" },
    ],
  },
  {
    type: "single",
    question: "Are you 18 years of age or older?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    type: "single",
    question: "Is this your first time getting an ESA letter?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  { type: "howItWorks" },
  {
    type: "single",
    question: "Why do you need an ESA letter today?",
    options: [
      { value: "landlord", label: "My landlord requested one" },
      { value: "rent", label: "To save on pet rent and fees" },
      { value: "unsure", label: "I'm not sure" },
    ],
  },
  { type: "esaHousing" },
  { type: "fairHousing" },
  {
    type: "single",
    question: "How many pets do you have?",
    options: [
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "more", label: "More than 3" },
    ],
  },
  {
    type: "single",
    question: "What type of pet do you have?",
    options: [
      { value: "dog", label: "Dog" },
      { value: "cat", label: "Cat" },
      { value: "other", label: "Other" },
    ],
  },
  {
    type: "dropdown",
    question: "What state do you reside in?",
    options: US_STATES,
  },
  {
    type: "single",
    question: "Do you plan to travel with your pet?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  { type: "saveMoney" },
  // 2️⃣ Mental Health Questionnaire
  { type: "mentalHealthIntro", title: "Mental Health Questionnaire" },
  {
    type: "multi",
    question: "Which issues have you experienced? (multi-select)",
    options: [
      { value: "anxiety", label: "Anxiety" },
      { value: "depression", label: "Depression" },
      { value: "panic", label: "Panic Attacks" },
      { value: "ptsd", label: "PTSD" },
      { value: "insomnia", label: "Insomnia" },
      { value: "social", label: "Social Anxiety" },
      { value: "ocd", label: "OCD" },
      { value: "adhd", label: "ADHD" },
      { value: "phobias", label: "Phobias" },
      { value: "mood", label: "Mood Swings" },
      { value: "stress", label: "Chronic Stress" },
      { value: "other", label: "Other" },
    ],
  },
  {
    type: "single",
    question: "Over the past two weeks, how often have you lost interest in activities?",
    options: [
      { value: "never", label: "Never" },
      { value: "rarely", label: "Rarely" },
      { value: "sometimes", label: "Sometimes" },
      { value: "often", label: "Often" },
      { value: "always", label: "Always" },
    ],
  },
  {
    type: "single",
    question: "Over the past two weeks, how often have you felt depressed?",
    options: [
      { value: "never", label: "Never" },
      { value: "rarely", label: "Rarely" },
      { value: "sometimes", label: "Sometimes" },
      { value: "often", label: "Often" },
      { value: "always", label: "Always" },
    ],
  },
  {
    type: "single",
    question: "Over the past two weeks, how often have you felt irritable?",
    options: [
      { value: "never", label: "Never" },
      { value: "rarely", label: "Rarely" },
      { value: "sometimes", label: "Sometimes" },
      { value: "often", label: "Often" },
      { value: "always", label: "Always" },
    ],
  },
  {
    type: "single",
    question: "Over the past two weeks, how often have you felt anxious?",
    options: [
      { value: "never", label: "Never" },
      { value: "rarely", label: "Rarely" },
      { value: "sometimes", label: "Sometimes" },
      { value: "often", label: "Often" },
      { value: "always", label: "Always" },
    ],
  },
  {
    type: "single",
    question: "Over the past two weeks, how often have you experienced panic attacks?",
    options: [
      { value: "never", label: "Never" },
      { value: "rarely", label: "Rarely" },
      { value: "sometimes", label: "Sometimes" },
      { value: "often", label: "Often" },
      { value: "always", label: "Always" },
    ],
  },
  {
    type: "single",
    question: "Over the past two weeks, how often have you had irregular sleep patterns?",
    options: [
      { value: "never", label: "Never" },
      { value: "rarely", label: "Rarely" },
      { value: "sometimes", label: "Sometimes" },
      { value: "often", label: "Often" },
      { value: "always", label: "Always" },
    ],
  },
  {
    type: "single",
    question: "Over the past two weeks, how often have you acted impulsively?",
    options: [
      { value: "never", label: "Never" },
      { value: "rarely", label: "Rarely" },
      { value: "sometimes", label: "Sometimes" },
      { value: "often", label: "Often" },
      { value: "always", label: "Always" },
    ],
  },
  {
    type: "single",
    question: "Over the past two weeks, how often have you felt paranoid or suspicious?",
    options: [
      { value: "never", label: "Never" },
      { value: "rarely", label: "Rarely" },
      { value: "sometimes", label: "Sometimes" },
      { value: "often", label: "Often" },
      { value: "always", label: "Always" },
    ],
  },
  // 3️⃣ Email Capture
  { type: "email", title: "Enter your email to see if you are eligible" },
  // 4️⃣ Post-email: 1 - You are eligible
  { type: "eligible", title: "You are eligible" },
  // 5️⃣ Post-email: 2 - Matching you with a therapist
  { type: "therapist", title: "Matching you with a therapist" },
  // 6️⃣ Post-email: 3 - Finalizing your case
  { type: "finalizing", title: "Finalizing your case" },
  // 7️⃣ Attribution Question
  {
    type: "single",
    question: "How did you hear about us?",
    options: [
      { value: "healthcare", label: "Healthcare Provider" },
      { value: "fha", label: "FHA" },
      { value: "veterinarian", label: "Veterinarian" },
      { value: "friend", label: "Friend/Family" },
      { value: "landlord", label: "Landlord" },
      { value: "other", label: "Other" },
    ],
  },
  // 8️⃣ Pre-Qualified Screen
  { type: "prequal", title: "You are Pre-Qualified" },
  // 9️⃣ Package Selection
  { type: "package" },
  // 🔟 Speed Selection (Upsell)
  {
    type: "speed",
    question: "How fast do you want your ESA letter?",
  },
  // Checkout (last step)
  { type: "checkout", title: "Checkout" },
];

export const TOTAL_REGISTER_STEPS = REGISTER_STEPS.length;

export const STEP_PACKAGE = REGISTER_STEPS.findIndex((s) => s.type === "package") + 1;
export const STEP_SPEED = REGISTER_STEPS.findIndex((s) => s.type === "speed") + 1;
