"use server";

import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";

// 1. Announcements (Events) Actions
export const addEventAction = async (title: string, desc: string, date: string, img?: string) => {
  try {
    await prisma.event.create({
      data: {
        title,
        desc,
        date,
        img: img || null 
      },
    });
    revalidatePath("/"); 
    revalidatePath("/principal/admin");
    return { success: true };
  } catch (error) {
    console.error("Error adding event:", error);
    return { success: false };
  }
};

export const deleteEventAction = async (id: number) => {
  try {
    await prisma.event.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/principal/admin");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// 2. Notifications (Live News) Actions
export const addNotificationAction = async (text: string) => {
  try {
    await prisma.notification.create({ data: { text } });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

export const deleteNotificationAction = async (id: number) => {
  try {
    await prisma.notification.delete({ where: { id } });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// 3. Teachers & Students (Person) Actions - YAHAN MASLA THA
export const addPersonAction = async (name: string, subGrade: string, phone: string, img: string | undefined | null, role: string) => {
  try {
    if (role === "TEACHER") {
      const email = `${name.replace(/\s+/g, '').toLowerCase()}_${Date.now()}@example.com`;
      await prisma.teacher.create({ 
        data: { name, subject: subGrade, phone, img: img || null, email } 
      });
    } else {
      const roll = `R${Date.now()}`;
      await prisma.student.create({ 
        data: { name, grade: subGrade, phone, img: img || null, roll, batch: "" } 
      });
    }
    revalidatePath("/");
    revalidatePath("/principal/admin");
    return { success: true };
  } catch (error) {
    console.error("Error adding person:", error);
    return { success: false };
  }
};

export const deletePersonAction = async (id: number) => {
  try {
    // Try to delete from teachers, if not found, try students
    await prisma.teacher.delete({ where: { id } }).catch(() => {});
    await prisma.student.delete({ where: { id } }).catch(() => {});
    
    revalidatePath("/");
    revalidatePath("/principal/admin");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};