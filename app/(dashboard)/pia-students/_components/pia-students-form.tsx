"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  PIA_DEPARTMENTS,
  type PiaStudentsFormValues,
} from "@/lib/validations/pia-students";
import { Controller, useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PiaStudentsForm() {
  const { control } = useFormContext<PiaStudentsFormValues>();

  return (
    <div className="grid grid-cols-2 gap-4">
      <Controller
        name="department"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="department">Department</FieldLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="department">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {PIA_DEPARTMENTS.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <FieldLabel htmlFor="year">Academic Year</FieldLabel>
            <Input
              {...field}
              id="year"
              onChange={(e) => field.onChange(e.target.value)}
              placeholder="2025-2026"
            />
            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />

      <FieldGroup>
        <Controller
          name="male"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="male">Male</FieldLabel>
              <Input
                {...field}
                id="male"
                type="number"
                onChange={(e) => field.onChange(e.target.value)}
                placeholder="0"
              />
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />
        <Controller
          name="female"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="female">Female</FieldLabel>
              <Input
                {...field}
                id="female"
                type="number"
                onChange={(e) => field.onChange(e.target.value)}
                placeholder="0"
              />
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup>
        <Controller
          name="enrolled"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="enrolled">Enrolled</FieldLabel>
              <Input
                {...field}
                id="enrolled"
                type="number"
                onChange={(e) => field.onChange(e.target.value)}
                placeholder="0"
              />
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />
        <Controller
          name="graduated"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="graduated">Graduated</FieldLabel>
              <Input
                {...field}
                id="graduated"
                type="number"
                onChange={(e) => field.onChange(e.target.value)}
                placeholder="0"
              />
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />
      </FieldGroup>
    </div>
  );
}
