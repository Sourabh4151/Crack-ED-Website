import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./page.css";

gsap.registerPlugin(ScrollTrigger);

const FloatingSteps = () => {
  const ref = useRef(null);
useEffect(() => {
  const ctx = gsap.context(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // Initial states
    gsap.set(".title", { opacity: 0, x: -16 });
    gsap.set(".pill", { opacity: 0, x: -12 });

    gsap.set(".dot-line", {
      opacity: 0,
      scaleX: isMobile ? 1 : 0,
      scaleY: isMobile ? 0 : 1
    });

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: ref.current,
        start: "top 70%",
        once: true,
      }
    });

    tl.to(".title", { opacity: 1, x: 0, duration: 0.45 })

      .to(".line-1", {
        opacity: 1,
        scaleX: isMobile ? 1 : 1,
        scaleY: isMobile ? 1 : 1,
        duration: 0.3
      })
      .to(".step-1", { opacity: 1, x: 0, duration: 0.4 })

      .to(".line-2", {
        opacity: 1,
        scaleX: isMobile ? 1 : 1,
        scaleY: isMobile ? 1 : 1,
        duration: 0.3
      })
      .to(".step-2", { opacity: 1, x: 0, duration: 0.4 })

      .to(".line-3", {
        opacity: 1,
        scaleX: isMobile ? 1 : 1,
        scaleY: isMobile ? 1 : 1,
        duration: 0.3
      })
      .to(".step-3", { opacity: 1, x: 0, duration: 0.4 });

  }, ref);

  return () => ctx.revert();
}, []);

  return (
    <div className="framework-container" ref={ref}>
      <div className="title">The ABC Framework</div>

      <span className="dot-line line-1" />
      <div className="pill step-1">ANALYSE</div>

      <span className="dot-line line-2" />
      <div className="pill step-2">BUILD</div>

      <span className="dot-line line-3" />
      <div className="pill step-3">CALIBRATE</div>
    </div>
  );
};

export default FloatingSteps;
