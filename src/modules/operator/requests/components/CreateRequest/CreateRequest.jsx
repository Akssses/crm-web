"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Button, Input, Select, Textarea } from "@/ui";
import ProgressSteps from "./ProgressSteps";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import SearchResults from "./SearchResults";
import s from "../../styles/CreateRequest.module.scss";
import Step1 from "./Step1";

const STATUS_TAGS = [
  { id: "new", label: "Новая", color: "green" },
  { id: "in_progress", label: "В работе", color: "blue" },
  { id: "vip", label: "VIP", color: "yellow" },
];

import PreliminaryRoute from "./PreliminaryRoute";
import { MOCK_DATA, SELECTED_SERVICES } from "./mockData";

export default function CreateRequest() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showPreliminaryRoute, setShowPreliminaryRoute] = useState(false);
  const [selectedServices, setSelectedServices] = useState(SELECTED_SERVICES);
  const [selectedClient, setSelectedClient] = useState({
    name: "Иванов Петр Сергеевич",
    phone: "+7 (495) 123-45-67",
    email: "ivanov.petr@company.ru",
    organization: 'ООО "Транспортные решения"',
    inn: "ИНН: 7704567890",
    tags: ["VIP", "В работе", "Новая"],
  });
  const [selectedTags, setSelectedTags] = useState(["Новая"]);

  const handleTagToggle = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  };

  const handleNext = () => {
    if (currentStep === 2) {
      if (!showSearchResults) {
        setShowSearchResults(true);
      } else if (!showPreliminaryRoute) {
        setShowPreliminaryRoute(true);
      } else {
        setCurrentStep(currentStep + 1);
        // Reset flags for clean state if navigating back later? 
        // Or keep them to maintain state? 
        // Let's reset them when moving to step 3 to avoid confusion if going back.
        setShowSearchResults(false);
        setShowPreliminaryRoute(false);
      }
    } else if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      if (showPreliminaryRoute) {
        setShowPreliminaryRoute(false);
      } else if (showSearchResults) {
        setShowSearchResults(false);
      } else {
        setCurrentStep(currentStep - 1);
      }
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push("/operator/requests");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1 selectedClient={selectedClient} />;
      case 2:
        if (showPreliminaryRoute) {
          return (
            <PreliminaryRoute
              services={selectedServices}
              onBack={() => setShowPreliminaryRoute(false)}
            />
          );
        }
        if (showSearchResults) {
          return (
            <SearchResults
              onBack={() => setShowSearchResults(false)}
              selectedServices={selectedServices}
              onUpdateServices={setSelectedServices}
            />
          );
        }
        return <Step2 />;
      case 3:
        return <Step3 onBack={handleBack} onNext={handleNext} />;
      case 4:
        return <Step4 onBack={handleBack} onFinish={() => console.log("Finish")} />;
      default:
        return null;
    }
  };

  return (
    <div className={s.container}>
      {/* Step Progress */}
      <ProgressSteps currentStep={currentStep} />

      {renderStepContent()}

      {/* Navigation */}
      <div className={s.navigation}>
        <Button variant="outline" size="md" onClick={handleBack}>
          Назад
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={handleNext}
          className={s.nextButton}
        >
          Далее
        </Button>
      </div>
    </div>
  );
}
