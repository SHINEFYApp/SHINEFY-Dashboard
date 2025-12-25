import type { FC } from "react";
import { useField } from "formik";
import { cn } from "../utils/utils";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useState } from "react";
import type { FormDataListProps } from "../types/common";



export const FormDataList: FC<FormDataListProps> = ({
  name,
  label,
  placeholder,
  options,
  disabled = false,
  className,
  icon,
  checkmark = true,
}) => {
  const [field, meta, helpers] = useField(name);
  const [open, setOpen] = useState(false);

    const filteredOptions = options.filter((item) =>
        item.toLowerCase().includes(String(field.value || "").toLowerCase())
    );


  const hasError = meta.touched && meta.error;
  const isValid = meta.touched && !meta.error && field.value;

  return (
    <div className={cn("relative space-y-2", className)}>
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative mt-2">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <input
          {...field}
          id={name}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          className={cn(
            "w-full rounded-xl border bg-gray-50 px-4 py-3.5 text-sm font-medium transition-all duration-200",
            icon && "pl-12",
            isValid && checkmark && "pr-12",
            hasError
              ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
              : isValid && checkmark
              ? "border-green-500 bg-green-50 focus:border-green-500 focus:ring-2 focus:ring-green-200"
              : "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20",
            disabled && "cursor-not-allowed opacity-60"
          )}
        />

        {isValid && checkmark && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <IoCheckmarkCircle className="w-5 h-5 text-green-500" />
          </div>
        )}

        {/* Custom Dropdown */}
        {open && filteredOptions.length > 0 && (
          <ul className="absolute z-50 mt-1 w-full max-h-60 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
            {filteredOptions.map((option) => (
              <li
                key={option}
                onMouseDown={() => helpers.setValue(option)}
                className="cursor-pointer px-4 py-2 text-sm hover:bg-primary/10 transition-colors"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>

      {hasError && (
        <p className="text-xs text-red-500 pl-1">{meta.error}</p>
      )}
    </div>
  );
};
