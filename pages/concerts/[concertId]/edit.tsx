import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import getConcert from "app/concerts/queries/getConcert";
import updateConcert from "app/concerts/mutations/updateConcert";
import { ConcertForm, FORM_ERROR } from "app/concerts/components/ConcertForm";

export const EditConcert = () => {
  const router = useRouter();
  const concertId = useParam("concertId", "number");
  const [concert, { setQueryData }] = useQuery(
    getConcert,
    { id: concertId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateConcertMutation] = useMutation(updateConcert);

  return (
    <>
      <Head>
        <title>Edit Concert {concert.id}</title>
      </Head>

      <div>
        <h1>Edit Concert {concert.id}</h1>
        <pre>{JSON.stringify(concert, null, 2)}</pre>

        <ConcertForm
          submitText="Update Concert"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateConcert}
          initialValues={concert}
          onSubmit={async (values) => {
            try {
              const updated = await updateConcertMutation({
                id: concert.id,
                ...values,
              });
              await setQueryData(updated);
              router.push(Routes.ShowConcertPage({ concertId: updated.id }));
            } catch (error: any) {
              console.error(error);
              return {
                [FORM_ERROR]: error.toString(),
              };
            }
          }}
        />
      </div>
    </>
  );
};

const EditConcertPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditConcert />
      </Suspense>

      <p>
        <Link href={Routes.ConcertsPage()}>
          <a>Concerts</a>
        </Link>
      </p>
    </div>
  );
};

EditConcertPage.authenticate = true;
EditConcertPage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditConcertPage;
