import { Employee, VacationEntry, VacationType, VACATION_COST } from '../types';

const STORAGE_KEY_EMPLOYEES = 'pvc_employees';
const STORAGE_KEY_VACATIONS = 'pvc_vacations';

// Initial Seed Data
const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp_1',
    name: '장웅순',
    startDate: '2025-01-13',
    endDate: '2026-02-13',
    manMonths: 13.1,
    totalVacationDays: 13.1, 
  }
];

export const calculateManMonths = (start: string, end: string): number => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return 0;
  
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  // Approximate 1 month as 30 days for MM calculation as per common project standards
  // +1 day to be inclusive if needed, but using raw diff for now.
  const mm = (diffDays / 30.4).toFixed(1); 
  return parseFloat(mm);
};

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

// Update existing employee (explicit naming for clarity)
export const updateEmployee = (employee: Employee): void => {
  saveEmployee(employee);
};

export const deleteEmployee = (id: string): void => {
  let employees = getEmployees();
  employees = employees.filter(e => e.id !== id);
  localStorage.setItem(STORAGE_KEY_EMPLOYEES, JSON.stringify(employees));
  
  // Also cleanup vacations for this employee
  let vacations = getVacations();
  vacations = vacations.filter(v => v.employeeId !== id);
  localStorage.setItem(STORAGE_KEY_VACATIONS, JSON.stringify(vacations));
};

export const getVacations = (): VacationEntry[] => {
  const data = localStorage.getItem(STORAGE_KEY_VACATIONS);
  return data ? JSON.parse(data) : [];
};

export const addVacation = (employeeId: string, date: string, type: VacationType): void => {
  const vacations = getVacations();
  const newEntry: VacationEntry = {
    id: Date.now().toString(),
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