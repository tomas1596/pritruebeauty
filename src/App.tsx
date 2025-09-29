import React, { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import priImage from './image/pri1.png';
import loveSong from './song/truebeauty.mp3'; // tu canción
import priVideo from './video/pri.mp4'; // tu video

const TypewriterText: React.FC<{ text: string; isVisible: boolean; speed?: number }> = ({ 
  text, 
  isVisible, 
  speed = 50 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setDisplayedText('');
      setCurrentIndex(0);
      return;
    }

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, isVisible, speed]);

  return <span>{displayedText}</span>;
};

function App() {
  const [showMessage, setShowMessage] = useState(false);

  // Ref para la música
  const audioRef = useRef(new Audio(loveSong));

  const handleButtonClick = () => {
    setShowMessage(true);
    audioRef.current.play();
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const loveMessage = `Cada día que paso con vos me doy cuenta de lo afortunado que soy. Sos mi felicidad, mi calma, mi compañera, y todo lo que compartimos me hace sentir que tengo algo único y sincero.

Con vos todo es distinto. Me hacés reír, me sorprendés, me hacés sentir en paz y amado de una manera que nunca había sentido. Y aunque yo a veces no sea perfecto, me hacés querer ser mejor, me hacés querer esforzarme, simplemente por vos.

Cada recuerdo, cada momento juntos, cada risa, cada charla, como te esforzas todos los dias, estemos bien o mal, peleados o no, siempre le pones el pecho a todo, como te dedicas a tu trabajo, a tus alumnos, lo profesional que sos, lo sencillo que lo haces ver, como se nota cuando uno ama lo que realmente hace, y todo eso me hace admirarte y amarte cada dia más gordi. Estas páginas, estas fotos, los regalos, las cosas que me nacen hacer… son solo una pequeña muestra de lo que siento por vos.

Gracias por ser vos, por elegirme todos los dias, por cada tormenta que pasamos y por todo lo que compartimos. Yo voy a seguir intentando ser mejor, por vos, por nosotros y por este amor que tenemos que me hace sentir afortunado todos los días.

Ojalá seamos nosotros por siempre. Que cada dia, sin importar lo que pase, podamos mirarnos y elegirnos todos los dias. Porque cada abrazo, cada mirada y cada palabra tuya, me hace sentir en casa.

Te amo, siempre.
Sos el amor de mi vida ♥`;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background video */}
      <video 
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={priVideo}
        autoPlay
        loop
        muted
        playsInline
      ></video>

      {/* Overlay para que se vea el contenido */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Heart */}
        <div className="mb-12 text-center">
          <div className="relative mb-8">
            <div className="heart-container relative">
              <div className="heart animate-heartbeat"></div>
            </div>
          </div>
          
          {/* Imagen en el medio */}
          <div className="flex justify-center">
            <img 
              src={priImage}
              alt="Mi amor" 
              className="rounded-2xl shadow-lg max-w-[600px] sm:max-w-[800px] h-auto mx-auto"
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleButtonClick}
          className="bg-teal-500 hover:bg-teal-400 text-white font-semibold py-4 px-8 rounded-full text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-teal-400 hover:border-teal-300"
        >
          Lee esto Pri ♥
        </button>
      </div>

      {/* Message Modal */}
      {showMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-red-500 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-red-400 flex items-center gap-2">
                  <Heart className="w-8 h-8 fill-current" />
                  Hola Pri, soy yo otra vez 😊
                </h2>
                <button
                  onClick={handleCloseMessage}
                  className="text-gray-400 hover:text-white text-3xl font-bold transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="text-gray-200 text-base md:text-lg leading-relaxed whitespace-pre-line">
                <TypewriterText 
                  text={loveMessage} 
                  isVisible={showMessage} 
                  speed={30}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .heart-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 120px;
        }

        .heart {
          position: relative;
          width: 100px;
          height: 90px;
          transform: rotate(-45deg);
        }

        .heart::before,
        .heart::after {
          content: '';
          width: 52px;
          height: 80px;
          position: absolute;
          left: 50px;
          top: 0;
          background: #ff1744;
          border-radius: 50px 50px 0 0;
          transform: rotate(0deg);
          transform-origin: 0 100%;
        }

        .heart::after {
          left: 0;
          transform: rotate(90deg);
          transform-origin: 100% 100%;
        }

        @keyframes heartbeat {
          0% { transform: rotate(-45deg) scale(1); }
          14% { transform: rotate(-45deg) scale(1.1); }
          28% { transform: rotate(-45deg) scale(1); }
          42% { transform: rotate(-45deg) scale(1.1); }
          70% { transform: rotate(-45deg) scale(1); }
          100% { transform: rotate(-45deg) scale(1); }
        }

        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }

        @media (max-width: 640px) {
          .heart {
            width: 80px;
            height: 72px;
          }
          
          .heart::before,
          .heart::after {
            width: 42px;
            height: 64px;
            left: 40px;
          }
          
          .heart::after {
            left: 0;
          }
          
          .heart-container {
            height: 100px;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
