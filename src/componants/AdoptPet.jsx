import { useEffect, useState } from "react";
import api from "../api/axios";
import ShimmerUI from "./ShimmerUI";
import { useNavigate } from "react-router-dom";
import { ALT_SEARCH_PET_IMG, ALT_PET_IMG } from "../utils/constants"

const Adopt = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchPetId, setSearchPetId] = useState("");
  const [searchedPet, setSearchedPet] = useState(null);
  const navigate = useNavigate()

  const fetchPets = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/adopt-pet`);
      setPets(res?.data?.data || []);
    } catch (err) {
      console.error("Fetch adopt pets error:", err);
      setError("Failed to load adoptable pets");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPets();
  }, []);


  const handleSearchById = async () => {
    if (!searchPetId.trim()) return;
    try {
      setLoading(true);
      setError("");
      setSearchedPet(null);
      const res = await api.get(`/adopt-pet/${searchPetId}`);
      setSearchedPet(res?.data?.data)
    } catch (error) {
      setError("Pet Not Found Please Check Id")
    } finally { setLoading(false) }
  }
  if (loading) {
    return (
      <ShimmerUI />
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-18">
      {/* Header */}
      <div className="hero mb-10">
        <div className="hero-content text-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">
              🐾 Adopt a Pet
            </h1>
            <p className="py-4 text-base-content/70 text-lg">
              Give them a loving home and a second chance
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        {/* Search by Pet ID */}
        <div className="join w-full md:w-2/3">
          <input
            type="text"
            placeholder="Search pet by ID..."
            className="input input-bordered join-item w-full"
            value={searchPetId}
            onChange={(e) => setSearchPetId(e.target.value)}
          />
          <button
            onClick={handleSearchById}
            className="btn btn-primary join-item"
          >
            🔍 Search
          </button>
        </div>

        {/* Shelter CTA */}
        <button
          onClick={() => navigate("/shelter")}
          className="btn btn-outline btn-primary w-full md:w-auto"
        >
          🏠 Manage Shelter
        </button>
      </div>




      {/* Searched Pet Card */}
      {searchedPet && (
        <div className="max-w-md mx-auto mb-14">
          <div className="card bg-base-100 shadow-xl border">

            {/* Image */}
            <figure className="h-60">
              <img
                src={searchedPet.images?.[0] || ALT_SEARCH_PET_IMG}
                alt={searchedPet.name}
                className="w-full h-full object-cover"
              />
            </figure>

            {/* Content */}
            <div className="card-body">
              <h2 className="card-title text-2xl">
                {searchedPet.name}

                {/* Status Badge */}
                <span
                  className={`badge ml-2 ${searchedPet.adoptStatus === "Available"
                      ? "badge-success"
                      : searchedPet.adoptStatus === "Pending"
                        ? "badge-warning"
                        : "badge-error"
                    }`}
                >
                  {searchedPet.adoptStatus}
                </span>
              </h2>

              <p className="text-sm text-gray-500">
                {searchedPet.species}
                {searchedPet.age && ` • ${searchedPet.age}`}
              </p>

              <p className="text-sm text-gray-500">
                📍 {searchedPet.location?.city}, {searchedPet.location?.state}
              </p>

              {/* Action */}
              <div className="card-actions mt-4">
                <button
                  disabled={searchedPet.adoptStatus !== "Available"}
                  className={`btn w-full ${searchedPet.adoptStatus === "Available"
                      ? "btn-dash"
                      : "btn-disabled"
                    }`}
                >
                  {searchedPet.adoptStatus === "Available"
                    ? "Adopt Now"
                    : searchedPet.adoptStatus}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Empty State */}
{pets.length === 0 ? (
  <div className="flex justify-center py-24">
    <div className="hero bg-base-200 rounded-box max-w-xl">
      <div className="hero-content text-center">
        <div>
          <div className="text-6xl mb-4">🐶</div>
          <h2 className="text-2xl font-bold">
            No pets available
          </h2>
          <p className="text-base-content/70 mt-2">
            No pets available for adoption right now. Please check back later.
          </p>
        </div>
      </div>
    </div>
  </div>
) : (
  /* Grid */
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
    {pets.map((pet) => {
      const image = pet.images?.[0] || ALT_PET_IMG;

      return (
        <div
          key={pet._id}
          className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border"
        >
          {/* Image */}
          <figure className="relative h-60">
            <img
              src={image}
              alt={pet.name}
              className="w-full h-full object-cover"
            />

            {/* Status Badge */}
            <span
              className={`badge absolute top-4 right-4 ${
                pet.adoptStatus === "Available"
                  ? "badge-success"
                  : pet.adoptStatus === "Pending"
                  ? "badge-warning"
                  : "badge-error"
              }`}
            >
              {pet.adoptStatus}
            </span>
          </figure>

          {/* Content */}
          <div className="card-body">
            <h2 className="card-title text-lg">
              {pet.name}
            </h2>

            <p className="text-sm text-base-content/70">
              {pet.species} {pet.age && `• ${pet.age}`}
            </p>

            <p className="text-sm text-base-content/70">
              📍 {pet.location?.city}, {pet.location?.state}
            </p>

            <div className="card-actions mt-4">
              <button
                disabled={pet.adoptStatus !== "Available"}
                className={`btn w-full ${
                  pet.adoptStatus === "Available"
                    ? "btn-dash"
                    : "btn-disabled"
                }`}
              >
                {pet.adoptStatus === "Available"
                  ? "Adopt Now"
                  : pet.adoptStatus}
              </button>
            </div>
          </div>
        </div>
      );
    })}
  </div>
)}
</div>)}



export default Adopt;
