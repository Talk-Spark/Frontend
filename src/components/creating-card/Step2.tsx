import { StepProps } from "./Step1";

const Step2 = ({ onNext }: StepProps) => {
  return (
    <div>
      <h2>step 2</h2>
      <button onClick={onNext}>다음으로</button>
    </div>
  );
};

export default Step2;
