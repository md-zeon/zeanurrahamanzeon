import Navbar from "@/components/navigation/Navbar"
import Hero from "@/components/sections/Hero"

const Home = () => {
  return (
    <main className="font-roboto-mono min-h-screen text-light">
      <Navbar />
      <Hero />
      <div className="min-h-screen"></div>
    </main>
  )
}

export default Home