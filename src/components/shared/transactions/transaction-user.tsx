import { Briefcase, User2 } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import type { Stylist, User } from '@/types';

interface TransactionUserProps {
  user?: User;
  stylist?: Stylist;
}
export function TransactionUser({ user, stylist }: TransactionUserProps) {
  if (user) {
    return (
      <p className="flex items-center gap-1 text-sm line-clamp-1">
        <User2 className="size-4" /> <span>{user.fullName}</span>
      </p>
    );
  }

  if (stylist) {
    return (
      <Link
        to="/stylists/$stylistId/{-$tab}/{-$section}"
        params={{ stylistId: stylist.id.toString() }}
        className="hover:underline"
      >
        <p className="flex items-center gap-2 text-sm line-clamp-1">
          <Briefcase className="size-4" /> <span>{stylist.name}</span>
        </p>
      </Link>
    );
  }

  return null;
}
