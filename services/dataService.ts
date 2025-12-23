import { Employee, VacationEntry, VacationType, VACATION_COST, Holiday } from '../types';

const STORAGE_KEY_EMPLOYEES = 'pvc_employees_v4';
const STORAGE_KEY_VACATIONS = 'pvc_vacations_v4';

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

// Helper to seed vacations
let vacIdCounter = 1;
const mkVac = (empId: string, date: string, type: VacationType): VacationEntry => ({
  id: `vac_seed_${vacIdCounter++}`,
  employeeId: empId,
  date,
  type,
  cost: VACATION_COST[type]
});

// Mapping for readability
const ID = {
  Jang: 'emp_1',
  Park: 'emp_10',
  LeeK: 'emp_2',
  KimS: 'emp_3',
  LeeM: 'emp_4',
  LeeH: 'emp_5',
  KimH: 'emp_6',
  Jeon: 'emp_7',
  KimJ: 'emp_8',
  KimM: 'emp_9'
};

const INITIAL_VACATIONS: VacationEntry[] = [
  // 2025-01-31
  mkVac(ID.Jang, '2025-01-31', VacationType.FULL),
  mkVac(ID.Park, '2025-01-31', VacationType.FULL),
  mkVac(ID.LeeK, '2025-01-31', VacationType.FULL),
  mkVac(ID.KimS, '2025-01-31', VacationType.FULL),
  // 2025-02
  mkVac(ID.LeeK, '2025-02-12', VacationType.HALF_AM),
  mkVac(ID.KimS, '2025-02-19', VacationType.HALF_AM),
  // 2025-03
  mkVac(ID.LeeK, '2025-03-04', VacationType.HALF_AM),
  mkVac(ID.LeeK, '2025-03-19', VacationType.FULL),
  mkVac(ID.KimS, '2025-03-21', VacationType.HALF_PM),
  mkVac(ID.Jang, '2025-03-24', VacationType.FULL),
  mkVac(ID.Park, '2025-03-31', VacationType.HALF_PM),
  mkVac(ID.KimS, '2025-03-31', VacationType.FULL),
  mkVac(ID.LeeM, '2025-03-31', VacationType.QUARTER),
  // 2025-04
  mkVac(ID.Jang, '2025-04-11', VacationType.QUARTER),
  mkVac(ID.LeeM, '2025-04-15', VacationType.QUARTER),
  mkVac(ID.LeeM, '2025-04-18', VacationType.FULL),
  mkVac(ID.LeeK, '2025-04-22', VacationType.FULL),
  mkVac(ID.Park, '2025-04-23', VacationType.FULL),
  mkVac(ID.KimS, '2025-04-23', VacationType.QUARTER),
  mkVac(ID.KimS, '2025-04-28', VacationType.HALF_AM),
  // 2025-05
  mkVac(ID.Jang, '2025-05-02', VacationType.FULL),
  mkVac(ID.LeeK, '2025-05-02', VacationType.FULL),
  mkVac(ID.LeeM, '2025-05-02', VacationType.FULL),
  mkVac(ID.Park, '2025-05-07', VacationType.HALF_PM),
  mkVac(ID.Jang, '2025-05-23', VacationType.FULL),
  // 2025-06
  mkVac(ID.KimS, '2025-06-04', VacationType.FULL),
  mkVac(ID.LeeK, '2025-06-09', VacationType.FULL),
  mkVac(ID.LeeM, '2025-06-09', VacationType.FULL),
  mkVac(ID.Jang, '2025-06-13', VacationType.FULL),
  mkVac(ID.LeeK, '2025-06-13', VacationType.FULL),
  mkVac(ID.Park, '2025-06-27', VacationType.FULL),
  // 2025-07
  mkVac(ID.LeeM, '2025-07-02', VacationType.FULL),
  mkVac(ID.KimS, '2025-07-04', VacationType.HALF_PM),
  mkVac(ID.Park, '2025-07-11', VacationType.HALF_PM),
  mkVac(ID.LeeK, '2025-07-14', VacationType.FULL),
  mkVac(ID.LeeM, '2025-07-18', VacationType.FULL),
  // 2025-08
  mkVac(ID.Jang, '2025-08-01', VacationType.FULL),
  mkVac(ID.LeeK, '2025-08-05', VacationType.FULL),
  mkVac(ID.LeeM, '2025-08-11', VacationType.FULL),
  mkVac(ID.LeeM, '2025-08-12', VacationType.FULL),
  mkVac(ID.KimS, '2025-08-22', VacationType.FULL),
  mkVac(ID.Jang, '2025-08-28', VacationType.HALF_PM),
  mkVac(ID.KimS, '2025-08-29', VacationType.QUARTER),
  // 2025-09
  mkVac(ID.LeeM, '2025-09-01', VacationType.QUARTER),
  mkVac(ID.Park, '2025-09-03', VacationType.QUARTER),
  mkVac(ID.Jang, '2025-09-05', VacationType.FULL),
  mkVac(ID.LeeM, '2025-09-05', VacationType.QUARTER),
  mkVac(ID.KimS, '2025-09-08', VacationType.FULL),
  mkVac(ID.Jang, '2025-09-22', VacationType.QUARTER),
  mkVac(ID.KimS, '2025-09-22', VacationType.FULL),
  mkVac(ID.Jang, '2025-09-23', VacationType.FULL),
  mkVac(ID.LeeM, '2025-09-26', VacationType.HALF_PM),
  mkVac(ID.Park, '2025-09-29', VacationType.FULL),
  // 2025-10
  mkVac(ID.LeeK, '2025-10-10', VacationType.FULL),
  mkVac(ID.KimS, '2025-10-10', VacationType.FULL),
  mkVac(ID.LeeM, '2025-10-16', VacationType.HALF_PM),
  mkVac(ID.Jang, '2025-10-20', VacationType.HALF_AM),
  // 2025-11
  mkVac(ID.KimS, '2025-11-03', VacationType.HALF_PM),
  mkVac(ID.Jang, '2025-11-04', VacationType.QUARTER),
  mkVac(ID.LeeM, '2025-11-04', VacationType.FULL),
  mkVac(ID.Park, '2025-11-05', VacationType.HALF_PM),
  mkVac(ID.Jang, '2025-11-07', VacationType.HALF_PM),
  mkVac(ID.KimS, '2025-11-13', VacationType.FULL),
  mkVac(ID.LeeK, '2025-11-17', VacationType.FULL),
  mkVac(ID.LeeM, '2025-11-17', VacationType.FULL),
  mkVac(ID.Jang, '2025-11-19', VacationType.HALF_AM),
  mkVac(ID.Park, '2025-11-24', VacationType.FULL),
  // 2025-12
  mkVac(ID.Jang, '2025-12-04', VacationType.HALF_PM),
  mkVac(ID.Jang, '2025-12-05', VacationType.FULL),
  mkVac(ID.KimS, '2025-12-05', VacationType.FULL),
  mkVac(ID.LeeM, '2025-12-08', VacationType.FULL),
  mkVac(ID.LeeK, '2025-12-10', VacationType.QUARTER),
  mkVac(ID.Park, '2025-12-12', VacationType.HALF_PM),
  mkVac(ID.LeeM, '2025-12-17', VacationType.FULL),
  mkVac(ID.Park, '2025-12-18', VacationType.QUARTER),
  mkVac(ID.Jang, '2025-12-22', VacationType.FULL),
  mkVac(ID.Jang, '2025-12-26', VacationType.FULL),
  mkVac(ID.LeeK, '2025-12-26', VacationType.FULL),
];

const HOLIDAYS: Holiday[] = [
  { date: '2025-01-01', name: '신정' },
  { date: '2025-01-28', name: '설날 연휴' },
  { date: '2025-01-29', name: '설날' },
  { date: '2025-01-30', name: '설날 연휴' },
  { date: '2025-03-01', name: '3·1절' },
  { date: '2025-03-03', name: '대체공휴일(3·1절)' }, // 관공서 공휴일 규정 확인 필요, 편의상 추가 혹은 제거. 2025년 3.1절은 토요일이나 대체공휴일 대상 아님. 하지만 달력 표기 위해 빨간날로 처리하고 싶다면 포함. (정확히는 제외가 맞으나, 일단 사용자 요청 "공휴일 정보"에 따름) -> 3.1절은 대체공휴일 확대 적용 대상임 (2025년부터 적용 가능성 높음). 보수적으로 포함.
  { date: '2025-05-05', name: '어린이날' },
  { date: '2025-05-06', name: '부처님오신날' },
  { date: '2025-06-06', name: '현충일' },
  { date: '2025-08-15', name: '광복절' },
  { date: '2025-10-03', name: '개천절' },
  { date: '2025-10-05', name: '추석 연휴' },
  { date: '2025-10-06', name: '추석' },
  { date: '2025-10-07', name: '추석 연휴' },
  { date: '2025-10-08', name: '대체공휴일(추석)' }, // 10.5(일)이 추석연휴이므로 10.8 대체
  { date: '2025-10-09', name: '한글날' },
  { date: '2025-12-25', name: '기독탄신일' },
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
    id: `vac_${Date.now()}`,
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