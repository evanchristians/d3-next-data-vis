import * as d3 from "d3";
import _ from "lodash";

export const flowerConfig = (data, dataset, size) => {
  const path = "M 0,0 C -25,-15  -10,-40 10,-50 C 10,-40 25,-15 0,0";
  const ratingsRange = d3.extent(dataset, (d) => +d.imdbRating);
  const votesRange = d3.extent(dataset, (d) => +d.imdbVotes.replace(/,/g, ""));
  const petalSizeScale = d3
    .scaleLinear()
    .domain(votesRange)
    .range([(size / 70) * 0.3, (size / 70) * 1]);

  const petalCountScale = d3
    .scaleQuantize()
    .domain(ratingsRange)
    .range(_.range("3", "16"));

  const petalCount = petalCountScale(+data.imdbRating);
  const colors = d3.scaleOrdinal(d3.schemeSet1);
  const petalSize = petalSizeScale(+data.imdbVotes.replace(/,/g, ""));

  return {
    petalCount,
    petalSize,
    colors,
    path,
  };
};
