import React, { useState } from 'react';

const AddPackage = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    duration: '',
    price: '',
    rating: '',
    reviewCount: '',
    image: '',
    description: '',
    included: [''],
    excluded: [''],
    itinerary: [{ day: 1, title: '', description: '' }],
    availableDates: [''],
    reviews: [{ id: 1, user: '', rating: '', comment: '', date: '' }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayItem = (field, index) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const handleItineraryChange = (index, field, value) => {
    const newItinerary = [...formData.itinerary];
    newItinerary[index][field] = value;
    setFormData(prev => ({ ...prev, itinerary: newItinerary }));
  };

  const addItineraryItem = () => {
    const newDay = formData.itinerary.length + 1;
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { day: newDay, title: '', description: '' }]
    }));
  };

  const removeItineraryItem = (index) => {
    const newItinerary = [...formData.itinerary];
    newItinerary.splice(index, 1);
    // Renumber days
    newItinerary.forEach((item, idx) => { item.day = idx + 1; });
    setFormData(prev => ({ ...prev, itinerary: newItinerary }));
  };

  const handleReviewChange = (index, field, value) => {
    const newReviews = [...formData.reviews];
    newReviews[index][field] = value;
    setFormData(prev => ({ ...prev, reviews: newReviews }));
  };

  const addReview = () => {
    const newId = formData.reviews.length + 1;
    setFormData(prev => ({
      ...prev,
      reviews: [...prev.reviews, { id: newId, user: '', rating: '', comment: '', date: '' }]
    }));
  };

  const removeReview = (index) => {
    const newReviews = [...formData.reviews];
    newReviews.splice(index, 1);
    setFormData(prev => ({ ...prev, reviews: newReviews }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert string numbers to actual numbers
    const packageData = {
      ...formData,
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating),
      reviewCount: parseInt(formData.reviewCount),
      included: formData.included.filter(item => item.trim() !== ''),
      excluded: formData.excluded.filter(item => item.trim() !== ''),
      availableDates: formData.availableDates.filter(date => date.trim() !== ''),
      itinerary: formData.itinerary.filter(item => item.title.trim() !== '' || item.description.trim() !== ''),
      reviews: formData.reviews.filter(review => review.user.trim() !== '').map(review => ({
        ...review,
        rating: parseFloat(review.rating),
        id: Math.random()
      }))
    };
    console.log('Package Data:', packageData);
    alert('Package added successfully! Check console for data.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Add New Travel Package
          </h1>
          <p className="text-gray-500 mt-2">Create an amazing travel experience for your customers</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm">1</span>
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Package Title *</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., Beach Paradise" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., Maldives" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
                <input type="text" name="duration" value={formData.duration} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., 7 Days / 6 Nights" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price (USD) *</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., 1299" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <input type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., 4.8" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Review Count</label>
                <input type="number" name="reviewCount" value={formData.reviewCount} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., 128" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL *</label>
                <input type="url" name="image" value={formData.image} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="https://images.unsplash.com/..." required />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Detailed description of the package..." required />
              </div>
            </div>
          </div>

          {/* Included & Excluded */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white text-sm">2</span>
              Inclusions & Exclusions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Included */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">What's Included</label>
                {formData.included.map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input type="text" value={item} onChange={(e) => handleArrayChange('included', idx, e.target.value)} className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" placeholder="e.g., Round-trip flights" />
                    <button type="button" onClick={() => removeArrayItem('included', idx)} className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">✕</button>
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('included')} className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium">+ Add Item</button>
              </div>

              {/* Excluded */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">What's Excluded</label>
                {formData.excluded.map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input type="text" value={item} onChange={(e) => handleArrayChange('excluded', idx, e.target.value)} className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" placeholder="e.g., Travel insurance" />
                    <button type="button" onClick={() => removeArrayItem('excluded', idx)} className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">✕</button>
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('excluded')} className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium">+ Add Item</button>
              </div>
            </div>
          </div>

          {/* Itinerary */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white text-sm">3</span>
              Daily Itinerary
            </h2>
            {formData.itinerary.map((item, idx) => (
              <div key={idx} className="mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-gray-700">Day {item.day}</span>
                  <button type="button" onClick={() => removeItineraryItem(idx)} className="text-red-600 hover:text-red-700 text-sm">Remove Day</button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <input type="text" value={item.title} onChange={(e) => handleItineraryChange(idx, 'title', e.target.value)} className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" placeholder="Title (e.g., Arrival & Welcome)" />
                  <textarea value={item.description} onChange={(e) => handleItineraryChange(idx, 'description', e.target.value)} rows={2} className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" placeholder="Description of activities..." />
                </div>
              </div>
            ))}
            <button type="button" onClick={addItineraryItem} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors">+ Add Day</button>
          </div>

          {/* Available Dates */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center text-white text-sm">4</span>
              Available Dates
            </h2>
            {formData.availableDates.map((date, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input type="date" value={date} onChange={(e) => handleArrayChange('availableDates', idx, e.target.value)} className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
                <button type="button" onClick={() => removeArrayItem('availableDates', idx)} className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">✕</button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem('availableDates')} className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium">+ Add Date</button>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white text-sm">5</span>
              Sample Reviews
            </h2>
            {formData.reviews.map((review, idx) => (
              <div key={idx} className="mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-gray-700">Review #{idx + 1}</span>
                  <button type="button" onClick={() => removeReview(idx)} className="text-red-600 hover:text-red-700 text-sm">Remove</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input type="text" value={review.user} onChange={(e) => handleReviewChange(idx, 'user', e.target.value)} className="px-4 py-2 rounded-lg border border-gray-300" placeholder="User name" />
                  <input type="number" step="0.5" value={review.rating} onChange={(e) => handleReviewChange(idx, 'rating', e.target.value)} className="px-4 py-2 rounded-lg border border-gray-300" placeholder="Rating (0-5)" />
                  <textarea value={review.comment} onChange={(e) => handleReviewChange(idx, 'comment', e.target.value)} rows={2} className="md:col-span-2 px-4 py-2 rounded-lg border border-gray-300" placeholder="Review comment" />
                  <input type="date" value={review.date} onChange={(e) => handleReviewChange(idx, 'date', e.target.value)} className="px-4 py-2 rounded-lg border border-gray-300" />
                </div>
              </div>
            ))}
            <button type="button" onClick={addReview} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors">+ Add Review</button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={() => window.location.reload()} className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">Reset Form</button>
            <button type="submit" className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg transition-all">Create Package</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPackage;