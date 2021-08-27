import React, { useRef } from "react";
import { flowerConfig } from "../lib/flowerConfig";
import Petal from "./Petal";

export const Flower = ({ dataset, data, size = 120 }) => {
  const svg = useRef();
  const ref = useRef([]);

  const { petalSize, petalCount, colors, path } = flowerConfig(
    data,
    dataset,
    size
  );

  const angle = (index, total) => {
    return Math.floor(
      (360 * index) / total +
        10 * (Math.random() * 2 - 1) +
        360 * Math.floor(Math.random() * 2 - 1)
    );
  };

  const petals = _.times(petalCount, (i) => ({
    fill: colors(i),
    angle: angle(i, petalCount),
    duration: 0.025 * i + 1,
    refKey: i
  }));

  useEffect(() => {
    const waveTimeline = gsap.timeline({
      repeat: -1,
      yoyo: true,
    });

    waveTimeline.fromTo(
      ref.current,
      {
        transformOrigin: "bottom center",
        rotate: angle,
      },
      {
        rotate: angle + Math.floor(Math.random() * 2 - 1) * 7.5,
        duration: Math.random() * (1.5 - 0.5) + 0.5,
        ease: "power1.inOut",
      }
    );

    const timeline = gsap.timeline({ scrollTrigger: { trigger: ref.current } });

    timeline
      .fromTo(
        ref.current,
        {
          opacity: 0,
          scale: 0,
          rotate: 0,
          transformOrigin: "bottom center",
        },
        {
          opacity: 1,
          scale: 1,
          rotate: angle,
          duration,
          ease: "back.out(1.1)",
        }
      )
      .add(waveTimeline);
  });

  return (
    <svg ref={svg} width={size * 2} height={size * 2}>
      <g
        transform={`translate(${size}, ${size}) scale(${petalSize})`}
        className="flower"
      >
        {petals &&
          petals.map((petal, key) => (
            <Petal
              key={key}
              path={path}
              angle={petal.angle}
              fill={petal.fill}
              duration={petal.duration}
              ref={ref}
              refKey={petal.refKey}
            />
          ))}
      </g>
    </svg>
  );
};
