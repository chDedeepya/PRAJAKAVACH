// Utility functions for formatting data in PRAJAKAVACH

export const formatDate = (date) => {
  if (!date) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-IN', options);
};

export const formatTime = (date) => {
  if (!date) return '';
  const options = { hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleTimeString('en-IN', options);
};

export const formatDateTime = (date) => {
  if (!date) return '';
  return `${formatDate(date)} at ${formatTime(date)}`;
};

export const formatNumber = (num) => {
  if (num === null || num === undefined) return '0';
  return new Intl.NumberFormat('en-IN').format(num);
};

export const formatPercentage = (value, total) => {
  if (!total || total === 0) return '0%';
  const percentage = (value / total) * 100;
  return `${Math.round(percentage)}%`;
};

export const formatDuration = (seconds) => {
  if (!seconds || seconds < 0) return '0s';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
};

export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const formatPhoneNumber = (phone) => {
  if (!phone) return '';

  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');

  // Format Indian phone numbers
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
    const number = cleaned.slice(2);
    return `+91 ${number.slice(0, 5)} ${number.slice(5)}`;
  } else if (cleaned.length === 13 && cleaned.startsWith('091')) {
    const number = cleaned.slice(3);
    return `+91 ${number.slice(0, 5)} ${number.slice(5)}`;
  }

  return phone;
};

export const formatAddress = (address) => {
  if (!address) return '';

  // Capitalize first letter of each word
  return address.replace(/\b\w/g, l => l.toUpperCase());
};

export const formatScore = (score, total) => {
  if (!total || total === 0) return '0/0';
  return `${score}/${total} (${formatPercentage(score, total)})`;
};

export const formatQuizTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const formatRegionName = (region) => {
  if (!region) return '';

  // Convert region codes to readable names
  const regionMap = {
    'himachal': 'Himachal Pradesh',
    'northeast': 'North East India',
    'assam': 'Assam',
    'bihar': 'Bihar',
    'odisha': 'Odisha',
    'andhra': 'Andhra Pradesh',
    'coastal': 'Coastal Areas',
    'hilly': 'Hilly Areas',
    'all': 'All India'
  };

  return regionMap[region.toLowerCase()] || region;
};

export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

export const formatList = (items, separator = ', ') => {
  if (!Array.isArray(items)) return '';
  return items.join(separator);
};
