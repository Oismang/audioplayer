import "./audio-player__image.scss";

interface AudioPlayerImageProps {
  imageUrl: string;
  isPlaying: boolean;
}

function AudioPlayerImage({ imageUrl, isPlaying }: AudioPlayerImageProps) {
  return (
    <img className={`audio-player__image ${isPlaying ? "audio-player__image_animation-play" : ""}`}
      width={300}
      height={300}
      src={imageUrl}
      alt="audio img" />
  );
}

export default AudioPlayerImage;