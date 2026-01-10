import Navbar from "@/components/navigation/Navbar"
import Footer from "@/components/sections/Footer"
import Hero from "@/components/sections/Hero"
import Projects from "@/components/sections/Projects"

const Home = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="font-roboto-mono min-h-screen text-light">
        <Hero />
        <Projects />
      </main>
      <Footer />
    </>
  )
}

export default Home