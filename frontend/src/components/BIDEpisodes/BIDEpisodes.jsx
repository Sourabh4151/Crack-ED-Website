import React, { useState, useEffect } from 'react'
import bigLeftFallback from '../../assets/big_left.jpg'
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

// RightBottom fallback: next newest = Jan 25 (same as previous bigLeft / rightTop)
const rightBottomEpisode = {
  url: 'https://www.youtube.com/watch?v=POt7p9MiRNw',
  image: bigLeftFallback,
  imageAlt: 'How India Shops Today episode thumbnail',
  title:
    "Why 99% Creators Don't Make Money On Social Media | Wishlink Founder Explains | Badhta India Dekho",
  date: 'January 25, 2026',
}

const BIDEpisodes = () => {
  const [episodes, setEpisodes] = useState([])

  useEffect(() => {
    const apiBase = getApiBase()
    fetch(`${apiBase}/api/bid-episode-featured/`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length) setEpisodes(data)
      })
      .catch(() => {})
  }, [])

  // 1st by date → bigLeft, 2nd → rightTop, 3rd → rightBottom; fallback to static when missing
  const toCard = (ep) => ({
    url: ep.youtubeUrl,
    image: ep.thumbnailUrl,
    imageAlt: `${ep.title} episode thumbnail`,
    title: ep.title,
    date: ep.date,
  })
  const bigLeftEpisode = episodes[0]
    ? toCard(episodes[0])
    : { url: rightTopEpisode.url, image: bigLeftFallback, imageAlt: rightTopEpisode.imageAlt, title: rightTopEpisode.title, date: rightTopEpisode.date }
  const rightTopCard = episodes[1]
    ? toCard(episodes[1])
    : rightTopEpisode
  const rightBottomCard = episodes[2]
    ? toCard(episodes[2])
    : rightBottomEpisode

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
            href={rightTopCard.url}
            target="_blank"
            rel="noreferrer"
            className="bid-episode-card"
          >
            <div className="bid-episode-thumbnail">
              <img src={rightTopCard.image} alt={rightTopCard.imageAlt} />
              <div className="bid-episode-thumbnail-overlay" />
              <div className="bid-episode-play">
                <img src={playIcon} alt="" />
              </div>
              <div className="bid-episode-meta">
                <h3 className="bid-episode-title">{rightTopCard.title}</h3>
                <p className="bid-episode-date">{rightTopCard.date}</p>
              </div>
            </div>
          </a>

          <a
            href={rightBottomCard.url}
            target="_blank"
            rel="noreferrer"
            className="bid-episode-card"
          >
            <div className="bid-episode-thumbnail">
              <img src={rightBottomCard.image} alt={rightBottomCard.imageAlt} />
              <div className="bid-episode-thumbnail-overlay" />
              <div className="bid-episode-play">
                <img src={playIcon} alt="" />
              </div>
              <div className="bid-episode-meta">
                <h3 className="bid-episode-title">{rightBottomCard.title}</h3>
                <p className="bid-episode-date">{rightBottomCard.date}</p>
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

