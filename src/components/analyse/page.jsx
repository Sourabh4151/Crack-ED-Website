// import React, { useEffect, useRef, useState } from 'react'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import './page.css'


// import img1 from '../../assets/img1.png'; import img2 from '../../assets/img2.svg'; import img3 from '../../assets/img3.png';
// import img4 from '../../assets/img4.png'; import img5 from '../../assets/img5.png'; import img6 from '../../assets/img6.png';
// import img7 from '../../assets/img7.png'; import img8 from '../../assets/img8.png'; import img9 from '../../assets/img9.png';

// gsap.registerPlugin(ScrollTrigger)

// const Card = ({ img, title, desc }) => {
//     const [hover, setHover] = useState(false);

//     return (
//         <div
//             className=""
//             style={{ margin: "30px" }}

//         >

//             <div style={{ display: "flex", alignItems: "start", gap: "24px" }}>
//                 <img src={img} style={{ width: "50px", height: "50px" }} alt="" />   <div>
//                     <div className="" style={{ color: '#fafafa', fontSize: "18px", fontWeight: "500", fontFamily: "Poppins", marginBottom: "5px" }}>{title}</div>
//                     <div style={{ color: "#FAFAFAB2", fontSize: "14px", }}>{desc}</div>
//                 </div>
//             </div>




//             <>


//             </>

//         </div>
//     );
// };


// const Analyse = () => {
//     const sectionRef = useRef(null)
//     useEffect(() => {
//         const ctx = gsap.context(() => {
//             gsap.set(".slide-1", { zIndex: 3, yPercent: 0, pointerEvents: "auto", });
//             gsap.set(".slide-2", { zIndex: 4, yPercent: 100, autoAlpha: 1, pointerEvents: "auto", });
//             gsap.set(".slide-3", { zIndex: 5, yPercent: 100, autoAlpha: 1, pointerEvents: "auto", });

//             const tl = gsap.timeline({
//                 scrollTrigger: {
//                     trigger: sectionRef.current,
//                     start: "top top",
//                     end: "+=3000",
//                     scrub: 1,
//                     pin: true,
//                     anticipatePin: 1,
//                 }
//             });
//             tl.to(".slide-2", {
//                 yPercent: 0,
//                 ease: "none",
//                 pointerEvents: "auto",
//             })
//                 .to(".slide-1", {
//                     yPercent: -20,
//                     autoAlpha: 0,
//                     pointerEvents: "auto",
//                     ease: "none"
//                 }, "<")
//             tl.to({}, { duration: 0.5 });
//             tl.to(".slide-3", {
//                 yPercent: 0,
//                 pointerEvents: "auto",
//                 ease: "none",
//             })
//                 .to(".slide-2", {
//                     yPercent: -20,
//                     autoAlpha: 0,
//                     pointerEvents: "auto",
//                     ease: "none"
//                 }, "<");

//         }, sectionRef);

//         return () => ctx.revert();
//     }, []);





//     return (
//         <section ref={sectionRef} className="analyse">
//             <div className="analyse-container">


//                 <div className="sliderrrrrr1">
//                     <div className="analysecard">   <h2 className="analyse-text" style={{ fontSize: '150px' }}>ANALYSE</h2>
//                         <Card img={img1} title="Awareness" desc="Deep understanding of the role through field visits, corporate briefs, and manager interactions" />
//                         <Card img={img2} title="Breakdown" desc="Distilling role success into core and advanced skills required to perform" />
//                         <Card img={img3} title="Clustering" desc="Converting skills into daily micro-learning outcomes across Utthan → Aarohan → Shikhar" />
//                     </div>

//                 </div>


//                 <div className="sliderrrrrr2">
//                     <div className="analysecard"> <h2 className="analyse-text" style={{ fontSize: '150px' }}>BUILD</h2>
//                         <Card img={img4} title="Adult Centric Design" desc="Curriculum and lesson plans based on Andragogy, Experiential Learning, and Growth Mindset" />
//                         <Card img={img5} title="Behavioral Rehearsal" desc="AI-led simulations that allow safe, repeatable practice of real job scenarios" />
//                         <Card img={img6} title="Checks & Coaching" desc="Continuous assessments with structured feedback and remediation" />
//                     </div>

//                 </div>


//                 <div className="sliderrrrrr3">
//                     <div className="analysecard">  <h2 className="analyse-text" style={{ fontSize: '150px' }}>CALIBRATE</h2>
//                         <Card img={img7} title="Apprenticeship Alignment" desc="Regular check-ins with candidates during OJT to understand challenges" />
//                         <Card img={img8} title="Business Feedback" desc="Structured inputs from reporting managers to refine role awareness, expectations and training" />
//                         <Card img={img9} title="Career Transition" desc="Transitioning candidates into full-time roles with a clear growth roadmap" />
//                     </div>

//                 </div>

//             </div>
//         </section>
//     )
// }

// export default Analyse
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './page.css';

import img1 from '../../assets/img1.png'; import img2 from '../../assets/img2.svg'; import img3 from '../../assets/img3.png';
import img4 from '../../assets/img4.png'; import img5 from '../../assets/img5.png'; import img6 from '../../assets/img6.png';
import img7 from '../../assets/img7.png'; import img8 from '../../assets/img8.png'; import img9 from '../../assets/img9.png';


gsap.registerPlugin(ScrollTrigger);

const Card = ({ img, title, desc }) => (
    <div style={{ margin: "20px 30px", display: "flex", alignItems: "start", gap: "24px" }}>
        <img src={img} style={{ width: "50px", height: "50px" }} alt="" />
        <div>
            <div style={{ color: '#fafafa', fontSize: "18px", fontWeight: "500", fontFamily: "Poppins", marginBottom: "5px" }}>{title}</div>
            <div style={{ color: "#FAFAFAB2", fontSize: "14px" }}>{desc}</div>
        </div>
    </div>
);

const Analyse = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Target the actual classes: slide-1, slide-2, slide-3
            const slides = gsap.utils.toArray('.slide');
            
            // Initial state: slide 1 is visible, others are below the screen
            gsap.set(".slide-2, .slide-3", { yPercent: 100 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=3000", // Length of scroll
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                }
            });

            // Slide 2 comes up
            tl.to(".slide-2", { yPercent: 0, ease: "none" })
              .to(".slide-1", { scale: 0.9, opacity: 0.5, ease: "none" }, "<")

            // Small pause
            tl.to({}, { duration: 0.2 });

            // Slide 3 comes up
            tl.to(".slide-3", { yPercent: 0, ease: "none" })
              .to(".slide-2", { scale: 0.9, opacity: 0.5, ease: "none" }, "<");

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="analyse">
            <div className="analyse-container">
                
                {/* Slide 1 */}
                <div className="slide slide-1">
                    <div className="analysecard">
                        <h2 className="analyse-text">ANALYSE</h2>
                        <Card img={img1} title="Awareness" desc="Deep understanding of the role through field visits" />
                        <Card img={img2} title="Breakdown" desc="Distilling role success into core and advanced skills" />
                        <Card img={img3} title="Clustering" desc="Converting skills into daily micro-learning outcomes" />
                    </div>
                </div>

                {/* Slide 2 */}
                <div className="slide slide-2">
                    <div className="analysecard">
                        <h2 className="analyse-text">BUILD</h2>
                        <Card img={img4} title="Andragogy" desc="Curriculum based on Art and Science of Learning for Adults" />
                        <Card img={img5} title="Battle-ready" desc="AI-led simulations for real job scenarios" />
                        <Card img={img6} title="Checkpoints" desc="Continuous assessments with structured feedback" />
                    </div>
                </div>

                {/* Slide 3 */}
                <div className="slide slide-3">
                    <div className="analysecard">
                        <h2 className="analyse-text">CALIBRATE</h2>
                        <Card img={img7} title="Apprenticeship" desc="Regular check-ins with candidates during OJT" />
                        <Card img={img8} title="Benchmarking" desc="Structured inputs from reporting managers" />
                        <Card img={img9} title="Commissioning" desc="Transitioning candidates into full-time roles" />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Analyse;