import { Grade } from "@/Types/type";

export function predictMarks(internalMarks: number, grade: Grade) {
  // Corrected grade thresholds (out of 100)
  const gradeThresholds: { [key in Grade]: number } = {
    O: 91,
    "A+": 81,
    A: 71,
    "B+": 61,
    B: 56,
    C: 50,
    F: 40,
  };

  // Get required final score for the selected grade
  const requiredFinalScore = gradeThresholds[grade];

  // Calculate required theory marks (out of 75)
  const requiredTheoryMarks = ((requiredFinalScore - internalMarks) * 75) / 40;

  return {
    requiredFinalScore,
    requiredTheoryMarks,
  };
}

export function getGradeThresholds(internalMarks: number): Grade {
  switch (true) {
    case internalMarks >= 91:
      return "O";
    case internalMarks >= 81:
      return "A+";
    case internalMarks >= 71:
      return "A";
    case internalMarks >= 61:
      return "B+";
    case internalMarks >= 56:
      return "B";
    case internalMarks >= 50:
      return "C";
    case internalMarks <= 40:
      return "F";
    default:
      return "O"; // Default case if none of the conditions match
  }
}
