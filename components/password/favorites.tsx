"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { usePasswordStorage } from "@/hooks/use-password-storage";
import { formatDate } from "@/lib/utils";

export function Favorites() {
  const { favorites, clearFavorites, removeFromFavorites } = usePasswordStorage();

  const copyToClipboard = async (password: string) => {
    await navigator.clipboard.writeText(password);
    toast.success("Password copied to clipboard");
  };

  if (favorites.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Favorite Passwords</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">No favorite passwords</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Favorite Passwords</CardTitle>
        <Button variant="destructive" size="sm" onClick={clearFavorites}>
          <Trash2 className="mr-2 h-4 w-4" /> Clear Favorites
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {favorites.map((entry, index) => (
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
                  onClick={() => removeFromFavorites(entry.password)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}