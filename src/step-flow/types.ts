export type StepPropsListBase = Record<string, Record<string, any> | undefined>;

export type StepName<T extends StepPropsListBase> = keyof T & string;

export type GoToFunction<T extends StepPropsListBase> = <K extends StepName<T>>(
  name: K
) => void;

export type StepProps<
  StepPropsList extends StepPropsListBase,
  StepName extends keyof StepPropsList
> = {
  goTo: GoToFunction<StepPropsList>;
  stepProps?: StepPropsList[StepName];
};

export type StepComponentType<
  StepPropsList extends StepPropsListBase,
  StepName extends keyof StepPropsList
> = React.ComponentType<StepProps<StepPropsList, StepName>>;

export type StepConfigComponent<
  StepPropsList extends StepPropsListBase,
  StepName extends keyof StepPropsList
> = {
  name: StepName;
  component: StepComponentType<StepPropsList, StepName>;
} & (
  undefined extends StepPropsList[StepName]
    ? { stepProps?: StepPropsList[StepName] }
    : { stepProps: StepPropsList[StepName] }
);

export interface StepContainerProps<T extends StepPropsListBase> {
  children: React.ReactNode;
  currentStep: StepName<T>;
  onStepChange?: (step: StepName<T>) => void;
}