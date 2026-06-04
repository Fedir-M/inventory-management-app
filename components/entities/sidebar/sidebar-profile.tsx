import { TSession } from '@/components/widgets/sidebar-widget';

interface ISidebarProfileProps {
  session: TSession | null;
  isOpen: boolean;
  className?: string;
}

export function SidebarProfile({
  session,
  className,
  isOpen,
}: ISidebarProfileProps) {
  if (!session) return null;

  const initials = session.user.name
    ? session.user.name.charAt(0).toUpperCase()
    : '?';

  return (
    <div
      className={`flex items-center gap-3 bg-brand-accent-hover p-2 rounded-xl shadow-sm overflow-hidden
        ${isOpen ? 'bg-brand-accent-hover' : 'bg-transparent shadow-none'}
        transition-all duration-300 ${
          !isOpen ? 'justify-center p-2' : 'justify-start'
        } ${className}`}
    >
      <div
        className={`flex items-center justify-center bg-brand-dark rounded-full text-center text-brand-light font-bold transition-all duration-300
    ${isOpen ? 'w-12 h-12 text-[22px] p-3' : 'w-10 h-10 text-[20px] p-1'}
    shrink-0`}
      >
        {initials}
      </div>
      {isOpen && (
        <div className="flex flex-col gap-1 transition-opacity duration-300">
          <p className="font-bold whitespace-nowrap">{session.user.name}</p>
          <p className="text-brand-light text-xs whitespace-nowrap">
            {session.user.email}
          </p>
        </div>
      )}
    </div>
  );
}
