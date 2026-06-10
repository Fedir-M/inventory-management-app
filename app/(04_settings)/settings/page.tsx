import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { Lock, Settings, User } from 'lucide-react';

export default async function SettingsPage() {
  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="Settings page"
        description="Manage your account preferences and profile."
        icon={<Settings size={58} className="text-brand-bg-sideBar" />}
      />

      <div className="grid gap-6">
        {/* Секция профиля */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="size-5" /> Profile
            </CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Здесь будет форма редактирования профиля */}
            <p className="text-sm text-gray-500">
              Coming soon: Profile edit form
            </p>
          </CardContent>
        </Card>

        {/* Секция безопасности */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="size-5" /> Security
            </CardTitle>
            <CardDescription>
              Manage your password and authentication.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Coming soon: Password change form
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
