import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import createBand from "app/bands/mutations/createBand";
import { BandForm, FORM_ERROR } from "app/bands/components/BandForm";

const NewBandPage = () => {
  const router = useRouter();
  const [createBandMutation] = useMutation(createBand);

  return (
    <Layout title={"Create New Band"}>
      <h1>Create New Band</h1>

      <BandForm
        submitText="Create Band"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateBand}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const band = await createBandMutation(values);
            router.push(Routes.ShowBandPage({ bandId: band.id }));
          } catch (error: any) {
            console.error(error);
            return {
              [FORM_ERROR]: error.toString(),
            };
          }
        }}
      />

      <p>
        <Link href={Routes.BandsPage()}>
          <a>Bands</a>
        </Link>
      </p>
    </Layout>
  );
};

NewBandPage.authenticate = true;

export default NewBandPage;
