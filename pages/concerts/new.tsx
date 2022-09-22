import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import createConcert from "app/concerts/mutations/createConcert";
import { ConcertForm, FORM_ERROR } from "app/concerts/components/ConcertForm";
import { CreateConcert } from "app/concerts/validations";

const NewConcertPage = () => {
  const router = useRouter();
  const [createConcertMutation] = useMutation(createConcert);

  return (
    <Layout title={"Create New Concert"}>
      <h1>Create New Concert</h1>

      <ConcertForm
        submitText="Create Concert"
        schema={CreateConcert}
        initialValues={{ name: "", bands: [] }}
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
