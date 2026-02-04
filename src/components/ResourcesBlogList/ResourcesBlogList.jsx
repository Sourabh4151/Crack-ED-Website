import React from 'react'
import ResourcesBlogCard from '../ResourcesBlogCard/ResourcesBlogCard'
import './ResourcesBlogList.css'

const defaultBlog = {
  title: "Beginner's Guide To Banking Courses: How To Start A Career In The Banking Sector",
  date: 'April 7, 2025',
  description:
    "Discover how a practical banking course can help you launch a successful career in the BFSI sector. Learn skills in credit, legal, and tech underwriting, and find job-ready training with Crack-ED.",
  link: 'https://blogs.crack-ed.com/',
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
