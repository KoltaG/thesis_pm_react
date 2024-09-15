import { FieldProps } from "formik";

interface CustomInputProps extends FieldProps {
  label: string;
  type?: string;
  placeholder?: string;
}

const CustomInput = ({
  field,
  form: { touched, errors },
  label,
  type = "text",
  placeholder,
}: CustomInputProps) => {
  const error = touched[field.name] && errors[field.name];
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        className={`w-full p-3 border rounded-md ${
          error ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error.toString()}</p>}
    </div>
  );
};

export default CustomInput;
