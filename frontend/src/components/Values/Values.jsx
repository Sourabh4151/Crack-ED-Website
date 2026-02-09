import React from 'react'
import commitmentIcon from '../../assets/commitment.svg'
import agilityIcon from '../../assets/agility.svg'
import reimagineIcon from '../../assets/re-imagine.svg'
import experienceIcon from '../../assets/experience.svg'
import recognitionIcon from '../../assets/recognition.svg'
import './Values.css'

const Values = () => {
  const values = [
    {
      id: 1,
      title: 'Commitment',
      description: 'We stay true to our vision and take ownership of what we do. Commitment means showing up with focus, responsibility, and the drive to deliver on our promises.',
      icon: commitmentIcon
    },
    {
      id: 2,
      title: 'Agility',
      description: 'We move fast, adapt quickly and execute with intent. Agility helps us respond to change, solve challenges efficiently, and keep moving forward.',
      icon: agilityIcon
    },
    {
      id: 3,
      title: 'Reimagine',
      description: 'We challenge assumptions and think beyond limits. Reimagining means questioning the status quo, embracing creativity, and designing bold future-ready solutions.',
      icon: reimagineIcon
    },
    {
      id: 4,
      title: 'Experience',
      description: 'We aim to go beyond expectations, every time. Whether it\'s for learners, partners, or teammates, we focus on creating meaningful experiences that truly delight.',
      icon: experienceIcon
    },
    {
      id: 5,
      title: 'Recognition',
      description: 'We celebrate effort, progress, and success. By recognising impact, big or small, we ensure everyone feels valued, seen, and appreciated.',
      icon: recognitionIcon
    }
  ]

  return (
    <section className="values-section">
      <div className="values-container">
        <div className="values-header">
          <div className="values-badge">Values That Define Us</div>
          <p className="values-intro">
            Our values shape how we work, grow, and succeed together. They guide our decisions, our culture, and the way we show up every day.
          </p>
        </div>
        <div className="values-grid">
          {values.slice(0, 3).map((value) => (
            <div key={value.id} className="value-card">
              <div className="value-icon">
                <img src={value.icon} alt={value.title} />
              </div>
              <div className="value-content">
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            </div>
          ))}
          <div className="values-bottom-row">
            {values.slice(3).map((value) => (
              <div key={value.id} className="value-card">
                <div className="value-icon">
                  <img src={value.icon} alt={value.title} />
                </div>
                <div className="value-content">
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-description">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Values
