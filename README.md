

## 한국어 문서

한국어 문서는 [README.ko.md](./README.ko.md)를 참조하세요.

# React Step Flow

A lightweight, declarative step navigator library for React with full TypeScript support.<br>
Works with React, Next.js, and React Native

## Installation

```bash
npm install @hongpung/react-step-flow
```

## Quick Start

### Method 1: useStepFlow Hook (Recommended)

```tsx
import { useStepFlow } from '@hongpung/react-step-flow';

type StepProps = {
  login: { email: string };
  profile: { name: string };
  confirm: undefined;
};

const LoginStep = ({ goTo, stepProps }: StepProps<StepProps, 'login'>) => (
  <div>
    <h1>Login</h1>
    <p>Email: {stepProps?.email}</p>
    <button onClick={() => goTo('profile')}>Next</button>
  </div>
);

const ProfileStep = ({ goTo, stepProps }: StepProps<StepProps, 'profile'>) => (
  <div>
    <h1>Profile</h1>
    <p>Name: {stepProps?.name}</p>
    <button onClick={() => goTo('login')}>Back</button>
    <button onClick={() => goTo('confirm')}>Next</button>
  </div>
);

const ConfirmStep = ({ goTo }: StepProps<StepProps, 'confirm'>) => (
  <div>
    <h1>Confirm</h1>
    <button onClick={() => goTo('profile')}>Back</button>
    <button onClick={() => goTo('login')}>Back to Start</button>
  </div>
);

function App() {
  const { Flow, Step, currentStep, setCurrentStep } = useStepFlow<StepProps>({
    initialStep: 'login',
    onStepChange: (step) => console.log('Step changed to:', step)
  });

  return (
    <div>
      <p>Current step: {currentStep}</p>
      <button onClick={() => setCurrentStep('login')}>Go to Login</button>
      <Flow>
        <Step name="login" component={LoginStep} stepProps={{ email: 'user@example.com' }} />
        <Step name="profile" component={ProfileStep} stepProps={{ name: 'John Doe' }} />
        <Step name="confirm" component={ConfirmStep} />
      </Flow>
    </div>
  );
}
```

### Method 2: createStepFlow Factory

```tsx
import { createStepFlow } from '@hongpung/react-step-flow';

const ExampleSteps = createStepFlow<StepProps>();

function App() {
  const [currentStep, setCurrentStep] = useState<keyof StepProps>('login');

  return (
    <ExampleSteps.Container 
      currentStep={currentStep}
      onStepChange={setCurrentStep}
    >
      <ExampleSteps.Step name="login" component={LoginStep} stepProps={{ email: 'user@example.com' }} />
      <ExampleSteps.Step name="profile" component={ProfileStep} stepProps={{ name: 'John Doe' }} />
      <ExampleSteps.Step name="confirm" component={ConfirmStep} />
    </ExampleSteps.Container>
  );
}
```

## API

### useStepFlow
```tsx
const { Flow, Step, currentStep, setCurrentStep } = useStepFlow<StepProps>({
  initialStep: 'login',
  onStepChange?: (step) => void
});
```

### createStepFlow
```tsx
const { Container, Step } = createStepFlow<StepProps>();
```

### Step Component Props
```tsx
interface StepComponentProps<T, K extends keyof T> {
  goTo: (step: keyof T) => void;
  stepProps?: T[K];
}
```

## Browser Support

- React 16.8+ (Hooks support required)
- Modern browsers with ES2020 support
- React Native 0.60+

## License

MIT

---
