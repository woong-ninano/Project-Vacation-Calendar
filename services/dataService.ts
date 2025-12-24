import { supabase, isClientConfigured } from './supabaseClient';
import { Employee, VacationEntry, VacationType, VACATION_COST, Holiday } from '../types';

// Helper to check if Supabase is actually configured
const isSupabaseConfigured = () => {
  return isClientConfigured;
};

export const calculateManMonths = (start: string, end: string): number => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return 0;
  
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  const mm = (diffDays / 30.4).toFixed(1); 
  return parseFloat(mm);
};

// --- Initial Data for Seeding ---
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

let vacIdCounter = 1;
const mkVac = (empId: string, date: string, type: VacationType): VacationEntry => ({
  id: `vac_seed_v6_${vacIdCounter++}`,
  employeeId: empId,
  date,
  type,
  cost: VACATION_COST[type]
});

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
  // 2025-01
  mkVac(ID.Jang, '2025-01-31', VacationType.FULL),
  mkVac(ID.Park, '2025-01-31', VacationType.FULL),
  mkVac(ID.LeeK, '2025-01-31', VacationType.FULL),
  mkVac(ID.KimS, '2025-01-31', VacationType.FULL),
  mkVac(ID.LeeH, '2025-01-31', VacationType.FULL),
  mkVac(ID.KimH, '2025-01-31', VacationType.FULL),
  // 2025-02
  mkVac(ID.LeeK, '2025-02-12', VacationType.HALF_AM),
  mkVac(ID.LeeH, '2025-02-14', VacationType.FULL),
  mkVac(ID.KimS, '2025-02-19', VacationType.HALF_AM),
  mkVac(ID.KimH, '2025-02-25', VacationType.FULL),
  mkVac(ID.Jeon, '2025-02-27', VacationType.HALF_PM),
  mkVac(ID.Jeon, '2025-02-28', VacationType.FULL),
  // 2025-03
  mkVac(ID.LeeK, '2025-03-04', VacationType.HALF_AM),
  mkVac(ID.KimM, '2025-03-17', VacationType.FULL),
  mkVac(ID.LeeK, '2025-03-19', VacationType.FULL),
  mkVac(ID.KimS, '2025-03-21', VacationType.HALF_PM),
  mkVac(ID.LeeH, '2025-03-21', VacationType.HALF_PM),
  mkVac(ID.Jang, '2025-03-24', VacationType.FULL),
  mkVac(ID.KimJ, '2025-03-24', VacationType.FULL),
  mkVac(ID.Jeon, '2025-03-27', VacationType.QUARTER),
  mkVac(ID.KimH, '2025-03-28', VacationType.QUARTER),
  mkVac(ID.Park, '2025-03-31', VacationType.HALF_PM),
  mkVac(ID.KimS, '2025-03-31', VacationType.FULL),
  mkVac(ID.LeeM, '2025-03-31', VacationType.QUARTER),
  // 2025-04
  mkVac(ID.Jang, '2025-04-11', VacationType.QUARTER),
  mkVac(ID.LeeM, '2025-04-15', VacationType.QUARTER),
  mkVac(ID.Jeon, '2025-04-17', VacationType.QUARTER),
  mkVac(ID.LeeM, '2025-04-18', VacationType.FULL),
  mkVac(ID.LeeK, '2025-04-22', VacationType.FULL),
  mkVac(ID.KimH, '2025-04-22', VacationType.FULL),
  mkVac(ID.Park, '2025-04-23', VacationType.FULL),
  mkVac(ID.KimS, '2025-04-23', VacationType.QUARTER),
  mkVac(ID.KimS, '2025-04-28', VacationType.HALF_AM),
  mkVac(ID.LeeH, '2025-04-28', VacationType.FULL),
  // 2025-05
  mkVac(ID.Jang, '2025-05-02', VacationType.FULL),
  mkVac(ID.LeeK, '2025-05-02', VacationType.FULL),
  mkVac(ID.LeeM, '2025-05-02', VacationType.FULL),
  mkVac(ID.Jeon, '2025-05-02', VacationType.FULL),
  mkVac(ID.Park, '2025-05-07', VacationType.HALF_PM),
  mkVac(ID.KimM, '2025-05-19', VacationType.FULL),
  mkVac(ID.KimM, '2025-05-20', VacationType.FULL),
  mkVac(ID.Jang, '2025-05-23', VacationType.FULL),
  mkVac(ID.KimH, '2025-05-23', VacationType.HALF_PM),
  // 2025-06
  mkVac(ID.Jeon, '2025-06-02', VacationType.FULL),
  mkVac(ID.KimS, '2025-06-04', VacationType.FULL),
  mkVac(ID.LeeK, '2025-06-09', VacationType.FULL),
  mkVac(ID.LeeM, '2025-06-09', VacationType.FULL),
  mkVac(ID.Jang, '2025-06-13', VacationType.FULL),
  mkVac(ID.LeeK, '2025-06-13', VacationType.FULL),
  mkVac(ID.LeeH, '2025-06-13', VacationType.HALF_PM),
  mkVac(ID.KimM, '2025-06-16', VacationType.FULL),
  mkVac(ID.KimJ, '2025-06-17', VacationType.FULL),
  mkVac(ID.Park, '2025-06-27', VacationType.FULL),
  mkVac(ID.Jeon, '2025-06-27', VacationType.QUARTER),
  // 2025-07
  mkVac(ID.LeeM, '2025-07-02', VacationType.FULL),
  mkVac(ID.KimS, '2025-07-04', VacationType.HALF_PM),
  mkVac(ID.KimH, '2025-07-04', VacationType.FULL),
  mkVac(ID.KimJ, '2025-07-09', VacationType.FULL),
  mkVac(ID.Park, '2025-07-11', VacationType.HALF_PM),
  mkVac(ID.LeeK, '2025-07-14', VacationType.FULL),
  mkVac(ID.KimM, '2025-07-14', VacationType.FULL),
  mkVac(ID.LeeM, '2025-07-18', VacationType.FULL),
  mkVac(ID.LeeH, '2025-07-21', VacationType.HALF_AM),
  // 2025-08
  mkVac(ID.Jang, '2025-08-01', VacationType.FULL),
  mkVac(ID.KimH, '2025-08-01', VacationType.FULL),
  mkVac(ID.LeeH, '2025-08-04', VacationType.FULL),
  mkVac(ID.KimH, '2025-08-04', VacationType.FULL),
  mkVac(ID.LeeK, '2025-08-05', VacationType.FULL),
  mkVac(ID.LeeH, '2025-08-05', VacationType.FULL),
  mkVac(ID.LeeH, '2025-08-06', VacationType.FULL),
  mkVac(ID.LeeM, '2025-08-11', VacationType.FULL),
  mkVac(ID.Jeon, '2025-08-11', VacationType.FULL),
  mkVac(ID.LeeM, '2025-08-12', VacationType.FULL),
  mkVac(ID.Jeon, '2025-08-12', VacationType.FULL),
  mkVac(ID.KimJ, '2025-08-18', VacationType.FULL),
  mkVac(ID.KimS, '2025-08-22', VacationType.FULL),
  mkVac(ID.KimH, '2025-08-22', VacationType.HALF_PM),
  mkVac(ID.KimJ, '2025-08-22', VacationType.QUARTER),
  mkVac(ID.KimM, '2025-08-25', VacationType.FULL),
  mkVac(ID.Jang, '2025-08-28', VacationType.HALF_PM),
  mkVac(ID.KimS, '2025-08-29', VacationType.QUARTER),
  // 2025-09
  mkVac(ID.LeeM, '2025-09-01', VacationType.QUARTER),
  mkVac(ID.Park, '2025-09-03', VacationType.QUARTER),
  mkVac(ID.KimH, '2025-09-03', VacationType.QUARTER),
  mkVac(ID.Jang, '2025-09-05', VacationType.FULL),
  mkVac(ID.LeeM, '2025-09-05', VacationType.QUARTER),
  mkVac(ID.KimS, '2025-09-08', VacationType.FULL),
  mkVac(ID.KimH, '2025-09-08', VacationType.FULL),
  mkVac(ID.KimM, '2025-09-10', VacationType.FULL),
  mkVac(ID.KimJ, '2025-09-12', VacationType.FULL),
  mkVac(ID.Jeon, '2025-09-16', VacationType.QUARTER),
  mkVac(ID.KimJ, '2025-09-17', VacationType.HALF_AM),
  mkVac(ID.KimH, '2025-09-18', VacationType.HALF_AM),
  mkVac(ID.Jang, '2025-09-22', VacationType.QUARTER),
  mkVac(ID.KimS, '2025-09-22', VacationType.FULL),
  mkVac(ID.Jang, '2025-09-23', VacationType.FULL),
  mkVac(ID.Jeon, '2025-09-23', VacationType.FULL),
  mkVac(ID.KimJ, '2025-09-23', VacationType.HALF_AM),
  mkVac(ID.LeeM, '2025-09-26', VacationType.HALF_PM),
  mkVac(ID.LeeH, '2025-09-26', VacationType.FULL),
  mkVac(ID.Park, '2025-09-29', VacationType.FULL),
  mkVac(ID.KimJ, '2025-09-29', VacationType.FULL),
  // 2025-10
  mkVac(ID.LeeK, '2025-10-10', VacationType.FULL),
  mkVac(ID.KimS, '2025-10-10', VacationType.FULL),
  mkVac(ID.LeeH, '2025-10-10', VacationType.FULL),
  mkVac(ID.KimH, '2025-10-10', VacationType.FULL),
  mkVac(ID.KimM, '2025-10-10', VacationType.FULL),
  mkVac(ID.Jeon, '2025-10-14', VacationType.QUARTER),
  mkVac(ID.KimJ, '2025-10-15', VacationType.FULL),
  mkVac(ID.LeeM, '2025-10-16', VacationType.HALF_PM),
  mkVac(ID.Jang, '2025-10-20', VacationType.HALF_AM),
  mkVac(ID.KimH, '2025-10-27', VacationType.HALF_PM),
  // 2025-11
  mkVac(ID.KimS, '2025-11-03', VacationType.HALF_PM),
  mkVac(ID.Jang, '2025-11-04', VacationType.QUARTER),
  mkVac(ID.LeeM, '2025-11-04', VacationType.FULL),
  mkVac(ID.Park, '2025-11-05', VacationType.HALF_PM),
  mkVac(ID.Jang, '2025-11-07', VacationType.HALF_PM),
  mkVac(ID.KimS, '2025-11-13', VacationType.FULL),
  mkVac(ID.KimH, '2025-11-14', VacationType.HALF_AM),
  mkVac(ID.LeeK, '2025-11-17', VacationType.FULL),
  mkVac(ID.LeeM, '2025-11-17', VacationType.FULL),
  mkVac(ID.KimJ, '2025-11-17', VacationType.FULL),
  mkVac(ID.Jang, '2025-11-19', VacationType.HALF_AM),
  mkVac(ID.Park, '2025-11-24', VacationType.FULL),
  mkVac(ID.LeeH, '2025-11-24', VacationType.HALF_AM),
  mkVac(ID.KimH, '2025-11-24', VacationType.FULL),
  mkVac(ID.Jeon, '2025-11-28', VacationType.FULL),
  // 2025-12
  mkVac(ID.LeeH, '2025-12-01', VacationType.FULL),
  mkVac(ID.Jang, '2025-12-04', VacationType.HALF_PM),
  mkVac(ID.Jang, '2025-12-05', VacationType.FULL),
  mkVac(ID.KimS, '2025-12-05', VacationType.FULL),
  mkVac(ID.KimH, '2025-12-05', VacationType.FULL),
  mkVac(ID.LeeM, '2025-12-08', VacationType.FULL),
  mkVac(ID.LeeK, '2025-12-10', VacationType.QUARTER),
  mkVac(ID.Park, '2025-12-12', VacationType.HALF_PM),
  mkVac(ID.LeeM, '2025-12-17', VacationType.FULL),
  mkVac(ID.Park, '2025-12-18', VacationType.QUARTER),
  mkVac(ID.Jeon, '2025-12-19', VacationType.FULL),
  mkVac(ID.Jang, '2025-12-22', VacationType.FULL),
  mkVac(ID.Jang, '2025-12-26', VacationType.FULL),
  mkVac(ID.LeeK, '2025-12-26', VacationType.FULL),
  mkVac(ID.Jeon, '2025-12-26', VacationType.FULL),
  mkVac(ID.KimM, '2025-12-26', VacationType.FULL),
  mkVac(ID.KimJ, '2025-12-29', VacationType.FULL),
  mkVac(ID.KimH, '2025-12-30', VacationType.FULL),
  mkVac(ID.KimH, '2025-12-31', VacationType.FULL),
  // 2026-01
  mkVac(ID.KimH, '2026-01-02', VacationType.FULL),
];

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

// --- Supabase Async Functions ---

export const getEmployees = async (): Promise<Employee[]> => {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase.from('employees').select('*');
  if (error) {
    console.error('Error fetching employees:', error);
    return [];
  }
  return data as Employee[];
};

export const saveEmployee = async (employee: Employee): Promise<void> => {
  if (!isSupabaseConfigured()) return;
  const { error } = await supabase.from('employees').upsert(employee);
  if (error) console.error('Error saving employee:', error);
};

export const updateEmployee = async (employee: Employee): Promise<void> => {
  await saveEmployee(employee);
};

export const deleteEmployee = async (id: string): Promise<void> => {
  if (!isSupabaseConfigured()) return;
  const { error } = await supabase.from('employees').delete().eq('id', id);
  if (error) console.error('Error deleting employee:', error);
};

export const getVacations = async (): Promise<VacationEntry[]> => {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase.from('vacations').select('*');
  if (error) {
    console.error('Error fetching vacations:', error);
    return [];
  }
  return data as VacationEntry[];
};

export const addVacation = async (employeeId: string, date: string, type: VacationType): Promise<void> => {
  if (!isSupabaseConfigured()) return;
  const newEntry: VacationEntry = {
    id: `vac_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    employeeId,
    date,
    type,
    cost: VACATION_COST[type]
  };
  
  const { error } = await supabase.from('vacations').insert(newEntry);
  if (error) console.error('Error adding vacation:', error);
};

export const removeVacation = async (id: string): Promise<void> => {
  if (!isSupabaseConfigured()) return;
  const { error } = await supabase.from('vacations').delete().eq('id', id);
  if (error) console.error('Error removing vacation:', error);
};

export const getHolidays = (): Holiday[] => {
  return HOLIDAYS;
};

// --- Seed Function ---
export const seedDatabase = async () => {
  if (!isSupabaseConfigured()) {
    alert('Supabase 설정이 완료되지 않았습니다. .env 파일을 확인해주세요.');
    return false;
  }
  
  // Check if data exists
  const { count } = await supabase.from('employees').select('*', { count: 'exact', head: true });
  
  if (count === 0) {
    const { error: empError } = await supabase.from('employees').insert(INITIAL_EMPLOYEES);
    if (empError) console.error('Seed Employees Error:', empError);
    
    const { error: vacError } = await supabase.from('vacations').insert(INITIAL_VACATIONS);
    if (vacError) console.error('Seed Vacations Error:', vacError);
    
    return true;
  }
  return false;
};