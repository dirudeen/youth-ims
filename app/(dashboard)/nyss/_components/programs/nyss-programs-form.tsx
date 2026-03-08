"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  NYSS_REGIONS,
  NYSS_YEARS,
  type NyssProgramInput,
} from "@/lib/validations/nyss-programs";
import { Controller, useFormContext } from "react-hook-form";

export function NyssProgramsForm() {
  const { control } = useFormContext<NyssProgramInput>();

  return (
    <div className="grid grid-cols-2 gap-4">
      <Controller
        name="programName"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="col-span-2" data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="programName">Program Name</FieldLabel>
            <Input {...field} id="programName" />
            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />
      <Controller
        name="institution"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="institution">Institution</FieldLabel>
            <Input {...field} id="institution" />
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
            <Input {...field} id="year" />
            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />
      <Controller
        name="region"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="region">Region</FieldLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="region">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {NYSS_REGIONS.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
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
        name="sector"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="sector">Sector</FieldLabel>
            <Input {...field} id="sector" />
            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />
      <Controller
        name="totalGraduates"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="totalGraduates">Total Graduates</FieldLabel>
            <Input {...field} id="totalGraduates" type="number" min={0} />
            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />
      <Controller
        name="maleGraduates"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="maleGraduates">Male Graduates</FieldLabel>
            <Input {...field} id="maleGraduates" type="number" min={0} />
            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />
      <Controller
        name="femaleGraduates"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="femaleGraduates">Female Graduates</FieldLabel>
            <Input {...field} id="femaleGraduates" type="number" min={0} />
            {fieldState.error && (
              <FieldError>{fieldState.error.message}</FieldError>
            )}
          </Field>
        )}
      />
      <Controller
        name="employmentRate"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="employmentRate">Employment Rate</FieldLabel>
            <Input
              {...field}
              id="employmentRate"
              type="number"
              min={0}
              max={100}
              step="0.1"
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
