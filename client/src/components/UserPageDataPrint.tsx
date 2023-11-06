import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';
import img from './political.png'; // Add the path to your political image
import data from './data.json'; // Add the path to your JSON data

const UserPageDataPrint = () => {
  const pdfRef = useRef(null);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [booth, setBooth] = useState('');
  const [house, setHouse] = useState('');
  const [voterId, setVoterId] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [reEnteredName, setReEnteredName] = useState('');


  const handleSearch = () => {
    const matchedData = data.find(
      (voter) =>
        (voter.FM_NAME_EN.toLowerCase() === name.toLowerCase() ||
          voter.PART_NO.toString().toLowerCase() === booth.toLowerCase() ||
          voter.C_HOUSE_NO.toString().toLowerCase() === house.toLowerCase() ||
          voter.EPIC_NO.toString().toLowerCase() === voterId.toLowerCase()) &&
        voter.FM_NAME_EN.toLowerCase() === reEnteredName.toLowerCase()
    );

    if (matchedData) {
      setFilteredData([matchedData]);
      axios
        .post('http://localhost:1001/post/form', {
          name: matchedData.FM_NAME_EN + ' ' + matchedData.LASTNAME_EN,
          vid: matchedData.EPIC_NO,
          partno: matchedData.PART_NO,
          tel: matchedData.C_HOUSE_NO,
          user: localStorage.getItem('username'),
          id: localStorage.getItem('id'),
        })
        .then((response) => {
          console.log('Data saved successfully', response);
        })
        .catch((error) => {
          console.error('Error saving data:', error);
        });
    } else {
      setFilteredData([]);
    }
  };

  const generatePDF = (voter: any) => {
    const input = pdfRef.current;
  
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg');
        const pdf = new jsPDF('p', 'mm', 'a7', true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 8;
  
        pdf.addImage(imgData, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
  
        const pdfFileName = `voter_${voter.EPIC_NO}.pdf`;
        pdf.save(pdfFileName);
  
        axios
          .post('http://localhost:1001/post/form', {
            name: voter.FM_NAME_EN + ' ' + voter.LASTNAME_EN,
            vid: voter.EPIC_NO,
            partno: voter.PART_NO,
            tel: voter.C_HOUSE_NO,
            user: localStorage.getItem('username'),
            id: localStorage.getItem('id'),
          })
          .then((response) => {
            console.log('Data saved successfully', response);
          })
          .catch((error) => {
            console.error('Error saving data:', error);
          });
      });
    } else {
      console.error('Input element is null');
    }
  };

  const handleNameClick = (value: React.SetStateAction<string>) => {
    setName(value);
  };

  const handleVoterIdClick = (value: React.SetStateAction<string>) => {
    setVoterId(value);
  };

  const handleBoothClick = (value: React.SetStateAction<string>) => {
    setBooth(value);
  };

  const handleHouseClick = (value: React.SetStateAction<string>) => {
    setHouse(value);
  };

  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #FFA500 0%, #FFD700 100%)',
        minHeight: '100vh',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className="sc-header"
      >
        <span
          onClick={() => {
            navigate('/home');
          }}
        >
          <i className="fa fa-home" aria-hidden="true"></i>
        </span>
        <h3>Voter Application</h3>
      </div>

      <div style={{ background: 'white', width: '400px', padding: '20px' }} className="mt-5">
        <div className="mb-5">
          <input
            type="text"
            name="name"
            className="form-control me-2 mt-5"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {filteredData.map((voter, index) => (
            <div key={index} onClick={() => handleNameClick(voter.FM_NAME_EN)}>
              {voter.FM_NAME_EN} {voter.LASTNAME_EN}
            </div>
          ))}
          <input
            type="text"
            className="form-control me-2 mt-5"
            placeholder="Enter Voter id"
            value={voterId}
            onChange={(e) => setVoterId(e.target.value)}
          />
          {filteredData.map((voter, index) => (
            <div key={index} onClick={() => handleVoterIdClick(voter.EPIC_NO)}>
              {voter.EPIC_NO}
            </div>
          ))}
          <input
            type="text"
            className="form-control me-2 mt-5"
            placeholder="Enter Booth (Part Number)"
            value={booth}
            onChange={(e) => setBooth(e.target.value)}
          />
          {filteredData.map((voter, index) => (
            <div key={index} onClick={() => handleBoothClick(voter.PART_NO)}>
              {voter.PART_NO}
            </div>
          ))}
          <input
            type="text"
            className="form-control me-2 mt-5"
            placeholder="Enter House Number"
            value={house}
            onChange={(e) => setHouse(e.target.value)}
          />
          <input
  type="text"
  className="form-control me-2 mt-5"
  placeholder="Re-Enter the Voter Name"
  value={reEnteredName}
  onChange={(e) => setReEnteredName(e.target.value)}
/>

          {filteredData.map((voter, index) => (
            <div key={index} onClick={() => handleHouseClick(voter.C_HOUSE_NO)}>
              {voter.C_HOUSE_NO}
            </div>
          ))}
          <button className="btn btn-primary mt-5 w-100" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {filteredData.map((voter: any, index: any) => (
        <div
          key={index}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            margin: '20px',
            width: '100%',
            maxWidth: '400px',
          }}
        >
          <div
            ref={pdfRef}
            style={{
              width: '100%',
              height: '500px',
              backgroundImage: `url(${img})`,
              opacity: '1',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: '10px',
              borderRadius: '10px',
            }}
          >
            <div>
              <h1 style={{ textAlign: 'center', color: '#FF69B4', fontSize: '4rem' }}>
                <span style={{ color: '#FF5306' }}>BJP</span>
              </h1>
              <h3 style={{ textAlign: 'center', color: '#212529', fontSize: '1.5rem', fontWeight: 'bold' }}>
                Vote for Sri BANDI SANJAY
              </h3>
              <h3 style={{ textAlign: 'center', color: '#212529', fontSize: '1.5rem', fontWeight: 'bold' }}>
                శ్రీ బండి సంజయ్‌ (కమలం)
              </h3>
              <h3 style={{ textAlign: 'center', color: '#212529', fontSize: '0.9rem', fontWeight: 'bold' }}>
                కరీంనగర నియోజకవర్గం
              </h3>
              <h3 style={{ textAlign: 'center', color: '#212529', fontSize: '0.9rem' }}>
Polling date:30th November 2023, 7AM to 6PM</h3>
              <h3 style={{ textAlign: 'center', color: '#212529', fontSize: '0.9rem' }}>తేదీ: 30వ నవంబర్ 2023, ఉదయం 7 గంటల నుండి సాయంత్రం 6 గంటల వరకు.</h3>
            </div>

            <div style={{ color: 'Black', display: 'flex', flexDirection: 'column' }} className="tommy">
              <div className="flex justify-between mt-5">
                <h5 className="text-2xl text-black  tracking-widest">Name</h5>
                <p className="text-xl text-black">
                  {voter.FM_NAME_EN} {voter.LASTNAME_EN}
                </p>
              </div>
              <div className="flex justify-between mt-3">
                <h5 className="text-2xl text-black  tracking-widest">Voter ID</h5>
                <p className="text-xl text-black">{voter.EPIC_NO}</p>
              </div>
              <div className="flex justify-between mt-3">
                <h5 className="text-2xl text-black  tracking-widest">Booth (Part Number)</h5>
                <p className="text-xl text-black">{voter.PART_NO}</p>
              </div>
              <div className="flex justify-between mt-3">
                <h5 className="text-2xl text-black  tracking-widest">House Number</h5>
                <p className="text-xl text-black">{voter.C_HOUSE_NO}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '120px' }}>
              <button
  onClick={() => generatePDF(voter)}
  style={{
    fontSize: '2.5rem',
    backgroundColor: 'green',
    padding: '10px',
    borderRadius: '10px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  }}
>
  <i className="fa fa-file" aria-hidden="true"></i>
</button>
<button
  style={{
    fontSize: '2.5rem',
    backgroundColor: 'green',
    padding: '10px',
    borderRadius: '10px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  }}
>
  <i className="fa fa-share-alt" aria-hidden="true"></i>
</button>

<button
  style={{
    fontSize: '2.5rem',
    backgroundColor: 'red',
    padding: '10px',
    borderRadius: '10px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  }}
  onClick={() => {
    setName('');
    setVoterId('');
    setBooth('');
    setHouse('');
    window.location.reload();
  }}
  
>
  Clear
</button>


  </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPageDataPrint;
