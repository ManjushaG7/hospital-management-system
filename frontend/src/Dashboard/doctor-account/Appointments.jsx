import React from 'react';
import { formatDate } from '../../utils/formatDate';

const Appointments = ({ appointments }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 bg-white">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-xs uppercase text-gray-600">
          <tr>
            <th className="px-6 py-4">Patient</th>
            <th className="px-6 py-4">Gender</th>
            <th className="px-6 py-4">Payment</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Booked On</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {appointments?.map((item) => (
            <tr key={item._id} className="hover:bg-gray-50 transition">
              <td className="flex items-center gap-3 px-6 py-4 whitespace-nowrap">
                <img
                  src={item.user.photo}
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <div>
                  <div className="font-medium text-gray-900">{item.user.name}</div>
                  <div className="text-sm text-gray-500">{item.user.email}</div>
                </div>
              </td>

              <td className="px-6 py-4">{item.user.gender}</td>

              <td className="px-6 py-4">
                <div className="flex items-center">
                  <span
                    className={`h-2.5 w-2.5 rounded-full mr-2 ${
                      item.isPaid ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  ></span>
                  {item.isPaid ? 'Paid' : 'Unpaid'}
                </div>
              </td>

              <td className="px-6 py-4 font-semibold text-gray-900">
                ₹{item.opPrice}
              </td>

              <td className="px-6 py-4">{formatDate(item.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
