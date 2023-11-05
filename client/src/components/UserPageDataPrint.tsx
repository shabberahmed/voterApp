
// import React, { useRef, useState } from 'react';
// import jsPDF from 'jspdf';
// // import voterData from './data.json';
// import { useNavigate } from 'react-router-dom';
// import html2canvas from 'html2canvas';
// import img from './political.jpeg';
// import data from './data.json';

// const UserPageDataPrint = () => {
//   const pdfRef:any = useRef();
//   const navigate = useNavigate();
//   const [name, setName] = useState('');
//   const [booth, setBooth] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [voterId, setVoterId] = useState('');
//   const [filteredData, setFilteredData] = useState<any>([]);

// //   const handleSearch = () => {
// //     const filtered:any= data.filter((voter) => {
// //       const isNameMatch =
// //         voter.FM_NAME_EN.toLowerCase().includes(name.toLowerCase());
// //       const isBoothMatch = voter.PART_NO.toString() === booth;
// //       const isMobileMatch = voter.MOBILE_NO.toString() === mobile;
// //       const isVoterId = voter.EPIC_NO.toString() === voterId;

// //       // Check if any of the conditions are true
// //     //   return (isBoothMatch || isMobileMatch || isVoterId ||isNameMatch )
// //     return isBoothMatch
// //     });
// //     setFilteredData(filtered);
// //   };
// const handleSearch = () => {
//     const matchedData:any = data.find((voter) => {
//       const isNameMatch = voter.FM_NAME_EN.toLowerCase() === name.toLowerCase();
//       const isBoothMatch = voter.PART_NO.toString().toLocaleLowerCase() === booth.toLowerCase();
//       const isMobileMatch = voter.MOBILE_NO.toString().toLocaleLowerCase() === mobile.toLowerCase();
//       const isVoterIdMatch = voter.EPIC_NO.toString().toLocaleLowerCase() === voterId.toLowerCase();
  
//       if (isNameMatch) {
//         return voter.FM_NAME_EN;
//       }
//       if (isBoothMatch) {
//         return voter.PART_NO.toString();
//       }
//       if (isMobileMatch) {
//         return voter.MOBILE_NO.toString();
//       }
//       if (isVoterIdMatch) {
//         return voter.EPIC_NO.toString();
//       }
//       return null; // Return null if no exact match is found
//     });
  
//     if (matchedData) {
//       setFilteredData([matchedData]); // Set the filtered data to an array with the matched value
//       console.log(matchedData,"this is matched data")
//     } else {
//       setFilteredData([]); // Set an empty array if no exact match is found
//     }
//   };
  

//   const generatePDF = (voter:any) => {
//     const input = pdfRef.current;

//     html2canvas(input).then((canvas) => {
//       const imgData = canvas.toDataURL('image/jpeg');

//       const pdf = new jsPDF('p', 'mm', 'a7', true);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
//       const imgWidth = canvas.width;
//       const imgHeight = canvas.height;
//       const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
//       const imgX = (pdfWidth - imgWidth * ratio) / 2;
//       const imgY = 8;

//       pdf.addImage(imgData, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

//       const pdfFileName = `voter_${voter.EPIC_NO}.pdf`;
//       pdf.save(pdfFileName);
//     });
//   };

//   return (
//     <div className="container flex flex-col justify-center items-center">
//       <div className="sc-header">
//         <span
//           onClick={() => {
//             navigate('/home');
//           }}
//         >
//           <i className="fa fa-home" aria-hidden="true"></i>
//         </span>
//         <h3>Voter Application</h3>
//       </div>

//       <div className="mt-5" style={{ width: 400 }}>
//         <div className="mb-5">
//           <input
//             type="text"
//             name='name'
//             className="form-control me-2 mt-5"
//             placeholder="Enter Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <input
//             type="text"
//             className="form-control me-2 mt-5"
//             placeholder="Enter Voter id"
//             value={voterId}
//             onChange={(e) => setVoterId(e.target.value)}
//           />
//           <input
//             type="text"
//             className="form-control me-2 mt-5"
//             placeholder="Enter Booth (Part Number)"
//             value={booth}
//             onChange={(e) => setBooth(e.target.value)}
//           />
//           <input
//             type="text"
//             className="form-control me-2 mt-5"
//             placeholder="Enter Mobile Number"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//           />
//           <button className="btn btn-primary mt-5 w-100" onClick={handleSearch}>
//             Search
//           </button>
//         </div>
//       </div>

//       {filteredData.map((voter:any, index:any) => (
//         <div key={index} className="rounded-5">
//           <div
//             className="rounded-5"
//             ref={pdfRef}
//             style={{
//               width: '400px',
//               height: '500px',
//               backgroundImage: `url(${img})`,
//               opacity: '1',
//               backgroundSize: 'cover',
//               backgroundColor: 'rgba(0, 0, 0, 0.7)',
//             }}
//           >
//             <div
//               style={{
//                 backgroundColor: 'rgba(0, 0, 0, 0.7)',
//                 width: '400px',
//                 height: '500px',
//                 padding: '10px',
//               }}
//               className="rounded-5"
//             >
//               <div>
//                 <h1 className="text-center text-white text-6xl">
//                   <span className="text-rose-500">Political</span>
//                   <span className="text-green-500">Saradhi</span>
//                 </h1>
//               </div>

//               <div className="flex flex-col tommy">
//                 <div className="flex justify-between mt-5">
//                   <h5 className="text-2xl text-white tracking-widest">Name</h5>
//                   <p className="text-xl text-white">
//                     {voter.FM_NAME_EN} {voter.LASTNAME_EN}
//                   </p>
//                 </div>
//                 <div className="flex justify-between mt-3">
//                   <h5 className="text-2xl text-white tracking-widest">Voter ID</h5>
//                   <p className="text-xl text-white">{voter.EPIC_NO}</p>
//                 </div>
//                 <div className="flex justify-between mt-3">
//                   <h5 className="text-2xl text-white tracking-widest">
//                     Booth (Part Number)
//                   </h5>
//                   <p className="text-xl text-white">{voter.PART_NO}</p>
//                 </div>
//                 <div className="flex justify-between mt-3">
//                   <h5 className="text-2xl text-white tracking-widest">
//                     Mobile Number
//                   </h5>
//                   <p className="text-xl text-white">{voter.MOBILE_NO}</p>
//                 </div>
//               </div>
//             </div>
//             <div></div>
//             <div className="flex justify-around">
//               <button onClick={() => generatePDF(voter)} className="text-6xl text-black ms-10">
//                 <i className="fa-solid fa-file-arrow-down"></i>
//               </button>
//               <button className="text-6xl text-black ms-10">
//                 <i className="fa-solid fa-square-share-nodes"></i>
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default UserPageDataPrint;
import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import img from './political.png';
import data from './data.json';
import axios from 'axios'; // Import Axios library

const UserPageDataPrint = () => {
  
  const pdfRef: any = useRef();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [booth, setBooth] = useState('');
  const [mobile, setMobile] = useState('');
  const [voterId, setVoterId] = useState('');
  const [filteredData, setFilteredData] = useState<any>([]);
  const user = localStorage.getItem('username');

  const handleSearch = () => {
    const matchedData = data.find((voter) => {
      const isNameMatch =
        voter.FM_NAME_EN.toLowerCase() === name.toLowerCase();
      const isBoothMatch =
        voter.PART_NO.toString().toLowerCase() === booth.toLowerCase();
      const isMobileMatch =
        voter.MOBILE_NO.toString().toLowerCase() === mobile.toLowerCase();
      const isVoterIdMatch =
        voter.EPIC_NO.toString().toLowerCase() === voterId.toLowerCase();

      if (
        isNameMatch ||
        isBoothMatch ||
        isMobileMatch ||
        isVoterIdMatch
      ) {
        // Generate PDF for the matched voter
        // generatePDF(voter);

        // Send the data to the server using Axios
        axios
          .post(`http://localhost:1001/post/form`, {
            name: voter.FM_NAME_EN + ' ' + voter.LASTNAME_EN,
            vid: voter.EPIC_NO,
            partno: voter.PART_NO,
            tel: voter.MOBILE_NO,
            user: user,
            id: localStorage.getItem('id'),
          })
          .then((response) => {
            console.log('Data saved successfully', response);
          })
          .catch((error) => {
            console.error('Error saving data:', error);
          });
      }

      return (
        isNameMatch ||
        isBoothMatch ||
        isMobileMatch ||
        isVoterIdMatch
      );
    });

    if (matchedData) {
      setFilteredData([matchedData]); // Set the filtered data to an array with the matched value
    } else {
      setFilteredData([]); // Set an empty array if no exact match is found
    }
  };

  const generatePDF = (voter: any) => {
    const input = pdfRef.current;

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

      // After generating the PDF, send the data to the server
      axios
        .post('http://localhost:1001/post/form', {
          name: voter.FM_NAME_EN + ' ' + voter.LASTNAME_EN,
          vid: voter.EPIC_NO,
          partno: voter.PART_NO,
          tel: voter.MOBILE_NO,
          user: user,
          id: localStorage.getItem('id'),
        })
        .then((response) => {
          console.log('Data saved successfully', response);
        })
        .catch((error) => {
          console.error('Error saving data:', error);
        });
    });
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
          <input
            type="text"
            className="form-control me-2 mt-5"
            placeholder="Enter Voter id"
            value={voterId}
            onChange={(e) => setVoterId(e.target.value)}
          />
          <input
            type="text"
            className="form-control me-2 mt-5"
            placeholder="Enter Booth (Part Number)"
            value={booth}
            onChange={(e) => setBooth(e.target.value)}
          />
          <input
            type="text"
            className="form-control me-2 mt-5"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
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
              <h3 style={{ textAlign: 'center', color: '#212529', fontSize: '1.5rem' }}>Vote for Sri BANDI SANJAY</h3>
              <h3 style={{ textAlign: 'center', color: '#212529', fontSize: '1.5rem' }}>శ్రీ బండి సంజయ్‌ (కమలం)</h3>
              <h3 style={{ textAlign: 'center', color: '#212529', fontSize: '0.9rem' }}>
              కరీంనగర నియోజకవర్గం</h3>
            </div>
  
            <div style={{ color: 'Black', display: 'flex', flexDirection: 'column' }} className="tommy">
              <div className="flex justify-between mt-5">
                <h5 className="text-2xl text-black tracking-widest">Name:</h5>
                <p className="text-xl text-black">
                  {voter.FM_NAME_EN} {voter.LASTNAME_EN}
                </p>
              </div>
              <div className="flex justify-between mt-3">
                <h5 className="text-2xl text-black tracking-widest">Voter ID:</h5>
                <p className="text-xl text-black">{voter.EPIC_NO}</p>
              </div>
              <div className="flex justify-between mt-3">
                <h5 className="text-2xl text-black tracking-widest">Booth (Part Number):</h5>
                <p className="text-xl text-black">{voter.PART_NO}</p>
              </div>
              <div className="flex justify-between mt-3">
                <h5 className="text-2xl text-black tracking-widest">Mobile Number:</h5>
                <p className="text-xl text-black">{voter.MOBILE_NO}</p>
              </div>
            </div>
            <h3 style={{ textAlign: 'center', color: '#212529', fontSize: '0.9rem' }}>
Polling date:30th November 2023, 7AM to 6PM</h3>
              <h3 style={{ textAlign: 'center', color: '#212529', fontSize: '0.9rem' }}>తేదీ: 30వ నవంబర్ 2023, ఉదయం 7 గంటల నుండి సాయంత్రం 6 గంటల వరకు.</h3>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
            <button
              onClick={() => generatePDF(voter)}
              style={{ fontSize: '4rem', backgroundColor: 'white', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}
            >
              <i className="fa fa-file" aria-hidden="true"></i>
            </button>
            <button
              style={{ fontSize: '4rem', backgroundColor: 'white', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}
            >
              <i className="fa fa-share-alt" aria-hidden="true"></i>
            </button>
          </div>
         
        </div>
      ))}
    </div>
  );
  
};

export default UserPageDataPrint;


