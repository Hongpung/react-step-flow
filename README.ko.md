# React Step Flow

TypeScript 지원을 제공하는 가벼운 선언적 React 스텝 네비게이터 라이브러리입니다.<br>
React를 사용하는 React, Next.js, and React Native 환경에서 사용할 수 있습니다.
## 설치

```bash
npm install @hongpung/react-step-flow
```

## 빠른 시작

### 방법 1: useStepFlow 훅 (권장)

```tsx
import { useStepFlow } from '@hongpung/react-step-flow';

type StepProps = {
  login: { email: string };
  profile: { name: string };
  confirm: undefined;
};

const LoginStep = ({ goTo, stepProps }: StepProps<StepProps, 'login'>) => (
  <div>
    <h1>로그인</h1>
    <p>이메일: {stepProps?.email}</p>
    <button onClick={() => goTo('profile')}>다음</button>
  </div>
);

const ProfileStep = ({ goTo, stepProps }: StepProps<StepProps, 'profile'>) => (
  <div>
    <h1>프로필</h1>
    <p>이름: {stepProps?.name}</p>
    <button onClick={() => goTo('login')}>뒤로</button>
    <button onClick={() => goTo('confirm')}>다음</button>
  </div>
);

const ConfirmStep = ({ goTo }: StepProps<StepProps, 'confirm'>) => (
  <div>
    <h1>확인</h1>
    <button onClick={() => goTo('profile')}>뒤로</button>
    <button onClick={() => goTo('login')}>처음으로</button>
  </div>
);

function App() {
  const { Flow, Step, currentStep, setCurrentStep } = useStepFlow<StepProps>({
    initialStep: 'login',
    onStepChange: (step) => console.log('스텝 변경:', step)
  });

  return (
    <div>
      <p>현재 스텝: {currentStep}</p>
      <button onClick={() => setCurrentStep('login')}>로그인으로</button>
      <Flow>
        <Step name="login" component={LoginStep} stepProps={{ email: 'user@example.com' }} />
        <Step name="profile" component={ProfileStep} stepProps={{ name: '홍길동' }} />
        <Step name="confirm" component={ConfirmStep} />
      </Flow>
    </div>
  );
}
```

### 방법 2: createStepFlow 팩토리(직접 step 상태를 주입)

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
      <ExampleSteps.Step name="profile" component={ProfileStep} stepProps={{ name: '홍길동' }} />
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

### Step 컴포넌트 Props
```tsx
interface StepComponentProps<T, K extends keyof T> {
  goTo: (step: keyof T) => void;
  stepProps?: T[K];
}
```

## 브라우저 지원

- React 16.8+ (훅 지원 필요)
- ES2020을 지원하는 모던 브라우저
- React Native 0.60+

## 라이선스

MIT 
