"use client";
import React, { useState } from "react";
import s from "../styles/AddOrgModal.module.scss";
import { Modal } from "@/ui";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";

export default function AddOrgModal({ isOpen, onClose, onSubmit }) {
  const [step, setStep] = useState(1);
  const [inn, setInn] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    shortName: "",
    email: "",
    phone: "",
    currency: "",
    country: "",
    accountHolder: "",
    bankName: "",
    inn: "",
    kpp: "",
    ogrn: "",
    okpo: "",
    legalAddress: "",
    actualAddress: "",
    accountNumber: "",
    corrAccountNumber: "",
    bik: "",
    correspondent: "",
    description: "",
  });

  const handleCheckInn = () => {
    setLoading(true);
    setTimeout(() => {
      if (inn.length === 0) {
        setError("Введите ИНН");
        setStep(2);
      } else if (inn === "1") {
        setError("Организация с таким ИНН не найдена. Введите данные вручную.");
        setStep(2);
      } else {
        setError("");
        setStep(3);
      }
      setLoading(false);
    }, 1000);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit({ ...formData, inn });
    resetModal();
    onClose();
  };

  const handleManualEntry = () => {
    setError("");
    setStep(3);
  };

  const handleBack = () => {
    setStep(1);
    setError("");
  };

  const resetModal = () => {
    setStep(1);
    setInn("");
    setError("");
    setFormData({
      fullName: "",
      shortName: "",
      email: "",
      phone: "",
      currency: "",
      country: "",
      accountHolder: "",
      bankName: "",
      inn: "",
      kpp: "",
      ogrn: "",
      okpo: "",
      legalAddress: "",
      actualAddress: "",
      accountNumber: "",
      corrAccountNumber: "",
      bik: "",
      correspondent: "",
      description: "",
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        resetModal();
        onClose();
      }}
      title="Новая организация"
      position="right"
      width="40%"
      size="lg"
    >
      <div className={s.modalContent}>
        {step === 1 && (
          <Step1
            inn={inn}
            setInn={setInn}
            onNext={handleCheckInn}
            onClose={onClose}
            loading={loading}
          />
        )}

        {step === 2 && (
          <Step2
            error={error}
            onManualEntry={handleManualEntry}
            onBack={handleBack}
          />
        )}

        {step === 3 && (
          <Step3
            formData={formData}
            inn={inn}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onClose={onClose}
          />
        )}
      </div>
    </Modal>
  );
}
