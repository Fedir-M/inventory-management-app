import { Monitor, X, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SettingsSessionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">My Sessions</h2>
        <p className="text-sm text-gray-500">
          These are devices where you are currently logged in. <br />
          You can revoke access to end a session.
        </p>
      </div>

      <div className="border border-gray-200 rounded-lg">
        {/* Строка сессии */}
        <div className="flex items-center justify-between p-4 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gray-50 rounded-md border border-gray-100">
              <Monitor className="size-5 text-gray-500" />
            </div>
            <div>
              <div className="font-medium text-gray-900">Current Session</div>
              <div className="text-sm text-gray-500">Signed in 6/10/2026</div>
            </div>
          </div>

          <div className="flex items-center gap-8 text-sm text-gray-600">
            <span>46.205.198.77</span>
            <span>Warsaw</span>
            <span>3 minutes ago</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <X size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreHorizontal size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
