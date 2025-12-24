import { Employee, VacationEntry, VacationType, VACATION_COST, Holiday } from '../types';

const STORAGE_KEY_EMPLOYEES = 'pvc_employees_v5';
const STORAGE_KEY_VACATIONS = 'pvc_vacations_v5';

export const calculateManMonths = (start: string, end: string): number => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return 0;
  
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  // Approximate 1 month as 30.4 days for MM calculation
  const mm = (diffDays / 30.4).toFixed(1); 
  return parseFloat(mm);
};

const createInitialEmployee = (id: string, name: string, start: string, end: string): Employee => {
  const mm = calculateManMonths(start, end);
  return {
    id,
    name,
    startDate: start,
    endDate: end,
    manMonths: mm,
    totalVacationDays: mm
  };
};

const INITIAL_EMPLOYEES: Employee[] = [
  createInitialEmployee('emp_1', '장웅순', '2025-01-13', '2026-02-13'),
  createInitialEmployee('emp_10', '박준규', '2025-01-13', '2026-02-13'),
  createInitialEmployee('emp_2', '이경일', '2025-01-13', '2026-02-13'),
  createInitialEmployee('emp_3', '김성대', '2025-01-13', '2026-01-16'),
  createInitialEmployee('emp_4', '이민희', '2025-02-03', '2026-01-16'),
  createInitialEmployee('emp_5', '이현숙', '2025-01-13', '2026-01-16'),
  createInitialEmployee('emp_6', '김하영', '2025-01-13', '2026-01-16'),
  createInitialEmployee('emp_7', '전민아', '2025-02-10', '2026-01-16'),
  createInitialEmployee('emp_8', '김재섭', '2025-02-03', '2026-02-13'),
  createInitialEmployee('emp_9', '김미나', '2025-02-03', '2026-02-13'),
];

// Empty initial vacations as requested
const INITIAL_VACATIONS: VacationEntry[] = [];

const HOLIDAYS: Holiday[] = [
  { date: '2025-01-01', name: '신정' },
  { date: '2025-01-28', name: '설날 연휴' },
  { date: '2025-01-29', name: '설날' },
  { date: '2025-01-30', name: '설날 연휴' },
  { date: '2025-03-01', name: '3·1절' },
  { date: '2025-03-03', name: '대체공휴일(3·1절)' }, 
  { date: '2025-05-05', name: '어린이날' },
  { date: '2025-05-06', name: '부처님오신날' },
  { date: '2025-06-06', name: '현충일' },
  { date: '2025-08-15', name: '광복절' },
  { date: '2025-10-03', name: '개천절' },
  { date: '2025-10-05', name: '추석 연휴' },
  { date: '2025-10-06', name: '추석' },
  { date: '2025-10-07', name: '추석 연휴' },
  { date: '2025-10-08', name: '대체공휴일(추석)' }, 
  { date: '2025-10-09', name: '한글날' },
  { date: '2025-12-25', name: '크리스마스' },
  { date: '2026-01-01', name: '신정' },
  { date: '2026-02-17', name: '설날 연휴' },
  { date: '2026-02-18', name: '설날' },
  { date: '2026-02-19', name: '설날 연휴' },
];

export const getEmployees = (): Employee[] => {
  const data = localStorage.getItem(STORAGE_KEY_EMPLOYEES);
  if (!data) {
    localStorage.setItem(STORAGE_KEY_EMPLOYEES, JSON.stringify(INITIAL_EMPLOYEES));
    return INITIAL_EMPLOYEES;
  }
  return JSON.parse(data);
};

export const saveEmployee = (employee: Employee): void => {
  const employees = getEmployees();
  const index = employees.findIndex(e => e.id === employee.id);
  if (index >= 0) {
    employees[index] = employee;
  } else {
    employees.push(employee);
  }
  localStorage.setItem(STORAGE_KEY_EMPLOYEES, JSON.stringify(employees));
};

export const updateEmployee = (employee: Employee): void => {
  saveEmployee(employee);
};

export const deleteEmployee = (id: string): void => {
  let employees = getEmployees();
  employees = employees.filter(e => e.id !== id);
  localStorage.setItem(STORAGE_KEY_EMPLOYEES, JSON.stringify(employees));
  
  let vacations = getVacations();
  vacations = vacations.filter(v => v.employeeId !== id);
  localStorage.setItem(STORAGE_KEY_VACATIONS, JSON.stringify(vacations));
};

export const getVacations = (): VacationEntry[] => {
  const data = localStorage.getItem(STORAGE_KEY_VACATIONS);
  if (!data) {
    localStorage.setItem(STORAGE_KEY_VACATIONS, JSON.stringify(INITIAL_VACATIONS));
    return INITIAL_VACATIONS;
  }
  return JSON.parse(data);
};

export const addVacation = (employeeId: string, date: string, type: VacationType): void => {
  const vacations = getVacations();
  const newEntry: VacationEntry = {
    id: `vac_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    employeeId,
    date,
    type,
    cost: VACATION_COST[type]
  };
  vacations.push(newEntry);
  localStorage.setItem(STORAGE_KEY_VACATIONS, JSON.stringify(vacations));
};

export const removeVacation = (id: string): void => {
  const vacations = getVacations().filter(v => v.id !== id);
  localStorage.setItem(STORAGE_KEY_VACATIONS, JSON.stringify(vacations));
};

export const getEmployeeUsage = (employeeId: string) => {
  const vacations = getVacations().filter(v => v.employeeId === employeeId);
  const used = vacations.reduce((acc, curr) => acc + curr.cost, 0);
  return used;
};

export const getHolidays = (): Holiday[] => {
  return HOLIDAYS;
};