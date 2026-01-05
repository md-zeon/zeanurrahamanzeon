import Navbar from "@/components/navigation/Navbar"
import Hero from "@/components/sections/Hero"
import Projects from "@/components/sections/Projects"

const Home = () => {
  return (
    <main className="font-roboto-mono min-h-screen text-light">
      <Navbar />
      <Hero />
      <Projects />
    </main>
  )
}

export default Home