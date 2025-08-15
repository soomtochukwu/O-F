"use client"

import { Button } from "@/components/ui/button"
import { LanguageSelector } from "@/components/language-selector"
import { VoiceButton } from "@/components/voice-button"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"
import { LogOut, Menu, X, Home, Users, ShoppingCart, Truck, CreditCard, MessageSquare } from "lucide-react"
import Link from "next/link"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import { useState, useEffect } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import { usePathname } from "next/navigation"

interface HeaderProps {
  showWalletConnect?: boolean
  showLogout?: boolean
  title?: string
}

// Add type for supported languages
type SupportedLanguage = 'en' | 'yo' | 'ha' | 'ig'

export function Header({ showWalletConnect = true, showLogout = true, title }: HeaderProps) {
  const { language, changeLanguage } = useLanguage()
  // Type assertion to ensure language is a valid key
  const t = translations[language as SupportedLanguage] || translations.en
  const { isConnected } = useAccount()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  function handleLogout() {
    localStorage.removeItem("user_session")
    localStorage.removeItem("obodofarm-user")
    window.location.href = "/"
  }

  const navigationItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/cooperative", label: t.cooperative || "Cooperative", icon: Users },
    { href: "/marketplace", label: t.marketplace || "Marketplace", icon: ShoppingCart },
    { href: "/logistics", label: t.logistics || "Logistics", icon: Truck },
    { href: "/payments", label: t.payments || "Payments", icon: CreditCard },
    { href: "/advisory", label: t.advisory || "Advisory", icon: MessageSquare },
  ]

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-green-500/20 bg-black/90 backdrop-blur-xl">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-b rounded-lg flex items-center justify-center shadow-lg shadow-green-500/30 flex-shrink-0">
                <Image
                  src={"/pendant_logo.svg"}
                  alt={"obodoFarm logo"}
                  width={300}
                  height={300}
                  className=" sm:w-6 sm:h-6"
                />
              </div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-green-300 bg-clip-text text-transparent tracking-tight truncate">
                ObodoFarm
              </h1>
            </Link>
            {title && (
              <>
                <span className="text-green-500/50 hidden md:block">|</span>
                <h2 className="text-sm sm:text-lg font-semibold text-green-300 hidden md:block truncate">{title}</h2>
              </>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-gray-300 hover:text-green-400 transition-all duration-200 font-medium px-3 py-2 rounded-lg hover:bg-green-500/10 relative ${isActive ? 'text-green-400 bg-green-500/10' : ''
                    }`}
                >
                  {item.label}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-400 rounded-full" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector - Hidden on very small screens */}
            <div className="hidden xs:block">
              <LanguageSelector
                selectedLanguage={language}
                onLanguageChange={changeLanguage}
              />
            </div>

            {/* Desktop Wallet Connect */}
            {showWalletConnect && (
              <div className="hidden sm:block">
                <ConnectButton.Custom>
                  {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    authenticationStatus,
                    mounted,
                  }) => {
                    const ready = mounted && authenticationStatus !== 'loading'
                    const connected =
                      ready &&
                      account &&
                      chain &&
                      (!authenticationStatus ||
                        authenticationStatus === 'authenticated')

                    return (
                      <div
                        {...(!ready && {
                          'aria-hidden': true,
                          'style': {
                            opacity: 0,
                            pointerEvents: 'none',
                            userSelect: 'none',
                          },
                        })}
                      >
                        {(() => {
                          if (!connected) {
                            return (
                              <Button
                                onClick={openConnectModal}
                                className="bg-green-500 hover:bg-green-600 text-black font-bold transition-all duration-200"
                                size="sm"
                              >
                                Connect Wallet
                              </Button>
                            )
                          }

                          if (chain.unsupported) {
                            return (
                              <Button
                                onClick={openChainModal}
                                variant="destructive"
                                size="sm"
                              >
                                Wrong network
                              </Button>
                            )
                          }

                          return (
                            <div className="flex items-center gap-2">
                              <Button
                                onClick={openChainModal}
                                variant="outline"
                                size="sm"
                                className="hidden md:flex border-green-500/60 text-green-400 hover:bg-green-500/10 transition-all duration-200"
                              >
                                {chain.hasIcon && (
                                  <div
                                    style={{
                                      background: chain.iconBackground,
                                      width: 12,
                                      height: 12,
                                      borderRadius: 999,
                                      overflow: 'hidden',
                                      marginRight: 4,
                                    }}
                                  >
                                    {chain.iconUrl && (
                                      <img
                                        alt={chain.name ?? 'Chain icon'}
                                        src={chain.iconUrl}
                                        style={{ width: 12, height: 12 }}
                                      />
                                    )}
                                  </div>
                                )}
                                {chain.name}
                              </Button>

                              <Button
                                onClick={openAccountModal}
                                variant="outline"
                                size="sm"
                                className="border-green-500/60 text-green-400 hover:bg-green-500/10 transition-all duration-200"
                              >
                                {account.displayName}
                                {account.displayBalance
                                  ? ` (${account.displayBalance})`
                                  : ''}
                              </Button>
                            </div>
                          )
                        })()}
                      </div>
                    )
                  }}
                </ConnectButton.Custom>
              </div>
            )}

            {/* Voice Button - Hidden on small screens */}
            <div className="hidden sm:block">
              <VoiceButton
                text={title ? `${title}. ${t.welcome} ObodoFarm` : `${t.welcome} ObodoFarm`}
                language={language as SupportedLanguage}
              />
            </div>

            {/* Desktop Logout */}
            {showLogout && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-2 border-green-500/60 text-green-400 hover:text-red-400 hover:border-red-400/60 transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">{t.logout}</span>
              </Button>
            )}

            {/* Enhanced Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden border-green-500/60 text-green-400 hover:bg-green-500/10 transition-all duration-200 p-2"
                  aria-label="Open navigation menu"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px] sm:w-[350px] bg-black/95 border-green-500/20 backdrop-blur-xl"
              >
                <SheetHeader className="border-b border-green-500/20 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/30">
                      <Image
                        src={"/pendant_logo.svg"}
                        alt={"obodoFarm logo"}
                        width={100}
                        height={100}
                        className="w-5 h-5"
                      />
                    </div>
                    <div>
                      <SheetTitle className="text-white text-lg font-bold bg-gradient-to-r from-white to-green-300 bg-clip-text text-transparent">
                        ObodoFarm
                      </SheetTitle>
                      <SheetDescription className="text-gray-400 text-sm">
                        Navigate through the app features
                      </SheetDescription>
                    </div>
                  </div>
                </SheetHeader>

                <div className="mt-6 space-y-6 flex flex-col h-full">
                  {/* Mobile Language Selector */}
                  <div className="flex items-center justify-between p-3 bg-green-500/5 rounded-lg border border-green-500/20">
                    <span className="text-gray-300 text-sm font-medium">Language</span>
                    <LanguageSelector
                      selectedLanguage={language}
                      onLanguageChange={changeLanguage}
                    />
                  </div>

                  {/* Mobile Wallet Connect */}
                  {showWalletConnect && (
                    <div className="p-3 bg-green-500/5 rounded-lg border border-green-500/20">
                      <div className="text-gray-300 text-sm font-medium mb-3">Wallet Connection</div>
                      <ConnectButton />
                    </div>
                  )}

                  {/* Enhanced Mobile Navigation */}
                  <nav className="space-y-2 flex-1">
                    <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3 px-3">
                      Navigation
                    </div>
                    {navigationItems.map((item) => {
                      const isActive = pathname === item.href
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all duration-200 group ${isActive ? 'text-green-400 bg-green-500/10 border-l-2 border-green-400' : ''
                            }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-green-400' : 'text-gray-400'
                            }`} />
                          <span className="font-medium">{item.label}</span>
                          {isActive && (
                            <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          )}
                        </Link>
                      )
                    })}
                  </nav>

                  {/* Mobile Voice Button */}
                  <div className="p-3 bg-green-500/5 rounded-lg border border-green-500/20">
                    <div className="text-gray-300 text-sm font-medium mb-3">Voice Assistant</div>
                    <VoiceButton
                      text={title ? `${title}. ${t.welcome} ObodoFarm` : `${t.welcome} ObodoFarm`}
                      language={language as SupportedLanguage}
                    />
                  </div>

                  {/* Mobile Logout */}
                  {showLogout && (
                    <div className="border-t border-green-500/20 pt-4 mt-auto">
                      <Button
                        variant="outline"
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 border-green-500/60 text-green-400 hover:text-red-400 hover:border-red-400/60 transition-all duration-200 py-3"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="font-medium">{t.logout}</span>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}