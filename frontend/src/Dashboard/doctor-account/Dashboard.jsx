import React from 'react'
import useFetchData from '../../hooks/useFetchData'  // ✅ updated import
import { BASE_URL } from '../../config'

const Dashboard = () => {
  const { data, isLoading, error } = useFetchData(`${BASE_URL}/doctors/profile/me`)

  if (isLoading) {
    return <div className="text-center mt-10 text-blue-600">Loading profile...</div>
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Failed to load profile.</div>
  }

  const doctorName = data?.name || "Doctor"

  const stats = [
    { label: 'Appointments Today', value: 8 },
    { label: 'New Patients', value: 3 },
    { label: 'Messages', value: 5 },
  ]

  return (
    <section className="py-8">
      <div className="max-w-[1170px] mx-auto px-4">
        {/* Welcome header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, Dr. {doctorName}</h1>
          <p className="text-gray-600">Here’s your dashboard overview.</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl text-gray-600">{stat.label}</h2>
              <p className="text-4xl font-bold text-blue-600 mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Placeholder for more dashboard content */}
        <div className="bg-white p-6 rounded-xl shadow text-gray-500">
          <p>More dashboard features coming soon (appointments, patient list, etc.).</p>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
