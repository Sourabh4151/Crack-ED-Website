import React from 'react'
import icon1 from '../../assets/icon1.png'
import icon2 from '../../assets/icon2.png'
import icon3 from '../../assets/icon3.png'
import icon4 from '../../assets/icon4.png'
import './Stats.css'

const Stats = () => {
  const stats = [
    {
      id: 1,
      icon: icon1,
      value: "12+ Programs",
      description: "A growing portfolio of job-linked programs across high-demand industries.",
      hoverText: "BUILT TO SCALE"
    },
    {
      id: 2,
      icon: icon2,
      value: "Avg CTC of Rs 3.2 LPA",
      description: "Our learners don't just get trained, they get paid what they deserve.",
      hoverText: "CAREERS THAT PAY"
    },
    {
      id: 3,
      icon: icon3,
      value: "5000+ Learners",
      description: "Thousands of learners have already trusted Crack-ED to build their careers.",
      hoverText: "PROOF, NOT PROMISES"
    },
    {
      id: 4,
      icon: icon4,
      value: "10+ Centers",
      description: "A real, on-ground presence where training and hiring actually happens.",
      hoverText: "NATIONWIDE FOOTPRINT"
    }
  ]

  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-header">
          <div className="stats-badge">Numbers at a glance</div>
          <h2 className="stats-subtitle">Where programs convert into careers, at real scale.</h2>
        </div>
        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.id} className="stat-card">
              <div className="stat-icon">
                <img src={stat.icon} alt="" />
              </div>
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-description">{stat.description}</p>
              <div className="stat-hover-text">{stat.hoverText}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
