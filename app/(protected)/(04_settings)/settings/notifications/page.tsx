// app/(04_settings)/settings/notifications/page.tsx
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function NotificationsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Notifications</h2>
        <p className="text-sm text-gray-500 mt-1">
          Configure how you receive updates and alerts.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <div>
            <Label className="text-base font-medium">Email Notifications</Label>
            <p className="text-sm text-gray-500">
              Receive daily summary of your inventory activity.
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <div>
            <Label className="text-base font-medium">Low Stock Alerts</Label>
            <p className="text-sm text-gray-500">
              Get notified when stock levels fall below thresholds.
            </p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>
    </div>
  );
}
