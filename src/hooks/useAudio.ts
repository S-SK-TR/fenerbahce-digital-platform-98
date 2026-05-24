import { useState, useRef } from 'react';

interface UseAudioProps {
  volume?: number;
}

export function useAudio({ volume = 0.7 }: UseAudioProps = {}) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = (audioUrl: string, id: string) => {
    if (playingId === id) {
      stopSound();
      return;
    }

    stopSound();
    setPlayingId(id);

    audioRef.current = new Audio(audioUrl);
    audioRef.current.volume = volume;
    audioRef.current.play().catch(error => {
      console.error('Ses oynatma hatası:', error);
      setPlayingId(null);
    });

    audioRef.current.onended = () => {
      setPlayingId(null);
    };
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlayingId(null);
  };

  const setVolume = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return { playSound, stopSound, setVolume, playingId };
}