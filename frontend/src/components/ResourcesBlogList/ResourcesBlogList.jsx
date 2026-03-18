import React from 'react'
import ResourcesBlogCard from '../ResourcesBlogCard/ResourcesBlogCard'
import premiumImage from '../../assets/premium_image.png'
import './ResourcesBlogList.css'

const defaultBlog = {
  title: '7 Skills Every Successful Relationship Manager Must Have',
  date: 'MARCH 18, 2026',
  description:
    'Discover the 7 must-have skills every relationship manager needs to succeed in client management, build trust, and grow your career.',
  link: '/resources/blog/7',
  image: premiumImage,
}

const ResourcesBlogList = ({ blogs = [defaultBlog] }) => {
  return (
    <section className="resources-blog-list">
      <div className="resources-blog-list-container">
        {blogs.map((blog, index) => (
          <ResourcesBlogCard
            key={index}
            title={blog.title}
            date={blog.date}
            description={blog.description}
            link={blog.link}
            image={blog.image}
          />
        ))}
      </div>
    </section>
  )
}

export default ResourcesBlogList
