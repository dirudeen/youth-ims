"use client";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { SportsFinancingFormValues } from "@/lib/validations/sports-financing";
import { Controller, useFormContext } from "react-hook-form";

export function SportsFinancingForm() {
  const { control } = useFormContext<SportsFinancingFormValues>();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Controller
        name="associationName"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="associationName">
              Association/Federation Name
            </FieldLabel>
            <Input
              {...field}
              id="associationName"
              onChange={(e) => field.onChange(e.target.value)}
              placeholder="Gambia Football Federation"
            />
            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />

      <Controller
        name="amount"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="amount">Amount (Dalasi)</FieldLabel>
            <Input
              {...field}
              id="amount"
              onChange={(e) => field.onChange(e.target.value)}
              placeholder="00.00"
              type="number"
              step={0.1}
            />
            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />

      <Controller
        name="year"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="year">Year</FieldLabel>
            <Input
              {...field}
              id="year"
              aria-invalid={fieldState.invalid}
              placeholder="2025"
              type="number"
            />
            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />
      <Controller
        name="period"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="period">Period</FieldLabel>
            <Input
              {...field}
              id="period"
              placeholder="January to October"
              onChange={(e) => field.onChange(e.target.value)}
            />
            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />
    </div>
  );
}
