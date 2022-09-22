import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import getBand from "app/bands/queries/getBand";
import deleteBand from "app/bands/mutations/deleteBand";

export const Band = () => {
  const router = useRouter();
  const bandId = useParam("bandId", "number");
  const [deleteBandMutation] = useMutation(deleteBand);
  const [band] = useQuery(getBand, { id: bandId });

  return (
    <>
      <Head>
        <title>Band {band.name}</title>
      </Head>

      <div>
        <h1>{band.name}</h1>
        <pre>{JSON.stringify(band, null, 2)}</pre>

        <Link href={Routes.EditBandPage({ bandId: band.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteBandMutation({ id: band.id });
              router.push(Routes.BandsPage());
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

const ShowBandPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.BandsPage()}>
          <a>Bands</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Band />
      </Suspense>
    </div>
  );
};

ShowBandPage.authenticate = true;
ShowBandPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowBandPage;
