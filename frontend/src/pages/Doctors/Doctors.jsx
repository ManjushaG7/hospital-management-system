import DoctorCard from "../../components/Doctors/DoctorCard";
import {doctors} from "../../assets/data/doctors";
import Testimonials from "../../components/Testimonial/Testimonial";
import { BASE_URL } from '../../config';
import useFetchData from '../../hooks/useFetchData';
import Loader from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import { useEffect, useState } from "react";

const Doctors = () => {
  const [query, setQuery] = useState('')
  const [debounceQuery, setDebounceQuery] = useState ('')

  const handleSearch=() =>{
    setQuery(query.trim())
    console.log('handle Search')
  };

  useEffect(()=>{
   
   const timeout = setTimeout(()=>{
    setDebounceQuery(query)
   },700)

   return ()=>clearTimeout(timeout)

  },[query])

  const {data:doctors, loading, error} = useFetchData(`${BASE_URL}/api/v1/doctors?query=${debounceQuery}`);
  return(
    <>
    <section className="bg-[#fff9ea]">
      <div className="container text-center">
        <h2 className="heading">Find A Doctor</h2>
        <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
          <input
          type="search"
          className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
          placeholder="Search doctor by name or specification"
          value={query}
          onChange={e => setQuery (e.target.value)}
          />
          <button className="btn mt-0 rounded-[0px] rounded-r-md" onClick={handleSearch}>Search </button>

        </div>

      </div>

    </section>

    <section>
      <div className="container">

      {loading && <Loader/>}
    {error && <Error/>}


       {!loading && !error && ( <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
          {doctors.map(doctor => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}

        </div>)}
      </div>
    </section>

    <section>
      <div className="container">
      <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            
            <Testimonials />
          </div>
      </div>
    </section>
    </>
  )
}
export default Doctors;