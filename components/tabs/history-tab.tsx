'use client';

import { Password } from '@/lib/types';
import PasswordList from '../password-list';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface HistoryTabProps {
  passwords: Password[];
  favorites: Password[];
  onCopy: (text: string) => void;
  onToggleFavorite: (password: Password) => void;
  onClear: () => void;
}

export default function HistoryTab({
  passwords,
  favorites,
  onCopy,
  onToggleFavorite,
  onClear,
}: HistoryTabProps) {
  if (passwords.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No password history yet. Generate some passwords to see them here.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Recent Passwords</h2>
        <Button
          variant="destructive"
          size="sm"
          onClick={onClear}
          className="flex items-center gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Clear History
        </Button>
      </div>
      
      <PasswordList
        passwords={passwords}
        favorites={favorites}
        onCopy={onCopy}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
}