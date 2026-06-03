import { TSession } from '@/components/widgets/sidebar-widget';

interface ISidebarProfileProps {
  session: TSession | null;
}

export function SidebarProfile({ session }: ISidebarProfileProps) {
  if (!session) return null;

  const initials = session.user.name
    ? session.user.name.charAt(0).toUpperCase()
    : '?';

  return (
    <div className="flex items-center gap-3 bg-brand-accent-hover p-2 rounded-xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-center  bg-brand-dark w-12 h-12 rounded-full p-3  text-brand-light font-bold text-[22px] text-center ">
        {initials}
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-bold">{session.user.name}</p>
        <p className="text-brand-light">{session.user.email}</p>
      </div>
    </div>
  );
}
