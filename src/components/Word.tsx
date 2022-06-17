import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import { Box, Card, CardContent, CardHeader, Chip } from '@mui/material'

import CodeBlock from '@/components/CodeBlock'
import type { WordState } from '@/modules/word'

interface Props {
  word: WordState
}

const Word: React.FC<Props> = ({ word }) => (
  <Card>
    <CardHeader title={<h3>{word.id}</h3>} data-testid="card-id" />
    <CardContent data-testid="card-titles">
      {word.titles.map(t => (
        <Box key={t} component="span" sx={{ mr: 1 }}>
          <Chip label={t} />
        </Box>
      ))}
    </CardContent>
    <CardContent data-testid="card-description">
      <ReactMarkdown
        components={{ code: CodeBlock }}
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        rehypePlugins={[rehypeRaw]}
      >
        {word.description}
      </ReactMarkdown>
    </CardContent>
  </Card>
)

export default Word
