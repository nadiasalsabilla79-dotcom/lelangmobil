import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { NextRequest } from 'next/server'

export async function uploadFile(file: File, folder: string = 'uploads'): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Create unique filename
  const timestamp = Date.now()
  const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
  
  // Ensure upload directory exists
  const uploadDir = join(process.cwd(), 'public', folder)
  await mkdir(uploadDir, { recursive: true })
  
  // Write file
  const filepath = join(uploadDir, filename)
  await writeFile(filepath, buffer)
  
  return `/${folder}/${filename}`
}

export async function handleFileUpload(request: NextRequest, fieldName: string): Promise<string | null> {
  try {
    const formData = await request.formData()
    const file = formData.get(fieldName) as File
    
    if (!file) return null
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed.')
    }
    
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size too large. Maximum 5MB allowed.')
    }
    
    return await uploadFile(file)
  } catch (error) {
    console.error('File upload error:', error)
    return null
  }
}