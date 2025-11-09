// src/components/CollectionView.tsx
import React, { useState, useMemo } from 'react';
import { Package, Trash2, ArrowUpDown, Search } from 'lucide-react';
import { CardData } from './PokemonCardScanner';

// Tipos de Props
interface CollectionViewProps {
    cards: CardData[];
    deleteCard: (cardId: string) => void;
}

// Opciones de ordenamiento
type SortKey = 'nombre' | 'expansion' | 'salePrice' | 'timestamp';
type SortDirection = 'asc' | 'desc';

const CollectionView: React.FC<CollectionViewProps> = ({ cards, deleteCard }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState<SortKey>('timestamp');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc'); // Por defecto, el más reciente

    // Función para cambiar el orden
    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
    };

    // Lógica de filtrado y ordenamiento
    const sortedAndFilteredCards = useMemo(() => {
        const filtered = cards.filter(card => 
            card.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.expansion.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return filtered.sort((a, b) => {
            let comparison = 0;
            const aValue = a[sortKey] as any;
            const bValue = b[sortKey] as any;

            if (aValue > bValue) {
                comparison = 1;
            } else if (aValue < bValue) {
                comparison = -1;
            }

            return sortDirection === 'asc' ? comparison : comparison * -1;
        });
    }, [cards, searchTerm, sortKey, sortDirection]);

    if (cards.length === 0) {
        // MEJORA: Ya no hay un mensaje redundante, se usará el call-to-action en ScannerView
        return (
            <div className="holographic-card rounded-3xl shadow-2xl p-6 border-8 border-yellow-400 relative overflow-hidden text-center py-16">
                <Package className="mx-auto text-yellow-300 mb-4" size={64} />
                <h2 className="text-3xl font-black text-white drop-shadow-lg">¡Empieza tu Colección!</h2>
                <p className="text-gray-300 mt-2">Ve a la pestaña **Escáner** para registrar tu primera carta.</p>
            </div>
        );
    }


    const SortButton: React.FC<{ keyName: SortKey, label: string }> = ({ keyName, label }) => (
        <button
            onClick={() => handleSort(keyName)}
            className={`flex items-center gap-1 p-2 rounded-lg transition-all text-sm font-bold ${
                sortKey === keyName 
                ? 'bg-blue-600 text-white' 
                : 'bg-black/40 text-gray-300 hover:bg-black/60'
            }`}
        >
            {label}
            {sortKey === keyName && <ArrowUpDown size={14} className={sortDirection === 'asc' ? 'rotate-180' : ''} />}
        </button>
    );

    return (
        <div className="holographic-card rounded-3xl shadow-2xl p-6 border-8 border-yellow-400 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/20 opacity-30"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-cyan-300/10 via-transparent to-purple-300/10"></div>
            
            <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 rounded-2xl p-4 mb-4 relative z-10 border-4 border-yellow-600 shadow-xl">
                <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3" style={{ textShadow: '2px 2px 0 rgba(255,255,255,0.5)' }}>
                    <Package className="text-red-600 animate-pulse" size={32} />
                    MI COLECCIÓN COMPLETA ({cards.length})
                </h2>
            </div>
            
            {/* Controles de Búsqueda y Ordenamiento */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-4 relative z-10 border-4 border-gray-400/50">
                <div className="flex items-center gap-3 mb-4">
                    <Search className="text-yellow-400 flex-shrink-0" size={24} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o expansión..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/40 text-white border-2 border-gray-500 rounded-xl p-3 focus:border-yellow-400 transition"
                    />
                </div>
                <div className="flex flex-wrap gap-2 items-center text-white">
                    <span className="font-bold text-sm text-gray-300 mr-2">Ordenar por:</span>
                    <SortButton keyName="nombre" label="Nombre" />
                    <SortButton keyName="expansion" label="Expansión" />
                    <SortButton keyName="salePrice" label="Valor" />
                    <SortButton keyName="timestamp" label="Fecha" />
                </div>
            </div>

            <div className="space-y-3 max-h-[800px] overflow-y-auto pr-2 relative z-10">
                {sortedAndFilteredCards.length === 0 ? (
                    <p className="text-center text-gray-300 py-10 bg-white/10 rounded-xl">No se encontraron cartas que coincidan con la búsqueda.</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sortedAndFilteredCards.map((card) => (
                            <div key={card.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:shadow-xl transition-all border-4 border-blue-200 hover:border-blue-400 transform hover:scale-105">
                                <img 
                                    src={card.image} 
                                    alt={card.nombre} 
                                    className="w-full h-48 object-cover rounded-xl shadow-lg border-2 border-yellow-400 mb-3" 
                                />
                                <h3 className="font-black text-lg text-white truncate drop-shadow-lg">{card.nombre}</h3>
                                <p className="text-sm text-gray-200 font-bold truncate mt-1 mb-2">
                                    <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs">{card.expansion}</span>
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="bg-gradient-to-r from-green-400 to-green-500 text-white text-sm font-black px-3 py-1 rounded-full shadow-lg border-2 border-green-600">
                                        ${card.salePrice?.toFixed(2)}
                                    </span>
                                    <button
                                        onClick={() => deleteCard(card.id)}
                                        className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-xl transition-all"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CollectionView;