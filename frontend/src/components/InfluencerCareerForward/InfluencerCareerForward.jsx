import React, { useState } from 'react'
import './InfluencerCareerForward.css'
import CareerQuiz from '../CareerQuiz/page'

const InfluencerCareerForward = () => {
  const [showQuiz, setShowQuiz] = useState(false)

  return (
    <section className="inf-cf-section">
      <div className="inf-cf-sticky-wrapper">
        <div className="inf-cf-container inf-cf-container-visible">
          <div className="inf-cf-content">
            <h2 className="inf-cf-heading">
              2,400+ careers <br /> <span style={{ whiteSpace: 'nowrap' }}>transformed. Yours</span>
              <br /> could be next.
            </h2>
            <p className="inf-cf-paragraph">
            Crack-ED doesn't just teach. We place you in real work environments through job-linked programs and on-job training with leading corporates. Take our career quiz to find the program that's right for you.
            </p>

            {!showQuiz && (
              <button className="inf-cf-button" onClick={() => setShowQuiz(true)}>
                <span>Take Quiz</span>
              </button>
            )}
          </div>

          <div className="inf-cf-right-section">
            <div className="inf-cf-glow"></div>

            {showQuiz && (
              <div className="inf-cf-quiz-fade-in">
                <CareerQuiz showOnlyTopProgram />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default InfluencerCareerForward
