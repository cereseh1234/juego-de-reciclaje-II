import React, { useState, useEffect } from 'react';
import { Trash2, RefreshCw, Trophy, Clock } from 'lucide-react';

const RecyclingGame = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const bins = [
    { id: 'plastic', name: 'Plástico', color: 'bg-yellow-500', icon: '🥤' },
    { id: 'glass', name: 'Vidrio', color: 'bg-green-600', icon: '🍾' },
    { id: 'paper', name: 'Papel', color: 'bg-blue-500', icon: '📰' },
    { id: 'organic', name: 'Orgánico', color: 'bg-amber-700', icon: '🍌' },
    { id: 'general', name: 'General', color: 'bg-gray-600', icon: '🗑️' }
  ];

  const items = [
    { name: 'Botella de Plástico', category: 'plastic', emoji: '🧴' },
    { name: 'Frasco de Vidrio', category: 'glass', emoji: '🫙' },
    { name: 'Periódico', category: 'paper', emoji: '📰' },
    { name: 'Cáscara de Plátano', category: 'organic', emoji: '🍌' },
    { name: 'Lata de Conserva', category: 'general', emoji: '🥫' },
    { name: 'Caja de Cartón', category: 'paper', emoji: '📦' },
    { name: 'Botella de Vino', category: 'glass', emoji: '🍾' },
    { name: 'Corazón de Manzana', category: 'organic', emoji: '🍎' },
    { name: 'Vaso de Yogur', category: 'plastic', emoji: '🥤' },
    { name: 'Filtro de Café', category: 'organic', emoji: '☕' },
    { name: 'Revista', category: 'paper', emoji: '📖' },
    { name: 'Bolsa de Plástico', category: 'plastic', emoji: '👜' },
    { name: 'Vidrio Roto', category: 'general', emoji: '💎' },
    { name: 'Bolsita de Té', category: 'organic', emoji: '🍵' },
    { name: 'Caja de Pizza', category: 'paper', emoji: '🍕' },
    { name: 'Servilletas Usadas', category: 'organic', emoji: '🧻' },
    { name: 'Envase de Shampoo', category: 'plastic', emoji: '🧴' },
    { name: 'Tarro de Mermelada', category: 'glass', emoji: '🫙' },
    { name: 'Papel de Regalo', category: 'paper', emoji: '🎁' },
    { name: 'Cáscaras de Huevo', category: 'organic', emoji: '🥚' }
  ];

  useEffect(() => {
    let timer;
    if (gameActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
    return () => clearTimeout(timer);
  }, [gameActive, timeLeft]);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(30);
    setFeedback('');
    setShowFeedback(false);
    generateNewItem();
  };

  const generateNewItem = () => {
    const randomItem = items[Math.floor(Math.random() * items.length)];
    setCurrentItem(randomItem);
  };

  const handleBinClick = (binId) => {
    if (!gameActive || !currentItem) return;

    const isCorrect = currentItem.category === binId;
    
    if (isCorrect) {
      setScore(score + 1);
      setFeedback('¡Correcto! ✅');
    } else {
      setFeedback(`¡Incorrecto! Esto va en ${bins.find(b => b.id === currentItem.category)?.name} ❌`);
    }
    
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      if (timeLeft > 0) {
        generateNewItem();
      }
    }, 1500);
  };

  const resetGame = () => {
    setGameActive(false);
    setScore(0);
    setTimeLeft(30);
    setCurrentItem(null);
    setFeedback('');
    setShowFeedback(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-800 mb-2 flex items-center justify-center gap-3">
          <Trash2 className="text-green-600" />
          Juego de Reciclaje
        </h1>
        <p className="text-gray-600 text-lg">¡Clasifica los residuos en los contenedores correctos!</p>
      </div>

      {/* Game Stats */}
      <div className="flex justify-center gap-8 mb-8">
        <div className="bg-white rounded-lg p-4 shadow-lg flex items-center gap-2">
          <Trophy className="text-yellow-500" />
          <span className="text-xl font-bold">Puntuación: {score}</span>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-lg flex items-center gap-2">
          <Clock className="text-blue-500" />
          <span className="text-xl font-bold">Tiempo: {timeLeft}s</span>
        </div>
      </div>

      {/* Current Item */}
      {gameActive && currentItem && (
        <div className="text-center mb-8">
          <div className="bg-white rounded-2xl p-8 shadow-xl inline-block transform hover:scale-105 transition-transform">
            <div className="text-6xl mb-4">{currentItem.emoji}</div>
            <h2 className="text-2xl font-bold text-gray-800">{currentItem.name}</h2>
            <p className="text-gray-600 mt-2">¿Dónde va este residuo?</p>
          </div>
        </div>
      )}

      {/* Feedback */}
      {showFeedback && (
        <div className="text-center mb-6">
          <div className={`inline-block px-6 py-3 rounded-full text-white font-bold text-lg ${
            feedback.includes('Correcto') ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {feedback}
          </div>
        </div>
      )}

      {/* Recycling Bins */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {bins.map((bin) => (
          <button
            key={bin.id}
            onClick={() => handleBinClick(bin.id)}
            disabled={!gameActive || showFeedback}
            className={`${bin.color} rounded-2xl p-6 text-white font-bold text-center transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <div className="text-4xl mb-2">{bin.icon}</div>
            <div className="text-lg">{bin.name}</div>
          </button>
        ))}
      </div>

      {/* Game Controls */}
      <div className="text-center">
        {!gameActive && timeLeft > 0 && (
          <button
            onClick={startGame}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Iniciar Juego
          </button>
        )}
        
        {!gameActive && timeLeft === 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-xl inline-block">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">¡Juego Terminado!</h2>
            <p className="text-xl text-gray-600 mb-6">Puntuación Final: {score}</p>
            <button
              onClick={resetGame}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full flex items-center gap-2 mx-auto"
            >
              <RefreshCw size={20} />
              Jugar de Nuevo
            </button>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-12 bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Cómo Jugar:</h3>
        <div className="grid md:grid-cols-2 gap-4 text-gray-600">
          <div>
            <h4 className="font-bold text-lg mb-2">Categorías de Reciclaje:</h4>
            <ul className="space-y-2">
              <li><span className="text-yellow-600">🥤 Plástico:</span> Botellas, bolsas, envases</li>
              <li><span className="text-green-600">🍾 Vidrio:</span> Botellas, frascos, tarros</li>
              <li><span className="text-blue-600">📰 Papel:</span> Periódicos, cartón, revistas</li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              <li><span className="text-amber-700">🍌 Orgánico:</span> Restos de comida, residuos biodegradables</li>
              <li><span className="text-gray-600">🗑️ General:</span> Residuos no reciclables</li>
            </ul>
            <p className="mt-4 text-sm">
              Haz clic en el contenedor correcto para cada objeto que aparezca. ¡Tienes 30 segundos para clasificar tantos residuos como puedas!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecyclingGame;
