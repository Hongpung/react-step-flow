import React, { useMemo, useState } from "react";
import { createStepFlow } from "./createStepFlow";
import type { StepPropsListBase, StepName } from "./types";

export function useStepFlow<StepPropsList extends StepPropsListBase>({
  initialStep,
  onStepChange,
}:{
  initialStep: StepName<StepPropsList>,
  onStepChange?: (step: StepName<StepPropsList>) => void,
}) {
  const [currentStep, setCurrentStep] = useState<StepName<StepPropsList>>(initialStep);
  
  const { Container, Step } = useMemo(() => {
    return createStepFlow<StepPropsList>();
  }, []);

  const stepFlowInstance = useMemo(() => {
    return {
      Flow: ({ children }: { children: React.ReactNode }) => (
        <Container
          children={children}
          currentStep={currentStep}
          onStepChange={(newStep) => {
            setCurrentStep(newStep);
            onStepChange?.(newStep);
          }}
        />
      ),
      Step,
      currentStep,
      setCurrentStep,
    };
  }, [currentStep, onStepChange]);

  return stepFlowInstance;
}
