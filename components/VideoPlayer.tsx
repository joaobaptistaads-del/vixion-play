"use client"

import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'
import { trackEvent } from '../lib/analytics'

type Props = {
  src: string
  poster?: string
  subtitles?: string
}

export default function VideoPlayer({ src, poster, subtitles }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const trackRef = useRef<HTMLTrackElement | null>(null)
  const [captions, setCaptions] = useState(false)
  const [isPip, setIsPip] = useState(false)
  const hlsRef = useRef<Hls | null>(null)
  const [levels, setLevels] = useState<Array<any>>([])
  const [selectedQuality, setSelectedQuality] = useState<number | 'auto'>('auto')

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src
    } else if (Hls.isSupported()) {
      const hls = new Hls({ lowLatencyMode: true })
      hlsRef.current = hls
      hls.loadSource(src)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        // expose levels for UI
        try {
          const lv = hls.levels || []
          setLevels(lv.map((l: any, i: number) => ({ index: i, height: l.height, width: l.width, bitrate: l.bitrate })))
        } catch (e) {}
      })
      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS error', event, data)
        trackEvent('player.hls.error', { event, data })
      })

      return () => {
        hls.destroy()
        hlsRef.current = null
      }
    } else {
      video.src = src
    }

    const onKey = (e: KeyboardEvent) => {
      if (!video) return
      if (e.code === 'Space') {
        e.preventDefault()
        if (video.paused) video.play()
        else video.pause()
      }
      if (e.key === 'm') video.muted = !video.muted
      if (e.key === 'f') {
        if (document.fullscreenElement) document.exitFullscreen()
        else video.requestFullscreen().catch(() => {})
      }
      if (e.key === 'p') {
        // toggle Picture-in-Picture
        // @ts-ignore
        if ((document as any).pictureInPictureElement) {
          // @ts-ignore
          ;(document as any).exitPictureInPicture()
        } else if ((video as any).requestPictureInPicture) {
          // @ts-ignore
          ;(video as any).requestPictureInPicture().catch(() => {})
        }
      }
    }

    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('keydown', onKey)
    }
  }, [src])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    try {
      // @ts-ignore
      track.mode = captions ? 'showing' : 'hidden'
      trackEvent('player.captions.toggle', { enabled: captions })
    } catch (e) {
      // ignore
    }
  }, [captions])

  const togglePip = async () => {
    const video = videoRef.current
    if (!video) return
    // @ts-ignore
    if ((document as any).pictureInPictureElement) {
      try {
        // @ts-ignore
        await (document as any).exitPictureInPicture()
        setIsPip(false)
        trackEvent('player.pip', { enabled: false })
      } catch (e) {}
    } else if ((video as any).requestPictureInPicture) {
      try {
        // @ts-ignore
        await (video as any).requestPictureInPicture()
        setIsPip(true)
        trackEvent('player.pip', { enabled: true })
      } catch (e) {}
    }
  }

  const onQualityChange = (val: string) => {
    const video = videoRef.current
    const hls = hlsRef.current
    if (!video || !hls) return
    if (val === 'auto') {
      hls.currentLevel = -1
      setSelectedQuality('auto')
      trackEvent('player.quality.change', { quality: 'auto' })
      return
    }
    const idx = Number(val)
    hls.currentLevel = idx
    setSelectedQuality(idx)
    trackEvent('player.quality.change', { quality: idx })
  }

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        controls
        poster={poster}
        className="w-full h-full bg-black"
        playsInline
      >
        {subtitles && <track ref={trackRef} kind="subtitles" src={subtitles} srcLang="pt" label="Português" />}
      </video>

      <div className="absolute top-3 right-3 flex gap-2">
        {levels.length > 0 && (
          <select
            value={selectedQuality}
            onChange={(e) => onQualityChange(e.target.value)}
            className="px-2 py-1 rounded bg-black/50 text-sm"
            aria-label="Qualidade de reprodução"
          >
            <option value="auto">Auto</option>
            {levels.map((l) => (
              <option key={l.index} value={String(l.index)}>
                {l.height ? `${l.height}p` : `${Math.round((l.bitrate||0)/1000)} kbps`}
              </option>
            ))}
          </select>
        )}
        {subtitles && (
          <button
            onClick={() => setCaptions((s) => !s)}
            aria-pressed={captions}
            aria-label="Toggle subtitles"
            title={captions ? 'Desativar legendas' : 'Ativar legendas'}
            className="px-2 py-1 rounded bg-black/50 hover:bg-black/60 text-sm"
          >
            CC
          </button>
        )}
        <button
          onClick={togglePip}
          aria-pressed={isPip}
          aria-label="Toggle Picture-in-Picture"
          title="Picture-in-Picture"
          className="px-2 py-1 rounded bg-black/50 hover:bg-black/60 text-sm"
        >
          PiP
        </button>
      </div>
    </div>
  )
}
