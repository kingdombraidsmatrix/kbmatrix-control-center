import { ArrowLeft } from 'lucide-react';
import { Link, useRouter } from '@tanstack/react-router';
import { useCallback } from 'react';
import type { MouseEventHandler } from 'react';
import type { LinkProps } from '@tanstack/react-router';
import { Button } from '@/components/ui/button.tsx';

interface BackButtonProps {
  to?: LinkProps['to'];
  onClick?: () => void;
}
export function BackButton({ to, onClick }: BackButtonProps) {
  const { history } = useRouter();

  const handleClick: MouseEventHandler<HTMLAnchorElement> = useCallback(
    (event) => {
      if (to) return;

      event.preventDefault();
      onClick ? onClick() : history.back();
    },
    [to, onClick, history],
  );

  return (
    <Button size="icon" variant="ghost">
      <Link to={to} onClick={handleClick}>
        <ArrowLeft />
      </Link>
    </Button>
  );
}
