"use client";

import { Controller } from "react-hook-form";
import { Input as AntdInput } from "antd";

export default function Password({
  name,
  control,
  label,
  placeholder,
  rules = {},
  required = false
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label>{label}{required ? '*' : ''}</label>

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <AntdInput.Password {...field} placeholder={placeholder} />
            {fieldState.error && (
              <p style={{ color: "red" }}>
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
}
