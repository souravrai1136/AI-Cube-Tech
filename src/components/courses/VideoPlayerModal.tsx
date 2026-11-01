import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, ShieldAlert } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Lesson } from '../../types';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: Lesson | null;
  courseTitle: string;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  isOpen,
  onClose,
  lesson,
  courseTitle,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  if (!lesson) return null;

  const defaultSampleVideo =
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  const videoSrc = lesson.videoUrl || defaultSampleVideo;

  const handlePlayToggle = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      if (total > 0) {
        setProgress((current / total) * 100);
      }
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (videoRef.current) videoRef.current.pause();
        setIsPlaying(false);
        onClose();
      }}
      title={`Lecture Preview: ${lesson.title}`}
      description={courseTitle}
      size="xl"
    >
      <div className="space-y-4">
        {/* Video Player Container */}
        <div className="relative aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl flex items-center justify-center group">
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full h-full object-contain"
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            playsInline
          />

          {/* Central Play/Pause Overlay */}
          {!isPlaying && (
            <button
              onClick={handlePlayToggle}
              className="absolute w-16 h-16 rounded-full bg-brand-600/90 text-white flex items-center justify-center hover:scale-110 hover:bg-brand-500 transition-all shadow-xl"
              aria-label="Play video"
            >
              <Play className="w-8 h-8 fill-current ml-1" />
            </button>
          )}

          {/* Video Control Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
            {/* Scrubber */}
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer">
              <div
                className="bg-brand-500 h-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-3">
                <button onClick={handlePlayToggle} className="hover:text-brand-400">
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <button onClick={handleMuteToggle} className="hover:text-brand-400">
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span>Duration: {lesson.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleFullscreen} className="hover:text-brand-400">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Description */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <h4 className="text-sm font-bold text-slate-800 mb-1">Lecture Synopsis</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            {lesson.description ||
              'This preview lecture showcases instructor teaching methodology, practical coding demonstrations, and key foundational concepts.'}
          </p>
        </div>

        {/* Production Hosting Notice */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong>Video Architecture Note:</strong> AI Cube Tech uses an open-source demo stream placeholder for frontend evaluation. In production, this component seamlessly attaches to secure video providers such as Cloudflare Stream, Mux, or AWS CloudFront with signed HLS tokens.
          </p>
        </div>
      </div>
    </Modal>
  );
};
