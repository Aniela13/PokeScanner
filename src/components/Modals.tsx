// src/components/Modals.tsx
import React from 'react';
import { X, Mail, Heart, Award, HelpCircle } from 'lucide-react';

interface ModalProps {
    show: boolean;
    onClose: () => void;
}

// Tipos compartidos para el Modal de Ranking
interface RankInfo { name: string; color: string; icon: string; }

// --- Contact Modal ---
interface ContactModalProps {
    showContactModal: boolean;
    setShowContactModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContactModal: React.FC<ContactModalProps> = ({ showContactModal, setShowContactModal }) => {
    if (!showContactModal) return null;
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl border-4 border-yellow-400 p-8 max-w-md w-full relative">
                <button onClick={() => setShowContactModal(false)} className="absolute top-4 right-4 text-white hover:text-red-500 transition-all">
                    <X size={28} />
                </button>
                <div className="text-center mb-6">
                    <Mail className="mx-auto text-yellow-400 mb-4" size={48} />
                    <h2 className="text-3xl font-black text-white mb-2">Contáctanos</h2>
                    <p className="text-gray-300">Nuestro equipo de desarrolladores</p>
                </div>
                <div className="space-y-4">
                    <div className="bg-black/40 rounded-xl p-4 border-2 border-yellow-400/30">
                        <p className="text-yellow-400 font-bold mb-1">Soporte General:</p>
                        <a href="mailto:support@pokecardscanner.com" className="text-white hover:text-yellow-300 transition-all">support@pokecardscanner.com</a>
                    </div>
                    {/* ... (otros contactos) */}
                </div>
            </div>
        </div>
    );
};

// --- Donate Modal ---
interface DonateModalProps {
    showDonateModal: boolean;
    setShowDonateModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DonateModal: React.FC<DonateModalProps> = ({ showDonateModal, setShowDonateModal }) => {
    if (!showDonateModal) return null;
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl border-4 border-yellow-400 p-8 max-w-md w-full relative">
                <button onClick={() => setShowDonateModal(false)} className="absolute top-4 right-4 text-white hover:text-red-500 transition-all">
                    <X size={28} />
                </button>
                <div className="text-center mb-6">
                    <Heart className="mx-auto text-red-500 mb-4" size={48} />
                    <h2 className="text-3xl font-black text-white mb-2">Apoya el Proyecto</h2>
                    <p className="text-gray-300">Tu donación nos ayuda a mejorar la app</p>
                </div>
                <div className="space-y-4 mb-6">
                    <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black py-4 rounded-xl transition-all transform hover:scale-105 border-2 border-green-700">Donar $5</button>
                    <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-black py-4 rounded-xl transition-all transform hover:scale-105 border-2 border-blue-700">Donar $10</button>
                    <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-black py-4 rounded-xl transition-all transform hover:scale-105 border-2 border-purple-700">Donar $25</button>
                </div>
            </div>
        </div>
    );
};

// --- Ranking Help Modal ---
interface RankingHelpModalProps {
    showRankingHelp: boolean;
    setShowRankingHelp: React.Dispatch<React.SetStateAction<boolean>>;
    getRankInfo: (count: number) => RankInfo;
    cardsLength: number;
}

export const RankingHelpModal: React.FC<RankingHelpModalProps> = ({ showRankingHelp, setShowRankingHelp, getRankInfo, cardsLength }) => {
    if (!showRankingHelp) return null;
    
    // Generar la lista de rangos para el modal
    const ranks = [500, 250, 100, 50, 20, 10, 5, 0].map(count => ({ 
        ...getRankInfo(count), 
        minCards: count, 
        maxCards: count === 0 ? 4 : (count === 500 ? '∞' : (cardsLength < count ? count - 1 : cardsLength + 50)) // Lógica simplificada para el rango
    }));
    
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl border-4 border-cyan-400 p-8 max-w-2xl w-full relative">
                <button onClick={() => setShowRankingHelp(false)} className="absolute top-4 right-4 text-white hover:text-red-500 transition-all">
                    <X size={28} />
                </button>
                <div className="text-center mb-6">
                    <Award className="mx-auto text-cyan-400 mb-4" size={48} />
                    <h2 className="text-3xl font-black text-white mb-2">Sistema de Rankings</h2>
                    <p className="text-gray-300">Sube de nivel según el tamaño de tu colección</p>
                </div>
                
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {ranks.map((rank, index) => (
                        <div key={index} className={`bg-gradient-to-r ${rank.color.replace('from-', 'from-').replace('to-', 'to-')}/20 rounded-xl p-4 border-2 border-cyan-400/50`}>
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">{rank.icon}</span>
                                <div>
                                    <p className={`font-black text-white`}>{rank.name}</p>
                                    <p className="text-sm text-gray-400">{rank.minCards}+ cartas</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};