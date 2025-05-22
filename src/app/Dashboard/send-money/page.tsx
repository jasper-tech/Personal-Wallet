"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { RecipientInfo, Errors } from "../../Types/sendMoney";
import { StepIndicator } from "../../components/SendMoney/StepIndicator";
import { TransferMethodStep } from "../../components/SendMoney/TransferMethodStep";
import { RecipientInfoStep } from "../../components/SendMoney/RecipientInfoStep";
import { AmountStep } from "../../components/SendMoney/AmountStep";
import { ReviewStep } from "../../components/SendMoney/ReviewStep";
import { SuccessScreen } from "../../components/SendMoney/SuccessScreen";
import { NavigationButtons } from "../../components/SendMoney/NavigationButtons";

const SendMoneyPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [transferMethod, setTransferMethod] = useState("");
  const [recipientInfo, setRecipientInfo] = useState<RecipientInfo>({
    name: "",
    email: "",
    phone: "",
    accountNumber: "",
    routingNumber: "",
    bankName: "",
  });
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const [errors, setErrors] = useState<Errors>({});
  const [stepComplete, setStepComplete] = useState({
    1: false,
    2: false,
    3: false,
  });

  const validateRecipientInfo = useCallback(() => {
    const newErrors: Errors = {};

    if (transferMethod === "phone" && recipientInfo.phone.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits";
    } else if (transferMethod === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(recipientInfo.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    } else if (transferMethod === "bank") {
      if (
        !recipientInfo.accountNumber ||
        !recipientInfo.routingNumber ||
        !recipientInfo.bankName
      ) {
        newErrors.bankDetails = "All bank details are required";
      }
    }

    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
  }, [transferMethod, recipientInfo]);

  useEffect(() => {
    const { isValid, errors: validationErrors } = validateRecipientInfo();

    setErrors(validationErrors);

    setStepComplete({
      1: !!transferMethod,
      2: isValid,
      3: amount !== "" && parseFloat(amount) > 0,
    });
  }, [transferMethod, recipientInfo, amount, validateRecipientInfo]);

  const handleRecipientChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setRecipientInfo({
      ...recipientInfo,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 2000);
  };

  const goToNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push("/");
    }
  };

  const isStepComplete = (step: number): boolean => {
    return stepComplete[step as keyof typeof stepComplete] || false;
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <TransferMethodStep
            transferMethod={transferMethod}
            setTransferMethod={setTransferMethod}
          />
        );
      case 2:
        return (
          <RecipientInfoStep
            recipientInfo={recipientInfo}
            transferMethod={transferMethod}
            handleRecipientChange={handleRecipientChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <AmountStep
            amount={amount}
            setAmount={setAmount}
            note={note}
            setNote={setNote}
          />
        );
      case 4:
        return (
          <ReviewStep
            transferMethod={transferMethod}
            recipientInfo={recipientInfo}
            amount={amount}
            note={note}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={goToPreviousStep}
            className="mr-4 p-2 rounded-full hover:bg-[var(--muted)] transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-[var(--muted-foreground)]" />
          </button>
        </div>

        {/* Progress indicator */}
        {!isComplete && <StepIndicator currentStep={currentStep} />}

        {/* Step content */}
        <div className="mt-4">
          {isComplete ? (
            <SuccessScreen
              amount={amount}
              recipientInfo={recipientInfo}
              transferMethod={transferMethod}
              onReturnToDashboard={() => router.push("/")}
            />
          ) : (
            <>
              {renderCurrentStep()}

              <NavigationButtons
                currentStep={currentStep}
                isStepComplete={isStepComplete}
                goToPreviousStep={goToPreviousStep}
                goToNextStep={goToNextStep}
                handleSubmit={handleSubmit}
                isProcessing={isProcessing}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendMoneyPage;
