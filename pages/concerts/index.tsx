import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import Layout from "app/core/layouts/Layout";
import getConcerts from "app/concerts/queries/getConcerts";

const ITEMS_PER_PAGE = 100;

export const ConcertsList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ concerts, hasMore }] = usePaginatedQuery(getConcerts, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {concerts.map((concert) => (
          <li key={concert.id}>
            <Link href={Routes.ShowConcertPage({ concertId: concert.id })}>
              <a>{concert.date} &bull; {concert.description}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  );
};

const ConcertsPage = () => {
  return (
    <Layout>
      <Head>
        <title>Concerts</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewConcertPage()}>
            <a>Create Concert</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ConcertsList />
        </Suspense>
      </div>
    </Layout>
  );
};

export default ConcertsPage;
