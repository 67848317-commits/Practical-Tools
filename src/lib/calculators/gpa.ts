export type LetterGrade =
  | 'A+'
  | 'A'
  | 'A-'
  | 'B+'
  | 'B'
  | 'B-'
  | 'C+'
  | 'C'
  | 'C-'
  | 'D+'
  | 'D'
  | 'D-'
  | 'F';

export type CourseType = 'regular' | 'honors' | 'ap_ib';

export const GRADE_POINTS: Record<LetterGrade, number> = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'D-': 0.7,
  'F': 0.0,
};

export const COURSE_TYPE_WEIGHTS: Record<CourseType, { name: string; weightBonus: number }> = {
  regular: { name: 'Regular (4.0)', weightBonus: 0.0 },
  honors: { name: 'Honors (+0.5)', weightBonus: 0.5 },
  ap_ib: { name: 'AP / IB / College (+1.0)', weightBonus: 1.0 },
};

export interface GpaCourse {
  id: string;
  name: string;
  credits: string;
  grade: LetterGrade;
  courseType?: CourseType;
}

export interface GpaInput {
  courses: GpaCourse[];
}

export interface GpaResult {
  totalCredits: number;
  totalGradePoints: number;
  totalWeightedGradePoints: number;
  gpa: number; // Unweighted GPA
  weightedGpa: number; // Weighted GPA
  formattedGpa: string;
  formattedWeightedGpa: string;
  courseBreakdown: {
    name: string;
    credits: number;
    grade: LetterGrade;
    points: number;
    weightedPoints: number;
    honorPoints: number;
    weightedHonorPoints: number;
    courseType: CourseType;
  }[];
  calculationSteps: string[];
  errorMessage?: string;
}

export function calculateGpa(input: GpaInput): GpaResult {
  const { courses } = input;

  if (!courses || courses.length === 0) {
    return {
      totalCredits: 0,
      totalGradePoints: 0,
      totalWeightedGradePoints: 0,
      gpa: 0,
      weightedGpa: 0,
      formattedGpa: '—',
      formattedWeightedGpa: '—',
      courseBreakdown: [],
      calculationSteps: [],
      errorMessage: 'Please add at least one course with credits and grade.',
    };
  }

  let totalCredits = 0;
  let totalGradePoints = 0;
  let totalWeightedGradePoints = 0;
  const courseBreakdown: GpaResult['courseBreakdown'] = [];

  for (let i = 0; i < courses.length; i++) {
    const c = courses[i];
    const crStr = (c.credits ?? '').trim();
    if (crStr === '') continue;

    const credits = parseFloat(crStr);
    if (isNaN(credits) || credits < 0) {
      return {
        totalCredits: 0,
        totalGradePoints: 0,
        totalWeightedGradePoints: 0,
        gpa: 0,
        weightedGpa: 0,
        formattedGpa: '—',
        formattedWeightedGpa: '—',
        courseBreakdown: [],
        calculationSteps: [],
        errorMessage: `Course ${i + 1} (${c.name || 'Untitled'}) has invalid credits. Credits must be a positive number.`,
      };
    }

    if (credits === 0) continue; // Audit or 0-credit course

    const pointValue = GRADE_POINTS[c.grade] ?? 4.0;
    const courseType: CourseType = c.courseType || 'regular';
    const bonus = c.grade === 'F' ? 0 : COURSE_TYPE_WEIGHTS[courseType].weightBonus;
    const weightedPointValue = pointValue + bonus;

    const honorPoints = credits * pointValue;
    const weightedHonorPoints = credits * weightedPointValue;

    totalCredits += credits;
    totalGradePoints += honorPoints;
    totalWeightedGradePoints += weightedHonorPoints;

    courseBreakdown.push({
      name: c.name.trim() || `Course ${i + 1}`,
      credits,
      grade: c.grade,
      points: pointValue,
      weightedPoints: weightedPointValue,
      honorPoints,
      weightedHonorPoints,
      courseType,
    });
  }

  if (totalCredits === 0) {
    return {
      totalCredits: 0,
      totalGradePoints: 0,
      totalWeightedGradePoints: 0,
      gpa: 0,
      weightedGpa: 0,
      formattedGpa: '—',
      formattedWeightedGpa: '—',
      courseBreakdown: [],
      calculationSteps: [],
      errorMessage: 'Total course credits must be greater than zero.',
    };
  }

  const gpa = totalGradePoints / totalCredits;
  const weightedGpa = totalWeightedGradePoints / totalCredits;
  const formattedGpa = gpa.toFixed(2);
  const formattedWeightedGpa = weightedGpa.toFixed(2);

  const hasWeightedCourses = courseBreakdown.some((c) => c.courseType !== 'regular');

  const steps = [
    `Sum total credits attempted: ${courseBreakdown.map((c) => `${c.credits}cr`).join(' + ')} = ${totalCredits} credits`,
    `Unweighted grade points (credits × 4.0 points): ${courseBreakdown.map((c) => `(${c.credits} × ${c.points.toFixed(1)})`).join(' + ')} = ${totalGradePoints.toFixed(2)} pts`,
    `Unweighted GPA: ${totalGradePoints.toFixed(2)} points ÷ ${totalCredits} credits = ${formattedGpa}`,
    ...(hasWeightedCourses
      ? [
          `Weighted grade points (with Honors +0.5 / AP +1.0): ${courseBreakdown.map((c) => `(${c.credits} × ${c.weightedPoints.toFixed(1)})`).join(' + ')} = ${totalWeightedGradePoints.toFixed(2)} pts`,
          `Weighted GPA: ${totalWeightedGradePoints.toFixed(2)} points ÷ ${totalCredits} credits = ${formattedWeightedGpa} (on 5.0 weighted scale)`,
        ]
      : [
          `Weighted GPA: ${formattedWeightedGpa} (matches unweighted since all courses are standard level)`,
        ]),
    `Standard US scale: A+/A=4.0, A-=3.7, B+=3.3, B=3.0, B-=2.7, C+=2.3, C=2.0, C-=1.7, D+=1.3, D=1.0, D-=0.7, F=0.0`,
  ];

  return {
    totalCredits,
    totalGradePoints,
    totalWeightedGradePoints,
    gpa,
    weightedGpa,
    formattedGpa,
    formattedWeightedGpa,
    courseBreakdown,
    calculationSteps: steps,
  };
}
