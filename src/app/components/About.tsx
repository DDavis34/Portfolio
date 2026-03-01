import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { Brain, Palette, Gamepad2 } from 'lucide-react';

export function About() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const experiences = [
    {
      icon: Brain,
      title: 'Neuroimaging Research',
      description: 'Conducting thorough quality control and analysis on brain scans using FreeSurfer',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Palette,
      title: 'Creative Design',
      description: 'Crafting clean, intuitive user interfaces with a focus on user experience and visual appeal',
      color: 'from-pink-500 to-orange-500'
    },
    {
      icon: Gamepad2,
      title: 'Game Development',
      description: 'Developing engaging and interactive games using modern game engines and frameworks',
      color: 'from-orange-500 to-yellow-500'
    }
  ];

  return (
    <>
      <section id="about" className="py-32 px-6 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl mb-6">
              About <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            {/* INSTAGRAM EMBED SECTION */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full flex justify-center"
            >
              <div className="relative w-full max-w-[450px] h-[550px] rounded-3xl overflow-hidden group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition duration-300" />
                <iframe
                  className="relative z-10 w-full h-full rounded-3xl bg-white"
                  src="https://www.instagram.com/p/DSThv24jLDZ/embed"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency={true}
                ></iframe>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-400 leading-relaxed">
                Hi, I am Dillon, a student at Louisiana State University majoring in Computer Science. With a passion for technology and a drive to create impactful solutions, I have been honing my skills in software architecture and systems design.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
               "I love turning complex problems into clean, working software. When I'm away from the keyboard, I'm usually unwinding with my favorite video games or studying up on new strategies to improve my chess game."
              </p>
            </motion.div> 
          </div>
        </div>
      </section>

      <section id="experience" className="py-32 px-6 bg-gradient-to-b from-[#1a1a1a] to-[#151515]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl mb-6 text-white">
              Work & <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Research</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto" />
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur transition duration-300" 
                     style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }} />
                <div className="relative bg-[#1f1f1f] p-8 rounded-2xl border border-gray-800 hover:border-transparent transition-all duration-300 h-full">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${experience.color} flex items-center justify-center mb-6`}>
                    <experience.icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl mb-4 text-white">{experience.title}</h3>
                  <p className="text-gray-400">{experience.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}