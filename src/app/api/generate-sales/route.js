import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { salesData } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `
Tu es une IA experte en analyse commerciale.
Analyse ces données :

- Stock total : ${salesData.totalStock}
- Valeur du stock : ${salesData.totalStockValue} DH
- Produits vendus : ${salesData.totalSold}
- Valeur des ventes : ${salesData.totalSalesValue} DH

Rédige une analyse TRÈS COURTE (2 à 3 lignes max) pour un rapport exécutif.
`;

    // 3. Syntaxe de génération correcte
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text: text });
  } catch (err) {
    console.error("Erreur détaillée:", err);
    return NextResponse.json(
      { error: "Erreur lors de la génération : " + err.message },
      { status: 500 },
    );
  }
}
