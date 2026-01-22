"use server";
import { redirect } from "next/navigation";
import {
  getAttendance,
  getCalendar,
  getCourse,
  getMarks,
  getTimetable,
  getUserInfo,
  PasswordInput,
  verifyPassword,
  verifyUser,
  logoutUser,
  getDayOrder,
  verifyCaptcha,
  Captcha,
} from "@jackwaghan/srm-academia-api";

export async function validateUser(email: string) {
  const res = await verifyUser(email);
  return { res };
}

export async function validatePassword({
  digest,
  identifier,
  password,
}: PasswordInput) {
  const res = await verifyPassword({ digest, identifier, password });
  return { res };
}

export async function validateCaptcha(cdigest: string) {
  const res = await verifyCaptcha(cdigest);
  return { res };
}

export async function captchaLogin({
  username,
  cdigest,
  captcha,
}: {
  username: string;
  cdigest: string;
  captcha: string;
}) {
  const res = await Captcha(username, cdigest, captcha);
  return { res };
}

export async function getLogout(cookie: string) {
  const res = await logoutUser(cookie);
  return { res };
}

export async function timetable(cookie: string) {
  const data = await getTimetable(cookie);
  if (data.status === 404) redirect("/auth/logout");
  return { data };
}

export async function attendance(cookie: string) {
  const data = await getAttendance(cookie);
  if (data.status === 404) redirect("/auth/logout");
  return { data };
}

export async function marks(cookie: string) {
  const data = await getMarks(cookie);
  if (data.status === 404) redirect("/auth/logout");
  return { data };
}

export async function Calendar(cookie: string) {
  const data = await getCalendar(cookie);
  if (data.status === 404) redirect("/auth/logout");
  return { data };
}

export async function Course(cookie: string) {
  const data = await getCourse(cookie);
  if (data.status === 404) redirect("/auth/logout");
  return { data };
}

export async function userInfo(cookie: string) {
  const data = await getUserInfo(cookie);
  if (data.status === 404) redirect("/auth/logout");
  return { data };
}

export async function dayOrder(cookie: string) {
  const data = await getDayOrder(cookie);
  if (data.status === 404) redirect("/auth/logout");
  return { data };
}
