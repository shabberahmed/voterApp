
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
import img from './political.jpeg';
import data from './data.json';
import axios from 'axios'; // Import Axios library

const UserPageDataPrint = () => {
  const pdfRef:any = useRef();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [booth, setBooth] = useState('');
  const [mobile, setMobile] = useState('');
  const [voterId, setVoterId] = useState('');
  const [filteredData, setFilteredData] = useState<any>([]);
  const user = localStorage.getItem('username');
  const handleSearch = () => {
    const matchedData = data.find((voter) => {
      const isNameMatch = voter.FM_NAME_EN.toLowerCase() === name.toLowerCase();
      const isBoothMatch = voter.PART_NO.toString().toLowerCase() === booth.toLowerCase();
      const isMobileMatch = voter.MOBILE_NO.toString().toLowerCase() === mobile.toLowerCase();
      const isVoterIdMatch = voter.EPIC_NO.toString().toLowerCase() === voterId.toLowerCase();

      if (isNameMatch || isBoothMatch || isMobileMatch || isVoterIdMatch) {
        // Generate PDF for the matched voter
        // generatePDF(voter);
        
        // Send the data to the server using Axios
        axios
          .post('http://localhost:1001/post/form', {
            name: voter.FM_NAME_EN + ' ' + voter.LASTNAME_EN,
            vid: voter.EPIC_NO,
            partno: voter.PART_NO,
            tel: voter.MOBILE_NO,
            user: user,
            id: localStorage.getItem('id')
          })
          .then((response) => {
            console.log('Data saved successfully', response);
          })
          .catch((error) => {
            console.error('Error saving data:', error);
          });
      }

      return isNameMatch || isBoothMatch || isMobileMatch || isVoterIdMatch;
    });

    if (matchedData) {
      setFilteredData([matchedData]); // Set the filtered data to an array with the matched value
    } else {
      setFilteredData([]); // Set an empty array if no exact match is found
    }
  };
  const generatePDF = (voter:any) => {
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
          id:localStorage.getItem('id')
        })
        .then((response) => {
          console.log('Data saved successfully',response);
        })
        .catch((error) => {
          console.error('Error saving data:', error);
        });
    });
  };

  return (
    <div className="container flex flex-col justify-center items-center">
      <div className="sc-header">
        <span
          onClick={() => {
            navigate('/home');
          }}
        >
          <i className="fa fa-home" aria-hidden="true"></i>
        </span>
        <h3>Voter Application</h3>
      </div>

      <div className="mt-5" style={{ width: 400 }}>
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

      {filteredData.map((voter:any, index:any) => (
        <div key={index} className="rounded-5">
          <div
            className="rounded-5"
            ref={pdfRef}
            style={{
              width: '400px',
              height: '500px',
              backgroundImage: `url(${img})`,
              opacity: '1',
              backgroundSize: 'cover',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                width: '400px',
                height: '500px',
                padding: '10px',
              }}
              className="rounded-5"
            >
              <div>
                <h1 className="text-center text-white text-6xl">
                  <span className="text-rose-500">Political</span>
                  <span className="text-green-500">Saradhi</span>
                </h1>
              </div>

              <div className="flex flex-col tommy">
                <div className="flex justify-between mt-5">
                  <h5 className="text-2xl text-white tracking-widest">Name</h5>
                  <p className="text-xl text-white">
                    {voter.FM_NAME_EN} {voter.LASTNAME_EN}
                  </p>
                </div>
                <div className="flex justify-between mt-3">
                  <h5 className="text-2xl text-white tracking-widest">Voter ID</h5>
                  <p className="text-xl text-white">{voter.EPIC_NO}</p>
                </div>
                <div className="flex justify-between mt-3">
                  <h5 className="text-2xl text-white tracking-widest">
                    Booth (Part Number)
                  </h5>
                  <p className="text-xl text-white">{voter.PART_NO}</p>
                </div>
                <div className="flex justify-between mt-3">
                  <h5 className="text-2xl text-white tracking-widest">
                    Mobile Number
                  </h5>
                  <p className="text-xl text-white">{voter.MOBILE_NO}</p>
                </div>
              </div>
            </div>
            <div></div>
            <div className="flex justify-around">
              <button onClick={() => generatePDF(voter)} className="text-6xl text-black ms-10">
                <i className="fa-solid fa-file-arrow-down"></i>
              </button>
              <button className="text-6xl text-black ms-10">
                <i className="fa-solid fa-square-share-nodes"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPageDataPrint;

