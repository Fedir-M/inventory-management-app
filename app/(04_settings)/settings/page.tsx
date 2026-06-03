import { PageHeader } from '@/components/ui/page-header';
import { Settings } from 'lucide-react';

export default async function SettingsPage() {
  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="Settings page"
        description="Check, edit and monitor yor settings here."
        icon={<Settings size={58} className="text-brand-bg-sideBar" />}
      />
    </div>
  );
}
