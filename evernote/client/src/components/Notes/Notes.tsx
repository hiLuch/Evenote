import React from 'react';

export default function Notes(): JSX.Element {
  return (
    <div className="leftSide">
      <div className="avatar">
        <img src="#" alt="avatar" />
      </div>
      <div className="searchCreate">
        <form className="search">
          <input type="text" />
          <button>search</button>
        </form>
        <button>create</button>
      </div>
    </div>
  );
}
