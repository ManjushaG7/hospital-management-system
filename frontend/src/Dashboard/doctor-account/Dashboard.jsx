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
                {tab === 'overview' && <div>
                  <div className='flex items-center gap-4 mb-10'>
                    <figure className='max-w-[200px] max-h-[200px]'><img src={data ?.photo || userImg} alt="" className='w-full'/></figure>

                    <div><span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold'>
                       Cardiology
                    </span>

                    <h3 className='text-[22px] leading-9 font-bold text-headingColor mt-3'>Layla</h3>
                    <div className='flex items-center gap-[6px]'>
                      <span className='flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold'><img src={starIcon} alt=''/>4.5</span>
                      <span className=' text-textColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold'>(233)</span>
                    </div>

                    <p className='text__para font-[15px] lg:max-w-[390px] leading-6'>Doctor Bio</p>
                  
                    </div>



                  </div>
                  <DoctorAbout name={data.name} about={data.about} qualifications={data.qualifications} experiences={data.experiences}/>
                  </div>
                }

                {tab === 'appointments' && (
                  <div className="appointments-tab">
                    <h2 className="text-xl font-semibold">📋Appointments</h2>
                    <p className="mt-2"></p>
                  </div>
                )}

                {tab === 'settings' &&  <Profile />
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