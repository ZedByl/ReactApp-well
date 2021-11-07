import React from 'react';

const Search = ({onChange}) => {

    return (
        <input
            type='text'
            id='name'
            name='name'
            placeholder='Search...'
            className='form-control w-100 mx-auto'
            onChange={e => onChange(e.target.value)}
        />
    );
};

export default Search;