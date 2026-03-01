import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { ExternalLink, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Projects() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const projects = [
    {
      title: 'AI Texas Holdem Bot',
      description: 'Uses hand evaluation, opponent modeling, and ensemble strategies for adaptive real-time tournament play.',
      image: '/public/poker-logo.png',
      tags: ['Python', 'Websockets', 'Docker', 'Go'],
      gradient: 'from-purple-500 to-pink-500',
      githuburl: 'https://github.com/vekovius/AI-Texas-Holdem-CSC4444.git'
    },
    {
      title: 'Tiger Compiler',
      description: 'Built a custom compiler in Java that turns source code into C, handling everything from Lexical analysis to code generation',
      image: '/public/compiler-logo.png',
      tags: ['Java', 'Lex', 'Code Generation', 'C'],
      gradient: 'from-pink-500 to-orange-500',
      githuburl: 'https://github.com/MichaelRdot/Roll-Call.git'
    },
    {
      title: 'Roll Call: PathFinder Adventures',
      description: 'Automates Pathfinder 2e campaigns with real-time character tracking, rule calculations, and API integration.',
      image: '/public/rollcall-logo.png',
      tags: ['In Progress'],
      gradient: 'from-orange-500 to-yellow-500',
      githuburl: 'https://github.com/MichaelRdot/Roll-Call.git'
    }
  ];

  return (
    <section id="projects" className="py-32 px-6 bg-[#151515]">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl mb-6">
            Featured <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-orange-500 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur transition duration-300 rounded-2xl"
                   style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }} />
              <div className="relative bg-[#1f1f1f] rounded-2xl overflow-hidden border border-gray-800 hover:border-transparent transition-all duration-300">
                <div className="relative overflow-hidden aspect-video">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f1f] to-transparent opacity-60" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm rounded-full bg-blue-900/40 text-blue-300 border border-blue-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-center w-full">
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${project.gradient} text-white hover:shadow-lg transition-all duration-300`}>
                      <a href = {project.githuburl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                      >
                      <Github size={18} />
                      <span>Code</span>
                    </a>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
