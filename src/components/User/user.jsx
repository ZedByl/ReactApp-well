import React from 'react';
import Qualite from '../Qualite/qualite';
import PropTypes from 'prop-types';

const User = ({name, qualities, completedMeetings, rate, profession}) => {
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

User.propTupes = {
  name: PropTypes.string,
  qualities: PropTypes.array,
  completedMeetings: PropTypes.number,
  rate: PropTypes.number,
  profession: PropTypes.string
}

export default User;