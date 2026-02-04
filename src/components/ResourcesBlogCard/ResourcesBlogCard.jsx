import React from 'react'
import beginnerImage from '../../assets/beginner.jpg'
import './ResourcesBlogCard.css'

const ResourcesBlogCard = ({ title, date, description, link, image }) => {
  return (
    <article className="resources-blog-card">
      <div className="resources-blog-card-image">
        <img src={image || beginnerImage} alt="" />
      </div>
      <div className="resources-blog-card-content">
        <h2 className="resources-blog-card-title">{title}</h2>
        <time className="resources-blog-card-date">{date}</time>
        <p className="resources-blog-card-description">{description}</p>
        <button type="button" className="resources-blog-card-read-more">
          Read More
        </button>
      </div>
    </article>
  )
}

export default ResourcesBlogCard
