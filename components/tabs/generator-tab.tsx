'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, RefreshCw } from 'lucide-react';
import { Password } from '@/lib/types';
import PasswordStrength from '../password-strength';

interface GeneratorTabProps {
  passwordState: any;
  onCopy: (text: string) => void;
}

export default function GeneratorTab({ passwordState, onCopy }: GeneratorTabProps) {
  const { state, currentPassword, generateNewPassword, updateOptions } = passwordState;
  const { options } = state;

  return (
    <div className="space-y-6">
      <div className="relative">
        <Input
          value={currentPassword?.value || ''}
          readOnly
          className="pr-24 text-lg font-mono"
          placeholder="Click generate to create password"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => currentPassword && onCopy(currentPassword.value)}
            disabled={!currentPassword}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button size="icon" onClick={generateNewPassword}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {currentPassword && (
        <PasswordStrength strength={currentPassword.strength} />
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Password Length: {options.length}</Label>
          </div>
          <Slider
            value={[options.length]}
            onValueChange={([value]) => updateOptions({ length: value })}
            min={6}
            max={32}
            step={1}
          />
        </div>

        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="uppercase">Uppercase Letters (A-Z)</Label>
            <Switch
              id="uppercase"
              checked={options.uppercase}
              onCheckedChange={(checked) => updateOptions({ uppercase: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="lowercase">Lowercase Letters (a-z)</Label>
            <Switch
              id="lowercase"
              checked={options.lowercase}
              onCheckedChange={(checked) => updateOptions({ lowercase: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="numbers">Numbers (0-9)</Label>
            <Switch
              id="numbers"
              checked={options.numbers}
              onCheckedChange={(checked) => updateOptions({ numbers: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="special">Special Characters (!@#$%^&*)</Label>
            <Switch
              id="special"
              checked={options.special}
              onCheckedChange={(checked) => updateOptions({ special: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="excludeSimilar">Exclude Similar Characters</Label>
            <Switch
              id="excludeSimilar"
              checked={options.excludeSimilar}
              onCheckedChange={(checked) => updateOptions({ excludeSimilar: checked })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="custom">Custom Characters</Label>
          <Input
            id="custom"
            value={options.customCharacters}
            onChange={(e) => updateOptions({ customCharacters: e.target.value })}
            placeholder="Add your own characters"
          />
        </div>
      </div>
    </div>
  );
}