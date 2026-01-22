"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SalesChart({ products }) {
  // Calcul des ventes par catégorie
  const salesByCategory = products.reduce((acc, product) => {
    const category = product.category;
    const sold = Number(product.sold || 0);
    if (!acc[category]) acc[category] = 0;
    acc[category] += sold;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(salesByCategory),
    datasets: [
      {
        label: "Produits vendus",
        data: Object.values(salesByCategory),
        backgroundColor: "#7C3AED",
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Ventes par catégorie",
        font: { size: 13, weight: 'bold' },
        color: '#374151',
        padding: {
          top: 0,
          bottom: 10
        },
        align: 'start'
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#f9fafb',
        bodyColor: '#f9fafb',
        titleFont: { size: 12 },
        bodyFont: { size: 12 },
        padding: 8,
        cornerRadius: 4,
        displayColors: false,
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: { size: 10 },
          color: '#6b7280',
          padding: 2,
          maxRotation: 0,
        },
        border: {
          color: '#e5e7eb'
        },
        // Réduire drastiquement l'espace entre les barres
        barPercentage: 0.3,
        categoryPercentage: 0.4,
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6',
          drawBorder: false,
        },
        ticks: {
          font: { size: 9 },
          color: '#6b7280',
          callback: function(value) {
            return value.toLocaleString();
          },
          padding: 2,
          count: 4, // Réduire le nombre de ticks sur l'axe Y
        },
        border: {
          display: false
        }
      }
    },
    elements: {
      bar: {
        borderWidth: 0,
        borderSkipped: false,
        barThickness: 12, // Barres encore plus fines
      }
    },
    layout: {
      padding: {
        left: 0,  // Supprimer l'espace à gauche
        right: 5, // Réduire l'espace à droite
        top: 0,
        bottom: 0
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-3 border border-gray-100">
      <div style={{ height: "160px" }}> {/* Hauteur encore réduite */}
        <Bar data={data} options={options} />
      </div>
      <div className="flex justify-start items-center mt-2 space-x-3">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded bg-violet-600 mr-1"></div>
          <span className="text-xs text-gray-600">Ventes par catégorie</span>
        </div>
        <div className="text-xs text-gray-500">
          Total: {Object.values(salesByCategory).reduce((a, b) => a + b, 0).toLocaleString()} unités
        </div>
      </div>
    </div>
  );
}