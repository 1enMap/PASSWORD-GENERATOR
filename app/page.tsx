import PasswordGenerator from '@/components/password-generator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted p-4 md:p-8">
      <div className="mx-auto max-w-3xl">
        <PasswordGenerator />
      </div>
    </main>
  );
}