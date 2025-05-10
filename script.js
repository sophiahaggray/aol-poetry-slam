// Word categories from the brief
const WORD_CATEGORIES = {
    tech: ["static", "firewall", "dialtone", "glitch", "login", "offline", "cursor", "mainframe", "system", "shutdown", "protocol", "reboot", "encrypted", "update", "interface"],
    apocalyptic: ["vanish", "eternal", "void", "crash", "countdown", "final", "blink", "error", "ticking", "nothingness", "escape", "collapse", "frozen", "signal"],
    emotion: ["goodbye", "miss", "dear", "user", "hold", "message", "wish", "sender", "love", "wait", "reply", "typing", "unsent", "forever", "last"],
    nostalgia: ["neon", "dreamwave", "vapor", "light", "chatroom", "GeoCities", "midnight", "MySpace", "angel", "webring", "homepage", "pixel", "banner", "profile", "blinking"],
    disaster: ["collapse", "blackout", "emergency", "siren", "warning", "meltdown", "tremor", "wreckage", "danger", "chaos", "lockdown", "alarm", "threat", "debris", "quake"],
    scarcity: ["canned", "powdered", "rations", "stored", "empty", "gone", "waterline", "shortages", "bare", "reserve", "hunger", "stale", "supplies", "expire", "preserved"],
    isolation: ["panic", "shelter", "broadcast", "evacuate", "screaming", "lost", "hidden", "trapped", "isolate", "flee", "bunker", "whisper", "remain", "silence", "static"]
  };
  
  // Flatten all words into a single array
  const ALL_WORDS = Object.values(WORD_CATEGORIES).flat();
  
  // Get N random words from the array
  const getRandomWords = (count) => {
    const words = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * ALL_WORDS.length);
      words.push(ALL_WORDS[randomIndex]);
    }
    return words;
  };
  
  // Generate a new poem in 3-2-3 format
  const generatePoem = () => {
    return [
      getRandomWords(3),
      getRandomWords(2),
      getRandomWords(3)
    ];
  };
  
  // Create simple audio objects
  const createAudio = (type) => {
    return {
      play: () => {
        console.log(`Playing ${type} sound`);
        // We'll use silent audio for simplicity in this version
      }
    };
  };
  
  const AUDIO = {
    modemConnect: createAudio('modem'),
    typing: createAudio('typing'),
    blip: createAudio('blip')
  };
  
  const RefrigeratorPoetrySlam = () => {
    const [poem, setPoem] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [poemHistory, setPoemHistory] = React.useState([]);
    const [soundEnabled, setSoundEnabled] = React.useState(false);
    const [blinkMessage, setBlinkMessage] = React.useState(false);
    const [messages] = React.useState([
      "You've Got Mail!",
      "Try AOL 5.0 Now!",
      "FREE for a month!",
      "Welcome to AOL!",
      "50 FREE Hours!",
      "Sign On Now!"
    ]);
    const [currentMessage, setCurrentMessage] = React.useState(0);
  
    // Toggle blinking message
    React.useEffect(() => {
      const interval = setInterval(() => {
        setBlinkMessage(prev => !prev);
        if (!blinkMessage) {
          setCurrentMessage(prev => (prev + 1) % messages.length);
        }
      }, 800);
      return () => clearInterval(interval);
    }, [blinkMessage, messages]);
  
    // Handle poem generation
    const handleGeneratePoem = () => {
      if (soundEnabled) {
        AUDIO.typing.play();
      }
      
      setLoading(true);
      const newPoem = generatePoem();
      
      // Simulate loading poem (like over a 56k modem)
      setTimeout(() => {
        setPoem(newPoem);
        setPoemHistory(prev => [newPoem, ...prev.slice(0, 4)]);
        setLoading(false);
        
        if (soundEnabled) {
          AUDIO.blip.play();
        }
      }, 1000);
    };
  
    // Toggle sound effects
    const toggleSound = () => {
      if (!soundEnabled) {
        AUDIO.modemConnect.play();
      }
      setSoundEnabled(!soundEnabled);
    };
  
    return (
      <div className="bg-white text-black font-sans max-w-4xl mx-auto overflow-hidden" style={{ fontFamily: 'Arial, Verdana, sans-serif' }}>
        {/* AOL Header */}
        <header className="bg-blue-900 text-white p-2 flex items-center justify-between">
          <div className="text-2xl font-bold">
            <span className="text-white">AOL</span>
            <span className="text-black">.COM</span>
          </div>
          <div className="flex space-x-2 text-sm">
            <span className="text-white hover:underline cursor-pointer">Search</span> |
            <span className="text-white hover:underline cursor-pointer">Web Centers</span> |
            <span className="text-white hover:underline cursor-pointer">Shopping</span> |
            <span className="text-white hover:underline cursor-pointer">Community</span> |
            <span className="text-yellow-300 hover:underline cursor-pointer">Download AOL</span>
          </div>
        </header>
        
        {/* Date and Welcome */}
        <div className="flex justify-between items-center p-1 bg-gray-100 border-b border-gray-400 text-xs">
          <div>Thursday, November 4, 1999</div>
          <div className="font-bold">Welcome, Refrigerator Poet!</div>
        </div>
        
        {/* Main Content */}
        <div className="flex">
          {/* Left Sidebar */}
          <div className="w-1/4 border-r border-gray-300 p-2 bg-gray-100">
            <div className="border border-gray-400 mb-2 bg-blue-900 text-white p-1 font-bold text-sm">
              Refrigerator Poetry
            </div>
            
            <div className="border border-gray-400 mb-2 p-1">
              <div className="text-blue-800 font-bold text-sm border-b border-gray-300 pb-1 mb-1">Daily Essentials</div>
              <div className="text-xs space-y-1">
                <div>• <span className="text-blue-800 hover:underline">Generate Poem</span></div>
                <div>• <span className="text-blue-800 hover:underline">Save Poem</span></div>
                <div>• <span className="text-blue-800 hover:underline">Word Bank</span></div>
                <div>• <span className="text-blue-800 hover:underline">About Poetry</span></div>
                <div>• <span className="text-blue-800 hover:underline">Terms of Use</span></div>
              </div>
            </div>
            
            <div className="border border-gray-400 mb-2 p-1">
              <div className="text-blue-800 font-bold text-sm border-b border-gray-300 pb-1 mb-1">Word Categories</div>
              <div className="text-xs space-y-1">
                {Object.keys(WORD_CATEGORIES).map(category => (
                  <div key={category}>• <span className="text-blue-800 hover:underline capitalize">{category}</span></div>
                ))}
              </div>
            </div>
            
            <div className="border border-gray-400 p-1 bg-yellow-100">
              <div className="text-red-800 font-bold text-sm border-b border-gray-300 pb-1 mb-1 flex items-center">
                <span className={blinkMessage ? "opacity-100" : "opacity-0"}>NEW!</span>
                <span className="ml-1">Y2K Countdown</span>
              </div>
              <div className="text-xs text-center font-bold">
                58 DAYS UNTIL Y2K
              </div>
              <div className="text-xs text-center mt-1">
                Are you prepared?
              </div>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="w-2/4 p-2 border-r border-gray-300">
            <div className="border border-gray-400 bg-blue-100 p-2 mb-3">
              <div className="font-bold text-lg text-blue-900 mb-2 border-b border-gray-300 pb-1">
                Refrigerator Poetry Slam
              </div>
              
              <div className="text-sm mb-4">
                Create Y2K-inspired digital poetry with our random word generator. Click "Generate Poem" to create a new 3-2-3 word poem.
              </div>
              
              <div className="bg-gray-200 border border-gray-500 p-3 mb-4 min-h-32 flex flex-col justify-center items-center">
                {poem.length === 0 && !loading && (
                  <div className="text-center text-gray-600 italic">
                    Your poem will appear here...
                  </div>
                )}
                
                {loading && (
                  <div className="text-center">
                    <div className="text-blue-800 animate-pulse">Loading poem...</div>
                    <div className="text-xs text-gray-600 mt-1">Please wait, connecting at 56k...</div>
                  </div>
                )}
                
                {poem.length > 0 && !loading && (
                  <div className="text-center space-y-2 w-full">
                    <div className="text-blue-800 font-bold border-b border-gray-300 pb-2 mb-2">
                      Your Digital Poem:
                    </div>
                    
                    {poem.map((line, index) => (
                      <div 
                        key={index}
                        className="text-blue-900 hover:text-blue-600 hover:underline transition-colors duration-300"
                      >
                        {line.join(' ')}
                        {index === 2 && <span className="animate-pulse ml-1">|</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                <button 
                  onClick={handleGeneratePoem}
                  className="bg-blue-800 hover:bg-blue-700 text-white px-4 py-1 text-sm font-bold border border-blue-900"
                >
                  Generate Poem
                </button>
                
                <div className="flex items-center">
                  <button 
                    onClick={toggleSound}
                    className="bg-gray-300 hover:bg-gray-400 border border-gray-500 p-1 text-xs flex items-center"
                  >
                    {soundEnabled ? "🔊" : "🔇"}
                    <span className="ml-1">{soundEnabled ? 'Sound On' : 'Sound Off'}</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Poem History */}
            {poemHistory.length > 0 && (
              <div className="border border-gray-400 p-2">
                <div className="font-bold text-sm text-blue-900 mb-2 border-b border-gray-300 pb-1">
                  Recent Poems
                </div>
                
                <div className="text-xs space-y-2">
                  {poemHistory.map((historyPoem, historyIndex) => (
                    <div key={historyIndex} className="border-b border-gray-200 pb-2 last:border-0">
                      <div className="text-gray-600 text-xs mb-1">
                        Poem #{poemHistory.length - historyIndex}:
                      </div>
                      {historyPoem.map((line, lineIndex) => (
                        <div key={lineIndex} className="text-blue-800">
                          {line.join(' ')}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Right Sidebar */}
          <div className="w-1/4 p-2 bg-gray-100">
            <div className="border border-gray-400 mb-2 p-1 bg-gray-200">
              <div className={`text-red-800 font-bold text-sm border-b border-gray-300 pb-1 mb-1 ${blinkMessage ? 'bg-yellow-200' : ''}`}>
                {messages[currentMessage]}
              </div>
              <div className="text-xs text-center p-1">
                <div className="mb-1">Try AOL 5.0 Now!</div>
                <div className="font-bold text-blue-800 hover:underline cursor-pointer">Download FREE</div>
              </div>
            </div>
            
            <div className="border border-gray-400 mb-2 p-1">
              <div className="text-blue-800 font-bold text-sm border-b border-gray-300 pb-1 mb-1">Chat Rooms</div>
              <div className="text-xs space-y-1">
                <div>• <span className="text-blue-800 hover:underline">Y2K Preppers</span></div>
                <div>• <span className="text-blue-800 hover:underline">Poetry Lovers</span></div>
                <div>• <span className="text-blue-800 hover:underline">Digital Art</span></div>
                <div>• <span className="text-blue-800 hover:underline">Tech Support</span></div>
              </div>
            </div>
            
            <div className="border border-gray-400 p-1 bg-yellow-100">
              <div className="text-red-800 font-bold text-sm border-b border-gray-300 pb-1 mb-1">Quick Poll</div>
              <div className="text-xs">
                <div className="mb-1">Do you think computers will survive Y2K?</div>
                <div className="space-y-1">
                  <div>
                    <input type="radio" name="y2k" id="yes" className="mr-1" />
                    <label htmlFor="yes">Yes, it's overblown</label>
                  </div>
                  <div>
                    <input type="radio" name="y2k" id="no" className="mr-1" />
                    <label htmlFor="no">No, preparing for the worst</label>
                  </div>
                  <div>
                    <input type="radio" name="y2k" id="maybe" className="mr-1" />
                    <label htmlFor="maybe">Maybe, I'm stockpiling anyway</label>
                  </div>
                </div>
                <button className="bg-blue-800 hover:bg-blue-700 text-white px-2 py-0.5 text-xs mt-2 font-bold">
                  Vote Now!
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="bg-blue-900 text-white p-2 text-xs">
          <div className="flex justify-center space-x-4 mb-1">
            <span className="hover:underline cursor-pointer">Help</span>
            <span className="hover:underline cursor-pointer">About</span>
            <span className="hover:underline cursor-pointer">Sign Off</span>
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
          </div>
          <div className="text-center">
            &copy; 1999 AOL Refrigerator Poetry Slam - All Rights Reserved
          </div>
        </footer>
      </div>
    );
  };
  
  // Render the app
  ReactDOM.render(<RefrigeratorPoetrySlam />, document.getElementById('root'));