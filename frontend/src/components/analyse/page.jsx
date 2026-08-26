import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './page.css';
import TalkToTeamCta from '../TalkToTeamCta/TalkToTeamCta';

import img1 from '../../assets/img1.png'; import img2 from '../../assets/img2.svg'; import img3 from '../../assets/img3.png';
import img4 from '../../assets/img4.png'; import img5 from '../../assets/img5.png'; import img6 from '../../assets/img6.png';
import img7 from '../../assets/img7.png'; import img8 from '../../assets/img8.png'; import img9 from '../../assets/img9.png';


gsap.registerPlugin(ScrollTrigger);

const releasePin = (el) => {
    if (!el) return;
    const parent = el.parentNode;
    if (parent && parent.classList && parent.classList.contains('pin-spacer')) {
        parent.replaceWith(el);
    }
};

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

    useLayoutEffect(() => {
        const root = sectionRef.current;
        if (!root) return;

        let cancelled = false;
        let ctx = null;

        const initAnimation = () => {
            if (cancelled || ctx) return;
            if (!window.matchMedia('(max-width: 768px)').matches) return;
            if (window.getComputedStyle(root).display === 'none') return;

            gsap.registerPlugin(ScrollTrigger);

            ScrollTrigger.getAll().forEach((st) => {
                if (st.trigger === root) st.kill();
            });

            const slide1 = root.querySelector('.slide.slide-1');
            const slide2 = root.querySelector('.slide.slide-2');
            const slide3 = root.querySelector('.slide.slide-3');
            if (!slide1 || !slide2 || !slide3) return;

            ctx = gsap.context(() => {
                // Initial state: slide 1 is visible, others are below the screen
                gsap.set([slide2, slide3], { yPercent: 100 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: root,
                        start: "top top",
                        end: "+=3000", // Length of scroll
                        scrub: 1,
                        pin: true,
                        pinType: 'fixed',
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    }
                });

                // Slide 2 comes up
                tl.to(slide2, { yPercent: 0, ease: "none" })
                  .to(slide1, { scale: 0.9, opacity: 0.5, ease: "none" }, "<")

                // Small pause
                tl.to(slide2, { duration: 0.2 });

                // Slide 3 comes up
                tl.to(slide3, { yPercent: 0, ease: "none" })
                  .to(slide2, { scale: 0.9, opacity: 0.5, ease: "none" }, "<");

            }, root);

            if (cancelled && ctx) {
                ctx.revert();
                ctx = null;
                return;
            }

            ScrollTrigger.refresh();
        };

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    observer.disconnect();
                    initAnimation();
                }
            },
            { rootMargin: '800px 0px' }
        );
        observer.observe(root);

        return () => {
            cancelled = true;
            observer.disconnect();
            try {
                if (ctx) ctx.revert();
            } catch (_) { /* pin unwrap can throw if the node was already moved */ }
            ctx = null;
            ScrollTrigger.getAll().forEach((st) => {
                if (st.trigger === root) {
                    try { st.kill(); } catch (_) {}
                }
            });
            releasePin(root);
        };
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
                        <TalkToTeamCta />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Analyse;