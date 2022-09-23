import { Form, FormProps } from "app/core/components/Form";
import { LabeledTextField } from "app/core/components/LabeledTextField";
import { z } from "zod";
export { FORM_ERROR } from "app/core/components/Form";
import { useRouter } from "next/router";
import { usePaginatedQuery } from "@blitzjs/rpc";
import getBands from "app/bands/queries/getBands";
import { useFormContext } from "react-hook-form";

const ITEMS_PER_PAGE = 100

function CheckBox({ label, name, value }) {
  const { register, formState: { isSubmitting } } = useFormContext()
  return (
    <label className="block mb-2">
      <input type="checkbox" disabled={isSubmitting} value={value} {...register(name)} />
      {label}
    </label>
  )
}

function DateInput({ name, label }) {
  const { register, formState: { isSubmitting } } = useFormContext()

  return (
    <>
      <label>{label}</label>
      <input type="date" disabled={isSubmitting} {...register(name)} />
    </>

  )
}

export function ConcertForm<S extends z.ZodType<any, any>>(
  props: FormProps<S>
) {

  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ bands, hasMore }] = usePaginatedQuery(getBands, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  return (
    <Form<S> {...props}>
      <DateInput name="date" label="Datum" />
      <LabeledTextField name="description" label="Beschreibung" placeholder="Beschreibung" />
      <fieldset>
        <legend>Bands</legend>
        <div className="border p-4 max-w-sm max-h-64 overflow-auto">
          {bands.filter(band => band.name).map((band, index) => (
            <CheckBox key={band.id} name="bands" value={`bands.${index}.name`} label={band.name} />
          ))}
        </div>
      </fieldset>
    </Form>
  );
}
