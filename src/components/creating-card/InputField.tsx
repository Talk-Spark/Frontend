type InputFieldProps = {
  label?: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string | number;
  maxLength?: number;
};

const InputField = ({
  label,
  id,
  value,
  onChange,
  placeholder,
  type,
  maxLength,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-[0.4rem]">
      <label htmlFor={id} className="text-headline-5 text-gray-12">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`border-b-[1.5px] px-[1.2rem] py-[1rem] text-subhead-med focus:border-gray-10 focus:text-black focus:outline-none ${
          value ? "border-gray-10 text-black" : "border-gray-4 text-gray-5"
        }`}
      />
    </div>
  );
};

export default InputField;
