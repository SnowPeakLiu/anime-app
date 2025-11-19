'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

type UserSession = {
  username: string;
  jobTitle: string;
};

const USER_SESSION_COOKIE = 'user_session';

export async function saveUserInfo(formData: FormData) {
  const username = String(formData.get('username') ?? '').trim();
  const jobTitle = String(formData.get('jobTitle') ?? '').trim();

  if (!username || !jobTitle) {
    return;
  }

  const user: UserSession = { username, jobTitle };

  const cookieStore = await cookies();

  cookieStore.set(USER_SESSION_COOKIE, JSON.stringify(user), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  revalidatePath('/');
}


