import React, { useState, useEffect } from 'react'
import bigLeftFallback from '../../assets/big_left.jpg'
import rightTopImg from '../../assets/right_top.jpg'
import playIcon from '../../assets/Play.svg'
import { getApiBase } from '../../services/crmService'
import './BIDEpisodes.css'

// Previous bigLeft → rightTop slot (static)
const rightTopEpisode = {
  url: 'https://www.youtube.com/watch?v=POt7p9MiRNw',
  image: bigLeftFallback,
  imageAlt: 'How India Shops Today episode thumbnail',
  title:
    "Why 99% Creators Don't Make Money On Social Media | Wishlink Founder Explains | Badhta India Dekho",
  date: 'January 25, 2026',
}

// Previous rightTop → rightBottom slot (static)
const rightBottomEpisode = {
  url: 'https://www.youtube.com/watch?v=IVhB_one0GI',
  image: rightTopImg,
  imageAlt: 'Born in a Village Built for Impact episode thumbnail',
  title:
    'From Small Village To IIT to Impacting Millions | Anil Nagar (Adda Education) | Badhta India Dekho',
  date: 'January 10, 2026',
}

const BIDEpisodes = () => {
  const [featured, setFeatured] = useState(null)

  useEffect(() => {
    const apiBase = getApiBase()
    fetch(`${apiBase}/api/bid-episode-featured/`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.title) setFeatured(data)
      })
      .catch(() => {})
  }, [])

  const bigLeftEpisode = featured
    ? {
        url: featured.youtubeUrl,
        image: featured.thumbnailUrl,
        imageAlt: `${featured.title} episode thumbnail`,
        title: featured.title,
        date: featured.date,
      }
    : {
        url: rightTopEpisode.url,
        image: bigLeftFallback,
        imageAlt: rightTopEpisode.imageAlt,
        title: rightTopEpisode.title,
        date: rightTopEpisode.date,
      }

  return (
    <section className="bid-episodes">
      <div className="bid-episodes-inner">
        <p className="bid-episodes-header-cta">Listen To Our Latest Episodes</p>

        <div className="bid-episodes-grid">
          <a
            href={bigLeftEpisode.url}
            target="_blank"
            rel="noreferrer"
            className="bid-episode-card bid-episode-card--large"
          >
            <div className="bid-episode-thumbnail">
              <img src={bigLeftEpisode.image} alt={bigLeftEpisode.imageAlt} />
              <div className="bid-episode-thumbnail-overlay" />
              <div className="bid-episode-play">
                <img src={playIcon} alt="" />
              </div>
              <div className="bid-episode-meta bid-episode-meta--large">
                <h3 className="bid-episode-title bid-episode-title--large">{bigLeftEpisode.title}</h3>
                <p className="bid-episode-date">{bigLeftEpisode.date}</p>
              </div>
            </div>
          </a>

          <a
            href={rightTopEpisode.url}
            target="_blank"
            rel="noreferrer"
            className="bid-episode-card"
          >
            <div className="bid-episode-thumbnail">
              <img src={rightTopEpisode.image} alt={rightTopEpisode.imageAlt} />
              <div className="bid-episode-thumbnail-overlay" />
              <div className="bid-episode-play">
                <img src={playIcon} alt="" />
              </div>
              <div className="bid-episode-meta">
                <h3 className="bid-episode-title">{rightTopEpisode.title}</h3>
                <p className="bid-episode-date">{rightTopEpisode.date}</p>
              </div>
            </div>
          </a>

          <a
            href={rightBottomEpisode.url}
            target="_blank"
            rel="noreferrer"
            className="bid-episode-card"
          >
            <div className="bid-episode-thumbnail">
              <img src={rightBottomEpisode.image} alt={rightBottomEpisode.imageAlt} />
              <div className="bid-episode-thumbnail-overlay" />
              <div className="bid-episode-play">
                <img src={playIcon} alt="" />
              </div>
              <div className="bid-episode-meta">
                <h3 className="bid-episode-title">{rightBottomEpisode.title}</h3>
                <p className="bid-episode-date">{rightBottomEpisode.date}</p>
              </div>
            </div>
          </a>
        </div>

        <div className="bid-episodes-footer">
          <a
            href="https://www.youtube.com/@BadhtaIndiaDekho/videos"
            target="_blank"
            rel="noreferrer"
            className="bid-episodes-view-all"
          >
            View All Episodes
          </a>
        </div>
      </div>
    </section>
  )
}

export default BIDEpisodes

