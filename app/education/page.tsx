import EducationSection from '@/components/EducationSection';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

export const metadata = {
  title: 'Education & Certifications | Aneel Kumar',
  description: 'Academic background and professional certifications of Aneel Kumar - Senior Frontend Engineer',
};

export default function EducationPage() {
  return (
    <main className="min-h-screen">
      <EducationSection />
      <Contact />
      <Footer />
    </main>
  );
}
