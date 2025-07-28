interface AttendanceStatusType {
  status: 'required' | 'margin';
  classes: number;
}

export function attendanceStatus({
  conducted,
  absent,
}: {
  conducted: number;
  absent: number;
}): AttendanceStatusType {
  const target = 0.75;

  if (conducted === 0) {
    return { status: 'required', classes: 1 }; // edge case: no classes yet
  }

  const present = conducted - absent;
  const currentRatio = present / conducted;

  if (currentRatio < target) {
    // Need to find future classes (x) such that (present + x)/(conducted + x) >= target
    const x = Math.ceil((target * conducted - present) / (1 - target));
    return {
      status: 'required',
      classes: x,
    };
  } else {
    // Can skip x future classes: (present)/(conducted + x) >= target
    const x = Math.floor(present / target - conducted);
    return {
      status: 'margin',
      classes: x,
    };
  }
}
