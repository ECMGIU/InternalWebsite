import { storage } from 'lib/firebase';
import React, { useState } from 'react';

const ReportForm = () => {
  const [file, setFile] = useState('');
  const [fileURL, setFileURL] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted!');
    console.log(file);
    const uploadTask = storage.ref(`/reports/${file.name}`).put(file);

    uploadTask.on('state_changed',
      (snapShot) => {
        console.log(snapShot);
      }, (err) => {
        console.log(err);
      }, () => {
        storage.ref('reports').child(file.name).getDownloadURL()
          .then((url) => { setFileURL(url); });
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <input type="submit" />
      </form>
      <p>{fileURL}</p>
    </>
  );
};

export default ReportForm;
