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
    totalVacationDays: 15, // Standard assumption, editable
  }
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