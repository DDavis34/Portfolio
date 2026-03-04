import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <div className="w-full min-h-screen bg-[#1a1a1a] overflow-x-hidden text-white">
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
}

export default App;
