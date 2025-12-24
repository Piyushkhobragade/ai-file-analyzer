import { UploadCard } from '@/components/UploadCard';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-krishna-blue via-slate-900 to-black dark:from-krishna-blue dark:via-slate-900 dark:to-black relative overflow-hidden transition-colors duration-300">
      <Header />
      <ParticleBackground />

      <main className="flex-1 w-full flex items-center justify-center p-4 sm:p-8">
        <div className="relative z-10 w-full">
          <UploadCard />
        </div>
      </main>

      <Footer />
    </div>
  );
}
