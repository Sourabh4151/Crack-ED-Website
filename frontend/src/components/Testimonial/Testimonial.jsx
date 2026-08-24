import React, { useState, useEffect } from 'react'
import AntimaMishra from '../../assets/Antima Mishra.png'
import PoojaMehta from '../../assets/Pooja Mehta.jpeg'
import ShreyaVerma from '../../assets/Shreya_Verma.webp'
import KashyapGoswami from '../../assets/Kashyap_Goswami.webp'
import Vishwendra from '../../assets/Vishwendra.jpg'
import Lokesh from '../../assets/Lokesh.webp'
import Krishankant from '../../assets/Krishankant.webp'
import MayankKaushal from '../../assets/Mayank_Kaushal.webp'
import AmanChauraisa from '../../assets/Aman_Chauraisa.webp'
import PavanTyagi from '../../assets/Pavan_Tyagi.webp'
import Prakash from '../../assets/Prakash.webp'
import RahulChaudhary from '../../assets/Rahul_Chaudhary.webp'
import Ajay from '../../assets/Ajay.webp'
import ShubhamMBL from '../../assets/Shubham_MBL.jpeg'
import RohitKhatanaCASA from '../../assets/RohitKhatana_CASA.jpeg'
import RohitashMBL from '../../assets/Rohitash_MBL.jpeg'
import KuldeepMBL from '../../assets/Kuldeep_MBL.jpeg'
import IlaKumariGL from '../../assets/IlaKumari_GL.jpeg'
import AbhijeetCASA from '../../assets/Abhijeet_CASA.jpeg'
import './Testimonial.css'

const Testimonial = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const testimonials = [
    {
      id: 1,
      image: ShreyaVerma,
      name: "Shreya Verma",
      title: "Relationship Manager, Piramal Finance",
      description: "Speaking up used to scare me, but staying silent scared me more, silent about my own potential. Crack-ED didn't just train me for a job, it pushed me to find my voice. Now I sit across from customers every day, confident, clear, and in control of the conversation."
    },
    {
      id: 2,
      image: KashyapGoswami,
      name: "Kashyap Goswami",
      title: "Business Development Executive, IndusInd Bank",
      description: "A few weeks in, and I already see the difference real preparation makes. It's not just about knowing the products - it's about knowing how to show up for every customer, every conversation, every single day. That's the industry-ready mindset Crack-ED built in me."
    },
    {
      id: 3,
      image: Vishwendra,
      name: "Vishwendra",
      title: "Bank Officer, AU Small Finance Bank",
      description: "It started with a single Instagram scroll and ended a year later as a Bank Officer at AU Small Finance Bank. The change didn't happen overnight - it was the classroom sessions, the internship, and every small step Crack-ED guided me through that got me here."
    },
    {
      id: 4,
      image: Lokesh,
      name: "Lokesh",
      title: "Relationship Officer, AU Small Finance Bank",
      description: "I walked in knowing nothing about banking - no systems, no processes, no idea how a branch actually runs. Crack-ED didn't just teach me the 'what,' they showed me 'how.' Today at AU Small Finance Bank, that one small step feels like the beginning of a real career."
    },
    {
      id: 5,
      image: Krishankant,
      name: "Krishankant",
      title: "Bank Officer, AU Small Finance Bank",
      description: "I was an accountant looking for something more, and one suggestion changed everything. Seven months into my role at AU Small Finance Bank, I'm still learning every day - but I know exactly where I'm headed: leadership in banking, one target at a time."
    },
    {
      id: 6,
      image: MayankKaushal,
      name: "Mayank Kaushal",
      title: "Bank Officer, AU Small Finance Bank",
      description: "Banking operations, targets, branch processes - all of it was unfamiliar when I started. Now, working with AU Small Finance Bank, I realize that one decision to join Crack-ED's Aurum Bankers Program built the foundation for everything I'm becoming."
    },
    {
      id: 7,
      image: AmanChauraisa,
      name: "Aman Chauraisa",
      title: "Bank Officer, AU Small Finance Bank",
      description: "Approaching customers used to feel difficult. Forty-five days of training in Indore later, I was generating leads, opening accounts, and helping people make banking decisions - all with newfound confidence. Crack-ED didn't just train me, it changed how I show up every day."
    },
    {
      id: 8,
      image: PavanTyagi,
      name: "Pavan Tyagi",
      title: "Bank Officer, AU Small Finance Bank",
      description: "Two years of competitive exams, I cleared one preliminary exam before facing a tough setback - and then a new path. Mock interviews, role plays, and real mentorship at Crack-ED turned that uncertainty into a banking career I never planned for, but couldn't be prouder of."
    },
    {
      id: 9,
      image: Prakash,
      name: "Prakash",
      title: "Bank Officer, AU Small Finance Bank",
      description: "I wasn't scrolling for a career, I was just scrolling. One Crack-ED reel later, I had no job experience and a lot of curiosity - today, that curiosity has turned into a ₹27,000 incentive and a banking career that's only just getting started."
    },
    {
      id: 10,
      image: RahulChaudhary,
      name: "Rahul Chaudhary",
      title: "Bank Officer, AU Small Finance Bank",
      description: "An Instagram ad led me away from my father's transport business and into banking. A year, an ₹11,000 incentive, and one strong foundation later, I'm starting my next chapter at IndusInd Bank - in a senior role, with a 25% hike."
    },
    {
      id: 11,
      image: Ajay,
      name: "Ajay",
      title: "Bank Officer, AU Small Finance Bank",
      description: "Almost a year of searching led me to one introduction, one program with Crack-ED, and a complete shift in direction. No banking background, no experience - just the willingness to learn. That willingness already turned into a ₹6,000 incentive in a single month - and I know this is just the start."
    },
    {
      id: 12,
      image: KuldeepMBL,
      name: "Kuldeep Agnihotri",
      title: "Sales Officer, AU Small Finance Bank",
      description: "Learning with Crack-ED's AU Bank Microbusiness Loan course gave me clarity on customer needs, boosted my confidence, and made me more professional in my work."
    },
    {
      id: 13,
      image: ShubhamMBL,
      name: "Shubham Kumar",
      title: "Sales Officer, AU Small Finance Bank",
      description: "I started at Crack-ED with little knowledge, but their support and training helped me learn banking and grow into a more confident person."
    },
    {
      id: 14,
      image: RohitKhatanaCASA,
      name: "Rohit Khatana",
      title: "Bank Officer, AU Small Finance Bank",
      description: "This program helped me learn core banking, develop customer-handling skills, and prepared me with the right mindset for a banking career."
    },
    {
      id: 15,
      image: AbhijeetCASA,
      name: "Abhijeet",
      title: "Bank Officer, AU Small Finance Bank",
      description: "Crack-ED truly strengthened my banking preparation. The teachers share real experience, clear doubts patiently, and their guidance gave me confidence for my career."
    },
    {
      id: 16,
      image: IlaKumariGL,
      name: "Ila Kumari",
      title: "Relationship Officer, AU Small Finance Bank",
      description: "I joined Crack-ED with low confidence, but within a month I improved my grooming, communication, and personality. I'm truly happy to be here."
    },
    {
      id: 17,
      image: RohitashMBL,
      name: "Rohitash",
      title: "Sales Officer, AU Small Finance Bank",
      description: "Crack-ED transformed me from someone with no banking knowledge or confidence into someone who can introduce myself and speak comfortably with anyone."
    },
    {
      id: 18,
      image: AntimaMishra,
      name: "Antima Mishra",
      title: "Senior Business Development Associate, Testbook",
      description: "Before Crack-ED, I knew I wanted to grow in a professional career, but I wasn't sure where to start. The training helped me sharpen my communication, understand sales and business development, and become more confident with every interview."
    },
    {
      id: 19,
      image: PoojaMehta,
      name: "Pooja Mehta",
      title: "Senior Business Development Associate, Testbook",
      description: "The classroom sessions, practical learning, and constant guidance at Crack-ED helped me build the confidence. Getting placed as a Senior Business Development Officer at Textbook feels like a milestone I once only hoped for."
    },
  ]

  const testimonialsToShow = isMobile ? testimonials : [...testimonials, ...testimonials]

  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        <div className="testimonial-header">
   
        </div>
        <div className="testimonial-cards-wrapper">
          <div className="testimonial-cards">
            {testimonialsToShow.map((testimonial, index) => (
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