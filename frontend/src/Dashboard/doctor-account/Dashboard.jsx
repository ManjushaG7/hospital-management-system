import { useState } from 'react';
import Loader from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import useFetchData from "../../hooks/useFetchData";
import Tabs from './Tabs';
import { BASE_URL } from "../../config";

const Dashboard = () => {
  const { data, loading, error } = useFetchData(`${BASE_URL}/api/v1/doctors/profile/me`);
  const [tab, setTab] = useState("overview");

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
                    <figure className='max-w-[200px] max-h-[200px]'><img src={data?.photo} alt="" className='w-full'/></figure>
                  </div>
                  </div>
                }

                {tab === 'appointments' && (
                  <div className="appointments-tab">
                    <h2 className="text-xl font-semibold">📋Appointments</h2>
                    <p className="mt-2"></p>
                  </div>
                )}

                {tab === 'settings' && (
                  <div className="settings-tab">
                    <h2 className="text-xl font-semibold">⚙️Profile Settings</h2>
                    <p className="mt-2"></p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
