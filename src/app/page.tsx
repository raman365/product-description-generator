"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { FaSpinner, FaCopy, FaCheck } from "react-icons/fa";

export default function Home() {
  const [productName, setProductName] = useState("");
  const [features, setFeatures] = useState("");
  const [description, setDescription] = useState("");
  const [style, setStyle] = useState("seo");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateDescription = async () => {
    setLoading(true);
    setDescription("");

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productName, features, style }),
    });

    const data = await response.json();
    setLoading(false);
    setDescription(data.description || "Error generating description.");
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(description);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative p-6 min-h-screen bg-green-50 flex flex-col items-center">
      {/* Title */}
      <h1 className="text-3xl text-center font-bold text-emerald-700">*Company image* <br/>AI Product Description Generator</h1>

      {/* Input Container */}
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md mt-6 border border-green-200 z-10">
        <label className="block text-emerald-700 font-medium">Product Name</label>
        <input
          type="text"
          className="w-full text-black p-2 border border-emerald-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          placeholder="Enter product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <label className="block text-emerald-700 font-medium mt-4">Key Features</label>
        <textarea
          className="w-full text-black p-2 border border-emerald-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          placeholder="E.g., Waterproof, Bluetooth 5.0, 10-hour battery life"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
        />

        <label className="block text-emerald-700 font-medium mt-4">Writing Style</label>
        <select
          className="w-full text-black bg-white p-2 border border-emerald-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        >
          <option value="seo">SEO Optimized</option>
          <option value="casual">Casual</option>
          <option value="professional">Professional</option>
        </select>

        <button
          onClick={generateDescription}
          disabled={loading}
          className="w-full bg-emerald-600 text-white font-medium py-2 px-4 rounded mt-4 hover:bg-emerald-700 transition flex justify-center items-center"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin mr-2" /> Generating...
            </>
          ) : (
            "Generate Description"
          )}
        </button>
      </div>

      {/* Description Output */}
      {description && (
        <div className="mt-6 p-4 bg-white shadow-md rounded-lg max-w-lg w-full border border-green-200 relative z-10">
          <div className="absolute top-2 right-2 flex items-center space-x-2">
            <button
              onClick={copyToClipboard}
              className="text-gray-500 hover:text-emerald-600 transition"
            >
              {copied ? <FaCheck className="text-emerald-600" /> : <FaCopy />}
            </button>
            {copied && <span className="text-sm text-emerald-600">Copied!</span>}
          </div>
          
          <h2 className="text-lg font-bold text-emerald-800">Generated Description:</h2>
          <ReactMarkdown className="prose mt-2 text-gray-700">{description}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
