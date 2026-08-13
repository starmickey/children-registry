"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronDownIcon,
  Church,
  Home,
  NotebookIcon,
  Plus,
  User,
} from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  CreateChildInput,
  createChildSchema,
  defaultCreateChildContactValues,
  defaultCreateChildValues,
} from "../schemas/update-child-schema";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ClassroomDto, RelationshipTypeDto } from "../types";

export interface UpdateChildFormProps {
  defaultValues?: CreateChildInput;
  onSubmit: (data: CreateChildInput) => void;
  isSubmitting?: boolean;
  classrooms: ClassroomDto[];
  relationshipTypes: RelationshipTypeDto[];
}

export default function UpdateChildForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  classrooms,
  relationshipTypes,
}: UpdateChildFormProps) {
  const form = useForm({
    resolver: zodResolver(createChildSchema),
    defaultValues: {
      ...defaultCreateChildValues,
      ...defaultValues,
    },
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "contacts",
  });

  const classroomItems = classrooms.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  const relationshipTypeItems = relationshipTypes.map((r) => ({
    label: r.name,
    value: r.id,
  }));

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      {/* ---------------- GENERAL INFO CARD ---------------- */}
      <Card>
        <CardContent className="grid grid-cols-[1.25rem_1fr] gap-y-2 gap-x-3 items-center justify-center">
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <User className="h-5 mt-1.5 text-primary" />
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    value={field.value ?? ""}
                    placeholder="Nombre"
                    autoComplete="off"
                    className="pl-0 w-full"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              </>
            )}
          />

          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="col-start-2">
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  value={field.value ?? ""}
                  placeholder="Apellido"
                  autoComplete="off"
                  className="pl-0 w-full"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="alias"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="col-start-2">
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  value={field.value ?? ""}
                  placeholder="Alias"
                  className="pl-0 w-full"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="identityCardNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <NotebookIcon className="h-5 mt-1.5 text-primary" />
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    value={field.value ?? ""}
                    placeholder="D.N.I."
                    className="pl-0 w-full"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              </>
            )}
          />

          <Controller
            name="address"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <Home className="h-5 mt-1.5 text-primary" />
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    value={field.value ?? ""}
                    placeholder="Dirección"
                    autoComplete="off"
                    className="pl-0 w-full"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              </>
            )}
          />
        </CardContent>
      </Card>

      {/* ---------------- CLASSES / SEDE CARD ---------------- */}
      <Card>
        <CardContent className="grid grid-cols-[1.25rem_1fr] gap-y-2 gap-x-3 items-center justify-center">
          <Controller
            name="classId"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <Church className="text-primary" />
                <Field>
                  <Select
                    items={classroomItems}
                    name={field.name}
                    value={field.value ?? ""}
                    onValueChange={(fieldValue) => field.onChange(fieldValue)}
                  >
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Seleccionar sede" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {classroomItems.map((item, idx) => (
                          <SelectItem
                            key={idx}
                            value={item.value}
                            className="w-full"
                          >
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              </>
            )}
          />
        </CardContent>
      </Card>

      <Collapsible defaultOpen>
        <CollapsibleTrigger
          render={
            <Button variant="ghost" className="w-full p-4 ">
              <span className="font-heading text-base font-medium text-primary">
                Contactos
              </span>
              <ChevronDownIcon className="ml-auto group-data-panel-open/button:rotate-180" />
            </Button>
          }
        />
        <CollapsibleContent>
          {fields.map((field, idx) => (
            <div
              key={`contacts-${idx}-relationShip-controller`}
              className="grid grid-cols-[1.25rem_1fr] gap-y-0 gap-x-3 items-center justify-center"
            >
              <Controller
                name={`contacts.${idx}.relationShip`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="col-start-2 mt-2"
                  >
                    <Select
                      items={relationshipTypeItems}
                      value={field.value ?? ""}
                      onValueChange={(fieldValue) => field.onChange(fieldValue)}
                    >
                      <SelectTrigger
                        className="flex justify-start aria-[invalid=false]:border-0 text-xs text-primary p-0 h-4 data-[size=default]:h-4 [&_svg]:text-primary **:data-[slot=select-value]:flex-none"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue
                          placeholder="Relación"
                          className="text-primary font-bold"
                        />
                      </SelectTrigger>
                      <SelectContent className="py-0">
                        <SelectGroup>
                          {relationshipTypeItems.map((relationship, i) => (
                            <SelectItem
                              key={i}
                              className="py-0"
                              value={relationship.value}
                            >
                              {relationship.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                key={`contacts-${idx}-firstName`}
                name={`contacts.${idx}.firstName`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <User className="h-5 text-primary mt-1.5" />
                    <Field data-invalid={fieldState.invalid}>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Nombre"
                        className="pl-0 w-full"
                        value={field.value ?? ""}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  </>
                )}
              />
              <Controller
                key={`contacts-${idx}-lastName`}
                name={`contacts.${idx}.lastName`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="col-start-2"
                  >
                    <Input
                      {...field}
                      id={field.name}
                      value={field.value ?? ""}
                      aria-invalid={fieldState.invalid}
                      placeholder="Apellido"
                      className="pl-0 w-full"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                key={`contacts-${idx}-identityCardNumber`}
                name={`contacts.${idx}.identityCardNumber`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <Field
                      data-invalid={fieldState.invalid}
                      className="col-start-2"
                    >
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        value={field.value ?? ""}
                        placeholder="D.N.I."
                        className="pl-0 w-full"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  </>
                )}
              />
              {fields[idx].phones?.map((phone, i) => (
                <Controller
                  key={`contacts-${idx}-phones-${i}-number`}
                  name={`contacts.${idx}.phones.${i}.number`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <>
                      <Plus className="h-5 text-primary" />
                      <Field data-invalid={fieldState.invalid}>
                        <Input
                          {...field}
                          id={field.name}
                          value={field.value ?? ""}
                          aria-invalid={fieldState.invalid}
                          placeholder="Añadir teléfono"
                          className="pl-0 w-full"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    </>
                  )}
                />
              ))}
              <Separator className="mt-7 mb-2 col-span-2" />
            </div>
          ))}

          <Button type="button" variant="ghost" size="icon">
            <Plus className="h-5 text-primary" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="justify-start"
            onClick={() => append(defaultCreateChildContactValues)}
          >
            Añadir contacto
          </Button>
        </CollapsibleContent>
      </Collapsible>

      {/* ---------------- CONTACT INFO CARD ---------------- */}

      <Button type="submit" size="lg" className="mt-6" disabled={isSubmitting}>
        Guardar
      </Button>
    </form>
  );
}
