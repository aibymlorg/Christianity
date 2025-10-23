import { Link } from 'react-router-dom';
import { modules } from '../../config/modules';
import { CanvasSymbolTransform } from '../../components/CanvasSymbolTransform';
import { CanvasModuleCard } from '../../components/CanvasModuleCard';

export function Landing() {

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Redesigned with Bigger Fonts */}
      <header className="bg-white fixed w-full top-0 z-50" style={{ borderBottom: 'none', paddingTop: '8px', paddingBottom: '8px' }}>
        <nav className="container mx-auto px-6 py-5 flex justify-between items-center max-w-7xl">
          {/* Left side - Bigger brand text */}
          <div className="flex items-center" style={{ gap: '16px' }}>
            <span className="text-6xl" style={{ fontSize: '56px' }}>✝️</span>
            <span
              className="text-3xl font-bold tracking-tight"
              style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#ff6b6b',
                letterSpacing: '-0.5px'
              }}
            >
              Christian Community
            </span>
          </div>
          {/* Right side - Join Us button only */}
          <div className="flex items-center">
            <Link
              to="/register"
              className="px-6 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              style={{
                backgroundColor: '#ff6b6b',
                color: '#ffffff',
                padding: '12px 28px',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: '600',
                textDecoration: 'none',
                boxShadow: '0 4px 6px -1px rgb(255 107 107 / 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ff5252';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 12px -2px rgb(255 107 107 / 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ff6b6b';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(255 107 107 / 0.3)';
              }}
            >
              Join Us
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section - Elegant Minimalist */}
      <section
        className="min-h-screen flex items-center justify-center text-center pb-10 relative overflow-hidden"
        style={{
          paddingTop: '120px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'url(/LoveFaithHope.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Subtle overlay for better text readability */}
        <div className="absolute inset-0 bg-white/60"></div>

        <div
          className="relative z-10 w-full px-6"
          style={{
            maxWidth: '1200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          <h1
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight"
            style={{
              fontSize: 'clamp(36px, 7vw, 50px)',
              lineHeight: '1.1',
              textAlign: 'center',
              width: '100%',
              color: '#ffffff',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
            }}
          >
            Kindness. Inspiration. Fellowship.
          </h1>
          <div
            className="mb-12"
            style={{
              maxWidth: '900px',
              width: '100%',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <p
              className="text-xl md:text-2xl mb-4 leading-relaxed font-light"
              style={{
                fontSize: 'clamp(16px, 2.5vw, 24px)',
                lineHeight: '1.6',
                textAlign: 'center',
                width: '100%',
                color: '#ffffff',
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)'
              }}
            >
              A unified platform integrating powerful AI-driven tools for Christians
            </p>
            <p
              className="text-xl md:text-2xl leading-relaxed font-light"
              style={{
                fontSize: 'clamp(16px, 2.5vw, 24px)',
                lineHeight: '1.6',
                textAlign: 'center',
                width: '100%',
                color: '#ffffff',
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)'
              }}
            >
              Explore Culture. Learn Bible. Research Theology. Manage Church.
            </p>
          </div>

          {/* Canvas-Based Symbol Transformation */}
          <div
            className="relative my-12"
            style={{
              width: '100%',
              maxWidth: '500px',
              aspectRatio: '1 / 1',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CanvasSymbolTransform />
          </div>

          <div className="mt-6 flex justify-center items-center">
            <Link
              to="/register"
              className="px-12 py-4 rounded-lg font-semibold text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={{
                display: 'inline-block',
                textDecoration: 'none',
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: 'none',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)'
              }}
            >
              Begin Your Journey
            </Link>
          </div>
        </div>

        {/* Elegant decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-gray-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 border border-gray-200 rounded-full opacity-20"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 border border-gray-300 rounded-full opacity-25"></div>
      </section>

      {/* Modules Section - Elegant 2x2 Grid */}
      <section
        className="py-20"
        style={{
          backgroundImage: 'url(/LoveFaithHope.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          paddingTop: '120px'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center" style={{ marginBottom: '80px' }}>
            <h2
              className="text-5xl md:text-6xl font-bold mb-6 tracking-tight"
              style={{
                color: '#ffffff',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)'
              }}
            >
              Four Paths to Understand Christianity
            </h2>
            <p
              className="text-xl max-w-3xl mx-auto font-light leading-relaxed"
              style={{
                color: '#ffffff',
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.4)'
              }}
            >
              Tailored AI-powered tools designed for seekers, scholars, students, and church leaders
            </p>
          </div>

          {/* 2x2 Grid with Canvas-Enhanced Cards */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '32px',
              maxWidth: '1200px',
              margin: '0 auto'
            }}
          >
            {modules.map((module, idx) => (
              <CanvasModuleCard
                key={module.id}
                icon={module.icon}
                displayName={module.displayName}
                description={module.description}
                features={module.features}
                targetAudience={module.targetAudience}
                index={idx}
                path={module.path}
                color={module.color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Elegant Black */}
      <footer className="bg-black text-white py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <span className="text-3xl">✝️</span>
              <span className="text-2xl font-bold tracking-tight">Christian Community</span>
            </div>
            <p className="text-gray-300 mb-6 text-lg font-light max-w-2xl mx-auto">
              Empowering faith, connecting hearts, transforming lives through technology and grace
            </p>
            <div className="w-16 h-px bg-gray-700 mx-auto mb-6"></div>
            <p className="text-sm text-gray-500 font-light">
              © 2025 Christian Community Platform. Built with love and purpose.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
