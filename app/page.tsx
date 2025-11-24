import { UploadCard } from '@/components/UploadCard';
import { ParticleBackground } from '@/components/ParticleBackground';

export default function Home() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-krishna-blue via-slate-900 to-black p-4 sm:p-8 relative overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10 w-full">
        <UploadCard />
      </div>
    </main>
  );
}
