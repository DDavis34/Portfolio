import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { ExternalLink, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Projects() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured online shopping experience with payment integration, real-time inventory, and advanced search capabilities.',
      image: 'https://images.unsplash.com/photo-1759322945173-76b604965b2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb2RpbmclMjBzZXR1cHxlbnwxfHx8fDE3NzE5MjczODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates, team chat, and advanced analytics dashboard.',
      image: 'https://images.unsplash.com/photo-1771189255245-225dcea3f652?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMHByb2plY3R8ZW58MXx8fHwxNzcxOTIxNzkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['TypeScript', 'React', 'Firebase', 'Tailwind'],
      gradient: 'from-pink-500 to-orange-500'
    },
    {
      title: 'AI Content Generator',
      description: 'Intelligent content creation platform powered by machine learning for automated marketing copy and social media posts.',
      image: 'https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzcxOTU5NTIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      tags: ['Next.js', 'OpenAI', 'PostgreSQL', 'Vercel'],
      gradient: 'from-orange-500 to-yellow-500'
    }
  ];

  return (
    <section id="projects" className="py-32 px-6 bg-[#1a1a1a]">
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
                        className="px-3 py-1 text-sm bg-gray-800 rounded-full text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${project.gradient} text-white hover:shadow-lg transition-all duration-300`}>
                      <ExternalLink size={18} />
                      <span>Live Demo</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300">
                      <Github size={18} />
                      <span>Code</span>
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
