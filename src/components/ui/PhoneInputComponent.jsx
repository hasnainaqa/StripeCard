import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Controller } from "react-hook-form";

export default function PhoneInputComponent({ control, name, rules, error }) {
  const [phone, setPhone] = useState("");
  const [dialCode, setDialCode] = useState("92");

  return (
    <div className="w-full relative">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange } }) => (
          <div className="flex items-center gap-2 w-full" dir="ltr">
            {/* Country code */}
            <div className="rounded-[100px] bg-[#F1F4F1] h-14 flex items-center px-1 pr-2 text-[var(--primarytext)] font-normal w-[107px]">
              <PhoneInput
                value={"+" + dialCode}
                onChange={(value, data) => {
                  if (data) {
                    setDialCode(data.dialCode || "90");
                    const fullNumber = `+${data.dialCode}${phone}`;
                    onChange(fullNumber);
                  }
                }}
                disableCountryCode
                disableDropdown={false}
                inputStyle={{
                  width: 1,
                  height: 1,
                  opacity: 0,
                  padding: 0,
                  border: "none",
                }}
                buttonStyle={{
                  backgroundColor: "#F1F4F1",
                  border: "none",
                  borderRadius: "9999px",
                  padding: 0,
                  marginRight: "0px",
                }}
                containerStyle={{
                  backgroundColor: "transparent",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
                dropdownStyle={{
                  borderRadius: "12px",
                  maxHeight: "300px",
                  width: "320px",
                  zIndex: 9999,
                  fontSize: "15px",
                }}
              />
              <span className="text-base font-medium">+{dialCode}</span>
            </div>

            {/* Phone input */}
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                const fullNumber = `+${dialCode}${e.target.value}`;
                onChange(fullNumber);
              }}
              className="h-14 px-4 rounded-full bg-[#F1F4F1] text-[var(--primarytext)] focus:outline-none text-base font-normal w-full placeholder:text-[var(--secondarytext)]"
            />
          </div>
        )}
      />

      {error && (
        <p className="text-red-500 text-xs mt-1">
          {error.message || "Phone is required"}
        </p>
      )}
    </div>
  );
}
