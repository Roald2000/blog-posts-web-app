import React from "react";

const InputField = ({
  autoFocus = false,
  required = false,
  placeholder,
  className,
  inputType = "text",
  inputTextName,
  inputTextNameClass,
  containerClass = "",
  textArea = false,
  onChange,
  autoComplete,
  onKeyDown = (e) => {},
  id,
}) => {
  return (
    <label
      className={containerClass ?? "flex flex-col gap-2 my-1 w-full"}
      htmlFor={id}
    >
      <span
        className={inputTextNameClass ?? "uppercase tracking-wider text-xs"}
      >
        {inputTextName}
      </span>

      {!textArea && (
        <input
          autoComplete={autoComplete}
          onChange={onChange}
          onKeyDown={onKeyDown}
          autoFocus={autoFocus}
          required={required}
          placeholder={placeholder}
          className={className ?? "input input-bordered w-full"}
          type={inputType}
          id={id}
        />
      )}
      {textArea && (
        <textarea
          autoComplete={autoComplete}
          onChange={onChange}
          onKeyDown={onKeyDown}
          autoFocus={autoFocus}
          required={required}
          placeholder={placeholder}
          className={className ?? "textarea textarea-bordered"}
          type={inputType}
          id={id}
        ></textarea>
      )}
    </label>
  );
};

export default InputField;
