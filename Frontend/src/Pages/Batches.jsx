import BatchesPage from "../Components/Batches/BatchesPage";
import HeroBg from "../Components/hero/backgrounds/herobg";

const Batches = () => {
  return (
    <div className="relative overflow-hidden ">
      <HeroBg />
      <section className="relative flex items-center justify-center min-h-screen px-8 overflow-hidden">
        {/* Background Animation */}
     
      <div className="z-10 w-full max-w-6xl pt-32">
        {/* Section Tagline */}
        <p className="mb-6 text-lg text-gray-500 font-large ">
          <span className="rounded-lg bg-white/40">The </span><span className="font-semibold text-orange-600 rounded-lg bg-white/40 ">Super60</span> <span className="rounded-lg bg-white/40">Community</span>
        </p>    

        {/* Hero Headline with Orange Block */}
        <div className="relative inline-block">
          <h1 className="text-5xl font-extrabold leading-tight text-black sm:text-6xl md:text-7xl bg-white/40 rounded-lgbreak-words">
             Unlock Your Potential
            <br />
            with Super60
          </h1>

          
              </div>

              {/* Subheadline */}
        <p className="max-w-2xl mt-6 text-lg text-gray-700 rounded-lg bg-white/40">
          Unlock your true potential with the <span className="font-semibold text-orange-600">Super60</span> Community — immersive learning, real-world projects, and a culture of excellence.
        </p>
      </div>


    </section>
    <div>
  <BatchesPage/>
</div>
    </div>
  )
}

export default Batches