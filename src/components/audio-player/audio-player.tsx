import { useCallback, useEffect, useRef, useState } from "react";
import { AudioData, audioData } from "../../data";
import AudioPlayerActions from "./__actions/audio-player__actions";
import AudioPlayerImage from "./__image/audio-player__image";
import AudioPlayerProgress from "./__progress/audio-player__progress";
import AudioPlayerVolume from "./__volume/audio-player__volume";
import "./audio-player.scss";

function AudioPlayer() {
  const [audioList] = useState<AudioData[]>(audioData);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioIndex, setAudioIndex] = useState<number>(0);
  const [timeProgress, setTimeProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentAudio = audioList[audioIndex];

  const handleNextAudio = useCallback(() => {
    if (audioIndex === audioList.length - 1) {
      setAudioIndex(0);
    } else {
      setAudioIndex(audioIndex + 1);
    }
  }, [audioIndex, audioList]);

  const handlePrevAudio = () => {
    if (audioIndex === 0) {
      setAudioIndex(audioList.length - 1);
    } else {
      setAudioIndex(audioIndex - 1);
    }
  }

  const handleRef = (node: HTMLAudioElement) => {
    audioRef.current = node;
    if (isPlaying && node) {
      node.play();
    }
  }

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setVolume(audioRef.current.volume * 100);
    }
  };

  useEffect(() => {
    audioRef.current?.addEventListener("ended", handleNextAudio);

    return () => {
      audioRef.current?.removeEventListener("ended", handleNextAudio);
    }
  }, [handleNextAudio]);

  useEffect(() => {
    function onTimeUpdate() {
      if (audioRef.current) {
        setTimeProgress(audioRef.current.currentTime);
      }
    }

    audioRef.current?.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audioRef.current?.removeEventListener("timeupdate", onTimeUpdate);
    }
  }, []);

  return (
    <section className="audio-player">
      <audio src={currentAudio.audioUrl}
        ref={handleRef}
        onLoadedMetadata={onLoadedMetadata}
      />
      <AudioPlayerActions
        {...{
          audioRef,
          isPlaying,
          setIsPlaying,
          handleNextAudio,
          handlePrevAudio
        }} />
      <div className="audio-player__settings">
        <AudioPlayerVolume
          {...{
            audioRef,
            volume,
            setVolume
          }} />
        <div className="audio-player__description">
          <p className="audio-player__name">{currentAudio.name}</p>
          <p className="audio-player__author">{currentAudio.author}</p>
        </div>
        {isPlaying && <AudioPlayerProgress
          {...{
            audioRef,
            timeProgress,
            duration,
            setTimeProgress
          }} />}
      </div>
      <AudioPlayerImage
        imageUrl={currentAudio.logoUrl}  
        isPlaying={isPlaying}
      />
    </section>
  );
}

export default AudioPlayer;