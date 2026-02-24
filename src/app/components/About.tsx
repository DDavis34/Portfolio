import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { Code2, Palette, Zap } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function About() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const features = [
    {
      icon: Code2,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable code that stands the test of time',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Palette,
      title: 'Creative Design',
      description: 'Crafting beautiful interfaces that users love to interact with',
      color: 'from-pink-500 to-orange-500'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Building lightning-fast applications optimized for the best UX',
      color: 'from-orange-500 to-yellow-500'
    }
  ];

  return (
    <section id="about" className="py-32 px-6 bg-gradient-to-b from-[#1a1a1a] to-[#151515]">
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
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition duration-300" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzcxOTU5NTIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Professional workspace"
                className="relative rounded-2xl w-full object-cover aspect-square"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-400 leading-relaxed">
              I'm a passionate developer and designer with over 5 years of experience creating digital experiences that make a difference. My journey started with a curiosity for how things work and evolved into a career building innovative solutions.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              I specialize in modern web technologies and love bringing ideas to life through clean code and thoughtful design. When I'm not coding, you'll find me exploring new technologies, contributing to open source, or capturing moments through photography.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur transition duration-300" 
                   style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }} />
              <div className="relative bg-[#1f1f1f] p-8 rounded-2xl border border-gray-800 hover:border-transparent transition-all duration-300">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon size={32} className="text-white" />
                </div>
                <h3 className="text-2xl mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
