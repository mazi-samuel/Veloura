'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const TeamSection = () => {
  const team = [
    {
      name: 'Sofia Chen',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b29c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Former beauty executive with 15 years of experience in luxury cosmetics. Sofia founded Veloura with a vision to revolutionize the lip gloss industry.',
      linkedin: '#'
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Head of Product Development',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Cosmetic chemist with a PhD in Materials Science. Emily leads our innovative formula development and ensures every product meets our luxury standards.',
      linkedin: '#'
    },
    {
      name: 'Marcus Thompson',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Award-winning designer who brings Veloura\'s luxury aesthetic to life. Marcus oversees all visual elements from packaging to digital experiences.',
      linkedin: '#'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-veloura-burgundy mb-6">
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The passionate individuals behind Veloura's success. Our diverse team brings together 
            expertise in beauty, science, design, and customer experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group text-center"
            >
              <div className="relative mb-6">
                <div className="relative h-80 w-80 mx-auto rounded-2xl overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-veloura-burgundy/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <h3 className="text-xl font-serif font-semibold text-veloura-burgundy mb-2">
                {member.name}
              </h3>

              <p className="text-veloura-gold font-medium mb-4">
                {member.role}
              </p>

              <p className="text-gray-600 leading-relaxed mb-6">
                {member.bio}
              </p>

              <a
                href={member.linkedin}
                className="inline-flex items-center text-veloura-burgundy hover:text-veloura-burgundy-light transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Connect on LinkedIn
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 bg-veloura-blush/30 rounded-2xl p-12"
        >
          <h3 className="text-2xl font-serif font-bold text-veloura-burgundy mb-6">
            Join Our Team
          </h3>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            We're always looking for passionate individuals who share our vision of luxury beauty. 
            Explore career opportunities and become part of the Veloura family.
          </p>
          <button className="btn-primary">
            View Open Positions
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default TeamSection
