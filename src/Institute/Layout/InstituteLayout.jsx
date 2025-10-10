
import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import InstituteHeader from "./InstituteHeader"
import "../../assets/css/institute.css"
import Footer from "../../Components/Layout/Footer"
const InstituteLayout = () => {

  useEffect(() => {
    document.title = "Teachera Institute"
  }, [])

  return (
    <div className="institute-layout">
      <InstituteHeader />

      
      <main className="institute-main-content" style={{ paddingTop: "76px" }}>
  
        <Outlet />
      </main>
      <Footer/>
    </div>
  )
}

export default InstituteLayout
