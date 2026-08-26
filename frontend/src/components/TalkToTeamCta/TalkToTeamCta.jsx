import React, { useState } from 'react'
import EnquireModal from '../EnquireModal/EnquireModal'
import './TalkToTeamCta.css'

const TalkToTeamCta = () => {
  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false)

  return (
    <div className="talk-to-team-cta">
      <button
        type="button"
        className="talk-to-team-cta-button"
        onClick={() => setIsTalkModalOpen(true)}
      >
        Talk to Our Team
      </button>
      <EnquireModal
        isOpen={isTalkModalOpen}
        onClose={() => setIsTalkModalOpen(false)}
        variant="talk-to-team"
      />
    </div>
  )
}

export default TalkToTeamCta
