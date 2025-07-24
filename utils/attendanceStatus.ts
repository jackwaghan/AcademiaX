interface AttendanceStatusType {
  status: 'required' | 'margin';
  classes: number;
}

export function attendanceStatus(
  conducted: number,
  absent: number,
  targetPercent = 75,
): AttendanceStatusType {
  const present = conducted - absent;
  const targetDecimal = targetPercent / 100;
  const currentPercent = (present / conducted) * 100;

  if (currentPercent < targetPercent) {
    // You are below target — calculate how many more classes needed
    const numerator = targetDecimal * conducted - present;
    const denominator = 1 - targetDecimal;
    const required = Math.ceil(numerator / denominator);
    return {
      status: 'required',
      classes: required,
    };
  } else {
    // You are at or above target — calculate margin (how many can skip)
    const margin = Math.floor(
      (present - targetDecimal * conducted) / targetDecimal,
    );
    return {
      status: 'margin',
      classes: margin,
    };
  }
}
