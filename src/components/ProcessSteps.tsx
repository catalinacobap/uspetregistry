"use client";

import { ProcessStep } from "./ProcessStep";

const PROCESS_STEPS = [
  {
    icon: "/images/task-list.png",
    title: "Assessment",
    status: "completed",
    stepTitle: "Complete Assessment",
    description: "Answer a short online, secure questionnaire to evaluate your eligibility for an ESA letter."
  },
  {
    icon: "/images/therapist.png",
    title: "Therapist",
    status: "matched",
    stepTitle: "Match With A Therapist",
    description: "Get connected with a licensed mental health professional for review and approval."
  },
  {
    icon: "/images/document.png",
    title: "ESA Letter",
    status: "received",
    stepTitle: "Receive Your ESA Letter",
    description: "Get your official ESA letter delivered digitally, fast and securely."
  }
];

export function ProcessSteps() {
  return (
    <div className="flex flex-wrap justify-center items-stretch w-full max-w-7xl gap-6 sm:gap-8 mx-auto max-md:flex-col max-md:items-center max-md:gap-6 max-md:px-4 md:gap-6 md:px-4 lg:gap-8 lg:px-0">
      {PROCESS_STEPS.map((step, index) => (
        <ProcessStep
          key={step.title}
          icon={step.icon}
          title={step.title}
          status={step.status}
          stepTitle={step.stepTitle}
          description={step.description}
          delay={0.2 + index * 0.1}
        />
      ))}
    </div>
  );
}
