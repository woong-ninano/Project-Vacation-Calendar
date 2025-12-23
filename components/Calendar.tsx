import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { getEmployees, getVacations, removeVacation } from '../services/dataService';
import { Employee, VacationEntry, VacationType } from '../types';

export const CalendarView: React.FC = () => {
  // Start from Jan 2025 as requested
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1));
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [vacations, setVacations] = useState<VacationEntry[]>([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setEmployees(getEmployees());
    setVacations(getVacations());
  }, [tick]);

  useEffect(() => {
    const handleRefresh = () => setTick(t => t + 1);
    window.addEventListener('data-updated', handleRefresh);
    return () => window.removeEventListener('data-updated', handleRefresh);
  }, []);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const changeMonth = (delta: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1));
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('이 휴가 기록을 삭제하시겠습니까?')) {
      removeVacation(id);
      window.dispatchEvent(new Event('data-updated'));
    }
  };

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const startDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Empty cells for days before start of month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="min-h-[120px] bg-gray-50 border-r border-b border-gray-100"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      const dayVacations = vacations.filter(v => v.date === dateStr);
      
      const isWeekend = new Date(year, month, day).getDay() === 0 || new Date(year, month, day).getDay() === 6;

      days.push(
        <div key={day} className={`min-h-[120px] p-2 border-r border-b border-gray-100 relative group hover:bg-gray-50 transition-colors ${isWeekend ? 'bg-slate-50' : 'bg-white'}`}>
          <span className={`text-sm font-semibold block mb-1 ${isWeekend ? 'text-red-400' : 'text-gray-700'}`}>
            {day}
          </span>
          <div className="space-y-1">
            {dayVacations.map(vac => {
              const empName = employees.find(e => e.id === vac.employeeId)?.name || 'Unknown';
              
              let badgeColor = 'bg-blue-100 text-blue-800 border-blue-200';
              if (vac.type === VacationType.HALF_AM || vac.type === VacationType.HALF_PM) badgeColor = 'bg-amber-100 text-amber-800 border-amber-200';
              if (vac.type === VacationType.QUARTER) badgeColor = 'bg-purple-100 text-purple-800 border-purple-200';

              return (
                <div 
                  key={vac.id} 
                  className={`text-xs px-2 py-1 rounded border flex justify-between items-center group/badge ${badgeColor}`}
                  title={`${empName} - ${vac.type}`}
                >
                  <span className="truncate">{empName} {vac.type}</span>
                  <button 
                    onClick={(e) => handleDelete(vac.id, e)}
                    className="opacity-0 group-hover/badge:opacity-100 ml-1 hover:text-red-600 focus:outline-none"
                  >
                    <X size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return days;
  };

  const weeks = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-white flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={() => changeMonth(-1)}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
            >
              <ChevronLeft />
            </button>
            <button 
              onClick={() => changeMonth(1)}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
          {weeks.map((w, idx) => (
            <div key={w} className={`py-3 text-center text-sm font-bold ${idx === 0 ? 'text-red-500' : 'text-gray-600'}`}>
              {w}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {renderCalendarDays()}
        </div>
      </div>
    </div>
  );
};