import React from 'react';
import Bookmark from "./bookmark";

const Qualite = ({ qualities, completedMeetings, rate, profession }) => {
  return (
    <>
      <td>{qualities.map((qualitie) =>
        <span key={qualitie._id} className={`badge bg-` + qualitie.color}>{qualitie.name}</span>
      )}
      </td>
      <td>{profession}</td>
      <td>{completedMeetings}</td>
      <td>{rate}</td>
      <Bookmark />
    </>
  );
};

export default Qualite;