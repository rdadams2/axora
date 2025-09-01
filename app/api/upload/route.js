import { NextRequest, NextResponse } from 'next/server'
import { uploadFile, uploadVideo, uploadImage } from '../../../lib/blob'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const type = formData.get('type') // 'video', 'image', or 'file'
    const filename = formData.get('filename') || file.name

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    let result

    switch (type) {
      case 'video':
        result = await uploadVideo(file, filename)
        break
      case 'image':
        result = await uploadImage(file, filename)
        break
      default:
        result = await uploadFile(file, filename)
    }

    return NextResponse.json({
      success: true,
      url: result.url,
      filename: result.pathname,
      size: result.size,
      uploadedAt: result.uploadedAt
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error.message || 'Upload failed' },
      { status: 500 }
    )
  }
}
