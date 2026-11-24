import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { CalculatorCard, ResultBox } from '../CalculatorCard';
import {
  calculateGpa,
  GRADE_POINTS,
  COURSE_TYPE_WEIGHTS,
  GpaCourse,
  LetterGrade,
  CourseType,
} from '../../lib/calculators/gpa';

const INITIAL_COURSES: GpaCourse[] = [
  { id: '1', name: 'AP English Literature', credits: '3', grade: 'A', courseType: 'ap_ib' },
  { id: '2', name: 'Honors Calculus I', credits: '4', grade: 'B+', courseType: 'honors' },
  { id: '3', name: 'General Chemistry', credits: '4', grade: 'B', courseType: 'regular' },
  { id: '4', name: 'Psychology 101', credits: '3', grade: 'A-', courseType: 'regular' },
  { id: '5', name: 'History Seminar', credits: '3', grade: 'A', courseType: 'regular' },
];

export const GpaCalculator: React.FC = () => {
  const [courses, setCourses] = useState<GpaCourse[]>(INITIAL_COURSES);

  const handleReset = () => {
    setCourses(INITIAL_COURSES);
  };

  const handleAddCourse = () => {
    const nextId = (courses.length + 1).toString();
    setCourses([...courses, { id: nextId, name: '', credits: '3', grade: 'A', courseType: 'regular' }]);
  };

  const handleRemoveCourse = (id: string) => {
    if (courses.length <= 1) return;
    setCourses(courses.filter((c) => c.id !== id));
  };

  const handleCourseChange = (id: string, field: keyof GpaCourse, value: string) => {
    setCourses(
      courses.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const result = calculateGpa({ courses });
  const hasWeighted = courses.some((c) => c.courseType && c.courseType !== 'regular');

  return (
    <CalculatorCard
      title="High School & College GPA Calculator"
      description="Calculate your weighted and unweighted cumulative GPA on the standard 4.0 / 5.0 grading scale with Honors and AP/IB weighting."
      onReset={handleReset}
      errorMessage={result.errorMessage}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Controls: Course Rows */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Course Work & Grades
            </span>
            <button
              type="button"
              onClick={handleAddCourse}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Course</span>
            </button>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {courses.map((course, idx) => (
              <div
                key={course.id}
                className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200"
              >
                <div className="flex-1 min-w-[140px]">
                  <label htmlFor={`course-name-${course.id}`} className="sr-only">
                    Course Name
                  </label>
                  <input
                    id={`course-name-${course.id}`}
                    type="text"
                    value={course.name}
                    onChange={(e) => handleCourseChange(course.id, 'name', e.target.value)}
                    placeholder={`Course ${idx + 1}`}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="w-20">
                  <label htmlFor={`course-credits-${course.id}`} className="sr-only">
                    Credits
                  </label>
                  <input
                    id={`course-credits-${course.id}`}
                    type="number"
                    min="0.5"
                    max="12"
                    step="0.5"
                    value={course.credits}
                    onChange={(e) => handleCourseChange(course.id, 'credits', e.target.value)}
                    placeholder="Credits"
                    className="w-full rounded-lg border border-slate-300 px-2 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-center font-medium"
                    title="Credit hours (typically 3 or 4)"
                  />
                </div>

                <div className="w-24">
                  <label htmlFor={`course-grade-${course.id}`} className="sr-only">
                    Letter Grade
                  </label>
                  <select
                    id={`course-grade-${course.id}`}
                    value={course.grade}
                    onChange={(e) => handleCourseChange(course.id, 'grade', e.target.value as LetterGrade)}
                    className="w-full rounded-lg border border-slate-300 px-2 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                  >
                    {Object.keys(GRADE_POINTS).map((g) => (
                      <option key={g} value={g}>
                        {g} ({GRADE_POINTS[g as LetterGrade].toFixed(1)})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-28">
                  <label htmlFor={`course-type-${course.id}`} className="sr-only">
                    Course Weight Level
                  </label>
                  <select
                    id={`course-type-${course.id}`}
                    value={course.courseType || 'regular'}
                    onChange={(e) => handleCourseChange(course.id, 'courseType', e.target.value as CourseType)}
                    className="w-full rounded-lg border border-slate-300 px-2 py-2 text-xs text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                    title="Regular, Honors (+0.5), or AP/IB (+1.0)"
                  >
                    <option value="regular">Regular</option>
                    <option value="honors">Honors (+0.5)</option>
                    <option value="ap_ib">AP / IB (+1.0)</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveCourse(course.id)}
                  disabled={courses.length <= 1}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    courses.length <= 1
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-slate-400 hover:text-red-600 hover:bg-red-50'
                  }`}
                  title="Remove course"
                  aria-label={`Remove course ${idx + 1}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500 pt-1">
            Note: Uses an illustrative U.S. 4.0 grading scale (A+/A=4.0, A-=3.7 ... F=0.0) with Honors (+0.5) and AP/IB (+1.0) weighting. Official scales and honors bonuses vary by school.
          </p>
        </div>

        {/* Results Box */}
        <div className="lg:col-span-5">
          <ResultBox
            primaryLabel={hasWeighted ? 'Weighted Cumulative GPA' : 'Cumulative Grade Point Average'}
            primaryValue={result.errorMessage ? '—' : (hasWeighted ? result.formattedWeightedGpa : result.formattedGpa)}
            subValue={
              result.errorMessage
                ? undefined
                : hasWeighted
                  ? `Weighted GPA (5.0 scale) | Unweighted: ${result.formattedGpa} (4.0 scale)`
                  : `Standard unweighted 4.0 scale across ${result.totalCredits} total credits`
            }
            secondaryMetrics={
              result.errorMessage
                ? []
                : [
                    {
                      label: hasWeighted ? 'Weighted GPA' : 'Unweighted GPA',
                      value: hasWeighted ? result.formattedWeightedGpa : result.formattedGpa,
                      hint: hasWeighted ? 'Includes AP / Honors' : '4.0 maximum scale',
                    },
                    {
                      label: hasWeighted ? 'Unweighted GPA' : 'Total Credits',
                      value: hasWeighted ? result.formattedGpa : `${result.totalCredits} cr`,
                      hint: hasWeighted ? 'Standard 4.0 scale' : 'Credit hours attempted',
                    },
                    {
                      label: 'Grade Points Earned',
                      value: `${(hasWeighted ? result.totalWeightedGradePoints : result.totalGradePoints).toFixed(2)} pts`,
                      hint: 'Sum of (credits × points)',
                    },
                    {
                      label: 'Courses Included',
                      value: `${result.courseBreakdown.length} Classes`,
                      hint: `${result.totalCredits} total credit hours`,
                    },
                  ]
            }
            calculationSteps={result.calculationSteps}
          />
        </div>
      </div>
    </CalculatorCard>
  );
};
