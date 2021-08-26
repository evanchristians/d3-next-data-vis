import Head from "next/head";
import { Flower } from "../components/Flower";
import Slider from "rc-slider";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import "rc-slider/assets/index.css";
import * as d3 from "d3";
import _ from "lodash";
import { useEffect, useState } from "react";

export default function Home({ data }) {
  const [size, setSize] = useState(120);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [size]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Data Visualization | D3 | Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center justify-center w-full flex-1 px-5 sm:px-20 py-10 text-center">
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
        <div
          className="w-full mt-20 mx-auto md:ml-0 text-left"
          style={{ maxWidth: "32ch" }}
        >
          <p className="mb-3">Flower Size</p>
          <Slider
            value={size}
            max={200}
            min={50}
            onChange={(val) => setSize(val)}
          />
        </div>
        <div className="flex mt-10 gap-5 flex-wrap justify-center">
          {data &&
            data.map((d, key) => (
              <div
                key={key}
                className="flex flex-col flex-grow items-center p-5"
              >
                <Flower size={size} data={d} dataset={data} />
                <div className="my-auto w-full flex flex-col relative">
                  <p className="text-xl mb-2">{d.imdbRating}</p>
                  <p className="text-xs max-w-content mx-auto">{d.Title}</p>
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
