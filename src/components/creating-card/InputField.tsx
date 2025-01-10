type InputFieldProps = {
  label?: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
  maxLength?: number;
  isDuplicate?: boolean | null;
  icon?: React.ReactNode;
};

const InputField = ({
  label,
  id,
  value,
  onChange,
  placeholder,
  type,
  maxLength,
  isDuplicate,
  icon,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-[0.4rem]">
      <label htmlFor={id} className="text-headline-5 text-gray-12">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`w-full rounded-none border-b-[1.5px] px-[1.2rem] py-[1rem] pr-[3.2rem] text-subhead-med focus:border-gray-10 focus:text-black focus:outline-none ${
            isDuplicate === true
              ? "border-main-pink focus:border-main-pink"
              : value
                ? "border-gray-10 text-black"
                : "border-gray-4 text-gray-5"
          }`}
        />
        {icon && (
          <div className="absolute right-[1rem] top-[50%] -translate-y-1/2">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
