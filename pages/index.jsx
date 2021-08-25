import Head from "next/head";
import { Flower } from "../components/Flower";
import * as d3 from "d3";
import _ from "lodash";

export default function Home({ data }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Data Visualization | D3 | Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 py-10 text-center">
        <h1 className="text-4xl">
          Data Visualization with <span className="text-yellow-400">D3</span> &{" "}
          <span className="text-blue-500">Next.js</span>
        </h1>
        <p className="mt-5 max-w-prose">
          A visualization of the relationship between the number of IMDB votes &
          the IMDB rating for movies in the IMDB record rendered with D3 &
          Next.js.
        </p>
        <p className="mt-5 max-w-prose">
          The number of votes is represented by the size of the flower & the
          rating is represented by the number of petals.
        </p>
        <p className="mt-5 max-w-prose">
          This visualization is based on Shirley Wu's filmflowers repository{" "}
          <a
            className="text-blue-400"
            href="https://github.com/sxywu/filmflowers"
          >
            https://github.com/sxywu/filmflowers
          </a>
        </p>
        <div className="flex mt-10 gap-5 flex-wrap justify-center ">
          {data &&
            data.map((d, key) => (
              <div className="flex flex-col flex-grow items-center px-3 py-5 bg-gray-800">
                <Flower key={key} data={d} dataset={data} />
                <div style={{ maxWidth: "14ch" }} className="mt-auto">
                  <p className="flex-shrink">{d.imdbRating}</p>
                  <p className="text-xs">{d.Title}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const data = await d3
    .json(
      "https://raw.githubusercontent.com/sxywu/filmflowers/master/movies.json"
    )
    .then((data) => _.values(data));

  return {
    props: { data },
  };
}
