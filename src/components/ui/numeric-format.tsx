"use client";

import {
  NumericFormat as NF,
  NumericFormatProps as NFP,
} from "react-number-format";
import { PatternFormat, PatternFormatProps } from 'react-number-format';

type NumericFormatProps = Omit<NFP, "thousandSeparator" | "decimalSeparator">;

export function NumericFormat(props: NumericFormatProps) {
  return <NF thousandSeparator="." decimalSeparator="," {...props} />;
}

export function IdentityCardNumberFormat(props: NumericFormatProps) {
  return <NumericFormat {...props} />;
}

export function PhoneFormat(props: Partial<PatternFormatProps>) {
  return (
    <PatternFormat
      format="### ###-####"
      mask="_"
      allowEmptyFormatting={false}
      {...props}
    />
  );
}