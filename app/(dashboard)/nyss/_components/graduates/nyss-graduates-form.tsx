"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  NYSS_EMPLOYMENT_STATUS_VALUES,
  NYSS_GENDER_VALUES,
  type NyssGraduateFormValues,
} from "@/lib/validations/nyss-graduates";
import { NYSS_REGIONS } from "@/lib/validations/nyss-programs";
import { Controller, useFormContext } from "react-hook-form";

export function NyssGraduatesForm() {
  const { control } = useFormContext<NyssGraduateFormValues>();

  return (
    <div className="grid grid-cols-2 gap-4">
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="col-span-2" data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input {...field} id="name" />
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
          </Field>
        )}
      />
      <Controller
        name="age"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="age">Age</FieldLabel>
            <Input {...field} id="age" type="number" min={0} />
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
          </Field>
        )}
      />
      <Controller
        name="gender"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="gender">Gender</FieldLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                {NYSS_GENDER_VALUES.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
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
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
          </Field>
        )}
      />
      <Controller
        name="trainingProgram"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="col-span-2" data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="trainingProgram">Training Program</FieldLabel>
            <Input {...field} id="trainingProgram" />
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
          </Field>
        )}
      />
      <Controller
        name="graduationYear"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="graduationYear">Graduation Year</FieldLabel>
            <Input {...field} id="graduationYear" type="number" min={2000} />
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
          </Field>
        )}
      />
      <Controller
        name="employmentStatus"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="employmentStatus">Employment Status</FieldLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="employmentStatus">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {NYSS_EMPLOYMENT_STATUS_VALUES.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
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
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
          </Field>
        )}
      />
    </div>
  );
}

