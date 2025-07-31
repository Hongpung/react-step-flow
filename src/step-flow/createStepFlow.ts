import React, { useMemo, Children, useCallback } from "react";

import type {
  StepPropsListBase,
  StepConfigComponent,
  StepName,
  GoToFunction,
  StepContainerProps,
  StepComponentType,
} from "./types";

import { isStepFlowElement } from "./isStepElement";

export function createStepFlow<StepPropsList extends StepPropsListBase>() {
  type Name = StepName<StepPropsList>;
  
  // Step은 단순히 구조 파악용 더미 컴포넌트
  const Step = <K extends Name>(
    _: StepConfigComponent<StepPropsList, K>
  ) => {
    return null;
  };

  const Container = ({
    children,
    currentStep,
    onStepChange,
  }: StepContainerProps<StepPropsList>) => {
    // children에서 첫번째 Step의 name 추출 (Step type만)
    const firstStepName = useMemo<Name>(() => {
      let found: Name | undefined;
      Children.forEach(children, (child) => {
        if (isStepFlowElement<StepPropsList, Name>(child, Step) && !found) {
          found = child.props.name;
        }
      });
      if (!found) {
        throw new Error("No step found");
      }
      return found;
    }, [children]);

    const goTo: GoToFunction<StepPropsList> = useCallback(
      (name) => {
        onStepChange?.(name);
      },
      [onStepChange]
    );

    // 모든 Step을 name:component로 매핑
    const screenMap = useMemo(() => {
      const map = {} as Record<
        Name,
        {
          component: StepComponentType<StepPropsList, Name>;
          stepProps?: StepPropsList[Name];
        }
      >;
      Children.forEach(children, (child) => {
        if (isStepFlowElement<StepPropsList, Name>(child, Step)) {
          const { name, component, stepProps } = child.props;
          map[name] = { component, stepProps };
        }
      });
      return map;
    }, [children]);    
    // 화면에 보여줄 컴포넌트 element 만들기
    const CurrentElement = useMemo(() => {
      const entry = screenMap[currentStep];
      if (!entry) return null;
      const { component, stepProps } = entry;
      if (typeof component !== "function" && typeof component !== "object") {
        console.error("Invalid component:", component);
        return null;
      }
      return React.createElement(component, { goTo, stepProps: stepProps as StepPropsList[Name] });
    }, [currentStep, screenMap, goTo]);

    return CurrentElement;
  };

  return {
    Container,
    Step,
  };
}
