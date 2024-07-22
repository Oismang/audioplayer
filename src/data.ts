import leagueAudio from "./assets/music/bensound-league.mp3";
import loveoflifeAudio from "./assets/music/bensound-loveoflife.mp3";
import nohipnohopAudio from "./assets/music/bensound-nohipnohop.mp3";

export interface AudioData {
  name: string;
  author: string;
  audioUrl: string;
  logoUrl: string;
}

export const audioData: AudioData[] = [
  {
    name: "League",
    author: "Risian",
    audioUrl: leagueAudio,
    logoUrl: "https://cdn.bensound.com/image/cover/risian.webp"
  },
  {
    name: "Love Of Life",
    author: "Zirui Wang",
    audioUrl: loveoflifeAudio,
    logoUrl: "https://cdn.bensound.com/image/cover/ziruiwang-achinesetale.webp"
  },
  {
    name: "No Hip, No Hop",
    author: "TwinsMusic",
    audioUrl: nohipnohopAudio,
    logoUrl: "https://cdn.bensound.com/image/cover/twinsmusic-retro.webp"
  },
]