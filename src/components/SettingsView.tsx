// src/components/SettingsView.tsx
import React from 'react';
import { Settings, Trash2 } from 'lucide-react';

const SettingsView = () => {
    // MEJORA: Agregar lógica real para persistir la configuración
    return (
        <div className="holographic-card rounded-3xl shadow-2xl p-8 border-8 border-purple-400 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/20 opacity-30"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-cyan-300/10 via-transparent to-purple-300/10"></div>
            
            <div className="relative z-10">
                <div className="bg-gradient-to-r from-purple-600 via-pink-700 to-purple-600 rounded-2xl p-4 mb-6 border-4 border-purple-800 shadow-xl">
                    <h2 className="text-3xl font-black text-white flex items-center gap-3" style={{textShadow: '3px 3px 0 #000'}}>
                        <Settings className="text-purple-300 animate-pulse" size={32} /> CONFIGURACIÓN
                    </h2>
                </div>

                <div className="space-y-4">
                    {/* Notificaciones */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-4 border-blue-400">
                        <h3 className="text-xl font-black text-white mb-4">Notificaciones</h3>
                        <div className="space-y-3">
                            <label className="flex items-center justify-between cursor-pointer">
                                <span className="text-white font-bold">Alertas de precios</span>
                                <input type="checkbox" className="w-6 h-6 rounded accent-blue-500" defaultChecked />
                            </label>
                            <label className="flex items-center justify-between cursor-pointer">
                                <span className="text-white font-bold">Nuevas expansiones</span>
                                <input type="checkbox" className="w-6 h-6 rounded accent-blue-500" defaultChecked />
                            </label>
                        </div>
                    </div>

                    {/* Idioma y Privacidad */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-4 border-yellow-400">
                            <h3 className="text-xl font-black text-white mb-4">Idioma</h3>
                            <select className="w-full bg-black/40 text-white border-2 border-yellow-400 rounded-xl p-3 font-bold">
                                <option>Español</option>
                                <option>English</option>
                                <option>Français</option>
                                <option>日本語</option>
                            </select>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-4 border-green-400">
                            <h3 className="text-xl font-black text-white mb-4">Privacidad</h3>
                            <div className="space-y-3">
                                <label className="flex items-center justify-between cursor-pointer">
                                    <span className="text-white font-bold">Perfil público</span>
                                    <input type="checkbox" className="w-6 h-6 rounded accent-green-500" />
                                </label>
                                <label className="flex items-center justify-between cursor-pointer">
                                    <span className="text-white font-bold">Mostrar colección</span>
                                    <input type="checkbox" className="w-6 h-6 rounded accent-green-500" />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Acciones */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-4 border-red-400">
                        <h3 className="text-xl font-black text-white mb-4">Cuenta / Datos</h3>
                        <div className="space-y-3">
                            <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 rounded-xl transition">
                                Exportar datos
                            </button>
                            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
                                <Trash2 size={20} /> Eliminar cuenta
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsView;