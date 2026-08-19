/* Desert Modernism: quiet, tactile motion and restrained controls that stay subordinate to the interior imagery. */
import { useEffect, useRef, useState } from "react";
import { AudioLines, Volume2, VolumeX } from "lucide-react";

const MUSIC_SRC = "/audio/sanwariya-ambient-background.mp3";

export function AmbientMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.18;
    audio.muted = true;
    void audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));

    const startAudiblePlayback = () => {
      audio.muted = false;
      audio.volume = 0.18;
      void audio.play().then(() => {
        setIsMuted(false);
        setIsPlaying(true);
      }).catch(() => undefined);
      window.removeEventListener("pointerdown", startAudiblePlayback);
      window.removeEventListener("keydown", startAudiblePlayback);
    };

    window.addEventListener("pointerdown", startAudiblePlayback, { once: true, passive: true });
    window.addEventListener("keydown", startAudiblePlayback, { once: true });
    return () => {
      window.removeEventListener("pointerdown", startAudiblePlayback);
      window.removeEventListener("keydown", startAudiblePlayback);
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) void audio.play();
    const nextMuted = !audio.muted;
    audio.muted = nextMuted;
    audio.volume = 0.18;
    setIsMuted(nextMuted);
    setIsPlaying(true);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        autoPlay
        muted
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        aria-label="Sanwariya Interiors ambient background music"
      />
      <button
        type="button"
        onClick={toggleMusic}
        className="fixed bottom-5 left-5 z-50 inline-flex min-h-11 items-center gap-2 border border-white/20 bg-foreground/90 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-background shadow-lg backdrop-blur-md transition-colors hover:border-primary hover:text-primary"
        aria-label={isMuted ? "Turn ambient music on" : "Mute ambient music"}
        title={isMuted ? "Turn ambient music on" : "Mute ambient music"}
      >
        {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
        <span>{isPlaying ? "Ambient sound" : "Play music"}</span>
        <AudioLines className="h-3.5 w-3.5 text-primary" />
      </button>
    </>
  );
}
