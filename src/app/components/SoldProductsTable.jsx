export default function SoldProductsTable({ products }) {
  const soldProducts = products.filter(
    (product) => Number(product.sold) > 0
  );

  return (
    <div className="mt-6 bg-white p-5 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-5">
        Produits vendus
      </h2>

      {soldProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Aucun produit vendu.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">Nom</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">Catégorie</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">Prix</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">Quantité vendue</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">Date</th>
              </tr>
            </thead>

            <tbody>
              {soldProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {product.name}
                  </td>

                  <td className="py-3 px-4 text-indigo-600 font-medium">
                    {product.category}
                  </td>

                  <td className="py-3 px-4">{product.price} DH</td>

                  <td className="py-3 px-4 font-semibold text-indigo-600">
                    {product.sold}
                  </td>

                  <td className="py-3 px-4 text-gray-500">
                    {product.createdAt
                      ? new Date(product.createdAt).toLocaleDateString()
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
