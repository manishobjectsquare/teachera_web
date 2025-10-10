"use client"

import { useState, useEffect, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearchMinus, faSearchPlus, faExpand } from "@fortawesome/free-solid-svg-icons"

const PdfViewer = ({ filePath }) => {
  // State to track PDF document and viewing state
  const [myState, setMyState] = useState({
    pdf: null,
    currentPage: 1,
    zoom: 0.8,
  })

  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  // Load PDF.js and initialize the PDF
  useEffect(() => {
     // Load PDF.js if not already loaded
    if (!window.pdfjsLib) {
      const script = document.createElement("script")
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js"
      script.async = true
      document.body.appendChild(script)

      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js"
        loadPdf()
      }
    } else {
      loadPdf()
    }

    function loadPdf() {
         
      window.pdfjsLib
        .getDocument(filePath)
        .promise.then((pdf) => { 
          setMyState((prevState) => ({
            ...prevState,
            pdf: pdf,
          }))
        })
        .catch((error) => {
          console.error("Error loading PDF:", error)
        })
    }
  }, [filePath])

  // Render PDF when state changes
  useEffect(() => {
    if (myState.pdf) {
      render()
    }
  }, [myState.pdf, myState.currentPage, myState.zoom])

  // Render function
  const render = () => {
    myState.pdf.getPage(myState.currentPage).then((page) => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      const viewport = page.getViewport({
        scale: myState.zoom,
      })

      canvas.width = viewport.width
      canvas.height = viewport.height

      page
        .render({
          canvasContext: ctx,
          viewport: viewport,
        })
        .promise.then(() => {
          // Rendering complete
        })
    })
  }

  // Handle previous page button
  const handlePreviousPage = () => {
    if (myState.currentPage > 1) {
      setMyState((prevState) => ({
        ...prevState,
        currentPage: prevState.currentPage - 1,
      }))
      window.scrollTo(0, 0)
    }
  }

  // Handle next page button
  const handleNextPage = () => {
    if (myState.pdf && myState.currentPage < myState.pdf._pdfInfo.numPages) {
      setMyState((prevState) => ({
        ...prevState,
        currentPage: prevState.currentPage + 1,
      }))
      window.scrollTo(0, 0)
    }
  }

  // Handle page input change
  const handlePageInputChange = (e) => {
    const value = e.target.value
    setMyState((prevState) => ({
      ...prevState,
      currentPage: Number.parseInt(value) || prevState.currentPage,
    }))
  }

  // Handle page input keypress
  const handlePageInputKeyPress = (e) => {
    if (e.key === "Enter") {
      const desiredPage = Number.parseInt(e.target.value)
      if (myState.pdf && desiredPage >= 1 && desiredPage <= myState.pdf._pdfInfo.numPages) {
        setMyState((prevState) => ({
          ...prevState,
          currentPage: desiredPage,
        }))
      }
    }
  }

  // Handle zoom in
  const handleZoomIn = () => {
    if (myState.pdf) {
      setMyState((prevState) => ({
        ...prevState,
        zoom: prevState.zoom + 0.2,
      }))
    }
  }

  // Handle zoom out
  const handleZoomOut = () => {
    if (myState.pdf) {
      setMyState((prevState) => ({
        ...prevState,
        zoom: Math.max(0.2, prevState.zoom - 0.2),
      }))
    }
  }

  // Handle fullscreen toggle
  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`)
        })
      } else if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  return (
    <div className="document-preview-area position-relative w-100" ref={containerRef}>
      <div className="pdf_viewer_box overflow-auto">
        <div id="canvas_container" className=" text-center overflow-auto" style={{width:'100%', height:'100%'}}>
              <canvas id="pdf_renderer" ref={canvasRef}></canvas>
        </div>

        <div className="pdf_navigation_controls position-absolute d-flex">
          <button id="pdf_previous_btn" className="" onClick={handlePreviousPage}>
            Previous
          </button>
          <input
            id="pdf_current_page"
            value={myState.currentPage}
            onChange={handlePageInputChange}
            onKeyPress={handlePageInputKeyPress}
            type="number"
            className="w-100"
          />
          <button id="pdf_next_btn" className="" onClick={handleNextPage}>
            Next
          </button>
        </div>

        <div className="pdf_zoom_controls position-absolute text-center">
          <button className="btn btn-two" id="pdf_zoom_out" onClick={handleZoomOut}>
            <FontAwesomeIcon icon={faSearchMinus} />
          </button>
          <button className="btn btn-two" id="pdf_zoom_in" onClick={handleZoomIn}>
            <FontAwesomeIcon icon={faSearchPlus} />
          </button>
          <button className="btn btn-two" onClick={handleFullscreen}>
            <FontAwesomeIcon icon={faExpand} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default PdfViewer
