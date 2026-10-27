import React, { useEffect } from 'react'
import { getYouTubeEmbedUrl } from './videoUrl'

const VideoDialog = ({ isOpen, videoId, onClose, title = 'Video player' }) => {
  const embedUrl = getYouTubeEmbedUrl(videoId)

  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !embedUrl) return null

  return (
    <div
      className="video_dialog_backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        aria-label={title}
        aria-modal="true"
        className="video_dialog"
        role="dialog"
      >
        <button
          aria-label="Close video"
          className="video_dialog_close"
          onClick={onClose}
          type="button"
        >
          <span aria-hidden="true">×</span>
        </button>
        <div className="video_dialog_frame">
          <iframe
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            src={embedUrl}
            title={title}
          />
        </div>
      </section>
      <style jsx>{`
        .video_dialog_backdrop {
          align-items: center;
          background: rgba(0, 0, 0, 0.82);
          display: flex;
          inset: 0;
          justify-content: center;
          padding: 24px;
          position: fixed;
          z-index: 9999;
        }
        .video_dialog {
          max-width: 960px;
          position: relative;
          width: 100%;
        }
        .video_dialog_close {
          align-items: center;
          background: #111;
          border: 1px solid #fff;
          border-radius: 50%;
          color: #fff;
          cursor: pointer;
          display: flex;
          font-size: 30px;
          height: 44px;
          justify-content: center;
          line-height: 1;
          padding: 0;
          position: absolute;
          right: -16px;
          top: -16px;
          width: 44px;
          z-index: 1;
        }
        .video_dialog_frame {
          aspect-ratio: 16 / 9;
          background: #000;
          width: 100%;
        }
        .video_dialog_frame iframe {
          border: 0;
          height: 100%;
          width: 100%;
        }
        @media (max-width: 600px) {
          .video_dialog_backdrop {
            padding: 18px;
          }
          .video_dialog_close {
            right: -8px;
            top: -48px;
          }
        }
      `}</style>
    </div>
  )
}

export default VideoDialog
