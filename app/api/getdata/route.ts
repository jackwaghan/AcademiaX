import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { verifyToken } from "@/lib/jwt";

export async function GET() {
  const token = (await cookies()).get("token")?.value as string | undefined;
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const NewVersion = "v1.0.2";
  try {
    const decode = await verifyToken(token);
    if (
      !decode ||
      typeof decode !== "object" ||
      !("email" in decode) ||
      !("token" in decode) ||
      !("uuid" in decode)
    ) {
      return NextResponse.json({ error: "JWT decode Error" }, { status: 402 });
    }
    const email = decode.email;
    const uuid = decode.uuid;

    const supabase = await createClient();

    const { data: students, error } = await supabase
      .from("session")
      .select("*")
      .eq("email", email)
      .eq("user_id", uuid)
      .single();

    if (error || !students) {
      console.log(error, students);
      return NextResponse.json({ error: "Session Not Found" }, { status: 403 });
    }

    const [user, marks, timetable, attendance, dayorder] = await Promise.all([
      getUser(students.session_cookie),
      getMark(students.session_cookie),
      getTimetable(students.session_cookie),
      getAttendance(students.session_cookie),
      getDayOrder(students.session_cookie),
    ]);

    return NextResponse.json(
      {
        user,
        marks,
        attendance,
        timetable,
        dayorder,
        NewVersion,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

async function getUser(cookie: string) {
  const user = await fetch("https://www.acadia.asia/api/user", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      pragma: "no-cache",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      cookie: `token=${cookie}`,
      Referer: "https://www.acadia.asia/user",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: null,
    method: "GET",
  }).then((res) => res.json());
  if (user.error) return NextResponse.json(user, { status: 400 });
  return user;
}

async function getMark(cookie: string) {
  const marks = await fetch("https://www.acadia.asia/api/mark", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      pragma: "no-cache",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      cookie: `token=${cookie}`,
      Referer: "https://www.acadia.asia/mark",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: null,
    method: "GET",
  }).then((res) => res.json());
  if (marks.error) return NextResponse.json(marks, { status: 400 });
  return marks;
}

async function getTimetable(cookie: string) {
  const timetable = await fetch("https://www.acadia.asia/api/timetable", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      pragma: "no-cache",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      cookie: `token=${cookie}`,
      Referer: "https://www.acadia.asia/timetable",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: null,
    method: "GET",
  }).then((res) => res.json());

  if (timetable.error) {
    console.log(timetable.error);
    return NextResponse.json(timetable, { status: 400 });
  }
  return timetable;
}

async function getAttendance(cookie: string) {
  const attendance = await fetch("https://www.acadia.asia/api/attendance", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      pragma: "no-cache",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      cookie: `token=${cookie}`,
      Referer: "https://www.acadia.asia/attendance",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: null,
    method: "GET",
  }).then((res) => res.json());
  if (attendance.error) return NextResponse.json(attendance, { status: 400 });
  return attendance;
}

async function getDayOrder(cookie: string) {
  const dayorder = await fetch("https://www.acadia.asia/api/dayorder", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      pragma: "no-cache",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      cookie: `token=${cookie}`,
      Referer: "https://www.acadia.asia/timetable",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: null,
    method: "GET",
  }).then((res) => res.json());
  if (dayorder.error) return NextResponse.json(dayorder, { status: 400 });
  return dayorder;
}
