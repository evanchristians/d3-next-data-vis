import { gsap } from "gsap";

export default function Petal({ path, fill, ref, refKey }) {
  return (
    <path
      ref={el => ref.current[refKey] = el}
      d={path}
      fill={fill}
      style={{ opacity: 0 }}
      onMouseEnter={(ev) =>
        gsap.to(ev.target, {
          scale: 1.25,
          duration: 0.5,
          ease: "back.out(1.7)",
        })
      }
      onMouseLeave={(ev) =>
        gsap.to(ev.target, {
          scale: 1,
          duration: 0.5,
          ease: "sine.in",
        })
      }
    ></path>
  );
}
