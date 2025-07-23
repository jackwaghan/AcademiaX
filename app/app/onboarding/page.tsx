import { cookies } from 'next/headers';
import Progress from './progress';
import { redirect } from 'next/navigation';

export const runtime = 'edge';

const Page = async () => {
  const cookieStore = await cookies();
  const onboarding = cookieStore.get('onboarding')?.value;
  if (onboarding === 'true') {
    redirect('/app/timetable');
  }

  return <Progress />;
};

export default Page;
