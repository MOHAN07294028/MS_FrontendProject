"use client";

import { Controller } from "react-hook-form";
import { Select as AntdSelect } from "antd";

export default function Select({
    name,
    control,
    label,
    placeholder,
    options = [],
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
                        <AntdSelect
                            placeholder={placeholder}
                            options={options}
                            value={field.value}
                            onChange={(value) => field.onChange(value)}
                            onBlur={field.onBlur}
                            style={{ width: "100%" }}
                        />

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
