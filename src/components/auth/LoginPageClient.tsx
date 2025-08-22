
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Globe, KeyRound, Mail, User, ShieldCheck, Eye, EyeOff, Plane } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

// Inline SVG for Google icon
const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" className="h-5 w-5 mr-2">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
    <path fill="none" d="M0 0h48v48H0z"></path>
  </svg>
);

// Inline SVG for Apple icon
const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2 fill-current">
    <path d="M19.688 18.094c-.69.996-1.594 2.016-2.672 2.016-1.008 0-1.512-.826-2.916-.826-1.404 0-2.016.826-2.988.826-1.008 0-2.05-.984-2.772-2.016C6.94 16.182 6.25 13.086 6.25 10.61c0-3.52 1.766-5.296 3.924-5.296.972 0 2.05.932 2.772.932.648 0 1.834-.932 2.844-.932 2.016 0 3.924 1.688 3.924 5.296 0 .828-.084 1.908-.252 2.844M14.842 3.082c.756-.932 1.368-2.268 1.188-3.072-.9.044-2.062.62-2.772 1.48-.684.86-.936 2.062-.756 2.916.828.12 1.704-.432 2.34-.324"/>
  </svg>
);


export function LoginPageClient() {
  const { getTranslation } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Login attempt:', { email, password });
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Here you would handle actual login logic and potential errors
      // For now, just log and reset
      alert(getTranslation('loginPageLoginAttempt', 'Login functionality to be implemented.'));
    }, 1500);
  };

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    setIsLoading(true);
    console.log(`Login with ${provider}`);
    setTimeout(() => {
      setIsLoading(false);
      alert(getTranslation('loginPageSocialLoginAttempt', `Login with ${provider} to be implemented.`));
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4 relative overflow-hidden">
      {/* Decorative icons updated for the new theme */}
      <div className="absolute top-10 left-10 text-primary/10 animate-pulse">
        <Plane className="h-16 w-16 transform -rotate-45" />
      </div>
      <div className="absolute bottom-10 right-10 text-accent/10 animate-pulse">
        <ShieldCheck className="h-20 w-20 transform rotate-12" />
      </div>
      <div className="absolute top-1/2 left-20 text-primary/5 animate-bounce delay-500">
        <User className="h-12 w-12" />
      </div>


      <div className="w-full max-w-md bg-card/30 backdrop-blur-lg border border-border/20 rounded-2xl shadow-xl p-8 sm:p-10 text-center z-10">
        <Link href="/" className="inline-block mb-8 group">
          <Globe className="h-16 w-16 text-primary mx-auto mb-3 transition-transform group-hover:scale-110 duration-300" />
          <h1 className="text-3xl font-headline font-bold text-foreground transition-colors group-hover:text-primary duration-300">
            trvalr
          </h1>
        </Link>
        <p className="text-muted-foreground mt-2 mb-8">
          {getTranslation('loginPageSubtext', 'Sign in to continue your adventure')}
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2 text-left">
            <Label htmlFor="email" className="text-sm font-medium text-foreground flex items-center">
              <Mail className="h-4 w-4 mr-2 opacity-70" />
              {getTranslation('loginPageEmailLabel', 'Email or Username')}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={getTranslation('loginPageEmailPlaceholder', 'you@example.com')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background/70 border-border/50 focus:border-primary placeholder:text-muted-foreground/80 h-11"
            />
          </div>

          <div className="space-y-2 text-left">
            <Label htmlFor="password" className="text-sm font-medium text-foreground flex items-center">
              <KeyRound className="h-4 w-4 mr-2 opacity-70" />
              {getTranslation('loginPagePasswordLabel', 'Password')}
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background/70 border-border/50 focus:border-primary placeholder:text-muted-foreground/80 h-11 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-muted-foreground hover:text-primary"
                aria-label={showPassword ? getTranslation('loginPageHidePassword', "Hide password") : getTranslation('loginPageShowPassword', "Show password")}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <div className="text-right">
              <Link href="/auth/forgot-password" passHref>
                <span className="text-xs text-primary hover:underline cursor-pointer">
                  {getTranslation('loginPageForgotPasswordLink', 'Forgot password?')}
                </span>
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 text-base font-semibold shadow-lg hover:scale-105 transition-transform duration-150 ease-in-out"
            disabled={isLoading}
          >
            {isLoading ? getTranslation('loginPageLoggingIn', 'Logging In...') : getTranslation('loginPageLoginButton', 'Login')}
          </Button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-border/30"></div>
          <span className="mx-4 text-xs text-muted-foreground uppercase">
            {getTranslation('loginPageOrContinueWith', 'Or continue with')}
          </span>
          <div className="flex-grow border-t border-border/30"></div>
        </div>

        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full bg-background/50 border-border/50 hover:bg-muted/50 text-foreground h-11 text-sm font-medium shadow-md hover:scale-105 transition-transform"
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
          >
            <GoogleIcon />
            {getTranslation('loginPageContinueWithGoogle', 'Continue with Google')}
          </Button>
          <Button
            variant="outline"
            className="w-full bg-background/50 border-border/50 hover:bg-muted/50 text-foreground h-11 text-sm font-medium shadow-md hover:scale-105 transition-transform"
            onClick={() => handleSocialLogin('apple')}
            disabled={isLoading}
          >
            <AppleIcon />
            {getTranslation('loginPageContinueWithApple', 'Continue with Apple')}
          </Button>
        </div>

        <p className="mt-8 text-sm text-foreground">
          {getTranslation('loginPageNewHere', 'New here? ')}
          <Link href="/auth/signup" passHref>
            <span className="font-semibold text-primary hover:underline cursor-pointer">
              {getTranslation('loginPageJoinTheJourney', 'Join the Journey →')}
            </span>
          </Link>
        </p>
      </div>

      <footer className="absolute bottom-4 text-center w-full z-10">
        <div className="text-xs text-muted-foreground space-x-4">
          <Link href="/privacy" className="hover:underline">{getTranslation('loginPagePrivacyLink', 'Privacy')}</Link>
          <span>&bull;</span>
          <Link href="/terms" className="hover:underline">{getTranslation('loginPageTermsLink', 'Terms')}</Link>
          <span>&bull;</span>
          <Link href="/contact" className="hover:underline">{getTranslation('loginPageHelpLink', 'Help')}</Link>
        </div>
      </footer>
    </div>
  );
}
