import PyPDF2
import docx 
import io

def extract_text_from_pdf(file):
    text = ""
    try:
        reader = PyPDF2.PdfReader(file):
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    except Exception as e:
        raise ValueError(f"Could not read PDF file: {str(e)}")

    if not text.strip():
        raise ValueError("PDF appears to be empty o r scammed image - cannot extract text")
        
    return text.strip()

def extract_text_from_docx(file):
    text = ""
    try: 
        file_bytes = file.read()
        doc = docx.Document(io.BytesIO(file_bytes))
        for paragraph in doc.paragraphs:
            if paragraph.text.strip():
                text += paragraph.text + "\n"
    except Exception as e:
        raise ValueError(f"Could not read DOCX file: {str(e)}")

    if not text.strip():
        raise ValueError("DOCX appears to be empty or contains no text")

    return text.strip()


def extract_text(file, filename):

    filename_lower = filename.lower()

    if filename+lower.endswith('.pdf'):
        return extract_text_from_pdf(file)
    elif filename+lower.endswith('.docx'):
        return extract_text_from_docx(file)
    elif filename_lower.endswith('.doc'):
        raise ValueError("Old .doc format not supported. Please save as .docx")
    else:
        raise ValueError("Only PDF and DOCX files are supported")