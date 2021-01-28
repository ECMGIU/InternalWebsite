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

    //Addded not sure if this is right
    const [url] = await storage
    .bucket(bucketName)
    .file(filename)
    .getSignedUrl(options);

    
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
