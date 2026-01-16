import React from 'react'
import ShubhamMBL from '../../assets/Shubham_MBL.jpeg'
import RohitKhatanaCASA from '../../assets/RohitKhatana_CASA.jpeg'
import RohitashMBL from '../../assets/Rohitash_MBL.jpeg'
import KuldeepMBL from '../../assets/Kuldeep_MBL.jpeg'
import KrishnakantCASA from '../../assets/Krishnakant_CASA.jpeg'
import IlaKumariGL from '../../assets/IlaKumari_GL.jpeg'
import BalaYadavGL from '../../assets/BalaYadav_GL.jpeg'
import AbhijeetCASA from '../../assets/Abhijeet_CASA.jpeg'
import './Testimonial.css'

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      image: KuldeepMBL,
      name: "Kuldeep Agnihotri",
      title: "Micro Business Loan Program",
      description: "Learning with Crack-ED's AU Bank Microbusiness Loan course gave me clarity on customer needs, boosted my confidence, and made me more professional in my work."
    },
    {
      id: 2,
      image: ShubhamMBL,
      name: "Shubham Kumar",
      title: "Micro Business Loan Program",
      description: "I started at Crack-ED with little knowledge, but their support and training helped me learn banking and grow into a more confident person."
    },
    {
      id: 3,
      image: RohitKhatanaCASA,
      name: "Rohit Khatana",
      title: "Credits and Savings Account Program",
      description: "This program helped me learn core banking, develop customer-handling skills, and prepared me with the right mindset for a banking career."
    },
    {
      id: 4,
      image: AbhijeetCASA,
      name: "Abhijeet",
      title: "Credits and Savings Account Program",
      description: "Crack-ED truly strengthened my banking preparation. The teachers share real experience, clear doubts patiently, and their guidance gave me confidence for my career."
    },
    {
      id: 5,
      image: IlaKumariGL,
      name: "Ila Kumari",
      title: "Gold Loan Program",
      description: "I joined Crack-ED with low confidence, but within a month I improved my grooming, communication, and personality. I'm truly happy to be here."
    },
    {
      id: 6,
      image: BalaYadavGL,
      name: "Bala Yadav",
      title: "Gold Loan Program",
      description: "The support from my trainers at Crack-ED meant a lot. I learned banking, communication, and confidence, and I'll always remember this journey fondly."
    },
    {
      id: 7,
      image: RohitashMBL,
      name: "Rohitash",
      title: "Micro Business Loan Program",
      description: "Crack-ED transformed me from someone with no banking knowledge or confidence into someone who can introduce myself and speak comfortably with anyone."
    },
    {
      id: 8,
      image: KrishnakantCASA,
      name: "Krishnakant",
      title: "Credits and Savings Account Program",
      description: "Through the AURUM Banker Program, I gained banking knowledge and confidence. The trainers' guidance has prepared me well for a bright career in banking."
    }
  ]

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials]

  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        <div className="testimonial-header">
          <div className="testimonial-badge">Testimonials</div>
          <h2 className="testimonial-heading">Hear From Our Learners</h2>
        </div>
        <div className="testimonial-cards-wrapper">
          <div className="testimonial-cards">
            {duplicatedTestimonials.map((testimonial, index) => (
              <div key={`${testimonial.id}-${index}`} className="testimonial-card">
                <div className="testimonial-image-container">
                  <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
                  <div className="testimonial-content">
                    <h3 className="testimonial-name">{testimonial.name}</h3>
                    <p className="testimonial-title">{testimonial.title}</p>
                    <p className="testimonial-description">{testimonial.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonial
