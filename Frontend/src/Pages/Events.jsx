import React from 'react'

const Events = () => {
  const [filterEvent, setFilterEvent] = useState({
    name: '',
    type: 'All',
    month: 'All',
    year: 'All',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterEvent(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>Events</div>
  )
}

export default Events