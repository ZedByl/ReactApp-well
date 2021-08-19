import React, {useState} from 'react';

const Counter = () => {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(count + 1)
  }
  const decrement = () => {
    if (count === 0) {
      return false
    } else if (count) {
      setCount(count - 1)
    }
  }
  return (
    <div className='counter'>
      <p className='h1 m-2 bg-info '>{count === 0 ? 'Ноль' : count}</p>
      <div className="container overflow-hidden">
        <div className="row gx-5">
          <div className="col">
            <button className='btn btn-success' onClick={increment}>Добавить</button>
          </div>
          <div className="col">
            <button className='btn btn-danger' onClick={decrement}>Убавить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;