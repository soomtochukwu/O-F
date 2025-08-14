"use client"

import { Button } from "@/components/ui/button"
import { LanguageSelector } from "@/components/language-selector"
import { VoiceButton } from "@/components/voice-button"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"
import { LogOut, Menu } from "lucide-react"
import Link from "next/link"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

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

  function handleLogout() {
    localStorage.removeItem("user_session")
    localStorage.removeItem("obodofarm-user")
    window.location.href = "/"
  }

  const navigationItems = [
    { href: "/dashboard", label: "Dashboard" }, // Use hardcoded label since 'dashboard' doesn't exist in translations
    { href: "/cooperative", label: t.cooperative || "Cooperative" },
    { href: "/marketplace", label: t.marketplace || "Marketplace" },
    { href: "/logistics", label: t.logistics || "Logistics" },
    { href: "/payments", label: t.payments || "Payments" },
    { href: "/advisory", label: t.advisory || "Advisory" },
  ]

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">OF</span>
              </div>
              <span className="font-bold text-green-800 text-lg hidden sm:block">
                ObodoFarm
              </span>
            </Link>
            {title && (
              <>
                <span className="text-gray-300 hidden sm:block">|</span>
                <h1 className="text-lg font-semibold text-gray-700 hidden sm:block">{title}</h1>
              </>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-green-600 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <LanguageSelector 
              selectedLanguage={language}
              onLanguageChange={changeLanguage}
            />
            
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
                                className="bg-green-600 hover:bg-green-700 text-white"
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
                                className="hidden md:flex"
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

            <VoiceButton 
              text={title ? `${title}. ${t.welcome} ObodoFarm` : `${t.welcome} ObodoFarm`} 
              language={language as SupportedLanguage}
            />
            
            {showLogout && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-red-600 hover:border-red-300"
              >
                <LogOut className="w-4 h-4" />
                {t.logout}
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>ObodoFarm Menu</SheetTitle>
                  <SheetDescription>
                    Navigate through the app features
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {/* Mobile Wallet Connect */}
                  {showWalletConnect && (
                    <div className="pb-4 border-b">
                      <ConnectButton />
                    </div>
                  )}
                  
                  {/* Mobile Navigation */}
                  <nav className="space-y-2">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                  
                  {/* Mobile Logout */}
                  {showLogout && (
                    <div className="pt-4 border-t">
                      <Button
                        variant="outline"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 text-gray-600 hover:text-red-600 hover:border-red-300"
                      >
                        <LogOut className="w-4 h-4" />
                        {t.logout}
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