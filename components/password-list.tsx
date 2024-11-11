'use client';

import { Password } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { Copy, Star, StarOff } from 'lucide-react';
import { Button } from './ui/button';
import PasswordStrength from './password-strength';

interface PasswordListProps {
  passwords: Password[];
  favorites: Password[];
  onCopy: (text: string) => void;
  onToggleFavorite: (password: Password) => void;
}

export default function PasswordList({
  passwords,
  favorites,
  onCopy,
  onToggleFavorite,
}: PasswordListProps) {
  return (
    <div className="space-y-4">
      {passwords.map((password) => {
        const isFavorite = favorites.some((p) => p.id === password.id);
        
        return (
          <div
            key={password.id}
            className="p-4 rounded-lg border bg-card text-card-foreground"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1 flex-1">
                <p className="font-mono break-all">{password.value}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(password.timestamp, { addSuffix: true })}
                </p>
                <PasswordStrength strength={password.strength} />
              </div>
              
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onCopy(password.value)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onToggleFavorite(password)}
                >
                  {isFavorite ? (
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ) : (
                    <StarOff className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}