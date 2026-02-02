import ExperienceTimeline from '@/components/ExperienceTimeline';
import EducationSection from '@/components/EducationSection';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

export const metadata = {
  title: 'Career & Experience | Aneel Kumar - Senior Frontend Engineer',
  description: '7+ years of professional frontend development experience. View my complete career timeline, education, and professional journey.',
};

export default function CareerPage() {
  return (
    <main className="min-h-screen">
      <ExperienceTimeline />
      <EducationSection />
      <Contact />
      <Footer />
    </main>
  );
}
