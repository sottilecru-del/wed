
import React, { useState } from 'react';

interface NavbarProps {
  onNavigate: (index: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);

  const eventItems = [
    { label: 'WELCOME LUNCH', index: 1 },
    { label: 'SANGEET', index: 2 },
    { label: 'MEHENDI', index: 3 },
    { label: 'OPEN HOUSE DINNER', index: 4 },
    { label: 'ANAND KARAJ (SIKH WEDDING)', index: 5 },
    { label: 'RECEPTION', index: 6 },
  ];

  const handleNavClick = (index: number) => {
    onNavigate(index);
    setIsMenuOpen(false);
    setIsEventsOpen(false);
  };

  return (
    <header className="w-full flex flex-col items-center bg-transparent pt-2 md:pt-6 relative z-50">
      {/* Top Branding Row */}
      <div className="w-full max-w-[1400px] flex items-center justify-between px-4 md:px-12 relative pb-2">
        {/* Left Elephant - Desktop Only */}
        <img 
          src="https://static.wixstatic.com/media/7fa905_4859514a70754abd9e2443428fdfc675~mv2.png" 
          className="hidden md:block w-32 h-32 object-contain" 
          alt="Elephant Decorative Left" 
        />

        {/* Hamburger Menu Trigger - Mobile Only */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-[#8c7456]"
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>

        {/* Center Branding Cluster */}
        <div className="flex flex-col items-center flex-1">
          <div className="flex items-center gap-2 md:gap-12">
            <span className="text-lg md:text-6xl font-['Playfair_Display'] font-normal text-[#8c7456] tracking-[0.1em]">ANGAD</span>
            <img 
              src="https://static.wixstatic.com/media/7fa905_98c5b2d2963346ee9df9e310c92b9758~mv2.png" 
              className="w-12 h-12 md:w-48 md:h-48 object-contain mx-2 md:mx-4" 
              alt="Wedding Emblem" 
            />
            <span className="text-lg md:text-6xl font-['Playfair_Display'] font-normal text-[#8c7456] tracking-[0.1em]">NIKITA</span>
          </div>
          
          <div className="mt-1">
             <p className="text-[7px] md:text-[14px] font-['Montserrat'] font-medium text-[#8c7456] uppercase tracking-[0.2em] md:tracking-[0.25em]">
               SEPTEMBER 4-6, 2026 | JAIPUR, INDIA
             </p>
          </div>
        </div>

        {/* Right Elephant - Desktop Only */}
        <img 
          src="https://static.wixstatic.com/media/7fa905_1925bc3be5214d43bad0108cba5ebfab~mv2.png" 
          className="hidden md:block w-32 h-32 object-contain" 
          alt="Elephant Decorative Right" 
        />

        <div className="w-10 md:hidden"></div>
      </div>

      {/* Desktop Navigation Bar */}
      <nav className="hidden md:block w-full bg-[#c5d8b2] py-3 mt-2 border-y border-[#8c7456]/10 shadow-sm relative">
        <div className="mx-auto px-4 flex justify-center items-center gap-16">
          <button onClick={() => onNavigate(0)} className="text-[13px] font-['Montserrat'] font-semibold uppercase tracking-[0.2em] text-[#005a32] hover:opacity-60 transition-opacity">HOME</button>
          
          {/* Events Dropdown Container */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsEventsOpen(true)}
            onMouseLeave={() => setIsEventsOpen(false)}
          >
            <button className="text-[13px] font-['Montserrat'] font-semibold uppercase tracking-[0.2em] text-[#005a32] hover:opacity-60 transition-opacity flex items-center gap-2">
              EVENTS
              <svg className={`w-3 h-3 transition-transform ${isEventsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-[#fdfaf3] border border-[#8c7456]/20 shadow-xl rounded-xl overflow-hidden transition-all duration-300 ${isEventsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
              <div className="flex flex-col py-2">
                {eventItems.map((item) => (
                  <button 
                    key={item.label}
                    onClick={() => handleNavClick(item.index)}
                    className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-[0.15em] text-[#8c7456] hover:bg-[#c5d8b2] hover:text-[#005a32] transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button onClick={() => onNavigate(7)} className="text-[13px] font-['Montserrat'] font-semibold uppercase tracking-[0.2em] text-[#005a32] hover:opacity-60 transition-opacity">TRAVEL</button>
          <button onClick={() => onNavigate(8)} className="text-[13px] font-['Montserrat'] font-semibold uppercase tracking-[0.2em] text-[#005a32] hover:opacity-60 transition-opacity">ACCOMODATIONS</button>
          <button onClick={() => onNavigate(9)} className="text-[13px] font-['Montserrat'] font-semibold uppercase tracking-[0.2em] text-[#005a32] hover:opacity-60 transition-opacity whitespace-nowrap">FAQ'S</button>
          <button onClick={() => onNavigate(10)} className="text-[13px] font-['Montserrat'] font-semibold uppercase tracking-[0.2em] text-[#005a32] hover:opacity-60 transition-opacity">RSVP</button>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div className={`md:hidden fixed inset-0 bg-[#fdfaf3] z-[100] transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="h-full flex flex-col items-center justify-center p-6 space-y-6 overflow-y-auto no-scrollbar">
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-[#8c7456]"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <img 
            src="https://static.wixstatic.com/media/7fa905_98c5b2d2963346ee9df9e310c92b9758~mv2.png" 
            className="w-24 h-24 object-contain mb-4" 
            alt="Emblem" 
          />

          <button onClick={() => handleNavClick(0)} className="text-xl font-['Montserrat'] font-bold uppercase tracking-[0.2em] text-[#005a32]">HOME</button>
          
          <div className="flex flex-col items-center gap-3 py-2 border-y border-[#8c7456]/10 w-full max-w-xs">
            <span className="text-[10px] font-black tracking-[0.4em] text-[#8c7456] mb-2">EVENTS</span>
            {eventItems.map(event => (
              <button 
                key={event.label}
                onClick={() => handleNavClick(event.index)}
                className="text-[13px] font-['Montserrat'] font-medium uppercase tracking-[0.15em] text-[#005a32] text-center"
              >
                {event.label}
              </button>
            ))}
          </div>

          <button onClick={() => handleNavClick(7)} className="text-lg font-['Montserrat'] font-bold uppercase tracking-[0.2em] text-[#005a32]">TRAVEL</button>
          <button onClick={() => handleNavClick(8)} className="text-lg font-['Montserrat'] font-bold uppercase tracking-[0.2em] text-[#005a32]">ACCOMODATIONS</button>
          <button onClick={() => handleNavClick(9)} className="text-lg font-['Montserrat'] font-bold uppercase tracking-[0.2em] text-[#005a32]">FAQ'S</button>
          <button onClick={() => handleNavClick(10)} className="text-xl font-['Montserrat'] font-bold uppercase tracking-[0.2em] text-[#005a32]">RSVP</button>

          <div className="pt-8 flex gap-8">
            <img src="https://static.wixstatic.com/media/7fa905_4859514a70754abd9e2443428fdfc675~mv2.png" className="w-12 h-12 object-contain opacity-40" alt="Elephant" />
            <img src="https://static.wixstatic.com/media/7fa905_1925bc3be5214d43bad0108cba5ebfab~mv2.png" className="w-12 h-12 object-contain opacity-40" alt="Elephant" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
