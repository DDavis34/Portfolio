import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { Mail, MapPin, Github, Linkedin, Crown } from 'lucide-react';
import { ChessBoard } from './ChessBoard';

export function Contact() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'dillon.davis.34@outlook.com',
      link: 'mailto:dillon.davis.34@outlook.com',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/DDavis34',
      link: 'https://github.com/DDavis34',
      gradient: 'from-pink-500 to-orange-500'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect with me',
      link: 'https://linkedin.com/in/your-profile-url', // Make sure to drop your link here!
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Crown,
      label: 'Chess.com',
      value: 'Try and beat the best',
      link: 'https://www.chess.com/member/DillonD34', 
      gradient: 'from-emerald-400 to-emerald-600'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Baton Rouge, LA',
      link: null,
      gradient: 'from-orange-500 to-yellow-500'
    }
  ];

  return (
    <section id="contact" className="py-20 md:py-32 px-4 md:px-6 bg-[#1a1a1a] w-full overflow-hidden">
      <div className="max-w-7xl mx-auto w-full" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-6xl mb-6">
            Get In <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 mx-auto mb-6" />
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Have a project in mind? Let's work together to create something amazing!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 w-full"
          >
            <h3 className="text-2xl md:text-3xl text-white mb-6 md:mb-8 text-center lg:text-left">Let's talk about your project</h3>
            
            <div className="space-y-4 md:space-y-6">
              {contactInfo.map((info, index) => (
                <div key={info.label} className="flex items-center gap-4 group w-full">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <info.icon size={20} className="text-white md:w-6 md:h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-500 text-xs md:text-sm">{info.label}</p>
                    {info.link ? (
                      <a href={info.link} target="_blank" rel="noopener noreferrer" className="text-white text-base md:text-lg hover:text-pink-400 transition-colors truncate block">
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-white text-base md:text-lg truncate">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center w-full max-w-full overflow-hidden px-2"
          >
            <ChessBoard />
          </motion.div>
        </div>

        <div className="mt-16 text-center text-gray-500 border-t border-gray-800 pt-8 space-y-2">
          <p className="text-sm md:text-base">© 2026 Dillon Davis. All Rights Reserved to ME!</p>
          <p className="text-xs md:text-sm">Last Updated: February 28, 2026</p> 
        </div>
      </div>
    </section>
  );
}