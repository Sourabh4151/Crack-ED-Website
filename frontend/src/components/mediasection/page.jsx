import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./page.css";

import img2 from "../../assets/hindustanbg.png";
import img1 from "../../assets/Frame 365.png";
import img3 from "../../assets/Frame 365 (2).png";
import logoBW from "../../assets/idvrZDd6SZ_logos 1.png";
import logoHT from "../../assets/hindustan times 1.png";
import loggo3 from "../../assets/loggo3.png";
import loggo1 from "../../assets/loggo1.png";
import loggo4 from "../../assets/logo444.png";
import loggo5 from "../../assets/logo555.png";
import img4 from "../../assets/bgimg444.png";
import img5 from "../../assets/bgimg555.jpg";
import bharatPhoto from "../../assets/bharat.png";
import bharatLogo from "../../assets/bharat.svg";
import livemintPhoto from "../../assets/livemint.png";
import mintLogo from "../../assets/mint.svg";

import logoBWDisrupt from "../../assets/idaqkNYWaP_1768564795277 1.png";

const Media = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  const slides = [
    {
      image: img1,
      logo: loggo1,
      desc: "Crack-ED was honoured as the Skill Empowerment Institution of the Year at the BW Emerging Business Awards (7th Edition) by BW Businessworld, recognising our commitment to empowering young minds across India with confidence, clarity, and job-ready skills through accessible, outcome-driven learning.",
      logoWidth: "290px",
      logoHeight: "37px",
    },
    {
      image: bharatPhoto,
      logo: bharatLogo,
      desc: "Debojit Sen, founder of Crack-ED, received the Outstanding Achievement in Education Leadership 2026 award at the Bharat 2.0 Conclave in Mumbai. Presented by Dr. Kiran Bedi, the honor acknowledges his work in closing the gap between education and real-world employability in India.",
      logoWidth: "239px",
      logoHeight: "69px",
    },
    {
      image: livemintPhoto,
      logo: mintLogo,
      desc: "Debojit Sen, Founder of Crack-ED, has been named in LiveMint 40 Under 40 India 2026, recognizing his efforts to align education with real career outcomes in India. Through Crack-ED, he continues to work on bridging the gap between academic learning and industry needs.",
      logoWidth: "239px",
      logoHeight: "69px",
    },
    {
      image: img2,
      logo: logoHT,
      desc: "Crack-ED was featured in the Hindustan Times (Gurgaon Edition) for its work in building employability among young learners across India, highlighting our mission to make high-quality skills training and career pathways accessible to youth from tier-2 and tier-3 cities.",
      logoWidth: "310px",
      logoHeight: "40px",
    },
    {
      image: img3,
      logo: loggo3,
      desc: "Debojit Sen, founder of Crack-ED, was recognised in the BW Disrupt 40 Under 40 for reimagining what success can look like for young India, building Crack-ED to create access, exposure, and real career pathways for those who often don’t get the chance to dream differently.",
      logoWidth: "139px",
      logoHeight: "64px",
    },
    {
      image: img4,
      logo: loggo4,
      desc: "Crack-ED has been featured as a teaching case published by Ivey Publishing and the Harvard Business Review, and is used by leading business schools globally as an academic reference for strategy and entrepreneurship.",
      logoWidth: "139px",
      logoHeight: "64px",
    },
    {
      image: img5,
      logo: loggo5,
      desc: "Featured in The Times of India, Crack-ED is recognized as a credible leader in upskilling Indian youth and bridging employability gaps among graduates, highlighting our growing impact in India’s workforce readiness ecosystem.",
      logoWidth: "139px",
      logoHeight: "64px",
    },
  ];

  // GSAP Animation logic
  useEffect(() => {
    const tl = gsap.timeline();

    // Reset and Animate Image
    tl.fromTo(
      imageRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
    );

    // Animate Text Content (Logo + Paragraph)
    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.4" // Start slightly before image finishes
    );
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="media-section media-mentions-section">
      <div className="media-container">
        
        <div className="media-header">
          <div className="stats-header">
            <div className="stats-badge">Media Mentions & Recognition</div>
          </div>
          <h2 className="media-headline">Recognised by leading media for building job-ready talent</h2>
        </div>

        <div className="slider-wrapper">
          {/* Mobile: Horizontal scroll of all cards */}
          <div className="mobile-cards-scroll">
            {slides.map((slide, index) => (
              <div key={index} className="slider-card mobile-card">
                <div className="mainsection123">
                  <div className="sec11111">
                    <img
                      src={slide.image}
                      alt="Recognition"
                      className="slide-image"
                    />
                  </div>
                  <div className="sec2">
                    <div className="content-wrapper">
                      <img
                        src={slide.logo}
                        alt="Publisher Logo"
                        style={{ width: slide.logoWidth, height: slide.logoHeight }}
                        className="publisher-logo"
                      />
                      <p className="mediadesc">{slide.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Single card with arrows */}
          <div className="desktop-slider">
          <div className="slider-card">
            <div className="mainsection123">
              
              {/* Left Section: Image */}
              <div className="sec11111">
                <img
                  ref={imageRef}
                  src={slides[currentIndex].image}
                  alt="Recognition"
                  className="slide-image"
                />
              </div>

              {/* Right Section: Content */}
              <div className="sec2">
                <div ref={contentRef} className="content-wrapper">
                  <img
                    src={slides[currentIndex].logo}
                    alt="Publisher Logo"
                    style={{ width: slides[currentIndex].logoWidth, height: slides[currentIndex].logoHeight }}
                    className="publisher-logo"
                  />
                  <p className="mediadesc">{slides[currentIndex].desc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls - below the container */}
          <div className="slider-controls">
            <button onClick={handlePrev} className="control-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </button>
            <div className="counter">
              {currentIndex + 1} / {slides.length}
            </div>
            <button onClick={handleNext} className="control-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Media;