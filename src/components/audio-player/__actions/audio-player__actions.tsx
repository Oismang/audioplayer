import "./audio-player__actions.scss";
import NextIcon from "../../../assets/icons/next-icon.svg";
import PlayIcon from "../../../assets/icons/play-icon.svg";
import PauseIcon from "../../../assets/icons/pause-icon.svg";

interface AudioPlayerActionsProps {
  audioRef: React.RefObject<HTMLAudioElement>,
  isPlaying: boolean,
  setIsPlaying: (value: boolean) => void,
  handleNextAudio: () => void,
  handlePrevAudio: () => void,
}

function AudioPlayerActions({ audioRef, isPlaying, setIsPlaying, handleNextAudio, handlePrevAudio }: AudioPlayerActionsProps) {

  const handlePlayButtonClick = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }

    setIsPlaying(!isPlaying);
  }

  return (
    <div className="audio-player__actions">
      <button className="audio-player__next audio-player__button"
        aria-label="Next audio"
        onClick={handleNextAudio}>
        <NextIcon />
      </button>
      <button className="audio-player__play audio-player__button"
        aria-label="Play or pause"
        onClick={handlePlayButtonClick}>
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button className="audio-player__prev audio-player__button"
        aria-label="Previous audio"
        onClick={handlePrevAudio}>
        <NextIcon />
      </button>
    </div>
  );
}

export default AudioPlayerActions;