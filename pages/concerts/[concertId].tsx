import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import getConcert from "app/concerts/queries/getConcert";
import deleteConcert from "app/concerts/mutations/deleteConcert";

export const Concert = () => {
  const router = useRouter();
  const concertId = useParam("concertId", "number");
  const [deleteConcertMutation] = useMutation(deleteConcert);
  const [concert] = useQuery(getConcert, { id: concertId });

  return (
    <>
      <Head>
        <title>Concert {concert.date}</title>
      </Head>

      <div>
        <h1>Concert {concert.date}</h1>
        <p>{concert.description}</p>
        <ul>
          {concert.bands.filter(band => band.name).map((band) => (
            <li key={band.id}>
              {band.name} - {band.country}
            </li>
          ))}
        </ul>
        <Link href={Routes.EditConcertPage({ concertId: concert.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteConcertMutation({ id: concert.id });
              router.push(Routes.ConcertsPage());
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  );
};

const ShowConcertPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ConcertsPage()}>
          <a>Concerts</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Concert />
      </Suspense>
    </div>
  );
};

ShowConcertPage.authenticate = true;
ShowConcertPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowConcertPage;
