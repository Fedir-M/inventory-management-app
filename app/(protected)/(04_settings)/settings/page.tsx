import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/app/lib/auth';

export default async function MyProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/sign-in');
  }

  const { user } = session;
  const initials = user.name ? user.name.charAt(0).toUpperCase() : '?';

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">My Profile</h2>
      </div>

      <div className="space-y-6">
        {/* ----- user's name ----- */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <div>
            <div className="font-medium text-gray-900">User name</div>
            <p className="text-sm text-gray-500">This is a display name</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{user.name}</span>
            <Button variant="ghost" size="icon">
              <Pencil className="size-4" />
            </Button>
          </div>
        </div>

        {/* ----- Avatar ----- */}
        <div className="flex items-center justify-between py-4">
          <div>
            <div className="font-medium text-gray-900">Profile image</div>
            <p className="text-sm text-gray-500">
              Upload your own image as your avatar
            </p>
          </div>

          <Avatar
            size="lg"
            className="size-12 shrink-0 aspect-square border-none"
          >
            {user.image && (
              <AvatarImage
                src={user.image}
                alt={user.name || 'User'}
                className="size-full object-cover"
              />
            )}
            <AvatarFallback className="bg-brand-dark text-brand-light font-bold text-[20px] m-0">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
