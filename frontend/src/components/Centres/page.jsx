import React, { useState } from "react";
import "./page.css";
import markerIcon from "../../assets/Vector.svg";
import frame343Icon from "../../assets/Frame 343.svg";

const centres = [
  {
    name: "Gurgaon",
    details: "7th Floor Imperia Mindspace Sector 62 Gurgaon",
    mapQuery: "Imperia Mindspace, Sector 62, Gurgaon, Haryana, India",
  },
  {
    name: "Jaipur",
    details:
      "372-B, Adarsh Nagar, Near Bhag Singh Chowk, Jaipur, Rajasthan 302004",
    mapQuery:
      "372-B, Adarsh Nagar, Near Bhag Singh Chowk, Jaipur, Rajasthan 302004",
  },
  {
    name: "Indore",
    details:
      "14 DF, Scheme No 74C, Indore, Madhya Pradesh 452010 Estancia ProWorking space",
    mapQuery:
      "Estancia ProWorking Space, Scheme No 74C, Indore, Madhya Pradesh 452010",
  },
  {
    name: "Mumbai",
    details:
      "5th Floor, B wing, community co working space, Ackruti Trade Centre",
    mapQuery:
      "Ackruti Trade Centre, MIDC, Andheri East, Mumbai, Maharashtra, India",
  },
];

const Centres = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileSelectOpen, setMobileSelectOpen] = useState(false);
  const activeCentre = centres[activeIndex];

  return (
    <section className="centres-section">
      <div className="centres-container">
        <div className="centres-header">
          <div className="centres-pill">Our Centres</div>
          <h2 className="centres-title">
            A Growing Network of Dedicated Training Centres Across India
          </h2>
        </div>

        {/* Mobile: location dropdown + map */}
        <div className="centres-mobile">
          <button
            type="button"
            className="centres-mobile-select"
            onClick={() => setMobileSelectOpen((o) => !o)}
            aria-expanded={mobileSelectOpen}
            aria-haspopup="listbox"
          >
            <img src={frame343Icon} alt="" className="centres-mobile-pin" />
            <span className="centres-mobile-select-label">
              {activeCentre.name}
            </span>
            <span className="centres-mobile-chevron" aria-hidden>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
          {mobileSelectOpen && (
            <div className="centres-mobile-dropdown" role="listbox">
              {centres.map((centre, index) => (
                <button
                  key={index}
                  type="button"
                  role="option"
                  aria-selected={activeIndex === index}
                  className={`centres-mobile-option ${
                    activeIndex === index ? "centres-mobile-option-active" : ""
                  }`}
                  onClick={() => {
                    setActiveIndex(index);
                    setMobileSelectOpen(false);
                  }}
                >
                  {centre.name}
                </button>
              ))}
            </div>
          )}
          <div className="centres-map-wrapper centres-mobile-map">
            <div className="centres-map-card">
              <iframe
                title={`${activeCentre.name} centre map`}
                className="centres-map-frame"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  activeCentre.mapQuery || activeCentre.details
                )}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="centres-content">
          {/* Left: Centres list (desktop) */}
          <div className="centres-list">
            {centres.map((centre, index) => (
              <button
                key={index}
                type="button"
                className={`centres-item ${
                  activeIndex === index ? "centres-item-active" : ""
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <span className="centres-item-icon">
                  <img src={markerIcon} alt="" className="centres-item-svg" />
                  <span className="centres-item-index">{index + 1}</span>
                </span>
                <span className="centres-item-label">{centre.name}</span>
              </button>
            ))}
          </div>

          {/* Right: Map / image */}
          <div className="centres-map-wrapper">
            <div className="centres-map-card">
              <iframe
                title={`${activeCentre.name} centre map`}
                className="centres-map-frame"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  activeCentre.mapQuery || activeCentre.details
                )}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Centres;

