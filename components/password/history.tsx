"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { usePasswordStorage } from "@/hooks/use-password-storage";
import { formatDate } from "@/lib/utils";

export function History() {
  const { history, clearHistory, addToFavorites } = usePasswordStorage();

  const copyToClipboard = async (password: string) => {
    await navigator.clipboard.writeText(password);
    toast.success("Password copied to clipboard");
  };

  if (history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Password History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">No passwords in history</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Password History</CardTitle>
        <Button variant="destructive" size="sm" onClick={clearHistory}>
          <Trash2 className="mr-2 h-4 w-4" /> Clear History
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.map((entry, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="space-y-1">
                <p className="font-mono">{entry.password}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(entry.timestamp)}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(entry.password)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => addToFavorites(entry.password)}
                >
                  <Star className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}