import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRawPasteRequest } from "../api/pastes.api";

function RawPastePage() {
  const params = useParams();
  const navigate = useNavigate();

const [rawData, setRawData] = useState("");

  async function loadRawPaste() {
    if (params.id.length === 10) {
      try {
        const response = await getRawPasteRequest(params.id);
        setRawData(response.data);
      } catch (error) {
        if (error.response.status === 404) {
          navigate("/404");
        }
      }
    } else {
      navigate("/404");
    }
  }

  useEffect(() => {
    try {
      loadRawPaste();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <div className="raw-data">{rawData}</div>
  )
}

export default RawPastePage;
