import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';

export function Skills() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const skillCategories = [
    {
      title: 'Frontend',
      gradient: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'HTML', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Next.js', level: 88 },
        { name: 'CSS', level: 92 },
      ]
    },
    {
      title: 'Backend',
      gradient: 'from-pink-500 to-orange-500',
      skills: [
        { name: 'Python', level: 85 },
        { name: 'SQL', level: 80 },
        { name: 'C', level: 83 },
        { name: 'Java', level: 87 },
      ]
    },
    {
      title: 'Tools & Others',
      gradient: 'from-orange-500 to-yellow-500',
      skills: [
        { name: 'Git', level: 93 },
        { name: 'GitHub', level: 96 },
        { name: 'OpenSSL', level: 75 },
        { name: 'Linux', level: 90 },
      ]
    }
  ];

  return (
    <section id="skills" className="py-32 px-6 bg-gradient-to-b from-[#151515] to-[#1a1a1a]">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl mb-6">
            My <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="bg-[#1f1f1f] rounded-2xl p-8 border border-gray-800"
            >
              <h3 className={`text-2xl mb-8 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                {category.title}
              </h3>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                        className={`h-full bg-gradient-to-r ${category.gradient} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
