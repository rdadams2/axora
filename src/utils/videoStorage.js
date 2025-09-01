// Video storage utility with Vercel Blob integration

/**
 * Get video sources - supports both local and Vercel Blob URLs
 * @param {boolean} useBlob - Whether to use Vercel Blob URLs (default: false for backward compatibility)
 * @returns {Array} Array with video sources
 */
export const getVideoSources = (useBlob = false) => {
  if (useBlob) {
    // These would be your Vercel Blob URLs
    return [
      {
        src: 'https://your-blob-url.vercel-storage.com/videos/VR_Walkthrough_Universal.mp4',
        type: 'video/mp4',
        label: 'VR Walkthrough Universal (Cloud)'
      }
    ];
  }
  
  // Fallback to local assets
  return [
    {
      src: '/assets/VR_Walkthrough_Universal.mp4',
      type: 'video/mp4',
      label: 'VR Walkthrough Universal'
    }
  ];
};

/**
 * Get download URL for the video
 * @param {boolean} useBlob - Whether to use Vercel Blob URL
 * @returns {string} Download URL
 */
export const getDownloadUrl = (useBlob = false) => {
  if (useBlob) {
    return 'https://your-blob-url.vercel-storage.com/videos/VR_Walkthrough_Universal.mp4';
  }
  return '/assets/VR_Walkthrough_Universal.mp4';
};

/**
 * Get the filename for download
 * @returns {string} Filename for download
 */
export const getDownloadFilename = () => {
  return 'VR_Walkthrough_Universal.mp4';
};

/**
 * Upload a new video to Vercel Blob
 * @param {File} videoFile - The video file to upload
 * @param {string} filename - Optional custom filename
 * @returns {Promise<Object>} Upload result with URL and metadata
 */
export const uploadVideoToBlob = async (videoFile, filename) => {
  const formData = new FormData();
  formData.append('file', videoFile);
  formData.append('type', 'video');
  if (filename) {
    formData.append('filename', filename);
  }

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload video');
  }

  return await response.json();
};

/**
 * Delete a video from Vercel Blob
 * @param {string} url - The blob URL to delete
 * @returns {Promise<Object>} Delete result
 */
export const deleteVideoFromBlob = async (url) => {
  const response = await fetch('/api/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error('Failed to delete video');
  }

  return await response.json();
};
