import { useState } from 'react';
import Loader from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import useFetchData from "../../hooks/useFetchData";
import Tabs from './Tabs';
import { BASE_URL } from "../../config";
import userImg from "../../assets/images/doctor-img01.png";
import starIcon  from '../../assets/images/Star.png'
import DoctorAbout from '../../pages/Doctors/DoctorAbout'
import Profile from './Profile';
import Appointments from './Appointments';

const Dashboard = () => {
  const { data, loading, error } = useFetchData(`${BASE_URL}/api/v1/doctors/profile/me`);
  const [tab, setTab] = useState("overview");
  console.log(data);

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {/* Show loader while data is loading */}
        {loading && !error && <Loader />}

        {/* Show error message if there is an error */}
        {error && !loading && <Error />}

        {/* Display content once the data is loaded */}
        {!loading && !error && (
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
            {/* Tabs section */}
            <Tabs tab={tab} setTab={setTab} />

            <div className="lg:col-span-2">
              {/* Pending Approval Message with emoji */}
              {data.isApproved === 'pending' && (
                <div className="flex items-center p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg">
                  <span className="text-3xl mr-3">⚠️</span> {/* Custom warning emoji */}
                  <span>To get approval please complete your profile.we'll review manually and approve within 3 days </span>
                </div>
              )}

              {/* Tab Content Section */}
              <div className="tab-content">
  {tab === 'overview' && (
    <div className="border-2 border-gray-300 rounded-xl p-6 shadow-md bg-white">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        {/* Profile Image */}
        <figure className="w-[180px] h-[180px] overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <img src={data?.photo || userImg} alt="Doctor" className="w-full h-full object-cover" />
        </figure>

        {/* Doctor Info */}
        <div className="text-center md:text-left space-y-2">
          <span className="inline-block bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded-full text-[13px] lg:text-[15px] font-medium tracking-wide shadow-sm">
            {data.specialization}
          </span>

          <h3 className="text-[24px] font-bold text-headingColor mt-2">
            {data.name}
          </h3>

          <div className="flex justify-center md:justify-start items-center gap-4 text-sm lg:text-base font-semibold">
            <div className="flex items-center gap-1 text-headingColor">
              <img src={starIcon} alt="Rating" className="w-4 h-4" />
              {data.averageRating}
            </div>
            
            <span className="text-textColor">({data.totalRating} reviews)</span>

          
          </div>
          <div><span>{data.bio}</span></div>
        </div>
      </div>


      <DoctorAbout
        name={data.name}
        about={data.about}
        qualifications={data.qualifications}
        experiences={data.experiences}
        fellowships={data.fellowships}
      />
    </div>
  )}

                {tab === 'appointments' && ( <Appointments appointments={data.appointments}/>)}

                {tab === 'settings' &&  <Profile doctorData={data} />
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;