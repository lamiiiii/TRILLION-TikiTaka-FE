import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

export default function MarkdownPreview({ content }: { content: string }) {
  const [sanitizedHTML, setSanitizedHTML] = useState('');

  useEffect(() => {
    // 비동기적으로 변환된 HTML을 처리하는 함수
    async function convertMarkdown() {
      const html = await marked(content); // 비동기적으로 변환된 HTML을 기다림
      const sanitized = DOMPurify.sanitize(html); // HTML을 sanitize
      setSanitizedHTML(sanitized); // 안전한 HTML을 상태에 저장
    }
    convertMarkdown();
  }, [content]);

  return (
    <div
      className="prose" // Tailwind CSS 'prose' 클래스를 사용하여 마크다운 스타일 적용
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }} // 변환된 HTML을 삽입
    />
  );
}