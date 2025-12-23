import React, { useEffect, useState } from 'react';
import { Employee, VacationEntry } from '../types';
import { getEmployees, getVacations } from '../services/dataService';
import { Users, CalendarRange, Clock, Calculator } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [vacations, setVacations] = useState<VacationEntry[]>([]);
  
  // Force update trigger
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setEmployees(getEmployees());
    setVacations(getVacations());
  }, [tick]);

  // Listen for custom event to refresh data
  useEffect(() => {
    const handleRefresh = () => setTick(t => t + 1);
    window.addEventListener('data-updated', handleRefresh);
    return () => window.removeEventListener('data-updated', handleRefresh);
  }, []);

  const calculateStats = (emp: Employee) => {
    const empVacations = vacations.filter(v => v.employeeId === emp.id);
    const used = empVacations.reduce((acc, curr) => acc + curr.cost, 0);
    const remaining = emp.totalVacationDays - used;
    return { used, remaining };
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Users className="w-6 h-6 text-blue-600" />
        프로젝트 인원 및 휴가 현황
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {employees.map(emp => {
          const { used, remaining } = calculateStats(emp);
          const isNegative = remaining < 0;

          return (
            <div key={emp.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-blue-900">{emp.name}</h3>
                <span className="text-xs font-semibold px-2 py-1 bg-blue-200 text-blue-800 rounded-full">
                  {emp.manMonths} MM
                </span>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <CalendarRange className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">투입 기간</p>
                    <p className="text-sm font-medium text-gray-700">
                      {emp.startDate} ~ {emp.endDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="w-full">
                    <p className="text-xs text-gray-500 uppercase font-semibold">휴가 사용 현황</p>
                    <div className="flex justify-between items-end mt-1">
                      <div>
                        <span className="text-2xl font-bold text-gray-800">{used}</span>
                        <span className="text-sm text-gray-500 ml-1">사용</span>
                      </div>
                      <div className="h-8 w-px bg-gray-200 mx-4"></div>
                      <div className="text-right">
                        <span className={`text-2xl font-bold ${isNegative ? 'text-red-500' : 'text-green-600'}`}>
                          {remaining > 0 ? '+' : ''}{remaining}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">잔여</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-500 flex justify-between">
                 <span>총 할당 휴가: {emp.totalVacationDays}일</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};