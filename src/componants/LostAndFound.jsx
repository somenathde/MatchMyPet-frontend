import React, { useEffect, useState } from 'react'
import api from '../api/axios';
import Shimmer from './ShimmerUI';
import { ALT_LostAndFound_IMG } from '../utils/constants';
import { useSelector } from 'react-redux';

const LostAndFound = () => {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [petType, setPetType] = useState("all");
  const user = useSelector((store) => store.user.user);
  const [searchId, setSearchId] = useState("");

  const fetchPets = async ({type="all", id=""}={}) => {
    try {
      setLoading(true);
      setError("");
      let res;
      if (id) {
        res = await api.get(`/lost-and-found/${id}`);
        setPets(res.data?.data ? [res.data.data] : []);
        return;
      }
      const endpoint = type === "all" ? "/lost-and-found" : `/lost-and-found/${type}`;
      res = await api.get(endpoint);
      setPets(res.data?.data);
    } catch (error) {
      console.error("Fetch lost and found pets error:", error);
      setError("Failed to load lost and found pets");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setSearchId("");
    fetchPets({ type: petType });
  }, [petType]);

  if (loading) {
    return <div><Shimmer /></div>
  }
  if (error) {
    return <div className='flex justify-center items-center h-[60vh] text-red-600'>{error}</div>
  }

  return (
    <>
      <div className="flex justify-center gap-4 mb-8">
        <button
          className={`btn ${petType === "lost" ? "btn-primary" : "btn-outline"}`}
          onClick={() => { setPetType("lost") }}
        >
          🐾 Lost Pets
        </button>

        <button
          className={`btn ${petType === "found" ? "btn-primary" : "btn-outline"}`}
          onClick={() => { setPetType("found") }}
        >
          🐕 Found Pets
        </button>
        <button
          className={`btn ${petType === "all" ? "btn-primary" : "btn-outline"}`}
          onClick={() => {setSearchId(""); setPetType("all"); fetchPets({ type: "all" }) }}
          
        >
          🐕 All Pets
        </button>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search by Pet ID"
            className="input input-bordered w-full max-w-xs"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button className="btn ml-2" onClick={() => {
            if (!searchId.trim()) return;
            if(!user){ alert("Please login to search by ID");
              return; }
            fetchPets({ id: searchId.trim() });
          }}>Search</button>
        </div>
      </div>


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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {pets.map((pet) => {
            const image = pet.images?.[0] || ALT_LostAndFound_IMG;

            return (
              <div
                key={pet._id}
                className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border"
              >
                {/* Image */}
                <figure className="relative h-60">
                  <img
                    src={image}
                    alt="Pet Image"
                    className="w-full h-full object-cover"
                  />

                  {/* Status Badge */}
                  <span
                    className={`badge absolute top-4 right-4 ${pet.status === "open"
                      ? "badge-warning"
                      : pet.status === "claimed"
                        ? "badge-info"
                        : "badge-success"
                      }`}
                  >
                    {pet.status}
                  </span>
                </figure>

                {/* Content */}
                <div className="card-body">
                  <h2 className="card-title text-lg">{pet.type.toUpperCase()} :
                    {` ${pet.name || pet._id}`}
                  </h2>

                  <p className="text-sm text-base-content/70">
                    {pet.age && `Age: ${pet.age} old, `} {pet.color && `Color: ${pet.color}, `} {pet.breed && ` ${pet.breed}`}
                  </p>

                  <p>{`Gender: ${pet.gender}`}</p>

                  <p className="text-sm text-base-content/70">
                    📍 {pet.lastSeenLocation?.city}, {pet.lastSeenLocation?.area}, {pet.lastSeenLocation?.pincode}
                  </p>
                  <p className="text-sm text-base-content/70">
                    {pet.description}
                  </p>
                  {user && pet.contactNumber && pet.status === "open" && (
                    <p className="text-sm text-base-content/70">
                      📞 Contact: {pet.contactNumber || ""} </p>)}

                  <div className="card-actions mt-4">
                    <button onClick={() => {
                      if(!user){ alert("Please login to contact or Report");
                        return;
                    }}}
                      disabled={pet.status === "resolved"}
                      className={`btn w-full ${pet.status !== "resolved"
                        ? "btn-dash"
                        : "btn-disabled"
                        }`}
                    >
                      {pet.status === "open"
                        ? "Contact Now"
                        : pet.status === "claimed"
                          ? "View details / Report issue"
                          : "Contact Disabled"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  )
}

export default LostAndFound