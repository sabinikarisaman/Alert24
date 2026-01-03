import React from 'react';
import { format, addDays } from 'date-fns';

const DatePicker = ({ value, onChange }) => {
  const today = new Date();
  const minDate = format(today, 'yyyy-MM-dd');
  
  // Disable past dates by setting min attribute
  const handleDateChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="date-picker">
      <label htmlFor="travel-date">Travel Date *</label>
      <input
        type="date"
        id="travel-date"
        value={value}
        onChange={handleDateChange}
        min={minDate}
        required
      />
      {value && (
        <p className="selected-date">
          Selected: {format(new Date(value), 'MMMM do, yyyy')}
        </p>
      )}
    </div>
  );
};

export default DatePicker;