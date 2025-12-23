import React, { useState } from 'react';
import { CalendarView } from './components/Calendar';
import { Dashboard } from './components/Dashboard';
import { VacationForm } from './components/VacationForm';
import { LayoutDashboard, Calendar, PlusSquare } from 'lucide-react';

enum Tab {
  DASHBOARD = 'dashboard',
  CALENDAR = 'calendar',
  REGISTER = 'register'
}

function App() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.DASHBOARD);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Project Vacation
              </span>
            </div>
            <div className="flex space-x-1 sm:space-x-4 items-center">
              <button
                onClick={() => setActiveTab(Tab.DASHBOARD)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === Tab.DASHBOARD 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                현황 대시보드
              </button>
              <button
                onClick={() => setActiveTab(Tab.CALENDAR)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === Tab.CALENDAR 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Calendar className="w-4 h-4 mr-2" />
                월별 캘린더
              </button>
              <button
                onClick={() => setActiveTab(Tab.REGISTER)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === Tab.REGISTER 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <PlusSquare className="w-4 h-4 mr-2" />
                등록 및 관리
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-6 animate-fade-in">
        {activeTab === Tab.DASHBOARD && <Dashboard />}
        {activeTab === Tab.CALENDAR && <CalendarView />}
        {activeTab === Tab.REGISTER && <VacationForm />}
      </main>
    </div>
  );
}

export default App;