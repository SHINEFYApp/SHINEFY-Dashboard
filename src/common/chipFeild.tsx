import { X } from "lucide-react";
import { useState } from "react";

type ToInputProps = {
  values: any;
  setFieldValue: (field: string, value: any) => void;
  error?: string;
  touched?: boolean;
};

export const ToInput = ({
  values,
  setFieldValue,
  error,
  touched,
}: ToInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const addChip = () => {
    if (!inputValue.trim()) return;
    if (!inputValue.startsWith("@")) return;

    setFieldValue("to", [...values.to, inputValue.trim()]);
    setInputValue("");
  };

  const removeChip = (index: number) => {
    const updated = [...values.to];
    updated.splice(index, 1);
    setFieldValue("to", updated);
  };

  return (
    <div className="flex flex-col gap-1">
      <div
        className={`flex items-center gap-2 border-b py-2 ${
          error && touched ? "border-red-500" : "border-gray-100"
        }`}
      >
        <span className="text-sm text-gray-600">To</span>

        <div className="flex flex-wrap items-center gap-2 flex-1">
          {values.to.map((item: string, index: number) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
            >
              {item}
              <button
                type="button"
                onClick={() => removeChip(index)}
                className="hover:text-red-500"
              >
                <X size={12} />
              </button>
            </div>
          ))}

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                addChip();
              }
            }}
            placeholder="@username"
            className="flex-1 min-w-[120px] focus:outline-none text-sm"
          />
        </div>
      </div>

      {error && touched && (
        <span className="text-xs text-red-500">{error}</span>
      )}
    </div>
  );
};
