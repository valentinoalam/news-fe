
export function countWords() {
  // Step 1: Serialize the editor content to a plain text string
  const htmlContent = localStorage.get('editorContent');

  // Step 2: Remove any HTML tags (if necessary) and trim extra spaces
  const textContent = htmlContent.replace(/<[^>]*>/g, '').trim();

  // Step 3: Split by whitespace and filter out empty entries
  const words = textContent.split(/\s+/).filter(Boolean);

  // Step 4: Count the words
  return words.length;
}
