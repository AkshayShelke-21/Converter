// src/HeicToJpgConverter.jsx
import React, { useState } from 'react';
import heic2any from 'heic2any';
import {
  Container,
  Typography,
  Button,
  Snackbar,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

const HeicToJpgConverter = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [outputFormat, setOutputFormat] = useState('image/jpeg'); // Default to JPG

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'image/heic') {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please select a valid HEIC file.');
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const convertedBlob = await heic2any({
        blob: file,
        toType: outputFormat,
        quality: 0.8,
      });

      const url = URL.createObjectURL(convertedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.name.split('.').slice(0, -1).join('.')}.${outputFormat.split('/')[1]}`; // Use the selected format
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setSuccess(true);
    } catch (err) {
      setError('Conversion failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="converter-box">
      <Typography variant="h4" gutterBottom>
        🚀 HEIC to Image Converter
      </Typography>
      <input
        type="file"
        accept=".heic"
        onChange={handleFileChange}
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <Button variant="contained" component="span" color="primary">
          Upload HEIC File
        </Button>
      </label>
      <Typography variant="body1" style={{ margin: '1rem 0' }}>
        {file ? file.name : 'No file selected'}
      </Typography>

      <FormControl fullWidth style={{ marginBottom: '1rem' }}>
        <InputLabel id="output-format-label">Output Format</InputLabel>
        <Select
          labelId="output-format-label"
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value)}
        >
          <MenuItem value="image/jpeg">JPG</MenuItem>
          <MenuItem value="image/png">PNG</MenuItem>
          <MenuItem value="image/gif">GIF</MenuItem>
          {/* Add more formats as needed */}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleConvert}
        disabled={!file || loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Convert to Image'}
      </Button>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        message={error}
      />
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        message="Conversion successful!"
      />
    </div>
  );
};

export default HeicToJpgConverter;
