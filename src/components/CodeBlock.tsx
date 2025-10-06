'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
}

export function CodeBlock({ code, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative bg-gray-900 dark:bg-gray-950 rounded-lg overflow-hidden">
      {filename && (
        <div className="px-4 py-2 bg-gray-800 dark:bg-gray-900 text-blue-200 text-sm font-mono border-b border-gray-700">
          {filename}
        </div>
      )}
      
      <div className="relative">
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4 text-blue-300" />
          )}
        </button>
        
        <pre className="p-4 overflow-x-auto text-sm">
          <code className="text-blue-100 font-mono">{code}</code>
        </pre>
      </div>
    </div>
  )
}
