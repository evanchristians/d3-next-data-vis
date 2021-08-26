import Head from "next/head";
import { Flower } from "../components/Flower";
import Slider from "rc-slider";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import * as d3 from "d3";
import _, { filter } from "lodash";
import { useEffect, useState } from "react";

export default function Home({ data }) {
  const [filteredData, setFilteredData] = useState(data);
  const [searchKey, setSearchKey] = useState("");
  const [size, setSize] = useState(100);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [size]);

  useEffect(() => {
    setFilteredData(
      data.filter((d) =>
        d.Title.toLowerCase().includes(searchKey.toLowerCase())
      )
    );
  }, [searchKey]);

  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <Head>
        <title>Data Visualization | D3 | Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center w-full flex-1 px-5 sm:px-20 py-10 text-center">
        <h1 className="text-4xl">
          Data Visualization with <span className="text-yellow-400">D3</span> &{" "}
          <span className="text-blue-500">Next.js</span>
        </h1>
        <p className="font-light mt-5 max-w-prose">
          A visualization of the relationship between the number of IMDB votes &
          the IMDB rating for movies in the IMDB record rendered with D3 &
          Next.js.
        </p>
        <p className="font-light mt-5 max-w-prose">
          The number of votes is represented by the size of the flower & the
          rating is represented by the number of petals.
        </p>
        <p className="font-light mt-5 max-w-prose">
          This visualization is based on Shirley Wu's filmflowers repository{" "}
          <a
            className="text-blue-400"
            href="https://github.com/sxywu/filmflowers"
          >
            https://github.com/sxywu/filmflowers
          </a>
        </p>
        <div className="flex flex-col md:flex-row w-full mt-20 gap-10">
          <div
            className="w-full  mx-auto md:ml-0 text-left"
            style={{ maxWidth: "32ch" }}
          >
            <p className="mb-3">Flower Size</p>
            <Slider
              value={size}
              max={160}
              step={2}
              min={90}
              onChange={(val) => setSize(val)}
            />
          </div>

          <input
            type="text"
            className="py-2 px-5 focus:outline-none bg-gray-100 focus:bg-gray-200"
            placeholder="Search"
            value={searchKey}
            onChange={(ev) => {
              if (ev.target.value.length > 0) {
                setSearchKey(ev.target.value);
              } else {
                setSearchKey("");
                setFilteredData(data);
              }
            }}
          />
        </div>
        <div className="flex mt-10 gap-10 flex-wrap justify-center">
          {filteredData &&
            filteredData.map((d, key) => (
              <div
                key={key}
                className="flex flex-col flex-grow justify-between items-center p-5 max-w-full bg-gray-50"
              >
                <div className="max-w-content w-full">
                  <p className="mx-auto mt-2">{d.Title}</p>
                  <p className="font-light text-sm">{d.Director}</p>
                </div>
                <Flower size={size} data={d} dataset={data} />
                <div className="max-w-content w-full flex flex-col">
                  <p className="font-light text-xl mt-10 ">{d.imdbRating}</p>
                  <p className="font-light mx-auto">{d.imdbVotes} Votes</p>
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
