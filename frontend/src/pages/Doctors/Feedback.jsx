import React, { useState } from "react";
import avatar from "../../assets/images/avatar-icon.png"
import { formatDate } from "../../utils/formatDate";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "../../pages/Doctors/FeedbackForm"

const Feedback = ({reviews, totalRating}) => {

const [showFeedbackForm, setShowFeedbackForm] = useState(false);

    return (
        <div>
            <div className="mb-[50px]">
                <h4 className="text-[20px] loading-[30px] font-bold text-headingColor mb-[30px]">
                    All reviews ({totalRating})
                </h4>
                
        { reviews?.map((review, index)=>
        
        (<div key={index} className="flex justify-between gap-10 mb-[30px]">
        <div className="flex gap-3">
        <figure className="w-10 h-10 rounded-full overflow-hidden">
                <img
                    className="w-full h-full object-cover"
                    src={review?.user?.photo}
                    alt="User"
                />
        </figure> 

                <div>
                    <h5 className="text-[16px] leading-6 text-primaryColor font-bold">{review?.user?.name}</h5>
                    <p className="text-[14px] leading-6 text-textColor">
                        {formatDate(review?.createdAt)}
                    </p>

                    <p className="text__para mt-3 font-medium text-[15px]">{review.reviewText}</p>

                </div>
        </div>

    <div className="flex gap-1">
        {[...Array(review?.rating).keys()].map((_,index)=> <AiFillStar key={index} color="#0067FF"/>)}
    </div>

    </div>)

        ) }

            </div>

            {!showFeedbackForm && (
                <div className="flex justify-center mt-6">
                    <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    onClick={() => setShowFeedbackForm(true)}
                    >
                    Give Feedback
                    </button>
                </div>
            )}

          {showFeedbackForm && <FeedbackForm/>}

        </div>
    )
}

export default Feedback;