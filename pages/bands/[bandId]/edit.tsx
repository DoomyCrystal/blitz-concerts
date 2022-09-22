import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import getBand from "app/bands/queries/getBand";
import updateBand from "app/bands/mutations/updateBand";
import { BandForm, FORM_ERROR } from "app/bands/components/BandForm";

export const EditBand = () => {
  const router = useRouter();
  const bandId = useParam("bandId", "number");
  const [band, { setQueryData }] = useQuery(
    getBand,
    { id: bandId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateBandMutation] = useMutation(updateBand);

  return (
    <>
      <Head>
        <title>Edit Band {band.id}</title>
      </Head>

      <div>
        <h1>Edit Band {band.id}</h1>
        <pre>{JSON.stringify(band, null, 2)}</pre>

        <BandForm
          submitText="Update Band"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateBand}
          initialValues={band}
          onSubmit={async (values) => {
            try {
              const updated = await updateBandMutation({
                id: band.id,
                ...values,
              });
              await setQueryData(updated);
              router.push(Routes.ShowBandPage({ bandId: updated.id }));
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

const EditBandPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditBand />
      </Suspense>

      <p>
        <Link href={Routes.BandsPage()}>
          <a>Bands</a>
        </Link>
      </p>
    </div>
  );
};

EditBandPage.authenticate = true;
EditBandPage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditBandPage;
