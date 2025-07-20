import { isValidElement } from "react";
import { StepPropsListBase, StepConfigComponent, StepName } from "./types";

export function isStepFlowElement<
  T extends StepPropsListBase,
  K extends StepName<T>
>(
  child: unknown,
  Step: (props: StepConfigComponent<T, K>) => null
): child is React.ReactElement<StepConfigComponent<T, K>> {
  return (
    isValidElement(child) &&
    child.type === Step &&
    typeof (child.props as StepConfigComponent<T, K>).name === "string"
  );
}
