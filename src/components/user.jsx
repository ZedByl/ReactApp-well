import React from 'react';
import Qualite from "./qualite";

const User = ({ name, qualities, completedMeetings, rate, profession }) => {
  return (
    <>
      <th>{name}</th>
      <Qualite
        qualities={qualities}
        completedMeetings={completedMeetings}
        rate={rate}
        profession={profession}
      />
    </>
  );
};

export default User;