import Navbar from "@/components/navigation/Navbar"
import Hero from "@/components/sections/Hero"

const Home = () => {
  return (
    <main className="font-roboto-mono bg-[#0A090E] min-h-screen text-light">
      <Navbar />
      <Hero />
    </main>
  )
}

export default Home