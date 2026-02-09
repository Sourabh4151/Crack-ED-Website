import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./page.css";

import img1 from "../../assets/ef7bcc6e680026c28232839c9205a4830a2925b8 (1).jpg";
import img2 from "../../assets/eb818bfd9c2640eb80e319dd1817733d995d655f.jpg";
import img3 from "../../assets/b16c5ec29861e38c6feb16079aefef89d0657f23.jpg"
import img4 from "../../assets/7cc44da2763eea8aaab3ae42eb7dffc24e2042b0.jpg"
import img1Mobile from "../../assets/au small finance bank.png";
import img2Mobile from "../../assets/lenskart_mobile.png";
import img3Mobile from "../../assets/piramal_mobile.png";
import img4Mobile from "../../assets/aumobileimg.png";
import logoBW from "../../assets/0b17d9c50ed5f95358cc7c76ea958a46b64679e9.png";
import logoHT from "../../assets/323ba31805264950f2a461aeef96f9fd0e551196.png";
import logoBWDisrupt from "../../assets/2b13185556d7f4e88147ae6e85d255f3d49d3609.png";
import piramal_logo1 from "../../assets/piramal_logo 1.png";

const Partners = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const contentRef = useRef(null);
  const mainSectionRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); 

  const slides = [
    {
      image: img1,
      imageMobile: img1Mobile,
      logo: logoBW,
      desc: "“Freshers trained at Crack-ED demonstrate the performance maturity we typically see only after 8–10 months on the job.”",
      ownerName: "Manoj Tibrewal",
      ownerDesiganation: "Group Head - Human Resources, Adminstration, & Infrastructure",
      logoWidth: "111px",
    },
    {
      image: img2,
      imageMobile: img2Mobile,
      logo: logoHT,
      desc: "“What impressed us most was the consistency—Crack-ED’s training produces candidates who are not just job-ready, but culturally aligned, confident, and quick to deliver impact.”",
      ownerName: "Archana Vadala",
      ownerDesiganation: "Global Head of Talent & Inclusion",
      logoWidth: "176px",
    },
    {
      image: img3,
      imageMobile: img3Mobile,
      logo: logoBWDisrupt,
      desc: "“Crack-ED candidates stand out for their preparedness and professionalism. The quality of training reflects clearly in how seamlessly these freshers transition into real business roles.”",
      ownerName: "Keyur Shah",
      ownerDesiganation: "Senior Vice President - Head Talent Acquisition & Campus Relations",
      logoWidth: "134px",
    },
    {
      image: img4,
      imageMobile: img4Mobile,
      
      logo: piramal_logo1,
      desc: "“Crack-ED is doing important work in preparing young talent for real business environments. Their approach builds confidence, clarity, and job-readiness where it truly matters.”",
      ownerName: "Amit Jain",
      ownerDesiganation: "CEO, GFTP",
      logoWidth: "236px",
    },
  ];

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    // Kill existing animations
    gsap.killTweensOf([progressRef.current, mainSectionRef.current, contentRef.current]);

    const tl = gsap.timeline();

    // 1. Progress Bar (Timer)
    tl.fromTo(
      progressRef.current,
      { scaleX: 0 },
      { 
        scaleX: 1, 
        duration: 5, 
        ease: "none", 
        onComplete: handleNext 
      }
    );

    // 2. Background Fade
    tl.fromTo(
      mainSectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 },
      0
    );

    // 3. TEXT CONTENT MOVING LEFT TO RIGHT
    tl.fromTo(
      contentRef.current,
      { 
        opacity: 0, 
        x: -100 // Starts 100 pixels to the left
      },
      { 
        opacity: 1, 
        x: 0,   // Moves to its original position
        duration: 1, 
        ease: "power3.out" 
      },
      0.2 // Starts shortly after background
    );

    return () => tl.kill();
  }, [currentIndex]);

  return (
    <section className="media-section">
      <div className="media-container">
        <div style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",width:"100%"}}>
    
                 <div className="testimonial-badge">Testimonials</div>
          <h2 className="testimonial-heading" style={{marginTop:"20px"}}>Hear from our partners and learners.</h2>
        </div>

        <div className="slider-wrapper">

          <div
            key={currentIndex} 
            ref={mainSectionRef}
            className="mainsection123 pp"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(0, 0, 0, 0.7) 10%, rgba(0, 0, 0, 0) 100%),
                url("${isMobile ? slides[currentIndex].imageMobile : slides[currentIndex].image}")
              `,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              // height: "600px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              position: "relative",
              overflow: "hidden",
              borderRadius: "12px"
            }}
          >
            {/* Progress Bar */}
            <div className="progress-container">
              <div ref={progressRef} className="progress-fill"></div>
            </div>

            <div className={`sec234 ${isMobile && (currentIndex === 0 || currentIndex === 1) ? "content-lower-mobile" : ""}`}>
       
              <div ref={contentRef} className="content-wrapper123">
                <img
                  src={slides[currentIndex].logo}
                  alt="Logo"
                  style={{ width: slides[currentIndex].logoWidth, marginBottom: '8px' }}
                  className="publisher-logo"
                />
                <p className="mediadesc sec123">{slides[currentIndex].desc}</p>
                <p className="sec1233">{slides[currentIndex].ownerName}</p>
                <p className="sec1234">{slides[currentIndex].ownerDesiganation}</p>
              </div>
            </div>
          </div>

          <div className="slider-controls-outside">
            <button onClick={handlePrev} className="control-btn-outline">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </button>
            <div className="counter-text">
              {currentIndex + 1} / {slides.length}
            </div>
            <button onClick={handleNext} className="control-btn-outline">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;