import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SoundboardItem } from '../types';
import { useAudio } from '@/hooks/useAudio';

interface SoundboardProps {
  items: SoundboardItem[];
}

export function Soundboard({ items }: SoundboardProps) {
  const { playSound, playingId } = useAudio();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {items.map((item) => (
        <motion.button
          key={item.id}
          onClick={() => playSound(item.audioUrl, item.id)}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "glass-card flex flex-col items-center justify-center p-4 rounded-xl aspect-square",
            playingId === item.id ? "ring-2 ring-fb-gold-500" : "hover:bg-white/5"
          )}
        >
          <div className="text-fb-gold-500 mb-2">
            {item.icon}
          </div>
          <span className="text-xs font-medium text-center">{item.name}</span>
          {playingId === item.id && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-2 -right-2 bg-fb-gold-500 rounded-full p-1"
            >
              <Volume2 size={12} className="text-white" />
            </motion.div>
          )}
        </motion.button>
      ))}
    </div>
  );
}