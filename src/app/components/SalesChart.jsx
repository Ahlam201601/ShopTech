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
        backgroundColor: "#4f46e5",
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
        font: { size: 14, weight: 'bold' },
        color: '#374151',
        padding: {
          top: 5,
          bottom: 15
        },
        align: 'start' // Alignement du titre à gauche
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
          font: { size: 11 },
          color: '#6b7280',
          padding: 5, // Réduit l'espace autour des labels
        },
        border: {
          color: '#e5e7eb'
        },
        // Réduire l'espace entre les catégories
        barPercentage: 0.5,
        categoryPercentage: 0.6,
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6'
        },
        ticks: {
          font: { size: 10 },
          color: '#6b7280',
          callback: function(value) {
            return value.toLocaleString();
          },
          padding: 3,
        },
        border: {
          color: '#e5e7eb',
          dash: [4, 4]
        }
      }
    },
    elements: {
      bar: {
        borderWidth: 0,
        borderSkipped: false,
        barThickness: 16, // Barres plus fines
      }
    },
    layout: {
      padding: {
        left: 5,  // Très peu d'espace à gauche
        right: 25, // Plus d'espace à droite
        top: 5,
        bottom: 5
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-3 border border-gray-100">
      <div style={{ height: "180px" }}> {/* Hauteur réduite */}
        <Bar data={data} options={options} />
      </div>
      <div className="flex justify-start items-center mt-3 space-x-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded bg-violet-600 mr-2"></div>
          <span className="text-xs text-gray-600">Ventes par catégorie</span>
        </div>
        <div className="text-xs text-gray-500">
          Total: {Object.values(salesByCategory).reduce((a, b) => a + b, 0).toLocaleString()} unités
        </div>
      </div>
    </div>
  );
}