import { Form, FormProps } from "app/core/components/Form";
import { LabeledTextField } from "app/core/components/LabeledTextField";
import { z } from "zod";
export { FORM_ERROR } from "app/core/components/Form";

export function ConcertForm<S extends z.ZodType<any, any>>(
  props: FormProps<S>
) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="date" label="Datum" placeholder="Datum" />
      <LabeledTextField name="description" label="Beschreibung" placeholder="Beschreibung" />
      <LabeledTextField name="bands.0.name" label="Band 1" />
      <LabeledTextField name="bands.1.name" label="Band 2" />
      <LabeledTextField name="bands.2.name" label="Band 3" />
    </Form>
  );
}
