import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, ShieldAlert, ShieldCheck, ShieldQuestion } from 'lucide-react';

interface PasswordStrengthProps {
  strength: number;
}

export default function PasswordStrength({ strength }: PasswordStrengthProps) {
  const getStrengthInfo = (strength: number) => {
    if (strength >= 80) {
      return {
        label: 'Strong',
        color: 'bg-green-500',
        icon: ShieldCheck,
        description: 'This password is very strong and secure.',
      };
    } else if (strength >= 60) {
      return {
        label: 'Good',
        color: 'bg-blue-500',
        icon: Shield,
        description: 'This password provides good security.',
      };
    } else if (strength >= 40) {
      return {
        label: 'Fair',
        color: 'bg-yellow-500',
        icon: ShieldQuestion,
        description: 'This password could be stronger.',
      };
    } else {
      return {
        label: 'Weak',
        color: 'bg-red-500',
        icon: ShieldAlert,
        description: 'This password is not secure enough.',
      };
    }
  };

  const info = getStrengthInfo(strength);
  const Icon = info.icon;

  return (
    <Alert className="mt-4">
      <Icon className="h-4 w-4" />
      <AlertDescription className="flex items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between mb-2">
            <span className="font-medium">{info.label}</span>
            <span className="text-sm text-muted-foreground">{strength}%</span>
          </div>
          <Progress value={strength} className={info.color} />
        </div>
      </AlertDescription>
    </Alert>
  );
}