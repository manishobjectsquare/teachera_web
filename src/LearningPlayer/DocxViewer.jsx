import { useEffect, useRef } from "react"

const DocxViewer = ({ filePath }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const loadDocxJs = async () => {
      // Check if docx.js is already loaded
      if (!window.docx) {
        // Load docx.js script dynamically
        const script = document.createElement("script")
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/docx-preview/0.1.14/docx-preview.min.js"
        script.async = true
        document.body.appendChild(script)

        // Wait for script to load
        await new Promise((resolve) => {
          script.onload = resolve
        })
      }
    }

    const fetchAndPreviewDocx = async () => {
      try {
        await loadDocxJs()

        // URL of the .docx file
        const docUrl = filePath

        // Fetch the .docx file
        const response = await fetch(docUrl)

        // Check if the response is ok
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }

        // Convert the response to Blob
        const blob = await response.blob()

        // Render the document
        if (window.docx && containerRef.current) {
          window.docx
            .renderAsync(blob, containerRef.current)
            .then(() => console.log("docx: finished"))
            .catch((error) => console.error("Error rendering docx:", error))
        }
      } catch (error) {
        console.error("Error loading docx:", error)
      }
    }

    if (filePath) {
      fetchAndPreviewDocx()
    }

    // Cleanup function
    return () => {
      // Clean up any resources if needed
    }
  }, [filePath])

  return (
    <div className="document-preview-area overflow-auto">
      <div id="docx-preview-container" ref={containerRef}></div>
    </div>
  )
}

export default DocxViewer
