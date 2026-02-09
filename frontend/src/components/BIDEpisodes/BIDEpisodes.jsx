import React from 'react'
import bigLeft from '../../assets/big_left.jpg'
import rightTop from '../../assets/right_top.jpg'
import rightBottom from '../../assets/right_bottom.jpg'
import playIcon from '../../assets/Play.svg'
import './BIDEpisodes.css'

const BIDEpisodes = () => {
  return (
    <section className="bid-episodes">
      <div className="bid-episodes-inner">
        <p className="bid-episodes-header-cta">Listen To Our Latest Episodes</p>

        <div className="bid-episodes-grid">
          <a
            href="https://www.youtube.com/watch?v=POt7p9MiRNw"
            target="_blank"
            rel="noreferrer"
            className="bid-episode-card bid-episode-card--large"
          >
            <div className="bid-episode-thumbnail">
              <img src={bigLeft} alt="How India Shops Today episode thumbnail" />
              <div className="bid-episode-thumbnail-overlay" />
              <div className="bid-episode-play">
                <img src={playIcon} alt="" />
              </div>
              <div className="bid-episode-meta bid-episode-meta--large">
                <h3 className="bid-episode-title bid-episode-title--large">
                  Why 99% Creators Don&apos;t Make Money On Social Media | Wishlink Founder
                  Explains | Badhta India Dekho
                </h3>
                <p className="bid-episode-date">January 25, 2026</p>
              </div>
            </div>
          </a>

          <a
            href="https://www.youtube.com/watch?v=IVhB_one0GI"
            target="_blank"
            rel="noreferrer"
            className="bid-episode-card"
          >
            <div className="bid-episode-thumbnail">
              <img src={rightTop} alt="Born in a Village Built for Impact episode thumbnail" />
              <div className="bid-episode-thumbnail-overlay" />
              <div className="bid-episode-play">
                <img src={playIcon} alt="" />
              </div>
              <div className="bid-episode-meta">
                <h3 className="bid-episode-title">
                  From Small Village To IIT to Impacting Millions | Anil Nagar (Adda Education) |
                  Badhta India Dekho
                </h3>
                <p className="bid-episode-date">January 10, 2026</p>
              </div>
            </div>
          </a>

          <a
            href="https://www.youtube.com/watch?v=kY-o6QsoJ5k"
            target="_blank"
            rel="noreferrer"
            className="bid-episode-card"
          >
            <div className="bid-episode-thumbnail">
              <img src={rightBottom} alt="Inside the Rise of Indian Whisky episode thumbnail" />
              <div className="bid-episode-thumbnail-overlay" />
              <div className="bid-episode-play">
                <img src={playIcon} alt="" />
              </div>
              <div className="bid-episode-meta">
                <h3 className="bid-episode-title">
                  Inside the Rise of Indian Whisky | IMWA Story | Badhta India Dekho Podcast
                </h3>
                <p className="bid-episode-date">January 2, 2026</p>
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

