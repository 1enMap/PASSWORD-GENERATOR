"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, RefreshCw, Star } from "lucide-react";
import { toast } from "sonner";
import { usePasswordStorage } from "@/hooks/use-password-storage";
import { calculatePasswordStrength } from "@/lib/password-utils";

export function Generator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: false,
  });
  const [customChars, setCustomChars] = useState("");
  const [password, setPassword] = useState("");
  const { addToHistory, addToFavorites } = usePasswordStorage();

  const generatePassword = () => {
    let chars = "";
    if (customChars) {
      chars = customChars;
    } else {
      if (options.uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if (options.lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
      if (options.numbers) chars += "0123456789";
      if (options.symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
      if (options.excludeSimilar) {
        chars = chars.replace(/[iIlL1oO0]/g, "");
      }
    }

    if (!chars) {
      toast.error("Please select at least one character type");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
    addToHistory(newPassword);
  };

  const copyToClipboard = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    toast.success("Password copied to clipboard");
  };

  const strength = calculatePasswordStrength(password);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Password</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Password Length: {length}</Label>
          </div>
          <Slider
            value={[length]}
            onValueChange={([value]) => setLength(value)}
            min={6}
            max={32}
            step={1}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="uppercase">Uppercase Letters</Label>
            <Switch
              id="uppercase"
              checked={options.uppercase}
              onCheckedChange={(checked) =>
                setOptions((prev) => ({ ...prev, uppercase: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="lowercase">Lowercase Letters</Label>
            <Switch
              id="lowercase"
              checked={options.lowercase}
              onCheckedChange={(checked) =>
                setOptions((prev) => ({ ...prev, lowercase: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="numbers">Numbers</Label>
            <Switch
              id="numbers"
              checked={options.numbers}
              onCheckedChange={(checked) =>
                setOptions((prev) => ({ ...prev, numbers: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="symbols">Special Characters</Label>
            <Switch
              id="symbols"
              checked={options.symbols}
              onCheckedChange={(checked) =>
                setOptions((prev) => ({ ...prev, symbols: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="excludeSimilar">Exclude Similar Characters</Label>
            <Switch
              id="excludeSimilar"
              checked={options.excludeSimilar}
              onCheckedChange={(checked) =>
                setOptions((prev) => ({ ...prev, excludeSimilar: checked }))
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="customChars">Custom Characters (Optional)</Label>
          <Input
            id="customChars"
            value={customChars}
            onChange={(e) => setCustomChars(e.target.value)}
            placeholder="Enter custom characters"
          />
        </div>

        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input value={password} readOnly placeholder="Generated password" />
            <Button variant="outline" size="icon" onClick={copyToClipboard}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => addToFavorites(password)}>
              <Star className="h-4 w-4" />
            </Button>
          </div>

          {password && (
            <Alert>
              <AlertDescription>
                Password Strength: {strength.label}
                <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${strength.score * 25}%` }}
                  />
                </div>
              </AlertDescription>
            </Alert>
          )}

          <Button onClick={generatePassword} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" /> Generate Password
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}