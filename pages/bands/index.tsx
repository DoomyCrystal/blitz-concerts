import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import Layout from "app/core/layouts/Layout";
import getBands from "app/bands/queries/getBands";
import Nav from "pages/nav";

const ITEMS_PER_PAGE = 100;

export const BandsList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ bands, hasMore }] = usePaginatedQuery(getBands, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {bands.filter(band => band.name).map((band) => (
          <li key={band.id}>
            <Link href={Routes.ShowBandPage({ bandId: band.id })}>
              <a>{band.name} {band.country && <span>({band.country})</span>}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button className="btn" disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button className="btn" disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  );
};

const BandsPage = () => {
  return (
    <Layout>
      <Head>
        <title>Bands</title>
      </Head>

      <div>
        <Nav />
        <p>
          <Link href={Routes.NewBandPage()}>
            <a className="btn">Create Band</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <BandsList />
        </Suspense>
      </div>
    </Layout>
  );
};

export default BandsPage;
