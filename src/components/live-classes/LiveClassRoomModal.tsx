import React, { useState } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Share2,
  Hand,
  PhoneOff,
  MessageSquare,
  Users,
  Send,
  Sparkles,
  Info,
  ShieldCheck,
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { LiveClass } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/formatters';

interface LiveClassRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  liveClass: LiveClass | null;
}

interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  text: string;
  timestamp: string;
  isInstructor?: boolean;
}

export const LiveClassRoomModal: React.FC<LiveClassRoomModalProps> = ({
  isOpen,
  onClose,
  liveClass,
}) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'chat' | 'participants' | 'agenda'>('chat');
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCamOn, setIsCamOn] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [chatInput, setChatInput] = useState('');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'Dr. Sophia Vance',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      text: 'Welcome everyone! We are diving into architecture trade-offs. Feel free to type questions in the chat anytime.',
      timestamp: '18:02',
      isInstructor: true,
    },
    {
      id: 'msg-2',
      sender: 'Marcus Sterling',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      text: 'Excited for this! Sophia, how do you handle shared global state between decoupled micro-frontends?',
      timestamp: '18:04',
    },
    {
      id: 'msg-3',
      sender: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      text: 'Using CustomEvents or a lightweight pub-sub bus has worked really well for our distributed apps.',
      timestamp: '18:05',
    },
  ]);

  if (!liveClass) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: user?.name || 'You',
      avatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      text: chatInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setChatInput('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      className="p-0 bg-slate-950 border-slate-800 text-white overflow-hidden max-h-[92vh]"
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
          <div>
            <h3 className="text-sm font-bold text-white truncate max-w-md">
              {liveClass.title}
            </h3>
            <p className="text-xs text-slate-400">
              Instructor: {liveClass.instructor.name} • Fee: {liveClass.isFree || liveClass.price === 0 ? 'Free' : formatCurrency(liveClass.price)} • Room ID: {liveClass.meetingDemoId}
            </p>
          </div>
        </div>

        {/* Tab selection */}
        <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl text-xs">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1 rounded-lg font-medium flex items-center gap-1.5 transition-colors ${activeTab === 'chat' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat ({messages.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('participants')}
            className={`px-3 py-1 rounded-lg font-medium flex items-center gap-1.5 transition-colors ${activeTab === 'participants' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Students ({liveClass.currentAttendees})</span>
          </button>
          <button
            onClick={() => setActiveTab('agenda')}
            className={`px-3 py-1 rounded-lg font-medium flex items-center gap-1.5 transition-colors ${activeTab === 'agenda' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Agenda</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Video Stream + Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 h-[480px]">
        {/* Live Stage Stream Simulator */}
        <div className="lg:col-span-2 relative bg-black flex flex-col justify-between p-4">
          {/* Main Presenter Video Window */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80"
              alt="Live Screen Share"
              className="w-full h-full object-cover opacity-60"
            />

            {/* Presenter PIP Avatar */}
            <div className="absolute bottom-4 left-4 bg-slate-900/90 border border-slate-700/80 p-2 rounded-xl flex items-center gap-2.5 backdrop-blur-md">
              <img
                src={liveClass.instructor.avatar}
                alt={liveClass.instructor.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500"
              />
              <div className="text-left">
                <p className="text-xs font-bold text-white leading-tight">
                  {liveClass.instructor.name}
                </p>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  Speaking • Presenter
                </p>
              </div>
            </div>

            {/* Live Indicator */}
            <div className="absolute top-4 left-4 bg-rose-600 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider flex items-center gap-1.5 uppercase shadow-lg">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Live Stream Simulator
            </div>
          </div>

          {/* Interactive Classroom Controls Footer */}
          <div className="pt-3 flex items-center justify-center gap-3">
            <button
              onClick={() => setIsMicOn(!isMicOn)}
              className={`p-3 rounded-full transition-colors ${isMicOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-600/20 text-rose-400 hover:bg-rose-600/30'
                }`}
              title={isMicOn ? 'Mute Microphone' : 'Unmute Microphone'}
            >
              {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsCamOn(!isCamOn)}
              className={`p-3 rounded-full transition-colors ${isCamOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-600/20 text-rose-400 hover:bg-rose-600/30'
                }`}
              title={isCamOn ? 'Turn Off Camera' : 'Turn On Camera'}
            >
              {isCamOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsHandRaised(!isHandRaised)}
              className={`p-3 rounded-full transition-colors ${isHandRaised
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              title="Raise hand to ask question"
            >
              <Hand className="w-5 h-5" />
            </button>

            <button
              className="p-3 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
              title="Share Screen (Simulated)"
            >
              <Share2 className="w-5 h-5" />
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-lg"
            >
              <PhoneOff className="w-4 h-4" />
              <span>Leave Room</span>
            </button>
          </div>
        </div>

        {/* Side Panel (Chat, Participants, Agenda) */}
        <div className="bg-slate-900 border-l border-slate-800 flex flex-col h-full">
          {activeTab === 'chat' && (
            <div className="flex flex-col h-full">
              {/* Chat Message List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-2.5 text-xs">
                    <img
                      src={msg.avatar}
                      alt={msg.sender}
                      className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-slate-700"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span
                          className={`font-semibold ${msg.isInstructor ? 'text-brand-400' : 'text-slate-200'
                            }`}
                        >
                          {msg.sender}
                        </span>
                        {msg.isInstructor && (
                          <span className="text-[10px] bg-brand-950 text-brand-300 px-1.5 py-0.2 rounded border border-brand-800">
                            Host
                          </span>
                        )}
                        <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                      </div>
                      <p className="text-slate-300 bg-slate-800/80 p-2.5 rounded-xl border border-slate-800 leading-relaxed break-words">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input Box */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 border-t border-slate-800 bg-slate-950 flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask a question or share a thought..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="bg-brand-600 hover:bg-brand-500 disabled:opacity-40 text-white p-2 rounded-xl transition-colors shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {activeTab === 'participants' && (
            <div className="p-4 overflow-y-auto space-y-3 flex-1 text-xs">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Host & Instructor (1)
              </p>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/60 border border-slate-700">
                <div className="flex items-center gap-2.5">
                  <img
                    src={liveClass.instructor.avatar}
                    alt={liveClass.instructor.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-white">{liveClass.instructor.name}</p>
                    <p className="text-[10px] text-brand-400">Instructor & Host</p>
                  </div>
                </div>
                <Mic className="w-4 h-4 text-emerald-400" />
              </div>

              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pt-2">
                Active Attendees ({liveClass.currentAttendees})
              </p>
              <div className="space-y-2">
                {[
                  { name: 'Alex Rivera (You)', role: 'Student', mic: isMicOn },
                  { name: 'Elena Rostova', role: 'Student', mic: false },
                  { name: 'Marcus Sterling', role: 'Student', mic: false },
                  { name: 'Chloe Bennett', role: 'Student', mic: false },
                  { name: 'David Miller', role: 'Student', mic: false },
                ].map((att, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-800/40 text-slate-300"
                  >
                    <span className="font-medium">{att.name}</span>
                    {att.mic ? (
                      <Mic className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <MicOff className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'agenda' && (
            <div className="p-4 overflow-y-auto space-y-3 flex-1 text-xs">
              <h4 className="font-bold text-white text-sm">Class Agenda</h4>
              <ul className="space-y-2.5">
                {liveClass.agenda.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-brand-900/80 text-brand-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Architecture Disclaimer */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
        <Info className="w-4 h-4 text-brand-400 shrink-0" />
        <span>
          <strong>Live Video Integration Ready:</strong> This interface is a working frontend prototype. For production deployment, connect WebRTC video streaming via LiveKit, Daily.co, Agora, or Zoom Video SDK.
        </span>
      </div>
    </Modal>
  );
};
