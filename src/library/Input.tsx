import { Controller, FieldError } from "react-hook-form";

type props = {
  name: string;
  control: any;
  rules: any;
  placeholder?: string;
  error?: FieldError | undefined;
};

const LibInput: React.FC<props> = ({
  name,
  control,
  rules,
  placeholder,
  error,
}) => {
  let classes =
    "w-full block border-slate-400 py-1 px-2 bg-white text-text text-md placeholder:text-slate-300 focus:ring-primary focus:ring-1 focus:ring-offset-2 focus:border-slate-400";

  if (error) {
    classes += " ring-1 ring-offset-2 ring-red";
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <input
          className={classes}
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
    />
  );
};

export default LibInput;
