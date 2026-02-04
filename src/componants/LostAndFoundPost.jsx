import React, { useState } from 'react'
import api from '../api/axios';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const LostAndFoundPost = () => {
  const { type } = useParams();
  const [petId, setPetId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    breed: "",
    color: "",
    gender: "select",
    city: "",
    area: "",
    pincode: "",
    description: "",
    contactNumber: "",
    images: [],
    petType: "select",
    status: "open"
  });
  const payload = {
    type,
    name: formData.name,
    age: formData.age,
    gender: formData.gender,
    petType: formData.petType,
    breed: formData.breed,
    color: formData.color,
    description: formData.description,
    contactNumber: formData.contactNumber,
    images: formData.images,
    lastSeenLocation: {
      city: formData.city,
      area: formData.area,
      pincode: formData.pincode,
    },
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/lost-and-found/', payload);

      if (res.data?.success) {
        setPetId(res.data?.data?._id);
        toast.success(`Successfully submitted ${type} pet report!`, { duration: 4000 });
        setFormData({
          name: "",
          age: "",
          breed: "",
          color: "",
          gender: "select",
          city: "",
          area: "",
          pincode: "",
          description: "",
          contactNumber: "",
          petType: "select",
          images: [],
          status: "open"
        });
      }
    } catch (error) {
      if (error.response?.status && error.response.status >= 400 && error.response.status < 500) {
        toast.error(error.response.data?.message || `Failed to submit ${type} pet. Please check your input.`);
      }
      toast.error(`Failed to submit ${type} pet, InterSever Error. Please try again.`);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-200 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 capitalize">
        Report {type} Pet
      </h2>


      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Pet Type */}
        <select name="petType" value={formData.petType} onChange={handleChange} className="select w-full">
          <option value="select" disabled>Select Pet Type</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="rabbit">Rabbit</option>
          <option value="bird">Bird</option>
          <option value="other">Other</option>
        </select>

        {/* Name */}
        <input
          name="name"
          placeholder="Pet Name (optional)"
          className="input w-full"
          value={formData.name}
          onChange={handleChange}
        />

        {/* Gender */}
        <select name="gender" value={formData.gender} onChange={handleChange} className="select w-full">
          <option value="select" disabled>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="unknown">Unknown</option>
        </select>

        {/* Color */}
        <input
          name="color"
          placeholder="Color"
          className="input w-full"
          value={formData.color}
          onChange={handleChange}
          required
        />

        {/* Breed */}
        <input
          name="breed"
          placeholder="Breed (optional)"
          className="input w-full"
          value={formData.breed}
          onChange={handleChange}
        />

        {/* Age */}
        <input
          name="age"
          placeholder="Age (e.g. 2 months / 1 year)"
          className="input w-full"
          value={formData.age}
          onChange={handleChange}
        />

        {/* Location */}
        <div className="grid grid-cols-3 gap-2">
          <input name="city" placeholder="City" className="input" required onChange={handleChange} />
          <input name="area" placeholder="Area" className="input" required onChange={handleChange} />
          <input name="pincode" placeholder="Pincode" className="input" onChange={handleChange} />
        </div>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          className="textarea w-full"
          value={formData.description}
          onChange={handleChange}
          required
        />

        {/* Contact */}
        <input
          name="contactNumber"
          placeholder="Contact Number"
          className="input w-full"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />
        <h2 className="text-md mb-6 text-base-content/70">
          {petId && (
            <span>Reported Pet ID: {petId}</span>
          )}
        </h2>
        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>

      </form>
    </div>
  )
}

export default LostAndFoundPost