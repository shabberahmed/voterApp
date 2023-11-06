import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IncidentReport {
  incident: string;
  comment: string;
  file: File | null;
}

const Reportincident: React.FC = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [comment, setComment] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      incident: { value: string };
      comment: { value: string };
    };

    const incidentReport: IncidentReport = {
      incident: target.incident.value,
      comment: target.comment.value,
      file,
    };

    // Handle form submission logic here
    console.log('Incident Report:', incidentReport);
  };

  const lan = localStorage.getItem('language');
  const language = lan === 'english';

  return (
    <div className="container p-3">
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-danger closebutton"
          onClick={() => {
            navigate('/home');
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
            if (e.key === 'Enter') {
              navigate('/home');
            }
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <h2 className="mt-2">{language ? 'Report Incident' : 'ఏ ఘటన జరిగినా తెలియజేయండి'}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="incident" className="form-label">
            {language ? 'Incident' : 'అది ఏ ఘటన'}
          </label>
          <input type="text" className="form-control" id="incident" required />
        </div>

        <div className="mb-3">
          <label htmlFor="comment" className="form-label">
            {language
              ? 'Write your comment here...'
              : 'జరిగిన ఘటన గురించి మరియు ఘటన స్థలం గురించి వివరించండి'}
          </label>
          <textarea
            className="form-control"
            id="comment"
            rows={3}
            value={comment}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setComment(e.target.value)
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="file" className="form-label">
            {language ? 'Attach File' : 'ఒక చిత్రం లేదా ఫైల్ చేర్చండి'}
          </label>
         
        </div>

        <button type="submit" className="btn btn-primary text-bg-info">
          {language ? 'Submit' : 'ఫారం పంపండి'}
        </button>
      </form>
    </div>
  );
};

export default Reportincident;