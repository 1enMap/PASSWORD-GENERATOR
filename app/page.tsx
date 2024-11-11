"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Generator } from "@/components/password/generator";
import { History } from "@/components/password/history";
import { Favorites } from "@/components/password/favorites";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="min-h-screen bg-background p-4 md:p-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-4xl font-bold tracking-tight">Password Generator</h1>
            <p className="text-muted-foreground">Generate secure, customizable passwords instantly</p>
          </div>

          <Tabs defaultValue="generator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="generator">Generator</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>
            <TabsContent value="generator">
              <Generator />
            </TabsContent>
            <TabsContent value="history">
              <History />
            </TabsContent>
            <TabsContent value="favorites">
              <Favorites />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Toaster />
    </ThemeProvider>
  );
}