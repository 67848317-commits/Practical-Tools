export interface SalaryInput {
  annualSalary: string;
  hoursPerWeek: string;
  weeksPerYear: string;
  paidVacationDays?: string;
}

export interface SalaryResult {
  annualSalary: number;
  hoursPerWeek: number;
  weeksPerYear: number;
  totalAnnualHours: number;
  hourlyRate: number;
  weeklyGross: number;
  biweeklyGross: number;
  monthlyGross: number;
  calculationSteps: string[];
  errorMessage?: string;
}

export function calculateSalary(input: SalaryInput): SalaryResult {
  const salaryStr = (input.annualSalary ?? '').trim();
  const hpwStr = (input.hoursPerWeek ?? '').trim();
  const wpyStr = (input.weeksPerYear ?? '').trim();

  if (salaryStr === '') {
    return {
      annualSalary: 0,
      hoursPerWeek: 0,
      weeksPerYear: 0,
      totalAnnualHours: 0,
      hourlyRate: 0,
      weeklyGross: 0,
      biweeklyGross: 0,
      monthlyGross: 0,
      calculationSteps: [],
      errorMessage: 'Please enter a valid annual salary greater than zero.',
    };
  }

  const salary = parseFloat(salaryStr);
  const hpw = parseFloat(hpwStr);
  const wpy = parseFloat(wpyStr);

  if (isNaN(salary) || salary <= 0) {
    return {
      annualSalary: 0,
      hoursPerWeek: 0,
      weeksPerYear: 0,
      totalAnnualHours: 0,
      hourlyRate: 0,
      weeklyGross: 0,
      biweeklyGross: 0,
      monthlyGross: 0,
      calculationSteps: [],
      errorMessage: 'Please enter a valid annual salary greater than zero.',
    };
  }

  if (isNaN(hpw) || hpw <= 0 || hpw > 168) {
    return {
      annualSalary: salary,
      hoursPerWeek: 0,
      weeksPerYear: 0,
      totalAnnualHours: 0,
      hourlyRate: 0,
      weeklyGross: 0,
      biweeklyGross: 0,
      monthlyGross: 0,
      calculationSteps: [],
      errorMessage: 'Hours per week must be between 1 and 168 hours.',
    };
  }

  if (isNaN(wpy) || wpy <= 0 || wpy > 52) {
    return {
      annualSalary: salary,
      hoursPerWeek: hpw,
      weeksPerYear: 0,
      totalAnnualHours: 0,
      hourlyRate: 0,
      weeklyGross: 0,
      biweeklyGross: 0,
      monthlyGross: 0,
      calculationSteps: [],
      errorMessage: 'Working weeks per year must be between 1 and 52 weeks.',
    };
  }

  const totalAnnualHours = hpw * wpy;
  const hourlyRate = totalAnnualHours > 0 ? salary / totalAnnualHours : 0;
  const weeklyGross = salary / wpy;
  const biweeklyGross = weeklyGross * 2;
  const monthlyGross = salary / 12;

  const fmt = (v: number) => v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return {
    annualSalary: salary,
    hoursPerWeek: hpw,
    weeksPerYear: wpy,
    totalAnnualHours,
    hourlyRate,
    weeklyGross,
    biweeklyGross,
    monthlyGross,
    calculationSteps: [
      `Calculate total annual work hours: ${hpw} hours/week × ${wpy} weeks/year = ${totalAnnualHours.toLocaleString()} hours`,
      `Calculate estimated hourly rate: $${fmt(salary)} ÷ ${totalAnnualHours.toLocaleString()} hours = $${fmt(hourlyRate)}/hr`,
      `Calculate monthly gross equivalent: $${fmt(salary)} ÷ 12 months = $${fmt(monthlyGross)}/month`,
      `Calculate bi-weekly paycheck (2 weeks): 2 × $${fmt(weeklyGross)} = $${fmt(biweeklyGross)}/paycheck`,
    ],
  };
}
