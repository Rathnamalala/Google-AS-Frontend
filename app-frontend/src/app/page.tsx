"use client";

import { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const PredictApp = () => {
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [contentRating, setContentRating] = useState("");
  const [genres, setGenres] = useState("");
  const [prediction, setPrediction] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    "ART_AND_DESIGN", "AUTO_AND_VEHICLES", "BEAUTY", "BOOKS_AND_REFERENCE",
    "BUSINESS", "COMICS", "COMMUNICATION", "DATING", "EDUCATION", "ENTERTAINMENT",
    "EVENTS", "FINANCE", "FOOD_AND_DRINK", "HEALTH_AND_FITNESS", "HOUSE_AND_HOME",
    "LIBRARIES_AND_DEMO", "LIFESTYLE", "GAME", "FAMILY", "MEDICAL", "SOCIAL",
    "SHOPPING", "PHOTOGRAPHY", "SPORTS", "TRAVEL_AND_LOCAL", "TOOLS", "PERSONALIZATION",
    "PRODUCTIVITY", "PARENTING", "WEATHER", "NEWS_AND_MAGAZINES", "MAPS_AND_NAVIGATION"
  ];

  const genreList = [
    "Action", "Adventure", "Arcade", "Art & Design", "Auto & Vehicles", "Beauty", "Board",
    "Books & Reference", "Business", "Card", "Casual", "Comics", "Communication", "Dating",
    "Education", "Entertainment", "Events", "Finance", "Food & Drink", "Health & Fitness",
    "House & Home", "Libraries & Demo", "Lifestyle", "Maps & Navigation", "Medical", "Music",
    "News & Magazines", "Parenting", "Personalization", "Photography", "Productivity",
    "Puzzle", "Racing", "Role Playing", "Shopping", "Simulation", "Social", "Sports", "Strategy",
    "Tools", "Travel & Local", "Trivia", "Video Players", "Weather", "Word"
  ];

  const types = ["Free", "Paid"];
  const contentRatings = ["Everyone", "Teen", "Mature 17+"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      Rating: parseFloat(rating),
      Reviews: parseInt(reviews),
      Size: parseFloat(size),
      Price: parseFloat(price),
      Category: category,
      Type: type,
      Content_Rating: contentRating,
      Genres: genres,
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", data);
      setPrediction(response.data.result);
      setConfidence(response.data.confidence);
    } catch (error) {
      console.error("Error making prediction", error);
      alert("Error making prediction. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <header className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold mb-3 tracking-wide"> App Popularity Predictor</h1>
        <p className="text-gray-300 text-lg">Predict how popular an app might be based on its core features and attributes.</p>
      </header>

      <main className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Fields */}
          {[{ label: "Rating", value: rating, setter: setRating, type: "number", step: "0.1" },
            { label: "Reviews", value: reviews, setter: setReviews, type: "number" },
            { label: "Size (MB)", value: size, setter: setSize, type: "number" },
            { label: "Price ($)", value: price, setter: setPrice, type: "number" }
          ].map((field, idx) => (
            <div className="flex flex-col" key={idx}>
              <label className="mb-1 font-medium">{field.label}</label>
              <input
                type={field.type}
                step={field.step}
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                required
                className="bg-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
              />
            </div>
          ))}

          {/* Select Fields */}
          {[{ label: "Category", value: category, setter: setCategory, options: categories },
            { label: "Type", value: type, setter: setType, options: types },
            { label: "Content Rating", value: contentRating, setter: setContentRating, options: contentRatings },
            { label: "Genres", value: genres, setter: setGenres, options: genreList }
          ].map((field, idx) => (
            <div className="flex flex-col" key={idx}>
              <label className="mb-1 font-medium">{field.label}</label>
              <select
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                required
                className="bg-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
              >
                <option value="">Select {field.label}</option>
                {field.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          ))}
        </form>

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition duration-300 shadow-lg"
          >
            {loading ? <ClipLoader size={24} color="#fff" /> : "🔍 Predict"}
          </button>
        </div>

        {/* Results */}
        {prediction && (
          <div className="mt-10 p-6 bg-green-800 rounded-xl text-white text-center shadow-lg">
            <h2 className="text-2xl font-bold">🚀 Prediction Result</h2>
            <p className="mt-2 text-xl">📊 Prediction: <span className="font-semibold">{prediction}</span></p>
            <p className="text-md text-gray-300">🔒 Confidence: {confidence}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default PredictApp;
