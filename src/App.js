import React, { useState } from 'react';
import { ReactExcel, readFile, generateObjects } from '@ramonak/react-excel';
import './App.css';
import useViewCounter from './useViewCounter.hook';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const App = () => {
  const [initialData, setInitialData] = useState(undefined);
  const [currentSheet, setCurrentSheet] = useState({});
  const [generatedObjects, setGeneratedObjects] = useState([]);

  
  const handleUpload = (event) => {
    const file = event.target.files[0];
    readFile(file)
      .then((readedData) => setInitialData(readedData))
      .catch((error) => console.error(error));
  };

 
  const handleClick = () => {
    const result = generateObjects(currentSheet);
    setGeneratedObjects(result);
  };
  
  
console.log(generatedObjects)


  useViewCounter();
  
  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(generatedObjects)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.txt";

    link.click();
  };
  return (
    
    <div className='App'>


      <input
        type='file'
        accept='.xlsx'
        onChange={handleUpload}
        id='upload'
        style={{ display: 'none' }}
      />
      <label htmlFor='upload'>
        <button
          className='custom-button'
          onClick={() => document.getElementById('upload').click()}
        >
          Upload
        </button>
      </label>
      <ReactExcel
        initialData={initialData}
        onSheetUpdate={(currentSheet) => setCurrentSheet(currentSheet)}
        activeSheetClassName=''
        reactExcelClassName='react-excel'
      />
      {initialData && (
        <button className='custom-button' onClick={handleClick}>
          Transform
        </button>


      )
      }
      <button className='btnexport' type="button" onClick={exportData}>
Export Data
</button>

          {generatedObjects.length > 0 && (
        <textarea
          cols={70}
          rows={30}
          value={JSON.stringify(generatedObjects[0].Movie, null, 2)}
          readOnly
          className='text-area'
        />
      )}

      
    </div>
  );

          };

export default App;

          
