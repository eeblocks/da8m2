import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPasteRequest } from "../api/pastes.api";

function PastePage() {
  const navigate = useNavigate();

  const params = useParams();

  const [paste, setPaste] = useState([]);
  const [copied, setCopied] = useState(false);
  const [pasteURL, setPasteURL] = useState('');

  async function loadPaste() {
    if (params.id.length === 10) {
      try {
        const response = await getPasteRequest(params.id);
        setPaste(response.data);
        setPasteURL(`https://antipaste.com/${params.id}`);
      } catch (error) {
        if (error.response.status === 404) {
          navigate("/404");
        }
      }
    } else {
      navigate("/404");
    }
  }

  function loadRaw() {
    try {
      navigate(`/raw/${params.id}`);
    } catch (error) {
      console.error(error);
    }
  }

  const handleCopyClick =  async () => {
    try {
      await navigator.clipboard.writeText(`https://antipaste.com/${params.id}`)
      setCopied(true);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    try {
      loadPaste();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <div className="card-container">
        <div className="card">
          <form className="form">
            <label>{paste.title === "" ? "Untitled" : paste.title}</label>
            <textarea
              name="content"
              id="content"
              placeholder="Write here..."
              defaultValue={paste.content}
            ></textarea>
            <button onClick={loadRaw}>GET RAW</button>
            <div onClick={handleCopyClick} className="btn btn-copy-link">COPY URL</div>
            <Link onClick={handleCopyClick} className="raw-data">{pasteURL}</Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default PastePage;
