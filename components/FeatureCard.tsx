
import React from 'react';
import { FeatureSection } from '../types';
import Navbar from './Navbar';

interface FeatureCardProps {
  section: FeatureSection;
  onNavigate: (index: number) => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ section, onNavigate }) => {
  const isRsvp = section.id === 'rsvp-section';
  const isHome = section.id === 'home-section';
  const isLunch = section.id === 'welcome-lunch-section';
  const isSangeet = section.id === 'sangeet-section';
  const isMehendi = section.id === 'mehendi-section';
  const isOpenHouse = section.id === 'open-house-dinner-section';
  const isAnandKaraj = section.id === 'anand-karaj-section';
  const isReception = section.id === 'reception-section';
  const isTravel = section.id === 'travel-section';
  const isAccommodation = section.id === 'accommodation-section';
  const isFaq = section.id === 'faq-section';
  
  const isFullCard = isHome || isRsvp || isLunch || isSangeet || isMehendi || isOpenHouse || isAnandKaraj || isReception || isTravel || isAccommodation || isFaq;

  return (
    <div className={`w-full md:w-full max-w-[1400px] h-screen md:h-[82vh] bg-white/75 md:bg-white/75 backdrop-blur-xl md:rounded-[2rem] border-0 md:border border-white/80 shadow-none md:shadow-[0_20px_60px_rgba(139,115,85,0.18)] overflow-hidden flex flex-col relative group md:mx-20`}>
      <Navbar onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col overflow-hidden relative">
        {isFullCard ? (
          <div className="w-full h-full overflow-y-auto no-scrollbar pb-12">
             {section.content}
          </div>
        ) : (
          <div className="flex-1 flex flex-col md:flex-row pb-12 overflow-y-auto no-scrollbar md:overflow-hidden">
            <div className="w-full md:w-[40%] p-6 md:p-12 lg:p-16 flex flex-col justify-center space-y-4 md:space-y-6 z-10">
              <div className="space-y-2 md:space-y-4">
                <h2 className="text-xl md:text-5xl font-serif text-[#8c7456] leading-tight">
                  {section.title}
                </h2>
                <p className="text-[#2a4d1a] text-xs md:text-lg leading-relaxed font-serif italic">
                  {section.description}
                </p>
              </div>
              
              <button className="flex items-center gap-2 md:gap-3 text-[#8c7456] font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] group/btn transition-all self-start">
                <span className="border-b border-[#8c7456]/30 pb-1 group-hover/btn:border-[#8c7456] transition-colors">Explore Details</span>
                <svg className="w-3 h-3 md:w-4 md:h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            <div className="flex-1 bg-white/30 m-2 md:m-8 rounded-[1rem] md:rounded-[1.5rem] border border-white/50 shadow-inner overflow-hidden relative min-h-[300px] md:min-h-0">
               {section.content}
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 py-2 md:py-4 flex justify-center bg-gradient-to-t from-white/90 to-transparent pointer-events-none">
          <p className="text-[6px] md:text-[10px] font-['Montserrat'] tracking-[0.2em] md:tracking-[0.3em] text-[#8c7456]/80 uppercase">
            © 2026 THE WEDDING OF ANGAD & NIKITA.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
