import ProfessionalSummary from '@/components/ProfessionalSummary';
// import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'About Aneel Kumar | Senior Frontend Engineer',
  description: 'Learn about Aneel Kumar - A passionate Senior Frontend Engineer with 7+ years of experience building exceptional web applications.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <ProfessionalSummary />
      {/* <Projects /> */}
      <Contact />
      <Footer />
    </main>
  );
}
