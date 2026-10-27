import React, { useState } from 'react'
import VideoDialog from '../VideoDialog'

const VideoModal = () => {

  const [isOpen, setOpen] = useState(false)

  return (
    <React.Fragment>
      <VideoDialog isOpen={isOpen} onClose={() => setOpen(false)} videoId="3SsK-cxlj_w" />

      <div className="video_btn">
       <button className="btn-video" onClick={() => setOpen(true)}><i className="far fa-play" aria-hidden="true"></i></button>

      </div>
    </React.Fragment>
  )
}

export default VideoModal;
