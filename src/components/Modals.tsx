// src/components/Modals.tsx
import React from 'react';
import Image from 'next/image'; 
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

    const creatorEmails = [
        "aniela.ubillus@pucp.edu.pe",
        "d.pozo@pucp.edu.pe"
    ];

    return (
        // 1. Fondo oscuro y centrador del modal (fixed)
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            
            {/* 2. Contenedor del Modal: Añadimos altura máxima y scroll */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl border-4 border-yellow-400 p-8 max-w-sm w-full relative 
                        max-h-[90vh] overflow-y-auto"> 
                
                {/* Botón de Cerrar */}
                <button
                    onClick={() => setShowDonateModal(false)}
                    className="sticky top-0 right-0 float-right text-white hover:text-red-500 transition-all z-10 p-2 -mr-4 -mt-4"
                >
                    <X size={28} />
                </button>
                
                {/* Header del Modal */}
                <div className="text-center mb-6 mt-4">
                    <Heart className="mx-auto text-red-500 mb-4 animate-pulse" size={48} />
                    <h2 className="text-3xl font-black text-white mb-2">Apoya a los Creadores</h2>
                    <p className="text-gray-300">Tu donación impulsa el proyecto PokéCard Scanner</p>
                </div>
                
                {/* Sección de Código QR */}
                <div className="bg-white/10 p-5 rounded-2xl border-2 border-yellow-500 mb-6 text-center shadow-inner">
                    <h3 className="text-xl font-bold text-yellow-300 mb-3 flex items-center justify-center gap-2">
                        <Heart size={20} className="text-red-500" /> Donación QR
                    </h3>
                    
                    <p className="text-sm text-gray-300 mb-4">
                        Escanea el código QR de nuestra plataforma preferida:
                    </p>

                    {/* Contenedor de la Imagen: Alto y Ancho Fijos */}
                    <div className="relative w-40 h-40 mx-auto p-2 rounded-lg bg-white border-4 border-red-500 shadow-xl">
                        {/* 3. IMAGEN CORREGIDA: Usamos <img> simple si Next/Image da problemas */}
                        <img
                            src="/qr-donation.jpg" // Asegúrate de que esta ruta sea correcta
                            alt="Código QR de Donación"
                            // Añadimos clases para asegurar que la imagen se ajuste y se muestre
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </div>
                </div>

                {/* Sección de Correos Electrónicos */}
                <div className="bg-white/10 p-5 rounded-2xl border-2 border-cyan-500 text-left shadow-inner">
                    <h3 className="text-xl font-bold text-cyan-300 mb-3 flex items-center gap-2">
                        <Mail size={20} className="text-cyan-500" /> Contacto / Agradecimiento
                    </h3>
                    <p className="text-gray-300 mb-3 text-sm">
                        Envía tus comentarios o agradecimientos a los desarrolladores:
                    </p>
                    <ul className="space-y-2">
                        {creatorEmails.map((email) => (
                            <li key={email} className="bg-black/40 p-2 rounded-lg hover:bg-black/60 transition">
                                <a 
                                    href={`mailto:${email}`} 
                                    className="text-yellow-400 font-bold hover:text-yellow-300 text-sm break-all"
                                >
                                    {email}
                                </a>
                            </li>
                        ))}
                    </ul>
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