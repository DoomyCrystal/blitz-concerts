import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import createConcert from "app/concerts/mutations/createConcert";
import { ConcertForm, FORM_ERROR } from "app/concerts/components/ConcertForm";

const NewConcertPage = () => {
  const router = useRouter();
  const [createConcertMutation] = useMutation(createConcert);

  return (
    <Layout title={"Create New Concert"}>
      <h1>Create New Concert</h1>

      <ConcertForm
        submitText="Create Concert"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateConcert}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const concert = await createConcertMutation(values);
            router.push(Routes.ShowConcertPage({ concertId: concert.id }));
          } catch (error: any) {
            console.error(error);
            return {
              [FORM_ERROR]: error.toString(),
            };
          }
        }}
      />

      <p>
        <Link href={Routes.ConcertsPage()}>
          <a>Concerts</a>
        </Link>
      </p>
    </Layout>
  );
};

NewConcertPage.authenticate = true;

export default NewConcertPage;
