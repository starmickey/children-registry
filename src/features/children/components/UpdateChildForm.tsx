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
  Cake,
  Home,
  NotebookIcon,
  Plus,
  User,
  Minus,
  Phone,
} from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  CreateChildInput,
  createChildSchema,
  defaultCreateChildContactValues,
  defaultCreateChildValues,
  EditChildInput,
  editChildSchema,
} from "../schemas/update-child-schema";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ClassroomDto, RelationshipTypeDto } from "../types";
import { useEffect, useTransition } from "react";

export interface CreateChildFormProps {
  defaultValues?: CreateChildInput;
  onSubmit: (data: CreateChildInput) => Promise<void>;
  classrooms: ClassroomDto[];
  relationshipTypes: RelationshipTypeDto[];
}

export interface EditChildFormProps {
  defaultValues: EditChildInput;
  onSubmit: (data: EditChildInput) => Promise<void>;
  classrooms: ClassroomDto[];
  relationshipTypes: RelationshipTypeDto[];
}

export type UpdateChildFormProps =
  | ({ mode: "create" } & CreateChildFormProps)
  | ({ mode: "edit" } & EditChildFormProps);

export default function UpdateChildForm({
  mode,
  defaultValues,
  onSubmit,
  classrooms,
  relationshipTypes,
}: UpdateChildFormProps) {
  const [isPending, startTransition] = useTransition();

  const schema = mode === "edit" ? editChildSchema : createChildSchema;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      ...defaultCreateChildValues,
      ...defaultValues,
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "contacts",
  });

  useEffect(() => {
    if (form.formState.errors) {
      console.log(form.formState.errors);
    }
  }, [form.formState.errors]);

  const classroomItems = classrooms.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  const relationshipTypeItems = relationshipTypes.map((r) => ({
    label: r.name,
    value: r.id,
  }));

  function handleSubmit(data: CreateChildInput | EditChildInput) {
    startTransition(async () => {
      if (mode === "edit") {
        await onSubmit(data as EditChildInput);
        return;
      }

      await onSubmit(data as CreateChildInput);
    });
  }

  function formatDateInput(value?: Date | null) {
    if (!value) return "";

    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="flex flex-col gap-6 section-sm"
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
                <Field
                  data-invalid={fieldState.invalid}
                  aria-disabled={isPending}
                >
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    value={field.value ?? ""}
                    placeholder="Nombre"
                    autoComplete="off"
                    className="pl-0 w-full"
                    disabled={isPending}
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
              <Field
                data-invalid={fieldState.invalid}
                className="col-start-2"
                aria-disabled={isPending}
              >
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  value={field.value ?? ""}
                  placeholder="Apellido"
                  autoComplete="off"
                  className="pl-0 w-full"
                  disabled={isPending}
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
              <Field
                data-invalid={fieldState.invalid}
                className="col-start-2"
                aria-disabled={isPending}
              >
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  value={field.value ?? ""}
                  placeholder="Alias"
                  className="pl-0 w-full"
                  disabled={isPending}
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
                <Field
                  data-invalid={fieldState.invalid}
                  aria-disabled={isPending}
                >
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    value={field.value ?? ""}
                    placeholder="D.N.I."
                    className="pl-0 w-full"
                    disabled={isPending}
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
                <Field
                  data-invalid={fieldState.invalid}
                  aria-disabled={isPending}
                >
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    value={field.value ?? ""}
                    placeholder="Dirección"
                    autoComplete="off"
                    className="pl-0 w-full"
                    disabled={isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              </>
            )}
          />

          <Controller
            name="birthDate"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <Cake className="h-5 mt-1.5 text-primary" />
                <Field
                  data-invalid={fieldState.invalid}
                  aria-disabled={isPending}
                >
                  <Input
                    type="date"
                    name={field.name}
                    ref={field.ref}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    value={formatDateInput(field.value)}
                    onBlur={field.onBlur}
                    onChange={(event) =>
                      field.onChange(
                        event.target.value
                          ? new Date(`${event.target.value}T00:00:00`)
                          : undefined,
                      )
                    }
                    className="pl-0 w-full"
                    disabled={isPending}
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
                <Field aria-disabled={isPending}>
                  <Select
                    items={classroomItems}
                    name={field.name}
                    value={field.value ?? ""}
                    onValueChange={(fieldValue) => field.onChange(fieldValue)}
                    disabled={isPending}
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
          {fields.map((_field, idx) => (
            <div
              key={`contacts-${idx}-relationShip-controller`}
              className="grid grid-cols-[1.25rem_1fr_1.25rem] gap-y-0 gap-x-3 items-center justify-center"
            >
              <Controller
                name={`contacts.${idx}.relationShip`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="col-start-2 mt-2"
                    aria-disabled={isPending}
                  >
                    <Select
                      items={relationshipTypeItems}
                      value={field.value ?? ""}
                      onValueChange={(fieldValue) => field.onChange(fieldValue)}
                      disabled={isPending}
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
                    <User className="h-5 text-primary mt-1.5 col-start-1" />
                    <Field
                      data-invalid={fieldState.invalid}
                      aria-disabled={isPending}
                    >
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Nombre"
                        className="pl-0 w-full"
                        value={field.value ?? ""}
                        disabled={isPending}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                    <Button
                      type="button"
                      aria-label="Eliminar contacto"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(idx)}
                      disabled={isPending}
                    >
                      <Minus className="text-primary" />
                    </Button>
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
                    aria-disabled={isPending}
                  >
                    <Input
                      {...field}
                      id={field.name}
                      value={field.value ?? ""}
                      aria-invalid={fieldState.invalid}
                      placeholder="Apellido"
                      className="pl-0 w-full"
                      disabled={isPending}
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
                      aria-disabled={isPending}
                    >
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        value={field.value ?? ""}
                        placeholder="D.N.I."
                        className="pl-0 w-full"
                        disabled={isPending}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  </>
                )}
              />
              {fields[idx].phones?.map((_phone, i) => (
                <Controller
                  key={`contacts-${idx}-phones-${i}-number`}
                  name={`contacts.${idx}.phones.${i}.number`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <>
                      {i === (fields[idx].phones?.length ?? 0) - 1 ? (
                        <Plus className="h-5 text-primary col-start-1" />
                      ) : (
                        <Phone className="h-5 text-primary col-start-1" />
                      )}
                      <Field
                        data-invalid={fieldState.invalid}
                        aria-disabled={isPending}
                      >
                        <Input
                          {...field}
                          id={field.name}
                          value={field.value ?? ""}
                          aria-invalid={fieldState.invalid}
                          placeholder="Añadir teléfono"
                          className="pl-0 w-full"
                          disabled={isPending}
                          onChange={(e) => {
                            field.onChange(e);

                            const liveContact = form.getValues(
                              `contacts.${idx}`,
                            );
                            const currentPhones = liveContact?.phones ?? [];

                            if (
                              i === currentPhones.length - 1 &&
                              e.target.value.trim() !== ""
                            ) {
                              update(idx, {
                                ...liveContact,
                                phones: [...currentPhones, { number: "" }],
                              });
                            }
                          }}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>

                      {i !== (fields[idx].phones?.length ?? 0) - 1 && (
                        <Button
                          type="button"
                          aria-label="Eliminar teléfono"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const liveContact = form.getValues(
                              `contacts.${idx}`,
                            );
                            update(idx, {
                              ...liveContact,
                              phones: liveContact?.phones?.filter(
                                (_, j) => j !== i,
                              ),
                            });
                          }}
                          disabled={isPending}
                        >
                          <Minus className="text-primary" />
                        </Button>
                      )}
                    </>
                  )}
                />
              ))}
              <Separator className="mt-7 mb-2 col-span-2" />
            </div>
          ))}

          <Button
            type="button"
            variant="ghost"
            className="grid grid-cols-[1.25rem_1fr] gap-y-0 gap-x-3 p-0 text-base"
            size="lg"
            onClick={() => append(defaultCreateChildContactValues)}
            disabled={isPending}
          >
            <Plus className="h-5! w-5! text-primary col-start-1" />
            Añadir contacto
          </Button>
        </CollapsibleContent>
      </Collapsible>

      {/* ---------------- CONTACT INFO CARD ---------------- */}

      <Button
        type="submit"
        size="lg"
        className={`mt-6 ${isPending ? "animate-pulse" : ""}`}
        disabled={isPending}
      >
        {isPending ? "Guardando..." : "Guardar"}
      </Button>
    </form>
  );
}
