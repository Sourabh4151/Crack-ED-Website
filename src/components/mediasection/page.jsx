import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./page.css";

// Assets
import img1 from "../../assets/Frame 365.png";
import img2 from "../../assets/Frame 365 (1).png";
import img3 from "../../assets/Frame 365 (2).png";
import logoBW from "../../assets/idvrZDd6SZ_logos 1.png";
import logoHT from "../../assets/hindustan times 1.png";
import logoBWDisrupt from "../../assets/idaqkNYWaP_1768564795277 1.png";

const Media = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  const slides = [
    {
      image: img1,
      logo: logoBW,
      desc: "Crack-ED was honoured as the Skill Empowerment Institution of the Year at the BW Emerging Business Awards (7th Edition) by BW Businessworld, recognising our commitment to empowering young minds across India with confidence, clarity, and job-ready skills through accessible, outcome-driven learning.",
      logoWidth: "290px",
    },
    {
      image: img2,
      logo: logoHT,
      desc: "Crack-ED was featured in the Hindustan Times (Gurgaon Edition) for its work in building employability among young learners across India, highlighting our mission to make high-quality skills training and career pathways accessible to youth from tier-2 and tier-3 cities.",
      logoWidth: "310px",
    },
    {
      image: img3,
      logo: logoBWDisrupt,
      desc: "Debojit Sen, founder of Crack-ED, was recognised in the BW Disrupt 40 Under 40 for reimagining what success can look like for young India, building Crack-ED to create access, exposure, and real career pathways for those who often don’t get the chance to dream differently.",
      logoWidth: "239px",
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
    <section className="media-section">
      <div className="media-container">
        
        <div className="stats-header">
          <div className="stats-badge">Media Mentions & Recognition</div>
        </div>

        <div className="slider-card">
          <div className="mainsection">
            
            {/* Left Section: Image */}
            <div className="sec1">
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
                  style={{ width: slides[currentIndex].logoWidth }}
                  className="publisher-logo"
                />
                <p className="mediadesc">{slides[currentIndex].desc}</p>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
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
    </section>
  );
};

export default Media;