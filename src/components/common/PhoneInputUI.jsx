import { Input } from "@nextui-org/react";
import { Controller } from "react-hook-form";
import {
  cleanAndFormatPhoneNumber,
  convertPhoneFormat,
} from "@/utils/formatHelper";

const PhoneInputUI = ({
  name,
  label,
  placeholder,
  variant,
  color,
  size,
  startContent,
  endContent,
  className,
  radius,
  placement,
  control,
  required,
  isClearable,
  onClear,
  disabled,
  onChangeProps,
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required === false ? false : "This field is required",
          pattern: {
            value: /^\(\d{3}\)\s\d{3}-\d{4}$/,
            message: "Invalid phone number format (e.g., (123) 456-7890)",
          },
        }}
        render={({ field: { onChange, value }, formState: { errors } }) => {
          return (
            <Input
              label={label ?? ""}
              placeholder={placeholder ?? "(555) 555-5555"}
              labelPlacement={placement}
              size={size ?? "md"}
              variant={variant ?? "faded"}
              color={errors?.[name] ? "danger" : color ? color : "primary"}
              classNames={
                (`w-full ${className}`,
                {
                  input: [disabled && "cursor-not-allowed"],
                  label: [
                    placement &&
                      "font-bold dark:text-white text-secondaryLight",
                  ],
                })
              }
              disabled={disabled}
              radius={radius ?? "sm"}
              startContent={startContent ?? "+1"}
              endContent={endContent}
              isClearable={isClearable}
              value={value}
              onChange={(e) => {
                const inputValue = e.target.value;
                // Format the input value and update the field value
                const formattedValue = convertPhoneFormat(inputValue);
                onChange(formattedValue);
                onChangeProps &&
                  onChangeProps(cleanAndFormatPhoneNumber(inputValue));
              }}
              onClear={onClear}
              isInvalid={errors?.[name] ? true : false}
              errorMessage={errors?.[name] && errors[name]?.message}
            />
          );
        }}
      />
    </>
  );
};

export default PhoneInputUI;
