import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Reportvoter() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    houseNumber: '',
    pointOfContact: '',
    numberOfVoters: '',
    contactDetails: '',
    issue: '',
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://canvas-back-end.onrender.com/main/user/reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Form submitted successfully:', data);
        alert('Report has been submitted successfully');
        navigate('/success'); // Replace '/success' with the desired route
      } else {
        console.error('Form submission failed.');
      }
    } catch (error) {
      console.error('An error occurred during form submission:', error);
    }
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
        >
          <i className="fa fa-times"></i>
        </button>
      </div>

      <h1>{language ? 'Report a Voter' : 'ఓటుదారుని రిపోర్ట్ చేయండి'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="houseNumber" className="form-label">
            {language ? 'House Number' : 'ఇంటి నంబర్'}
          </label>
          <input
            type="text"
            className="form-control"
            id="houseNumber"
            name="houseNumber"
            value={formData.houseNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pointOfContact" className="form-label">
            {language ? 'Point of Contact' : 'సంప్రదించిన వ్యక్తి'}
          </label>
          <input
            type="text"
            className="form-control"
            id="pointOfContact"
            name="pointOfContact"
            value={formData.pointOfContact}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="numberOfVoters" className="form-label">
            {language ? 'No of Voters' : 'ఉన్న ఓటర్ల సంఖ్య'}
          </label>
          <input
            type="number"
            className="form-control"
            id="numberOfVoters"
            name="numberOfVoters"
            value={formData.numberOfVoters}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contactDetails" className="form-label">
            {language ? 'Contact Details' : 'సంప్రదించిన వ్యక్తి ఫోన్ నంబర్'}
          </label>
          <input
            type="text"
            className="form-control"
            id="contactDetails"
            name="contactDetails"
            value={formData.contactDetails}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="issue" className="form-label">
            {language ? 'Comments..' : 'వివరణ'}
          </label>
          <textarea
            className="form-control"
            id="issue"
            name="issue"
            value={formData.issue}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="issue" className="form-label">
            {language ? '' : 'సమస్యను ఎంచుకోండి'}
          </label>
          <select
            className="form-select"
            id="issue"
            name="issue"
            value={formData.issue}
            onChange={handleInputChange}
          >
            <option value="Illegal Movement">
              {language
                ? 'Illegal Movement'
                : 'ఈ ప్రాంతంకి సంబంధించిన వ్యక్తి కాదు/అతడు ఇక్కడ లేరు'}
            </option>
            <option value="Removal of Vote">
              {language ? 'Removal of Vote' : 'ఓటు తీసి వేయబడింది'}
            </option>
            <option value="Change of Address">
              {language ? 'Change of Address' : 'వాళ్ళ చిరునామా మారింది'}
            </option>
            <option value="Death">{language ? 'Death' : 'మరణించారు'}</option>
            <option value="Others">{language ? 'Others' : 'ఇతర కారణాలు'}</option>
          </select>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-success text-bg-success" onClick={handleSubmit}>
            {language ? 'Submit' : 'ఫారం పంపండి'}
          </button>
        </div>
      </form>
    </div>
  );
}
