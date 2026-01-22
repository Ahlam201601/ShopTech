"use client";

import { useDispatch, useSelector } from "react-redux";
import { generateSalesText } from "../redux/aiThunk"; 
import { Sparkles, RefreshCw , TrendingUp } from "lucide-react";
import { useEffect } from "react";


export default function AIComponent({ totalStock, totalStockValue, totalSold, totalSalesValue }) {
  const dispatch = useDispatch();
  const { text, loading, error } = useSelector((state) => state.ai);

  const salesData = {
    totalStock,
    totalStockValue,
    totalSold,
    totalSalesValue,
  };

   useEffect(() => {
    if (totalStock || totalStockValue || totalSold || totalSalesValue) {
      dispatch(generateSalesText(salesData));
    }
  }, [totalStock, totalStockValue, totalSold, totalSalesValue, dispatch]);

  const handleGenerate = () => dispatch(generateSalesText(salesData));

  return (
    <div className="bg-linear-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* En-tête */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="p-2 bg-linear-to-br from-purple-500 to-violet-600 rounded-xl mr-3">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Analyse IA des ventes</h2>
              <p className="text-xs text-gray-500 mt-1">Génération automatique d'insights</p>
            </div>
          </div>
          <div className="flex items-center bg-linear-to-br from-purple-50 to-violet-50 px-3 py-1.5 rounded-full">
            <TrendingUp className="h-4 w-4 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-purple-700">+{salesData.growth}%</span>
          </div>
        </div>

        
        {/* Boutons d'action */}
        <div className="flex gap-3">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 bg-linear-to-br from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Génération en cours...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Générer l'analyse
              </>
            )}
          </button>
          
          
        </div>
      </div>

      {/* Section de résultat */}
      <div className="px-6 pb-6">
        {error && (
          <div className="mb-4 p-4 bg-linear-to-br from-red-50 to-orange-50 border border-red-100 rounded-xl">
            <div className="flex items-center">
              <div className="shrink-0">
                <div className="h-5 w-5 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-xs">!</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {text && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-700">Analyse générée</p>
              <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                Gemini AI
              </span>
            </div>
            <div className="bg-linear-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200 shadow-inner">
              <div className="relative">
                <div className="absolute -top-2 -left-2 text-3xl text-purple-200 opacity-50">"</div>
                <p className="text-gray-700 leading-relaxed relative z-10">
                  {text}
                </p>
                <div className="absolute -bottom-2 -right-2 text-3xl text-purple-200 opacity-50">"</div>
              </div>
              
              <div className="mt-5 pt-4 border-t border-gray-200 border-dashed">
                <p className="text-xs text-gray-500 italic">
                  Texte généré par une IA interprétant la performance des ventes
                </p>
              </div>
            </div>
          </div>
        )}

        {/* État vide */}
        {!text && !loading && !error && (
          <div className="mt-6 text-center py-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-linear-to-br from-purple-100 to-violet-100 rounded-full mb-4">
              <Sparkles className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-700 mb-1">
              Aucune analyse générée
            </h3>
            <p className="text-xs text-gray-500">
              Cliquez sur "Générer l'analyse" pour obtenir des insights IA
            </p>
          </div>
        )}

        {/* Loader stylisé */}
        {loading && (
          <div className="mt-6">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="h-8 w-8 rounded-full border-2 border-purple-200"></div>
                <div className="absolute top-0 left-0 h-8 w-8 rounded-full border-2 border-purple-600 border-t-transparent animate-spin"></div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600">
              L'IA analyse les données et génère des insights...
            </p>
          </div>
        )}
      </div>

      {/* Pied de page */}
      <div className="px-6 py-4 bg-linear-to-br from-gray-50 to-gray-100 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs text-gray-600">IA disponible</span>
          </div>
        </div>
      </div>
    </div>
  );
}