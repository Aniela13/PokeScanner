// src/components/ProfileView.tsx
import React from 'react';
import { User, Edit, Package, Star, Award, HelpCircle } from 'lucide-react';
import { CardData } from './PokemonCardScanner';

interface RankInfo { name: string; color: string; icon: string; }

interface ProfileViewProps {
    cards: CardData[];
    totalValue: number;
    currentRank: RankInfo;
    setShowRankingHelp: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileView: React.FC<ProfileViewProps> = ({ cards, totalValue, currentRank, setShowRankingHelp }) => {
    // Lógica para calcular el progreso al siguiente nivel
    const calculateProgress = () => {
        const count = cards.length;
        if (count >= 500) return 100; // Maestro Pokémon - 500+
        if (count >= 250) return ((count - 250) / 250) * 100; // Campeón - 250 a 499
        if (count >= 100) return ((count - 100) / 150) * 100; // Líder - 100 a 249
        if (count >= 50) return ((count - 50) / 50) * 100; // Experto - 50 a 99
        if (count >= 20) return ((count - 20) / 30) * 100; // Avanzado - 20 a 49
        if (count >= 10) return ((count - 10) / 10) * 100; // Intermedio - 10 a 19
        if (count >= 5) return ((count - 5) / 5) * 100; // Junior - 5 a 9
        return (count / 5) * 100; // Novato - 0 a 4
    };

    const progress = Math.min(calculateProgress(), 100);
    
    return (
        <div className="holographic-card rounded-3xl shadow-2xl p-8 border-8 border-cyan-400 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/20 opacity-30"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-cyan-300/10 via-transparent to-purple-300/10"></div>
            
            <div className="relative z-10">
                <div className="bg-gradient-to-r from-cyan-600 via-blue-700 to-purple-600 rounded-2xl p-4 mb-6 border-4 border-cyan-800 shadow-xl">
                    <h2 className="text-3xl font-black text-white flex items-center gap-3" style={{textShadow: '3px 3px 0 #000'}}>
                        <User className="text-cyan-300 animate-pulse" size={32} /> MI PERFIL
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Columna Izquierda - Foto y datos básicos */}
                    <div className="md:col-span-1 space-y-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-4 border-cyan-400">
                            <div className="relative w-32 h-32 mx-auto mb-4">
                                <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center border-4 border-yellow-400 shadow-2xl">
                                    <User className="text-white" size={64} />
                                </div>
                                <button className="absolute bottom-0 right-0 bg-yellow-400 hover:bg-yellow-500 p-2 rounded-full border-2 border-white shadow-xl transition">
                                    <Edit size={20} />
                                </button>
                            </div>
                            
                            <div className="text-center">
                                <h3 className="text-2xl font-black text-white mb-1">Ash Ketchum</h3>
                                <p className="text-cyan-300 text-sm">@ashketchum</p>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border-4 border-purple-400">
                            <p className="text-sm text-gray-300 mb-1">Email</p>
                            <p className="text-white font-bold">ash@pokemon.com</p>
                        </div>
                    </div>

                    {/* Columna Derecha - Estadísticas y Ranking */}
                    <div className="md:col-span-2 space-y-4">
                        {/* Ranking */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-4 border-yellow-400 relative">
                            <button onClick={() => setShowRankingHelp(true)} className="absolute top-4 right-4 bg-cyan-500 hover:bg-cyan-600 p-2 rounded-full transition-all">
                                <HelpCircle size={20} className="text-white" />
                            </button>
                            
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${currentRank.color} flex items-center justify-center text-4xl border-4 border-white shadow-2xl`}>
                                    {currentRank.icon}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-300">Tu Rango Actual</p>
                                    <h3 className="text-3xl font-black text-white">{currentRank.name}</h3>
                                </div>
                            </div>
                            
                            <div className="bg-black/40 rounded-xl p-4">
                                <div className="flex justify-between text-sm text-gray-300 mb-2">
                                    <span>Progreso:</span>
                                    <span className="font-bold text-cyan-300">{cards.length} cartas ({progress.toFixed(0)}%)</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                                    <div 
                                        className={`h-full bg-gradient-to-r ${currentRank.color} transition-all duration-500`}
                                        style={{width: `${progress}%`}}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Estadísticas */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border-4 border-blue-400 text-center">
                                <Package className="mx-auto text-blue-400 mb-2" size={32} />
                                <p className="text-3xl font-black text-white">{cards.length}</p>
                                <p className="text-sm text-gray-300">Cartas</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border-4 border-green-400 text-center">
                                <Star className="mx-auto text-green-400 mb-2" size={32} />
                                <p className="text-3xl font-black text-white">${totalValue.toFixed(0)}</p>
                                <p className="text-sm text-gray-300">Valor Total</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border-4 border-purple-400 text-center">
                                <Award className="mx-auto text-purple-400 mb-2" size={32} />
                                <p className="text-3xl font-black text-white">{Math.floor(cards.length / 10)}</p>
                                <p className="text-sm text-gray-300">Logros</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;