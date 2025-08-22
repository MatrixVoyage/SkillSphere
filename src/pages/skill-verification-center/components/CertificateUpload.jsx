import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CertificateUpload = ({ certificates, onUploadCertificate, onVerifyCertificate }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      setSelectedFile(e?.dataTransfer?.files?.[0]);
      onUploadCertificate(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      setSelectedFile(e?.target?.files?.[0]);
      onUploadCertificate(e?.target?.files?.[0]);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'failed': return 'text-red-600 bg-red-50 border-red-200';
      case 'processing': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'failed': return 'XCircle';
      case 'processing': return 'Loader';
      default: return 'FileText';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Certificate Verification</h2>
          <p className="text-sm text-gray-600 mt-1">Upload and verify your professional certificates</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Icon name="Shield" size={16} className="text-blue-600" />
          <span>Blockchain Protected</span>
        </div>
      </div>
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-blue-400 bg-blue-50' :'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Icon name="Upload" size={24} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Upload Certificate</h3>
            <p className="text-sm text-gray-600 mt-1">
              Drag and drop your certificate or click to browse
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              id="certificate-upload"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
            />
            <label htmlFor="certificate-upload">
              <Button variant="outline" as="span">
                Choose File
              </Button>
            </label>
            <span className="text-xs text-gray-500">
              PDF, JPG, PNG up to 10MB
            </span>
          </div>
        </div>
      </div>
      {/* Processing Features */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="Scan" size={20} className="text-blue-600" />
            <div>
              <h4 className="font-medium text-blue-900">OCR Scanning</h4>
              <p className="text-sm text-blue-700">Automatic text extraction</p>
            </div>
          </div>
        </div>
        <div className="bg-emerald-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="Shield" size={20} className="text-emerald-600" />
            <div>
              <h4 className="font-medium text-emerald-900">Issuer Verification</h4>
              <p className="text-sm text-emerald-700">Validate with institutions</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="Link" size={20} className="text-purple-600" />
            <div>
              <h4 className="font-medium text-purple-900">Blockchain Registry</h4>
              <p className="text-sm text-purple-700">Tamper-proof storage</p>
            </div>
          </div>
        </div>
      </div>
      {/* Certificates List */}
      <div className="mt-8">
        <h3 className="font-medium text-gray-900 mb-4">Your Certificates ({certificates?.length})</h3>
        <div className="space-y-3">
          {certificates?.map((cert, index) => (
            <div key={index} className={`border rounded-lg p-4 ${getStatusColor(cert?.status)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border">
                    <Icon name={getStatusIcon(cert?.status)} size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{cert?.name}</h4>
                    <p className="text-sm text-gray-600">{cert?.issuer}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500">
                        Issued: {cert?.issueDate}
                      </span>
                      {cert?.expiryDate && (
                        <span className="text-xs text-gray-500">
                          Expires: {cert?.expiryDate}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className={`text-sm font-medium ${cert?.status === 'verified' ? 'text-emerald-600' : 'text-gray-600'}`}>
                      {cert?.status?.charAt(0)?.toUpperCase() + cert?.status?.slice(1)}
                    </div>
                    {cert?.verificationScore && (
                      <div className="text-xs text-gray-500">
                        Score: {cert?.verificationScore}%
                      </div>
                    )}
                  </div>
                  {cert?.status === 'pending' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onVerifyCertificate(cert?.id)}
                    >
                      Verify
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" iconName="ExternalLink">
                    View
                  </Button>
                </div>
              </div>

              {cert?.verificationDetails && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="font-medium text-gray-700">Blockchain Hash:</span>
                      <p className="text-gray-600 font-mono mt-1">{cert?.verificationDetails?.blockchainHash}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Verification Date:</span>
                      <p className="text-gray-600 mt-1">{cert?.verificationDetails?.verifiedDate}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Authenticity:</span>
                      <p className="text-gray-600 mt-1">{cert?.verificationDetails?.authenticity}% confirmed</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificateUpload;