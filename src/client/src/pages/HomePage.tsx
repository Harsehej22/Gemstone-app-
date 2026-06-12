import { Link } from 'react-router-dom';
import { Gem, Sparkles, Shield, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

const features = [
  {
    icon: Sparkles,
    title: 'Personalized Recommendations',
    description: 'Get gemstone suggestions based on your zodiac sign derived from birth details.',
  },
  {
    icon: Gem,
    title: 'Detailed Reports',
    description: 'Receive comprehensive reports with benefits, wearing methods, and planetary associations.',
  },
  {
    icon: Shield,
    title: 'Trusted Guidance',
    description: 'Rule-based astrology engine backed by traditional gemstone-planet mappings.',
  },
  {
    icon: Star,
    title: 'Export & Share',
    description: 'Download your recommendation as PDF or JSON for offline reference.',
  },
];

const zodiacGems = [
  { sign: 'Aries', gem: 'Ruby' },
  { sign: 'Taurus', gem: 'Emerald' },
  { sign: 'Cancer', gem: 'Pearl' },
  { sign: 'Leo', gem: 'Ruby' },
  { sign: 'Libra', gem: 'Diamond' },
  { sign: 'Scorpio', gem: 'Coral' },
  { sign: 'Sagittarius', gem: 'Yellow Sapphire' },
  { sign: 'Capricorn', gem: 'Blue Sapphire' },
  { sign: 'Aquarius', gem: 'Amethyst' },
  { sign: 'Pisces', gem: 'Yellow Sapphire' },
];

export function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="text-center py-12 md:py-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
          <Gem className="h-4 w-4" />
          Astrology Consultation Platform
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          Discover Your Perfect
          <span className="text-primary-600 block">Gemstone</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Unlock the power of Vedic astrology with personalized gemstone recommendations
          based on your birth chart details.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={isAuthenticated ? '/recommend' : '/register'}>
            <Button size="lg">Get Your Recommendation</Button>
          </Link>
          <Link to={isAuthenticated ? '/dashboard' : '/login'}>
            <Button variant="secondary" size="lg">
              {isAuthenticated ? 'Go to Dashboard' : 'Sign In'}
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-2xl font-display font-bold text-center text-gray-900 dark:text-white mb-10">
          Why Choose GemstoneApp?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 hover:shadow-md transition-shadow"
            >
              <div className="rounded-lg bg-primary-100 dark:bg-primary-900/30 w-fit p-3 mb-4">
                <feature.icon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Zodiac preview */}
      <section className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-8 md:p-12 text-white">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">Zodiac Gemstone Guide</h2>
        <p className="text-primary-100 mb-8">Traditional mappings used in our recommendation engine</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {zodiacGems.map(({ sign, gem }) => (
            <div key={sign} className="rounded-lg bg-white/10 backdrop-blur px-4 py-3 text-center">
              <p className="text-sm text-primary-200">{sign}</p>
              <p className="font-semibold">{gem}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
