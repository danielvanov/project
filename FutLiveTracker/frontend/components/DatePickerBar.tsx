// components/DatePickerBar.tsx
'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerBarProps {
  selectedDate: string;
  onDateChange: (newDate: string) => void;
}

export default function DatePickerBar({ selectedDate, onDateChange }: DatePickerBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date: Date | null) => {
    if (!date) return;
    const isoDate = date.toISOString().split('T')[0];
    onDateChange(isoDate);
    setIsOpen(false);
  };

  return (
    <div className="mb-6 relative z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#1a1a1a] text-white px-4 py-2 rounded-lg text-sm shadow hover:bg-[#2a2a2a]"
      >
        {selectedDate}
      </button>
      {isOpen && (
        <div className="absolute mt-2">
          <DatePicker
            selected={new Date(selectedDate)}
            onChange={handleDateChange}
            inline
          />
        </div>
      )}
    </div>
  );
}
