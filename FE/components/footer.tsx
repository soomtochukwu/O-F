"use client"

import { Github, Mail, MapPin, Phone, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"
import Image from "next/image"

// Add type for supported languages
type SupportedLanguage = 'en' | 'yo' | 'ha' | 'ig'

export function Footer() {
  const { language } = useLanguage()
  const t = translations[language as SupportedLanguage] || translations.en
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: "/dashboard", label: t.dashboard || "Dashboard" },
    { href: "/cooperative", label: t.cooperative || "Cooperative" },
    { href: "/marketplace", label: t.marketplace || "Marketplace" },
    { href: "/logistics", label: t.logistics || "Logistics" },
    { href: "/advisory", label: t.advisory || "Advisory" },
  ]

  const supportLinks = [
    { href: "/ussd", label: "USSD Access (*123#)" },
    { href: "tel:+2348000000000", label: "Support Hotline" },
    { href: "mailto:support@obodofarm.com", label: "Email Support" },
    { href: "/help", label: "Help Center" },
  ]

  return (
    <footer className="relative bg-black/95 border-t border-green-500/20 backdrop-blur-xl mt-auto">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 left-1/4 w-40 h-40 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute -top-10 right-1/3 w-32 h-32 bg-green-400/3 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-b from-green-400 to-green-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/30">
                  <Image
                    src="/pendant_logo.svg"
                    alt="ObodoFarm logo"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-green-300 bg-clip-text text-transparent">
                  ObodoFarm
                </h3>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed max-w-md">
                A decentralized cooperative platform empowering African smallholder farmers through blockchain technology, 
                shared resources, and community-driven governance.
              </p>

              {/* GitHub Repository Link */}
              <div className="flex items-center gap-2">
                <Link 
                  href="https://github.com/soomtochukwu/obodofarm-based-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-400/30 rounded-lg text-green-400 text-sm font-medium hover:bg-green-500/20 hover:border-green-400/50 transition-all duration-200 backdrop-blur-sm group"
                >
                  <Github className="w-4 h-4" />
                  <span>View on GitHub</span>
                  <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>

              {/* Contact Information */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 text-green-400" />
                  <span>Lagos, Nigeria</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Phone className="w-4 h-4 text-green-400" />
                  <span>+234 800 000 0000</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Mail className="w-4 h-4 text-green-400" />
                  <span>contact@obodofarm.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-green-400 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
                Support
              </h4>
              <ul className="space-y-2">
                {supportLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-green-400 transition-colors duration-200"
                      {...(link.href.startsWith('http') || link.href.startsWith('tel:') || link.href.startsWith('mailto:') ? {
                        target: '_blank',
                        rel: 'noopener noreferrer'
                      } : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-500/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm text-center sm:text-left">
                © {currentYear} ObodoFarm. All rights reserved. Built with ❤️ for African farmers.
              </div>
              
              <div className="flex items-center gap-6 text-xs text-gray-500">
                <Link href="/privacy" className="hover:text-green-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-green-400 transition-colors">
                  Terms of Service
                </Link>
                <span className="flex items-center gap-1">
                  Powered by 
                  <span className="text-green-400 font-medium">Base Network</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}