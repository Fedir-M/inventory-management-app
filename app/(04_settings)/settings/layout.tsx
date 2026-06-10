import { PageHeader } from '@/components/ui/page-header';
import SettingsSidebarWidget from '@/components/widgets/settings-widget';
import { Settings } from 'lucide-react';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col  gap-8 p-8 max-w-6xl mx-auto">
      <PageHeader
        title="Settings page"
        description="Check, edit and monitor your settings here."
        icon={<Settings size={58} className="text-brand-bg-sideBar" />}
      />

      <div className="flex flex-col md:flex-row gap-8">
        {/* Боковая панель */}
        <aside className="w-full md:w-64 shrink-0">
          <SettingsSidebarWidget />
        </aside>

        {/* Основной контент */}
        <main className="flex-1 bg-white border border-gray-100 rounded-lg p-8 shadow-sm">
          {children}
        </main>
      </div>
    </div>
  );
}
