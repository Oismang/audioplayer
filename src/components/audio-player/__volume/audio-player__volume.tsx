import { ChangeEvent, useRef } from "react";
import VolumeIcon from "../../../assets/icons/volume-icon.svg";
import VolumeOffIcon from "../../../assets/icons/volume-off-icon.svg";
import "./audio-player__volume.scss";

interface AudioPlayerVolumeProps {
  audioRef: React.RefObject<HTMLAudioElement>,
  volume: number,
  setVolume: (value: number) => void
}

function AudioPlayerVolume({ audioRef, volume, setVolume }: AudioPlayerVolumeProps) {
  const prevVolume = useRef<number>(100);

  const setVolumeAndUpdate = (volume: number) => {
    setVolume(volume);
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVolumeAndUpdate(+event.currentTarget.value);
  }

  const handleVolumeOff = () => {
    if (volume === 0) {
      setVolumeAndUpdate(prevVolume.current);
    } else {
      prevVolume.current = volume;
      setVolumeAndUpdate(0);
    }
  }

  return (
    <div className="audio-player__volume-container">
      <button className="audio-player__volume-off"
        aria-label="Volume off"
        onClick={handleVolumeOff}>
        {volume === 0
          ? <VolumeOffIcon className="audio-player__volume-icon"></VolumeOffIcon>
          : <VolumeIcon className="audio-player__volume-icon"></VolumeIcon>
        }
      </button>
      <input className="audio-player__volume-range"
        aria-label="audio volume range"
        type="range"
        max={100}
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
};

export default AudioPlayerVolume;