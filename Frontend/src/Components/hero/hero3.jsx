import HeroBg from './backgrounds/herobg'

export default function HeroSection() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      {/* Background Image */}
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* Left side - Main heading */}
        <div className="space-y-6">
      <HeroBg />
          <h1 className="text-6xl lg:text-8xl font-light text-gray-900 leading-tight">
            creating interfaces
          </h1>
          <div className="flex items-baseline gap-6">
            <h2 className="text-6xl lg:text-8xl font-light text-gray-900">
              users 
              <span className="italic">love</span>
            </h2>
            <span className="text-sm text-gray-500 font-medium tracking-wide">
              UI/UX Since 2006
            </span>
          </div>
        </div>

        {/* Right side - Description */}
        <div className="lg:ml-auto lg:max-w-md">
          <p className="text-lg text-gray-600 leading-relaxed">
            Creating intuitive digital experiences that solve 
            real business challenges through ui ux design, 
            optimizing workflows, improving efficiency and 
            enhancing user engagement.
          </p>
        </div>
      </div>
    </div>
  );
}