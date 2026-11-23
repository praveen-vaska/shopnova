'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, Camera, Link as LinkIcon, RefreshCw, X, Check, Image as ImageIcon, Sparkles } from 'lucide-react';

export default function ProductImagePicker({ value, onChange }) {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'camera' | 'url'
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [facingMode, setFacingMode] = useState('environment'); // 'environment' | 'user'
  const [isDragging, setIsDragging] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  // Stop camera tracks helper
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  // Cleanup on unmount or tab switch
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (activeTab !== 'camera') {
      stopCamera();
    }
  }, [activeTab]);

  // Start Camera
  const startCamera = async () => {
    setCameraError(null);
    stopCamera();

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported on this device/browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err) {
      console.error('Camera access error:', err);
      setCameraError(err.message || 'Unable to access camera. Please check browser permissions.');
      setIsCameraActive(false);
    }
  };

  // Flip Camera between back and front
  const toggleFacingMode = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    if (isCameraActive) {
      stopCamera();
      setTimeout(() => {
        startCamera();
      }, 100);
    }
  };

  // Capture Snapshot from Camera
  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Compress to JPEG data URL
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    onChange(dataUrl);
    stopCamera();
  };

  // Process & compress file to data URL
  const processFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Resize image if larger than 1200px to keep MongoDB documents compact & snappy
        const maxDim = 1200;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        onChange(compressedDataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleClear = () => {
    onChange('');
    stopCamera();
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="font-bold text-darkText block text-xs">
          Product Image *
        </label>
        {value && (
          <span className="text-[11px] text-accent font-semibold flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> Image attached
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 p-1 bg-surface rounded-lg text-xs font-heading font-semibold border border-borderSubtle">
        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`flex items-center justify-center gap-1.5 py-1.5 rounded transition-all ${
            activeTab === 'upload'
              ? 'bg-white text-primary shadow-sm font-bold'
              : 'text-mutedText hover:text-darkText'
          }`}
        >
          <Upload className="w-3.5 h-3.5 text-accent" />
          <span>Upload File</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('camera');
            if (!isCameraActive) startCamera();
          }}
          className={`flex items-center justify-center gap-1.5 py-1.5 rounded transition-all ${
            activeTab === 'camera'
              ? 'bg-white text-primary shadow-sm font-bold'
              : 'text-mutedText hover:text-darkText'
          }`}
        >
          <Camera className="w-3.5 h-3.5 text-accent" />
          <span>Camera</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('url')}
          className={`flex items-center justify-center gap-1.5 py-1.5 rounded transition-all ${
            activeTab === 'url'
              ? 'bg-white text-primary shadow-sm font-bold'
              : 'text-mutedText hover:text-darkText'
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5 text-accent" />
          <span>Image URL</span>
        </button>
      </div>

      {/* TAB 1: FILE UPLOAD */}
      {activeTab === 'upload' && (
        <div>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-accent bg-accent/10 scale-[1.01]'
                : 'border-borderDark hover:border-accent bg-surface/50 hover:bg-surface'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="w-10 h-10 rounded-full bg-accent/15 text-accent mx-auto flex items-center justify-center mb-2">
              <Upload className="w-5 h-5" />
            </div>
            <p className="font-heading font-bold text-xs text-darkText mb-0.5">
              Click to browse or drag & drop photo
            </p>
            <p className="text-[11px] text-mutedText">
              Supports JPEG, PNG, WEBP from your phone or PC
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: CAMERA CAPTURE */}
      {activeTab === 'camera' && (
        <div className="bg-black rounded-xl overflow-hidden p-3 text-white text-center">
          {cameraError ? (
            <div className="py-6 px-4">
              <p className="text-error font-semibold text-xs mb-3">{cameraError}</p>
              <button
                type="button"
                onClick={startCamera}
                className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded"
              >
                Retry Camera
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={toggleFacingMode}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                  title="Switch camera"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="px-6 py-2.5 rounded-full bg-accent hover:bg-accent-hover text-white font-heading font-bold text-xs flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all"
                >
                  <Camera className="w-4 h-4" />
                  <span>Capture Photo</span>
                </button>
                <button
                  type="button"
                  onClick={stopCamera}
                  className="px-4 py-2.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold text-xs"
                >
                  Close Cam
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: IMAGE URL */}
      {activeTab === 'url' && (
        <div>
          <input
            type="url"
            placeholder="https://images.unsplash.com/..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-borderSubtle outline-none focus:border-accent text-xs font-medium"
          />
          <p className="text-[11px] text-mutedText mt-1">
            Paste any direct HTTPS image address.
          </p>
        </div>
      )}

      {/* ATTACHED IMAGE PREVIEW */}
      {value && (
        <div className="p-2.5 bg-surface rounded-xl border border-borderSubtle flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-14 h-14 rounded-lg overflow-hidden border border-borderSubtle bg-white flex-shrink-0">
              <img
                src={value}
                alt="Product preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="font-heading font-bold text-xs text-darkText truncate">
                Selected Product Image
              </p>
              <p className="text-[10px] text-mutedText truncate">
                {value.startsWith('data:') ? 'Custom Photo / Camera Capture' : value}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1.5 text-[11px] font-bold text-darkText hover:text-accent bg-white rounded border border-borderSubtle hover:border-accent transition-colors"
            >
              Change
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 text-mutedText hover:text-error transition-colors"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
