import { useState } from "react";
import axios from "axios";

const PredictApp = () => {
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [contentRating, setContentRating] = useState("");
  const [genres, setGenres] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);

  // Add event type for TypeScript
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
    <div className="container">
      <h1>App Popularity Prediction</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Rating</label>
          <input
            type="number"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Reviews</label>
          <input
            type="number"
            value={reviews}
            onChange={(e) => setReviews(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Size (MB)</label>
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Type</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Content Rating</label>
          <input
            type="text"
            value={contentRating}
            onChange={(e) => setContentRating(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Genres</label>
          <input
            type="text"
            value={genres}
            onChange={(e) => setGenres(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Predict"}
        </button>
      </form>

      {prediction && (
        <div className="result">
          <h2>Prediction: {prediction}</h2>
          <p>Confidence: {confidence}</p>
        </div>
      )}
    </div>
  );
};

export default PredictApp;
