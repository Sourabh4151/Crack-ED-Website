import React from 'react'
import firstImage from '../../assets/first.png'
import secondImage from '../../assets/2nd.png'
import thirdImage from '../../assets/3rd.png'
import fourthImage from '../../assets/4th.png'
import fifthImage from '../../assets/5th.png'
import sixthImage from '../../assets/6th.png'
import seventhImage from '../../assets/7th.png'
import './LifeAtCrackED.css'

const LifeAtCrackED = () => {
  const images = [
    { name: 'Team Celebration', image: firstImage },
    { name: 'Office Team', image: secondImage },
    { name: 'Cultural Event', image: thirdImage },
    { name: 'Award Ceremony', image: fourthImage },
    { name: 'Team Outing', image: fifthImage },
    { name: 'Office Space', image: sixthImage },
    { name: 'Team Gathering', image: seventhImage },
  ]

  // Duplicate images for seamless infinite scroll
  const duplicatedImages = [...images, ...images]

  return (
    <section className="life-at-cracked-section">
      <div className="life-at-cracked-container">
        <div className="life-at-cracked-content">
          <div className="life-at-cracked-badge">Life At Crack-ED</div>
          <p className="life-at-cracked-text">
            At Crack-ED, work feels less like a 9-to-5 and more like a journey of curiosity and growth. We're a bunch of dreamers who believe learning should never be boring and neither should work. Here, ideas flow freely, innovation is celebrated, and every voice matters. Whether it's brainstorming over chai, solving problems, or celebrating wins (big or small), we make sure there's energy, fun, and purpose in everything we do. If you're someone who loves learning, experimenting, and making an impact you'll feel right at home at Crack-ED.
          </p>
        </div>
        <div className="life-at-cracked-carousel-container">
          <div className="life-at-cracked-carousel-track">
            {duplicatedImages.map((item, index) => (
              <div key={index} className="life-at-cracked-carousel-item">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="life-at-cracked-image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LifeAtCrackED
