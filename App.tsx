import React, { useRef, useState, useEffect } from 'react';
import FeatureCard from './components/FeatureCard';
import { FeatureSection } from './types';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';

const App: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: '',
    events: [] as string[],
    guestsCount: ''
  });

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminMode(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const scrollToSection = (index: number) => {
    scrollContainerRef.current?.scrollTo({ 
      top: index * window.innerHeight, 
      behavior: 'smooth' 
    });
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.attending) {
      alert("Please fill in all required fields.");
      return;
    }
    
    if (formData.attending === 'yes' && !formData.guestsCount) {
      alert("Please specify the number of guests.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/spppl.in@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          attending: formData.attending,
          guestsCount: formData.guestsCount,
          events: formData.events.join(", "),
          _subject: `New Wedding RSVP from ${formData.name}`,
          _template: 'table'
        })
      });

      if (!response.ok) throw new Error("Email submission failed");

      const newSubmission = {
        id: Date.now(),
        ...formData,
        date: new Date().toLocaleString()
      };

      const existingSubmissions = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      localStorage.setItem('wedding_rsvps', JSON.stringify([...existingSubmissions, newSubmission]));
      
      alert("RSVP Sent Successfully! We have received your response.");
      setFormData({ name: '', email: '', attending: '', events: [], guestsCount: '' });
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Something went wrong. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEventToggle = (event: string) => {
    setFormData(prev => ({
      ...prev,
      events: prev.events.includes(event) 
        ? prev.events.filter(e => e !== event) 
        : [...prev.events, event]
    }));
  };

  const features: FeatureSection[] = [
    {
      id: 'home-section',
      title: 'Home',
      tagline: '',
      description: '',
      accentColor: '',
      image: '',
      content: (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
          <div className="flex-1 w-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 py-4 md:py-16">
            <div className="relative p-1 md:p-2 bg-[#8c7456]/10 border border-[#8c7456]/30 shadow-xl overflow-hidden">
              <div className="relative border border-[#8c7456]/40 p-1 md:p-2 overflow-hidden">
                <div className="w-[180px] h-[260px] md:w-[320px] md:h-[450px] overflow-hidden">
                  <img 
                    src="https://static.wixstatic.com/media/7fa905_e155efedb975443d94374dc92a534529~mv2.png" 
                    className="w-full h-full object-cover animate-slow-zoom" 
                    alt="The Couple" 
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center text-center space-y-1 md:space-y-4 order-3 md:order-2">
              <h1 className="text-3xl md:text-5xl font-['Playfair_Display'] tracking-[0.05em] text-[#8c7456]">ANGAD & NIKITA</h1>
              <div className="h-[1px] w-20 md:w-32 bg-[#8c7456]/30 my-1 md:my-2" />
              <p className="text-[10px] md:text-xs font-['Montserrat'] tracking-[0.3em] md:tracking-[0.4em] text-[#005a32] uppercase px-4">SEPTEMBER 2026</p>
            </div>

            <div className="relative p-1 md:p-2 bg-[#8c7456]/10 border border-[#8c7456]/30 shadow-xl order-2 md:order-3 overflow-hidden">
              <div className="relative border border-[#8c7456]/40 p-1 md:p-2 overflow-hidden">
                <div className="w-[180px] h-[260px] md:w-[320px] md:h-[450px] overflow-hidden">
                  <img 
                    src="https://static.wixstatic.com/media/7fa905_6aad8229b1ad47a9bb66a231faeb3eb9~mv2.png" 
                    className="w-full h-full object-cover animate-slow-zoom-delayed" 
                    alt="The Proposal" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'welcome-lunch-section',
      title: 'Welcome Lunch',
      tagline: 'September 4',
      description: 'Kick off the celebrations with typical Rajasthani hospitality.',
      accentColor: '#c8e4b7',
      image: '',
      content: (
        <div className="h-full w-full flex flex-col md:flex-row relative bg-[#fdfaf3]/40">
          <div className="w-full md:w-1/2 h-[42%] md:h-full relative overflow-hidden flex items-center justify-center p-4">
            <img 
              src="https://static.wixstatic.com/media/7fa905_5a8dee801a7b4a76991442a012e3c98b~mv2.png" 
              className="w-full h-full object-contain scale-125 md:scale-125" 
              alt="Welcome Lunch Illustration" 
            />
          </div>

          <div className="w-full md:w-1/2 h-[58%] md:h-full flex items-center justify-center p-4 md:p-12 relative">
            <div className="w-full h-full max-h-[500px] bg-[#c8e4b7] relative flex flex-col p-6 md:p-12 shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-4 md:h-6 z-10" style={{
                backgroundImage: 'url("https://static.wixstatic.com/media/7fa905_1b337ec811e9407d9159e6ac1b7f96f3~mv2.png")',
                backgroundSize: 'auto 100%',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'top'
              }} />
              <div className="absolute bottom-0 left-0 right-0 h-4 md:h-6 z-10" style={{
                backgroundImage: 'url("https://static.wixstatic.com/media/7fa905_1b337ec811e9407d9159e6ac1b7f96f3~mv2.png")',
                backgroundSize: 'auto 100%',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'bottom',
                transform: 'rotate(180deg)'
              }} />
              <div className="absolute -top-10 -right-2 md:-top-20 md:-right-10 w-24 h-24 md:w-48 md:h-48 z-20">
                <img 
                  src="https://static.wixstatic.com/media/7fa905_954a28ec6e6644d39ff31c8ae7cd6c73~mv2.png" 
                  className="w-full h-full object-contain" 
                  alt="September 4 Badge" 
                />
              </div>
              <div className="flex-1 space-y-4 md:space-y-8 overflow-y-auto no-scrollbar font-['Playfair_Display'] text-[#2a4d1a] py-4">
                <div>
                  <h2 className="text-3xl md:text-6xl tracking-tight text-[#802020] uppercase">WELCOME LUNCH</h2>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-[#802020]">WHAT TO EXPECT</h3>
                  <p className="text-xs md:text-base leading-relaxed text-[#3e5d2d]">
                    Please join us for a welcome lunch to kick off the celebrations! Expect typical Rajasthani hospitality, good food and jovial vibes as you arrive to the wedding.
                  </p>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-[#802020]">LOCATION & TIME</h3>
                  <p className="text-xs md:text-base leading-tight text-[#3e5d2d]">
                    Rambagh Palace | Maharani Mahal <br/>
                    1:00 PM
                  </p>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-[#802020]">DRESS CODE</h3>
                  <p className="text-xs md:text-base text-[#3e5d2d]">
                    Airport Look
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sangeet-section',
      title: 'Sangeet',
      tagline: 'September 4',
      description: 'A night full of joyous celebrations and lively performances.',
      accentColor: '#c8e4b7',
      image: '',
      content: (
        <div className="h-full w-full flex flex-col md:flex-row relative bg-[#fdfaf3]/40">
          <div className="w-full md:w-1/2 h-[42%] md:h-full relative overflow-hidden flex items-center justify-center p-4">
             <img 
              src="https://static.wixstatic.com/media/7fa905_b71df5ec2c40438e8e9de948a5a324a5~mv2.png" 
              className="w-full h-full object-contain scale-145 md:scale-125 translate-y-4" 
              alt="Sangeet Illustration" 
            />
          </div>

          <div className="w-full md:w-1/2 h-[58%] md:h-full flex items-center justify-center p-4 md:p-12 relative">
            <div className="w-full h-full max-h-[500px] bg-[#c8e4b7] relative flex flex-col p-6 md:p-12 shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-4 md:h-6 z-10" style={{
                backgroundImage: 'url("https://static.wixstatic.com/media/7fa905_1b337ec811e9407d9159e6ac1b7f96f3~mv2.png")',
                backgroundSize: 'auto 100%',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'top'
              }} />
              <div className="absolute bottom-0 left-0 right-0 h-4 md:h-6 z-10" style={{
                backgroundImage: 'url("https://static.wixstatic.com/media/7fa905_1b337ec811e9407d9159e6ac1b7f96f3~mv2.png")',
                backgroundSize: 'auto 100%',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'bottom',
                transform: 'rotate(180deg)'
              }} />
              <div className="absolute -top-10 -right-2 md:-top-20 md:-right-10 w-24 h-24 md:w-48 md:h-48 z-20">
                <img 
                  src="https://static.wixstatic.com/media/7fa905_954a28ec6e6644d39ff31c8ae7cd6c73~mv2.png" 
                  className="w-full h-full object-contain" 
                  alt="September 4 Badge" 
                />
              </div>
              <div className="flex-1 space-y-4 md:space-y-6 overflow-y-auto no-scrollbar font-['Playfair_Display'] text-[#2a4d1a] py-4">
                <div>
                  <h2 className="text-3xl md:text-6xl tracking-tight text-[#802020] uppercase">SANGEET</h2>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-[#802020]">WHAT TO EXPECT</h3>
                  <p className="text-xs md:text-sm lg:text-base leading-relaxed text-[#3e5d2d]">
                    The Sangeet kicks off the fabulous wedding weekend for Angad and Nikita! A night full of joyous celebrations, lively performances, and non-stop music, come ready to dance the night away and make some everlasting memories!
                  </p>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-[#802020]">LOCATION AND TIME</h3>
                  <div className="text-xs md:text-sm lg:text-base leading-tight text-[#3e5d2d] space-y-1">
                    <p>Rambagh Palace | Maharaja Hall</p>
                    <p>Cocktail Hour : 8:00 pm - 9:30 pm</p>
                    <p>Sangeet : 9:30 pm - 12:00 am</p>
                    <p>After Party : Midnight - Late</p>
                  </div>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-[#802020]">DRESS CODE</h3>
                  <p className="text-xs md:text-sm lg:text-base text-[#3e5d2d]">
                    Indian or Indo - Western Glamour
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'mehendi-section',
      title: 'Mehendi',
      tagline: 'September 5',
      description: 'A colorful afternoon of music and joy.',
      accentColor: '#c8e4b7',
      image: '',
      content: (
        <div className="h-full w-full flex flex-col md:flex-row relative bg-[#fdfaf3]/40">
          <div className="w-full md:w-1/2 h-[42%] md:h-full relative overflow-hidden flex items-center justify-center p-4">
             <img 
              src="https://static.wixstatic.com/media/7fa905_007ed338b14c48feb1bd740481b6c1eb~mv2.png" 
              className="w-full h-full object-contain scale-145 md:scale-125 translate-y-4" 
              alt="Mehendi Couple Illustration" 
            />
          </div>

          <div className="w-full md:w-1/2 h-[58%] md:h-full flex items-center justify-center p-4 md:p-12 relative">
            <div className="w-full h-full max-h-[500px] bg-[#c8e4b7] relative flex flex-col p-6 md:p-12 shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-4 md:h-6 z-10" style={{
                backgroundImage: 'url("https://static.wixstatic.com/media/7fa905_1b337ec811e9407d9159e6ac1b7f96f3~mv2.png")',
                backgroundSize: 'auto 100%',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'top'
              }} />
              <div className="absolute bottom-0 left-0 right-0 h-4 md:h-6 z-10" style={{
                backgroundImage: 'url("https://static.wixstatic.com/media/7fa905_1b337ec811e9407d9159e6ac1b7f96f3~mv2.png")',
                backgroundSize: 'auto 100%',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'bottom',
                transform: 'rotate(180deg)'
              }} />
              
              <div className="absolute -top-10 -right-2 md:-top-20 md:-right-10 w-24 h-24 md:w-48 md:h-48 z-20">
                <img 
                  src="https://static.wixstatic.com/media/7fa905_10cb3e8d94c643ba9eb37734781d6905~mv2.png" 
                  className="w-full h-full object-contain" 
                  alt="September 5 Badge" 
                />
              </div>

              <div className="flex-1 space-y-3 md:space-y-6 overflow-y-auto no-scrollbar font-['Playfair_Display'] text-[#2a4d1a] py-4">
                <div>
                  <h2 className="text-3xl md:text-6xl tracking-tight text-[#802020] uppercase">MEHENDI</h2>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-[#802020]">WHAT TO EXPECT</h3>
                  <p className="text-xs md:text-sm lg:text-base leading-relaxed text-[#3e5d2d]">
                    Mehendi on our hands, love in our hearts, and celebration in the air! Bring your brightest smiles and best vibes for this unforgettable afternoon filled with music, dancing, laughter, and never-ending fun!
                  </p>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-[#802020]">LOCATION AND TIME</h3>
                  <div className="text-xs md:text-sm lg:text-base leading-tight text-[#3e5d2d] space-y-1">
                    <p>The Leela Palace | Sunderban Lawns</p>
                    <p>1:00 PM - 6:00 PM</p>
                  </div>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-[#802020]">DRESS CODE</h3>
                  <p className="text-xs md:text-sm lg:text-base text-[#3e5d2d]">
                    A Splash of Color
                  </p>
                </div>
                <div className="pt-2 md:pt-4 border-t border-[#8c7456]/20">
                   <p className="text-[10px] md:text-xs text-[#802020] font-bold text-center italic">
                     Transportation from Rambagh to The Leela Palace will be provided
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'open-house-dinner-section',
      title: 'Open House Dinner',
      tagline: 'September 5',
      description: 'A laid-back dinner aboard a restored steam engine train.',
      accentColor: '#c8e4b7',
      image: '',
      content: (
        <div className="h-full w-full flex flex-col md:flex-row relative bg-[#fdfaf3]/40">
          <div className="w-full md:w-1/2 h-[42%] md:h-full relative overflow-hidden flex items-center justify-center p-4">
             <img 
              src="https://static.wixstatic.com/media/7fa905_5728236b51ff434f831c76b5a8b11c70~mv2.png" 
              className="w-full h-full object-contain scale-125 md:scale-125" 
              alt="Steam Train Dinner Illustration" 
            />
          </div>

          <div className="w-full md:w-1/2 h-[58%] md:h-full flex items-center justify-center p-4 md:p-12 relative">
            <div className="w-full h-full max-h-[500px] bg-[#c8e4b7] relative flex flex-col p-6 md:p-12 shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-4 md:h-6 z-10" style={{
                backgroundImage: 'url("https://static.wixstatic.com/media/7fa905_1b337ec811e9407d9159e6ac1b7f96f3~mv2.png")',
                backgroundSize: 'auto 100%',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'top'
              }} />
              <div className="absolute bottom-0 left-0 right-0 h-4 md:h-6 z-10" style={{
                backgroundImage: 'url("https://static.wixstatic.com/media/7fa905_1b337ec811e9407d9159e6ac1b7f96f3~mv2.png")',
                backgroundSize: 'auto 100%',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'bottom',
                transform: 'rotate(180deg)'
              }} />
              
              <div className="absolute -top-10 -right-2 md:-top-20 md:-right-10 w-24 h-24 md:w-48 md:h-48 z-20">
                <img 
                  src="https://static.wixstatic.com/media/7fa905_10cb3e8d94c643ba9eb37734781d6905~mv2.png" 
                  className="w-full h-full object-contain" 
                  alt="September 5 Badge" 
                />
              </div>

              <div className="flex-1 space-y-3 md:space-y-6 overflow-y-auto no-scrollbar font-['Playfair_Display'] text-[#2a4d1a] py-4">
                <div className="pt-2 md:pt-6">
                  <h2 className="text-2xl md:text-5xl lg:text-6xl tracking-tight text-[#802020] uppercase leading-tight pr-8 md:pr-32">
                    OPEN HOUSE DINNER
                  </h2>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-[#802020]">WHAT TO EXPECT</h3>
                  <p className="text-xs md:text-sm lg:text-base leading-relaxed text-[#3e5d2d]">
                    Join us aboard a restored steam engine train sitting alongside a recreated Victorian station for a laid-back dinner as we wind down before the wedding day.
                  </p>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-[#802020]">LOCATION AND TIME</h3>
                  <div className="text-xs md:text-sm lg:text-base leading-tight text-[#3e5d2d] space-y-1">
                    <p>Rambagh Palace | Steam Restaurant</p>
                    <p>7:30 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'anand-karaj-section',
      title: 'Anand Karaj',
      tagline: 'September 6',
      description: 'The Sikh Wedding Ceremony symbolizing blissful union.',
      accentColor: '#c8e4b7',
      image: '',
      content: (
        <div className="h-full w-full flex flex-col md:flex-row relative bg-[#fdfaf3]/40">
          <div className="w-full md:w-1/2 h-[42%] md:h-full relative overflow-hidden flex items-center justify-center p-4">
             <img 
              src="https://static.wixstatic.com/media/7fa905_d879ea55831141f78ed575b189a0869b~mv2.png" 
              className="w-full h-full object-contain scale-145 md:scale-125 translate-y-4" 
              alt="Sikh Wedding Illustration" 
            />
          </div>

          <div className="w-full md:w-1/2 h-[58%] md:h-full flex items-center justify-center p-4 md:p-12 relative">
            <div className="w-full h-full max-h-[500px] bg-[#c8e4b7] relative flex flex-col p-6 md:p-12 shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-4 md:h-6 z-10" style={{
                backgroundImage: 'url("https://static.wixstatic.com/media/7fa905_1b337ec811e9407d9159e6ac1b7f96f3~mv2.png")',
                backgroundSize: 'auto 100%',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'top'
              }} />
              <div className="absolute bottom-0 left-0 right-0 h-4 md:h-6 z-10" style={{
                backgroundImage: 'url("https://static.wixstatic.com/media/7fa905_1b337ec811e9407d9159e6ac1b7f96f3~mv2.png")',
                backgroundSize: 'auto 100%',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'bottom',
                transform: 'rotate(180deg)'
              }} />
              
              <div className="absolute -top-10 -right-2 md:-top-20 md:-right-10 w-24 h-24 md:w-48 md:h-48 z-20">
                <img 
                  src="https://static.wixstatic.com/media/7fa905_2fcd242a3d964c6aadad6a604cc79241~mv2.png" 
                  className="w-full h-full object-contain" 
                  alt="September 6 Badge" 
                />
              </div>

              <div className="flex-1 space-y-3 md:space-y-6 overflow-y-auto no-scrollbar font-['Playfair_Display'] text-[#2a4d1a] py-4">
                <div>
                  <h2 className="text-2xl md:text-5xl lg:text-6xl tracking-tight text-[#802020] uppercase leading-tight pr-8 md:pr-32">
                    ANAND KARAJ
                  </h2>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-[#802020]">WHAT TO EXPECT</h3>
                  <p className="text-xs md:text-sm lg:text-base leading-relaxed text-[#3e5d2d]">
                    Anand Karaj, the Sikh Wedding Ceremony, symbolizing "blissful union", honors the marriage of the couple in the presence of Sri Guru Granth Sahib. 
                  </p>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-[#802020]">LOCATION AND TIME</h3>
                  <div className="text-xs md:text-sm lg:text-base leading-tight text-[#3e5d2d] space-y-1">
                    <p>The Leela Palace</p>
                    <p>9:30am - Baraat Departure</p>
                    <p>11:30am - Anand Karaj</p>
                  </div>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-[#802020]">DRESS CODE</h3>
                  <p className="text-xs md:text-sm lg:text-base text-[#3e5d2d]">
                    Heritage Indian
                  </p>
                </div>
                <div className="pt-2 md:pt-4 border-t border-[#8c7456]/20">
                   <p className="text-[10px] md:text-xs text-[#802020] font-bold text-center italic">
                     Transportation provided
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'reception-section',
      title: 'Reception',
      tagline: 'September 6',
      description: 'A toast to the newly married couple with speeches and dancing.',
      accentColor: '#c8e4b7',
      image: '',
      content: (
        <div className="h-full w-full flex flex-col md:flex-row relative bg-[#fdfaf3]/40">
          <div className="w-full md:w-1/2 h-[42%] md:h-full relative overflow-hidden flex items-center justify-center p-4">
             <img 
              src="https://static.wixstatic.com/media/7fa905_15baf1b2241c4d6594d26dfc88097aab~mv2.png" 
              className="w-full h-full object-contain scale-145 md:scale-125 translate-y-4" 
              alt="Reception Dance Illustration" 
            />
          </div>

          <div className="w-full md:w-1/2 h-[58%] md:h-full flex items-center justify-center p-4 md:p-12 relative">
            <div className="w-full h-full max-h-[500px] bg-[#c8e4b7] relative flex flex-col p-6 md:p-12 shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-4 md:h-6 z-10" style={{
                backgroundImage: 'url("https://static.wixstatic.com/media/7fa905_1b337ec811e9407d9159e6ac1b7f96f3~mv2.png")',
                backgroundSize: 'auto 100%',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'top'
              }} />
              <div className="absolute bottom-0 left-0 right-0 h-4 md:h-6 z-10" style={{
                backgroundImage: 'url("https://static.wixstatic.com/media/7fa905_1b337ec811e9407d9159e6ac1b7f96f3~mv2.png")',
                backgroundSize: 'auto 100%',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'bottom',
                transform: 'rotate(180deg)'
              }} />
              
              <div className="absolute -top-10 -right-2 md:-top-20 md:-right-10 w-24 h-24 md:w-48 md:h-48 z-20">
                <img 
                  src="https://static.wixstatic.com/media/7fa905_2fcd242a3d964c6aadad6a604cc79241~mv2.png" 
                  className="w-full h-full object-contain" 
                  alt="September 6 Badge" 
                />
              </div>

              <div className="flex-1 space-y-3 md:space-y-6 overflow-y-auto no-scrollbar font-['Playfair_Display'] text-[#2a4d1a] py-4">
                <div>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl tracking-tight text-[#802020] uppercase leading-tight pr-8 md:pr-32">
                    RECEPTION
                  </h2>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-[#802020]">WHAT TO EXPECT</h3>
                  <p className="text-xs md:text-sm lg:text-base leading-relaxed text-[#3e5d2d]">
                    Join us in celebrating the beginning of a lifetime of happiness for Angad and Nikita! Let’s toast to the newly married couple with speeches and dancing!
                  </p>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-[#802020]">LOCATION AND TIME</h3>
                  <div className="text-xs md:text-sm lg:text-base leading-tight text-[#3e5d2d] space-y-1">
                    <p>Rambagh Palace | Lawns</p>
                    <p>8:00 pm - Cocktail Hour</p>
                    <p>9:30 pm - Late: Party Time!</p>
                  </div>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-[#802020]">DRESS CODE</h3>
                  <p className="text-xs md:text-sm lg:text-base text-[#3e5d2d]">
                    Black Tie
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'travel-section',
      title: 'Travel',
      tagline: 'Getting Here',
      description: 'Useful information for your journey to Jaipur.',
      accentColor: '#c8e4b7',
      image: '',
      content: (
        <div className="h-full w-full flex flex-col md:flex-row relative bg-[#fdfaf3]/40">
          <div className="w-full md:w-1/2 h-[40%] md:h-full relative overflow-hidden flex items-center justify-center p-0">
             <img 
              src="https://static.wixstatic.com/media/7fa905_df97c120078f4baab5cd5cc9f9092ff7~mv2.png" 
              className="w-full h-full object-cover md:object-cover" 
              alt="Palace Travel Illustration" 
            />
          </div>

          <div className="w-full md:w-1/2 h-[60%] md:h-full flex items-center justify-center p-4 md:p-12 relative">
            <div className="w-full h-full max-h-[600px] bg-[#c8e4b7] relative flex flex-col p-6 md:p-12 shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-4 md:h-6 z-10" style={{
                backgroundImage: 'url("https://static.wixstatic.com/media/7fa905_1b337ec811e9407d9159e6ac1b7f96f3~mv2.png")',
                backgroundSize: 'auto 100%',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'top'
              }} />
              <div className="absolute bottom-0 left-0 right-0 h-4 md:h-6 z-10" style={{
                backgroundImage: 'url("https://static.wixstatic.com/media/7fa905_1b337ec811e9407d9159e6ac1b7f96f3~mv2.png")',
                backgroundSize: 'auto 100%',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'bottom',
                transform: 'rotate(180deg)'
              }} />
              
              <div className="flex-1 space-y-4 md:space-y-6 overflow-y-auto no-scrollbar font-['Montserrat'] text-[#3e5d2d] py-4">
                <div className="space-y-2">
                  <h2 className="text-base md:text-2xl font-bold uppercase tracking-widest text-[#2a4d1a]">WHERE TO FLY IN?</h2>
                  <p className="text-[11px] md:text-sm lg:text-base leading-relaxed">
                    Most guests will find it easiest to fly into Delhi (DEL), India’s largest international hub with the most nonstop flight options from the U.S. From Delhi, Jaipur is a short and well-connected journey. Guests may also choose to fly directly into Jaipur Airport (JAI).
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-base md:text-2xl font-bold uppercase tracking-widest text-[#2a4d1a]">VISA INFORMATION</h2>
                  <p className="text-[11px] md:text-sm lg:text-base leading-relaxed">
                    U.S. citizens traveling to India are required to obtain a visa prior to arrival. Guests without an Indian visa should apply for an Indian e-Tourist Visa, which is a straightforward online process and does not require mailing in your passport. We recommend applying as soon as possible to allow for processing time. Your passport should be valid for at least six months beyond your travel dates. For more detail on this process and for a direct access link to the e-Visa application, please see: <a href="https://indianvisaonline.gov.in/evisa/" target="_blank" className="underline font-bold text-[#2a4d1a]">https://indianvisaonline.gov.in/evisa/</a>
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="text-base md:text-2xl font-bold uppercase tracking-widest text-[#2a4d1a]">TRANSPORTATION FROM DELHI TO JAIPUR</h2>
                  <p className="text-[11px] md:text-sm lg:text-base leading-relaxed">
                    We will arrange for transportation between Delhi and Jaipur on September 4, 2026 and will share more information as we approach the wedding date.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'accommodation-section',
      title: 'Accommodations',
      tagline: 'Stay with Us',
      description: 'Experience the royalty of Rambagh Palace.',
      accentColor: '#c8e4b7',
      image: '',
      content: (
        <div className="h-full w-full flex flex-col md:flex-row relative bg-[#fdfaf3]/40">
          <div className="w-full md:w-1/2 h-[40%] md:h-full relative overflow-hidden flex items-center justify-center p-0">
             <img 
              src="https://static.wixstatic.com/media/7fa905_69a78b0728fc416da028085de844331f~mv2.png" 
              className="w-full h-full object-cover md:object-cover" 
              alt="Rambagh Palace Accommodation" 
            />
          </div>

          <div className="w-full md:w-1/2 h-[60%] md:h-full flex items-center justify-center p-4 md:p-12 relative">
            <div className="w-full h-full max-h-[600px] bg-[#c8e4b7] relative flex flex-col p-6 md:p-12 shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-4 md:h-6 z-10" style={{
                backgroundImage: 'url("https://static.wixstatic.com/media/7fa905_1b337ec811e9407d9159e6ac1b7f96f3~mv2.png")',
                backgroundSize: 'auto 100%',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'top'
              }} />
              <div className="absolute bottom-0 left-0 right-0 h-4 md:h-6 z-10" style={{
                backgroundImage: 'url("https://static.wixstatic.com/media/7fa905_1b337ec811e9407d9159e6ac1b7f96f3~mv2.png")',
                backgroundSize: 'auto 100%',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'bottom',
                transform: 'rotate(180deg)'
              }} />
              
              <div className="flex-1 space-y-4 md:space-y-6 overflow-y-auto no-scrollbar font-['Montserrat'] text-[#3e5d2d] py-4">
                <p className="text-[11px] md:text-sm lg:text-base leading-relaxed">
                  We look forward to welcoming everyone to the iconic Rambagh Palace - known as “The Jewel of Jaipur.”
                </p>
                <p className="text-[11px] md:text-sm lg:text-base leading-relaxed">
                  Built in 1835, Rambagh offers a truly authentic Indian “palace” experience, immersing guests in the splendor and tradition of Rajasthan’s history. 
                </p>
                <p className="text-[11px] md:text-sm lg:text-base leading-relaxed">
                  After you RSVP, our wedding coordination team will reach out to you via WhatsApp to coordinate your room assignment and other logistics. There is no need to make any individual bookings. This will be taken care of by our team!
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'faq-section',
      title: "FAQ's",
      tagline: 'Common Questions',
      description: 'Everything you need to know about our celebration.',
      accentColor: '#c8e4b7',
      image: '',
      content: (
        <div className="h-full w-full flex flex-col md:flex-row relative bg-[#fdfaf3]/40">
          <div className="w-full md:w-1/2 h-[40%] md:h-full relative overflow-hidden flex items-center justify-center p-0">
             <img 
              src="https://static.wixstatic.com/media/7fa905_7c56eeaac3a84e8cbe7e5dd3edbc41dd~mv2.png" 
              className="w-full h-full object-cover md:object-cover" 
              alt="Jaipur FAQ Illustration" 
            />
          </div>

          <div className="w-full md:w-1/2 h-[60%] md:h-full flex items-center justify-center p-4 md:p-12 relative">
            <div className="w-full h-full max-h-[600px] bg-[#c8e4b7] relative flex flex-col p-6 md:p-12 shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-4 md:h-6 z-10" style={{
                backgroundImage: 'url("https://static.wixstatic.com/media/7fa905_1b337ec811e9407d9159e6ac1b7f96f3~mv2.png")',
                backgroundSize: 'auto 100%',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'top'
              }} />
              <div className="absolute bottom-0 left-0 right-0 h-4 md:h-6 z-10" style={{
                backgroundImage: 'url("https://static.wixstatic.com/media/7fa905_1b337ec811e9407d9159e6ac1b7f96f3~mv2.png")',
                backgroundSize: 'auto 100%',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'bottom',
                transform: 'rotate(180deg)'
              }} />
              
              <div className="flex-1 space-y-4 md:space-y-6 overflow-y-auto no-scrollbar font-['Montserrat'] text-[#3e5d2d] py-4">
                <div className="space-y-2">
                  <h2 className="text-base md:text-2xl font-bold uppercase tracking-widest text-[#2a4d1a]">WHAT TO DO IN JAIPUR</h2>
                  <h3 className="text-sm md:text-lg font-bold italic text-[#2a4d1a]">A Gentle Jaipur Sojourn</h3>
                  <p className="text-[10px] md:text-sm leading-relaxed opacity-90 italic mb-2">For our wedding guests who wish to explore the Pink City</p>
                  <p className="text-[11px] md:text-sm lg:text-base leading-relaxed">
                    Guests wishing to discover Jaipur beyond the wedding celebrations, the Pink City offers an enchanting mix of royal heritage, vibrant bazaars, and celebrated culinary traditions. Explore iconic landmarks such as Amber Fort and the City Palace, admire the timeless beauty of Hawa Mahal, and enjoy serene moments by Jal Mahal. Savour authentic Rajasthani flavours at heritage restaurants and rooftop cafés, where traditional recipes meet contemporary elegance. Complete your journey with a stroll through Johari and Bapu Bazaar, known for exquisite gemstones, textiles, and handcrafted treasures—capturing the essence of Jaipur’s culture, colour, and charm.
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-[#2a4d1a]/10">
                  <h2 className="text-base md:text-2xl font-bold uppercase tracking-widest text-[#2a4d1a]">WHERE TO SHOP?</h2>
                  <p className="text-[11px] md:text-sm lg:text-base leading-relaxed">
                    Anyone looking to purchase Indian clothing can find great options through the links below:
                  </p>
                  <ul className="text-[11px] md:text-sm lg:text-base space-y-2">
                    <li><span className="font-bold">Aza Fashions</span> – Curated designer collections for men and women</li>
                    <li><span className="font-bold">Pernia’s Pop-Up Shop</span> – festive looks from top Indian designers</li>
                    <li><span className="font-bold">KYNAH</span> – L.A. based boutique with ready-to-ship Indian outfits</li>
                    <li><span className="font-bold">Kalki Fashion</span> – India based fashion house for men and women</li>
                  </ul>
                </div>

                <div className="space-y-2 pt-4 border-t border-[#2a4d1a]/10">
                  <h2 className="text-sm md:text-base font-bold uppercase tracking-widest text-[#2a4d1a]">Will transportation be provided between Rambagh and Leela for the Mehendi and Anand Karaj?</h2>
                  <p className="text-[11px] md:text-sm lg:text-base leading-relaxed">
                    Yes! We will arrange for shuttles to go between the hotels for both events. More details on specific timings for this transportation will come as we approach the wedding.
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-[#2a4d1a]/10 pb-8">
                  <h2 className="text-sm md:text-base font-bold uppercase tracking-widest text-[#2a4d1a]">Will any activities be planned during off-times?</h2>
                  <p className="text-[11px] md:text-sm lg:text-base leading-relaxed">
                    Yes! On the morning of September 5th, we will offer complimentary city tours to any interested guests. We will also be organizing a friendly (but still competitive) cricket match on the Rambagh grounds. May the best team win. Additionally, Rambagh will offer several daily activities to choose from. More details on these activities will be provided on-site.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'rsvp-section',
      title: 'The Wedding RSVP',
      tagline: 'Join Our Celebration',
      description: 'Please let us know if you can join our special day.',
      accentColor: '#c8e4b7',
      image: '',
      content: (
        <div className="h-full w-full flex flex-col md:flex-row relative bg-[#fdfaf3]/40">
          {/* Detailed Bazaar Left Side Illustration */}
          <div className="w-full md:w-1/2 h-[40%] md:h-full relative overflow-hidden flex items-center justify-center p-4">
             <img 
              src="https://static.wixstatic.com/media/7fa905_c461cbdbd2c641dd8c3306fa528e85fb~mv2.png" 
              className="w-full h-full object-contain md:object-cover scale-110" 
              alt="Jaipur Bazaar Illustration" 
            />
          </div>

          <div className="w-full md:w-1/2 h-[60%] md:h-full flex items-center justify-center p-4 md:p-12 relative">
            <div className="w-full h-full max-h-[750px] bg-[#c8e4b7] relative flex flex-col p-6 md:p-12 shadow-sm border border-[#005a32]/10">
              <div className="absolute top-0 left-0 right-0 h-4 md:h-6 z-10" style={{
                backgroundImage: 'url("https://static.wixstatic.com/media/7fa905_1b337ec811e9407d9159e6ac1b7f96f3~mv2.png")',
                backgroundSize: 'auto 100%',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'top'
              }} />
              <div className="absolute bottom-0 left-0 right-0 h-4 md:h-6 z-10" style={{
                backgroundImage: 'url("https://static.wixstatic.com/media/7fa905_1b337ec811e9407d9159e6ac1b7f96f3~mv2.png")',
                backgroundSize: 'auto 100%',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'bottom',
                transform: 'rotate(180deg)'
              }} />
              
              <form onSubmit={handleRsvpSubmit} className="flex-1 space-y-4 md:space-y-6 overflow-y-auto no-scrollbar font-['Montserrat'] text-[#3e5d2d] py-4">
                <p className="text-sm md:text-xl font-medium leading-relaxed text-[#005a32] text-center mb-6 px-2">
                  We can't wait to celebrate with you! Please let us know if you will be able to join by April 15, 2026.
                </p>

                <div className="space-y-4 md:space-y-6">
                  <div className="space-y-1">
                    <label className="block text-[10px] md:text-sm font-bold uppercase tracking-widest text-[#005a32]">Full Name*</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(p => ({...p, name: e.target.value}))}
                      className="w-full bg-[#fdfaf3] border-b-2 border-[#005a32]/20 focus:border-[#005a32] px-4 py-2 md:py-3 text-sm md:text-base text-[#2a4d1a] transition-all outline-none rounded-t-md" 
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] md:text-sm font-bold uppercase tracking-widest text-[#005a32]">Email Address*</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(p => ({...p, email: e.target.value}))}
                      className="w-full bg-[#fdfaf3] border-b-2 border-[#005a32]/20 focus:border-[#005a32] px-4 py-2 md:py-3 text-sm md:text-base text-[#2a4d1a] transition-all outline-none rounded-t-md" 
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block text-[10px] md:text-sm font-bold uppercase tracking-widest text-[#005a32]">Will you be attending?*</label>
                    <div className="flex gap-8 md:gap-10">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="attending" 
                          required
                          checked={formData.attending === 'yes'}
                          onChange={() => setFormData(p => ({...p, attending: 'yes'}))}
                          className="w-5 h-5 md:w-6 md:h-6 appearance-none border-2 border-[#005a32] rounded-full checked:bg-[#005a32] transition-all cursor-pointer ring-offset-2 ring-offset-[#c8e4b7] focus:ring-2 focus:ring-[#005a32]" 
                        />
                        <span className="text-xs md:text-base font-medium text-[#005a32]">Yes!</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="attending" 
                          checked={formData.attending === 'no'}
                          onChange={() => setFormData(p => ({...p, attending: 'no'}))}
                          className="w-5 h-5 md:w-6 md:h-6 appearance-none border-2 border-[#005a32] rounded-full checked:bg-[#005a32] transition-all cursor-pointer ring-offset-2 ring-offset-[#c8e4b7] focus:ring-2 focus:ring-[#005a32]" 
                        />
                        <span className="text-xs md:text-base font-medium text-[#005a32]">No.</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-[10px] md:text-sm font-bold uppercase tracking-widest text-[#005a32]">Events you'll be joining:</label>
                    <div className="grid grid-cols-2 md:flex md:flex-wrap gap-4 md:gap-6">
                      {['Sangeet', 'Mehendi', 'Anand Karaj', 'Reception'].map(event => (
                        <label key={event} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            checked={formData.events.includes(event)}
                            onChange={() => handleEventToggle(event)}
                            className="w-5 h-5 md:w-6 md:h-6 appearance-none border-2 border-[#005a32] rounded checked:bg-[#005a32] transition-all cursor-pointer ring-offset-2 ring-offset-[#c8e4b7] focus:ring-2 focus:ring-[#005a32]" 
                          />
                          <span className="text-[11px] md:text-base text-[#005a32]">{event}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] md:text-sm font-bold uppercase tracking-widest text-[#005a32]">Number of Guests?*</label>
                    <input 
                      type="number" 
                      min="1"
                      value={formData.guestsCount}
                      onChange={(e) => setFormData(p => ({...p, guestsCount: e.target.value}))}
                      className="w-20 md:w-32 bg-[#fdfaf3] border-b-2 border-[#005a32]/20 focus:border-[#005a32] px-4 py-2 md:py-3 text-sm md:text-base text-[#2a4d1a] transition-all outline-none rounded-t-md" 
                    />
                  </div>

                  <div className="pt-6 md:pt-8 flex justify-center pb-12">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`
                        w-full md:w-auto min-w-[200px]
                        bg-[#005a32] text-white 
                        px-8 py-4 md:py-5
                        font-bold text-xs md:text-lg 
                        uppercase tracking-[0.2em] 
                        hover:bg-[#004d2b] hover:shadow-2xl hover:-translate-y-1
                        active:translate-y-0 active:shadow-lg
                        transition-all duration-300
                        shadow-[0_10px_30px_rgba(0,90,50,0.3)]
                        border border-[#005a32]/20
                        ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
                      `}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          SENDING...
                        </span>
                      ) : 'SUBMIT RSVP'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollTop;
    const height = container.offsetHeight;
    const index = Math.round(scrollPosition / height);
    if (index !== activeTab) {
      setActiveTab(index);
    }
  };

  if (isAdminMode) {
    return isAuthenticated ? (
      <AdminPanel onLogout={() => setIsAuthenticated(false)} />
    ) : (
      <Login onLoginSuccess={() => setIsAuthenticated(true)} />
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col relative overflow-hidden bg-[#fdfaf3] md:bg-transparent">
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="snap-container no-scrollbar relative z-10"
      >
        {features.map((feature, i) => (
          <div key={feature.id} className="snap-item flex items-center justify-center">
            <FeatureCard 
              section={feature} 
              onNavigate={scrollToSection}
            />
          </div>
        ))}
      </div>

      <div className="fixed right-2 md:right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 md:gap-5">
        {features.map((_, i) => (
          <button 
            key={i}
            onClick={() => scrollToSection(i)}
            className={`transition-all duration-700 rounded-full ${activeTab === i ? 'h-6 md:h-12 w-1 md:w-2 bg-[#8c7456]' : 'h-1 md:h-2 w-1 md:w-2 bg-[#8c7456]/20 hover:bg-[#8c7456]/40'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default App;