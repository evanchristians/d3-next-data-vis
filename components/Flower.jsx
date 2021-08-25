import * as d3 from "d3";
import { gsap } from "gsap";
import _ from "lodash";
import React, { useEffect, useRef } from "react";

export const Flower = ({ dataset, data }) => {
  const svg = useRef();
  const petalSize = 70;

  const petalPath = "M 0,0 C -25,-15  -10,-40 10,-50 C 10,-40 25,-15 0,0";
  const ratingMinMax = d3.extent(dataset, (d) => +d.imdbRating);
  const votesMinMax = d3.extent(dataset, (d) => +d.imdbVotes.replace(/,/g, ""));
  const sizeScale = d3.scaleLinear().domain(votesMinMax).range([0.3, 1]);

  const numPetalScale = d3
    .scaleQuantize()
    .domain(ratingMinMax)
    .range(_.range("3", "15"));

  const numPetals = numPetalScale(+data.imdbRating);

  const colors = d3.scaleOrdinal(d3.schemeSet1);
  const flowerSize = sizeScale(+data.imdbVotes.replace(/,/g, ""));

  let petals = [];
  const petalsRef = useRef([]);

  _.times(numPetals, (i) => {
    petals.push({
      angle: (360 * i) / numPetals,
      petalPath,
      fill: colors(i),
    });
  });

  useEffect(() => {
    petalsRef.current.forEach(async (petalRef, key) => {
      const waveTimeline = gsap.timeline({
        repeat: -1,
        yoyo: true,
      });

      waveTimeline.to(petalRef, {
        rotate: petals[key].angle + (Math.round(Math.random()) * 2 - 1) * 7.5,
        duration: Math.random() * (2 - 0.5) + 0.5,
        ease: "power1.inOut"
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: svg.current,
          start: "top bottom",
          end: "bottom top",
          toggleActions: "play pause resume pause",
        },
      });

      timeline
        .fromTo(
          petalRef,
          {
            scale: 0,
            transformOrigin: "bottom center",
          },
          {
            transformOrigin: "bottom center",
            scale: 1,
            rotate: petals[key].angle,
            duration: 0.05 * key + 1,
            ease: "back.inOut(1.2)",
          },
        )
        .add(waveTimeline);
    });
  }, []);

  return (
    <svg ref={svg} width={petalSize * 2} height={petalSize * 2}>
      <g
        transform={`translate(${petalSize}, ${petalSize}) scale(${flowerSize})`}
        className="flower"
      >
        {petals.map((petal, key) => (
          <path
            ref={(r) => (petalsRef.current[key] = r)}
            key={key}
            d={petalPath}
            fill={petal.fill}
            onMouseOver={(ev) =>
              gsap.to(ev.target, {
                scale: 1.25,
                duration: 0.5,
                ease: "back.out(1.7)",
              })
            }
          ></path>
        ))}
      </g>
    </svg>
  );
};
