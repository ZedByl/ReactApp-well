import React, {useState} from 'react';
import bookmark from '../img/bookmark.svg'
import bookmarkFill from '../img/bookmark-fill.svg'

const Bookmark = () => {
  const [isBookmark, setIsBookmark] = useState(true)

  return (
    <>
      <td>
        <button className="bookmark-button" onClick={() => setIsBookmark(!isBookmark)}>
          {isBookmark ? <img className="bookmark-img" src={bookmark} alt="bookmark"/>
            : <img className="bookmark-img" src={bookmarkFill} alt="bookmarkFill"/>
          }
        </button>
      </td>
    </>
  );
};

export default Bookmark;