import { ChangeEvent } from "react";
import "./audio-player__progress.scss";

interface AudioPlayerProgressProps {
  audioRef: React.RefObject<HTMLAudioElement>,
  duration: number,
  timeProgress: number,
  setTimeProgress: (value: number) => void
}

function AudioPlayerProgress({ audioRef, timeProgress, duration, setTimeProgress }: AudioPlayerProgressProps) {
  const handleProgressChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newProgress = +event.currentTarget.value;
    setTimeProgress(newProgress);
    if (audioRef.current) {
      audioRef.current.currentTime = newProgress;
    }
  }

  return (
    <input className="audio-player__progress" type="range"
      onChange={handleProgressChange}
      defaultValue="0"
      max={duration}
      value={timeProgress} />
  );
};

export default AudioPlayerProgress;