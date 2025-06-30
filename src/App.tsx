import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Star, Crown, Gem, Sparkles, Award, Shield } from 'lucide-react';

function App() {
  const [interactionCount, setInteractionCount] = useState(0);
  const [activeRefusal, setActiveRefusal] = useState<{message: string, id: string} | null>(null);
  const [showFinalTransformation, setShowFinalTransformation] = useState(false);
  const [transformationText, setTransformationText] = useState('');
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formInputs, setFormInputs] = useState({ name: '', email: '' });
  const [inputTimers, setInputTimers] = useState<{[key: string]: NodeJS.Timeout}>({});

  const refusalMessages = [
    "I appreciate your interest, but membership is quite exclusive",
    "The curator prefers to remain elusive", 
    "How thoughtful, though I must decline",
    "I'm not ready to share just yet",
    "Some mysteries are best preserved",
    "I'm rather camera shy today",
    "Forgive me, but I must preserve my boundaries",
    "I'm touched by your interest, but I must pass",
    "I'm far too refined for such endeavors"
  ];

  const finalMessage = `You have witnessed the elegant power of gracious refusal. 

Like a rare vintage or precious artwork, your time and energy are invaluable treasures that deserve protection.

Setting boundaries isn't an act of cruelty—it's an expression of self-respect and authentic living.

Sometimes the most generous gift you can offer is a polite, unwavering 'no.'

The art of living lies not in saying yes to everything, but in choosing what truly deserves your precious yes.

Remember: Every boundary you set is a love letter to your future self.`;

  const handleInteraction = (elementId: string, customMessage?: string) => {
    if (showFinalTransformation) return;
    
    const newCount = interactionCount + 1;
    setInteractionCount(newCount);
    
    if (newCount === 7) {
      triggerFinalTransformation();
      return;
    }
    
    const message = customMessage || refusalMessages[Math.floor(Math.random() * refusalMessages.length)];
    setActiveRefusal({ message, id: elementId });
    
    setTimeout(() => {
      setActiveRefusal(null);
    }, 2500);
  };

  const triggerFinalTransformation = () => {
    setShowFinalTransformation(true);
    setActiveRefusal(null);
    
    setTimeout(() => {
      let currentIndex = 0;
      const typeWriter = () => {
        if (currentIndex < finalMessage.length) {
          setTransformationText(finalMessage.substring(0, currentIndex + 1));
          currentIndex++;
          setTimeout(typeWriter, 100);
        } else {
          setTimeout(() => {
            setShowContinueButton(true);
          }, 3000);
        }
      };
      typeWriter();
    }, 4000);
  };

  const resetExperience = () => {
    setShowFinalTransformation(false);
    setTransformationText('');
    setShowContinueButton(false);
    setInteractionCount(0);
    setActiveRefusal(null);
    setFormInputs({ name: '', email: '' });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormInputs(prev => ({ ...prev, [field]: value }));
    
    // Clear existing timer
    if (inputTimers[field]) {
      clearTimeout(inputTimers[field]);
    }
    
    // Set new timer to clear input after 2 seconds
    const timer = setTimeout(() => {
      setFormInputs(prev => ({ ...prev, [field]: '' }));
      handleInteraction(`input-${field}`, "I prefer to keep things private");
    }, 2000);
    
    setInputTimers(prev => ({ ...prev, [field]: timer }));
  };

  const handleSearchFocus = () => {
    handleInteraction('search', "I prefer to keep things mysterious");
  };

  const artworks = [
  { id: 1, title: "Midnight Serenade", artist: "Helena Ashworth", year: 1887, image: "/midnight-serenade.jpg" },
  { id: 2, title: "The Velmont Rose", artist: "Charles Pemberton", year: 1923, image: "/the-velmont-rose.jpg" },
  { id: 3, title: "Golden Reverie", artist: "Isabella Fairfax", year: 1901, image: "/golden-reverie.jpg" },
  { id: 4, title: "Autumn's Whisper", artist: "Edmund Blackwood", year: 1889, image: "/autumns-whisper.jpg" },
  { id: 5, title: "The Last Waltz", artist: "Victoria Sterling", year: 1912, image: "/the-last-waltz.jpg" },
  { id: 6, title: "Crimson Dawn", artist: "Alexander Thornfield", year: 1895, image: "/crimson-dawn.jpg" }
];

  const buttons = [
    { id: 'join', text: 'Join Our Society', icon: Crown },
    { id: 'contact', text: 'Contact Curator', icon: Gem },
    { id: 'view', text: 'View Collection', icon: Star },
    { id: 'apply', text: 'Apply for Membership', icon: Award },
    { id: 'subscribe', text: 'Subscribe to Newsletter', icon: Sparkles },
    { id: 'tour', text: 'Schedule Private Tour', icon: Shield }
  ];

  useEffect(() => {
    return () => {
      Object.values(inputTimers).forEach(timer => clearTimeout(timer));
    };
  }, [inputTimers]);

  if (showFinalTransformation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-red-900 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="text-amber-200 text-2xl md:text-3xl lg:text-4xl leading-relaxed font-serif whitespace-pre-line">
            <span style={{ fontFamily: "'Playfair Display', serif" }}>
              {transformationText}
            </span>
          </div>
          {showContinueButton && (
            <button
              onClick={resetExperience}
              className="mt-12 px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-500 text-slate-900 font-semibold rounded-lg hover:from-amber-500 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
              style={{ fontFamily: "'Crimson Text', serif" }}
            >
              Continue Exploring
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-800 text-amber-100 relative">
      {/* Bolt Badge */}
<a 
  href="https://bolt.new/" 
  target="_blank" 
  rel="noopener noreferrer"
  className="fixed top-4 right-4 md:top-6 md:right-6 z-[10000] hover:scale-105 transition-all duration-300"
>
  <div className="bg-gradient-to-r from-amber-900/30 to-red-900/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-amber-600/30 hover:from-amber-800/40 hover:to-red-800/40">
    <img 
      src="./boltlogo.png" 
      alt="Bolt Logo" 
      className="h-8 md:h-10 lg:h-12 w-auto" 
    />
  </div>
</a>





      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-red-900/20"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-amber-200 mb-4 animate-fade-in" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Velmont Collection
          </h1>
          <p className="text-lg md:text-xl italic text-amber-100 mb-8" style={{ fontFamily: "'Crimson Text', serif" }}>
            Where Refined Boundaries Meet Gracious Decline
          </p>
          <div className="w-32 h-0.5 bg-gradient-to-r from-amber-600 to-yellow-500 mx-auto mb-8"></div>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search the collection..."
              onFocus={handleSearchFocus}
              className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-amber-600/30 rounded-lg text-amber-100 placeholder-amber-300/60 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              style={{ fontFamily: "'Crimson Text', serif" }}
            />
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-amber-600/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="hidden md:flex space-x-8">
              {['Gallery', 'About', 'Membership', 'Events', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleInteraction(`nav-${item}`)}
                  className="text-amber-200 hover:text-amber-100 transition-all duration-300 hover:transform hover:-translate-x-4"
                  style={{ fontFamily: "'Crimson Text', serif" }}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-amber-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-amber-600/30">
            <div className="px-4 py-4 space-y-2">
              {['Gallery', 'About', 'Membership', 'Events', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    handleInteraction(`nav-${item}`);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-amber-200 hover:text-amber-100 py-2 transition-colors"
                  style={{ fontFamily: "'Crimson Text', serif" }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-amber-200 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Curated Excellence Since 1847
          </h2>
          <p className="text-lg md:text-xl text-amber-100 mb-8 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Crimson Text', serif" }}>
            Discover a world where artistic mastery meets uncompromising standards. Our collection represents the pinnacle of refined taste, carefully preserved for those who appreciate true elegance.
          </p>
          <button
            onClick={() => handleInteraction('hero-cta')}
            className="px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-500 text-slate-900 font-semibold rounded-lg hover:from-amber-500 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg relative"
            style={{ fontFamily: "'Crimson Text', serif" }}
          >
            Explore Collection
          </button>
        </div>
      </section>

      {/* Featured Artworks Gallery */}
<section className="py-20 px-4">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-amber-200 text-center mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
      Featured Masterpieces
    </h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {artworks.map((artwork) => (
        <div
          key={artwork.id}
          className="group relative overflow-hidden rounded-lg border border-amber-600/30 bg-slate-800/30 hover:transform hover:scale-105 transition-all duration-300"
        >
          {/* Artwork Image */}
          <div className="aspect-[4/3] bg-gradient-to-br from-amber-900/30 to-red-900/30 flex items-center justify-center overflow-hidden">
            <img
              src={artwork.image}  // This is the image URL from the artwork object
              alt={artwork.title}   // Alt text for accessibility
              className="object-cover w-full h-full" // Ensures the image fits the container without distortion
            />
          </div>

          {/* Artwork Details */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-amber-200 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              {artwork.title}
            </h3>
            <p className="text-amber-100 mb-1" style={{ fontFamily: "'Crimson Text', serif" }}>
              {artwork.artist}
            </p>
            <p className="text-amber-300/70 text-sm mb-4" style={{ fontFamily: "'Crimson Text', serif" }}>
              {artwork.year}
            </p>
            <button
              onClick={() => handleInteraction(`artwork-${artwork.id}`, "I'm rather camera shy today")}
              className="w-full py-2 px-4 bg-gradient-to-r from-amber-600 to-yellow-500 text-slate-900 font-semibold rounded hover:from-amber-500 hover:to-yellow-400 transition-all duration-300 relative"
              style={{ fontFamily: "'Crimson Text', serif" }}
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Interactive Buttons Grid */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-200 text-center mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
            Join Our Distinguished Community
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buttons.map(({ id, text, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleInteraction(id)}
                className="group relative p-6 bg-gradient-to-r from-amber-600 to-yellow-500 text-slate-900 font-semibold rounded-lg hover:from-amber-500 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg min-h-[120px] flex flex-col items-center justify-center space-y-3"
                style={{ fontFamily: "'Crimson Text', serif" }}
              >
                <Icon className="w-8 h-8" />
                <span className="text-center">{text}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Form Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-200 text-center mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            Express Your Interest
          </h2>
          <p className="text-center text-amber-100 mb-12" style={{ fontFamily: "'Crimson Text', serif" }}>
            Share your details to be considered for our exclusive membership program.
          </p>
          <div className="space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Full Name"
                value={formInputs.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-amber-600/30 rounded-lg text-amber-100 placeholder-amber-300/60 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-300"
                style={{ fontFamily: "'Crimson Text', serif" }}
              />
            </div>
            <div className="relative">
              <input
                type="email"
                placeholder="Email Address"
                value={formInputs.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-amber-600/30 rounded-lg text-amber-100 placeholder-amber-300/60 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-300"
                style={{ fontFamily: "'Crimson Text', serif" }}
              />
            </div>
            <button
              onClick={() => handleInteraction('form-submit')}
              className="w-full py-4 bg-gradient-to-r from-amber-600 to-yellow-500 text-slate-900 font-semibold rounded-lg hover:from-amber-500 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg relative"
              style={{ fontFamily: "'Crimson Text', serif" }}
            >
              Submit Application
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-200 text-center mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
            What Our Patrons Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                onClick={() => handleInteraction(`testimonial-${i}`, "I prefer to keep my thoughts private")}
                className="p-6 bg-slate-800/30 border border-amber-600/30 rounded-lg cursor-pointer hover:bg-slate-800/50 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-yellow-500 rounded-full flex items-center justify-center mb-4">
                  <Crown className="w-8 h-8 text-slate-900" />
                </div>
                <p className="text-amber-100 mb-4" style={{ fontFamily: "'Crimson Text', serif" }}>
                  "Click to read testimonial..."
                </p>
                <div className="text-amber-300/70" style={{ fontFamily: "'Crimson Text', serif" }}>
                  — Distinguished Member
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-amber-600/30">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-amber-200 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Velmont Collection
          </h3>
          <p className="text-amber-100 mb-8" style={{ fontFamily: "'Crimson Text', serif" }}>
            Preserving elegance through the art of gracious boundaries.
          </p>
          
          {/* Netlify Badge */}
          <div className="text-center mt-12 pb-8">
  <a 
    href="https://www.netlify.com" 
    target="_blank" 
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-amber-900/20 to-red-900/20 border border-amber-600/20 text-amber-300/80 hover:text-amber-200 hover:from-amber-800/30 hover:to-red-800/30 transition-all text-sm"
  >
    <span style={{ fontFamily: "'Crimson Text', serif" }}>Deployed on</span>
    <img 
      src="/netlify.svg" 
      alt="Netlify Logo" 
      className="h-5 w-auto"
    />
  </a>
</div>

        </div>
      </footer>

      {/* Floating Refusal Messages */}
      {activeRefusal && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center p-4">
          <div className="bg-black/90 backdrop-blur-sm text-amber-200 px-6 py-4 rounded-lg shadow-2xl border border-amber-600/30 max-w-md text-center animate-fade-in">
            <p style={{ fontFamily: "'Crimson Text', serif" }}>
              {activeRefusal.message}
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;