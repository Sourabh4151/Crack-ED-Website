import React from 'react'
import boyImage from '../../assets/boy_image.jpg'
import './Testimonial.css'

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      image: boyImage,
      name: "Rahul Singh",
      title: "Sales Associate, Lenskart",
      description: "Lorem elementum leo. at ullamcorper Sed orci convallis. venenatis ex gravida facilisis gravida placerat non, vehicula. venenatis ex gravida facilisis gravida placerat non, vehicula."
    },
    {
      id: 2,
      image: boyImage,
      name: "Rahul Singh",
      title: "Sales Associate, Lenskart",
      description: "Lorem elementum leo. at ullamcorper Sed orci convallis. venenatis ex gravida facilisis gravida placerat non, vehicula. venenatis ex gravida facilisis gravida placerat non, vehicula."
    },
    {
      id: 3,
      image: boyImage,
      name: "Rahul Singh",
      title: "Sales Associate, Lenskart",
      description: "Lorem elementum leo. at ullamcorper Sed orci convallis. venenatis ex gravida facilisis gravida placerat non, vehicula. venenatis ex gravida facilisis gravida placerat non, vehicula."
    },
    {
      id: 4,
      image: boyImage,
      name: "Rahul Singh",
      title: "Sales Associate, Lenskart",
      description: "Lorem elementum leo. at ullamcorper Sed orci convallis. venenatis ex gravida facilisis gravida placerat non, vehicula. venenatis ex gravida facilisis gravida placerat non, vehicula."
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
