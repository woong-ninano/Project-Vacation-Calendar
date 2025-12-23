import React, { useState, useEffect } from 'react';
import { Employee, VacationType } from '../types';
import { getEmployees, addVacation, saveEmployee } from '../services/dataService';
import { PlusCircle, Save } from 'lucide-react';

export const VacationForm: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  
  // Vacation Entry State
  const [selectedEmpId, setSelectedEmpId] = useState<string>('');
  const [vacationDate, setVacationDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [vacationType, setVacationType] = useState<VacationType>(VacationType.FULL);

  // New Employee State
  const [newEmpName, setNewEmpName] = useState('');
  const [newEmpStart, setNewEmpStart] = useState('2025-01-01');
  const [newEmpEnd, setNewEmpEnd] = useState('2025-12-31');
  const [newEmpMM, setNewEmpMM] = useState('12.0');
  const [newEmpQuota, setNewEmpQuota] = useState('15');

  const refreshData = () => {
    const data = getEmployees();
    setEmployees(data);
    if (data.length > 0 && !selectedEmpId) {
      setSelectedEmpId(data[0].id);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleVacationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmpId) return;
    
    addVacation(selectedEmpId, vacationDate, vacationType);
    window.dispatchEvent(new Event('data-updated'));
    alert('휴가 등록이 완료되었습니다.');
  };

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmp: Employee = {
      id: `emp_${Date.now()}`,
      name: newEmpName,
      startDate: newEmpStart,
      endDate: newEmpEnd,
      manMonths: parseFloat(newEmpMM),
      totalVacationDays: parseFloat(newEmpQuota)
    };
    saveEmployee(newEmp);
    refreshData();
    window.dispatchEvent(new Event('data-updated'));
    setNewEmpName('');
    alert('인원 등록이 완료되었습니다.');
  };

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
      {/* Vacation Registration Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-indigo-600" />
          휴가 등록
        </h3>
        <form onSubmit={handleVacationSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이름 선택</label>
            <select 
              value={selectedEmpId}
              onChange={(e) => setSelectedEmpId(e.target.value)}
              className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            >
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">날짜</label>
            <input 
              type="date"
              value={vacationDate}
              onChange={(e) => setVacationDate(e.target.value)}
              className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">휴가 종류</label>
            <div className="grid grid-cols-2 gap-3">
              {Object.values(VacationType).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setVacationType(type)}
                  className={`py-2 px-4 rounded-lg text-sm font-medium border transition-all ${
                    vacationType === type 
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow transition-colors mt-4"
          >
            휴가 등록하기
          </button>
        </form>
      </div>

      {/* Employee Registration Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Save className="w-5 h-5 text-emerald-600" />
          신규 인원 등록 (프로젝트 정보)
        </h3>
        <form onSubmit={handleAddEmployee} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
            <input 
              type="text"
              required
              value={newEmpName}
              onChange={(e) => setNewEmpName(e.target.value)}
              placeholder="예: 홍길동"
              className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">투입일</label>
              <input 
                type="date"
                required
                value={newEmpStart}
                onChange={(e) => setNewEmpStart(e.target.value)}
                className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">철수일</label>
              <input 
                type="date"
                required
                value={newEmpEnd}
                onChange={(e) => setNewEmpEnd(e.target.value)}
                className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">투입 공수 (MM)</label>
              <input 
                type="number"
                step="0.1"
                required
                value={newEmpMM}
                onChange={(e) => setNewEmpMM(e.target.value)}
                placeholder="13.1"
                className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">총 휴가 (일)</label>
              <input 
                type="number"
                step="0.5"
                required
                value={newEmpQuota}
                onChange={(e) => setNewEmpQuota(e.target.value)}
                placeholder="15"
                className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg shadow transition-colors mt-4"
          >
            인원 추가하기
          </button>
        </form>
      </div>
    </div>
  );
};