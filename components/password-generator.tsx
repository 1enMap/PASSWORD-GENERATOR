'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import GeneratorTab from './tabs/generator-tab';
import HistoryTab from './tabs/history-tab';
import FavoritesTab from './tabs/favorites-tab';
import { usePasswordState } from '@/hooks/use-password-state';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';

export default function PasswordGenerator() {
  const [activeTab, setActiveTab] = useState('generator');
  const passwordState = usePasswordState();
  const { toast } = useToast();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'Copied to clipboard',
        description: 'Password has been copied to your clipboard.',
      });
    } catch (err) {
      toast({
        title: 'Failed to copy',
        description: 'Could not copy password to clipboard.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="p-6 shadow-xl">
      <h1 className="text-3xl font-bold text-center mb-6">Password Generator</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full mb-6">
          <TabsTrigger value="generator">Generator</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="generator">
          <GeneratorTab
            passwordState={passwordState}
            onCopy={copyToClipboard}
          />
        </TabsContent>

        <TabsContent value="history">
          <HistoryTab
            passwords={passwordState.state.history}
            favorites={passwordState.state.favorites}
            onCopy={copyToClipboard}
            onToggleFavorite={passwordState.toggleFavorite}
            onClear={passwordState.clearHistory}
          />
        </TabsContent>

        <TabsContent value="favorites">
          <FavoritesTab
            passwords={passwordState.state.favorites}
            onCopy={copyToClipboard}
            onToggleFavorite={passwordState.toggleFavorite}
            onClear={passwordState.clearFavorites}
          />
        </TabsContent>
      </Tabs>

      <Toaster />
    </Card>
  );
}