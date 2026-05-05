/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
import PortfolioSection from './components/PortfolioSection';
import InteractiveBackground from './components/InteractiveBackground';
import Footer from './components/Footer';
import SectionHeading from './components/SectionHeading';

export default function App() {
  return (
    <div className="relative min-h-screen">
      <InteractiveBackground />
      <Header />
      
      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <Hero />
        
        {/* Core Portfolio Section */}
        <PortfolioSection />

        {/* Timeline / Experience Section removed */}

        <Footer />
      </main>
    </div>
  );
}

