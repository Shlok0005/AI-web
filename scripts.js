// Handle 'Generate AI Content' button click
document.getElementById('generate-btn').addEventListener('click', async () => {
  try {
    const response = await fetch('http://localhost:4000/generate?type=ppt');
    const data = await response.json();
    if (data.success) {
      alert('AI content generated successfully!');
    } else {
      alert('Error generating content: ' + data.error);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to generate content. Please try again later.');
  }
});
// Handle 'Generate AI Content' button click
document.getElementById('generate-btn').addEventListener('click', async () => {
  try {
    // Show loading message while waiting for the backend response
    const loadingMessage = document.createElement('p');
    loadingMessage.textContent = 'Generating content... Please wait.';
    loadingMessage.id = 'loading-message';
    document.body.appendChild(loadingMessage);

    // Send a request to the backend to generate AI content
    const response = await fetch('http://localhost:4000/generate?type=ppt');
    
    // Wait for the backend response
    const data = await response.json();
    
    // Remove loading message
    document.body.removeChild(loadingMessage);

    // Check if the request was successful
    if (data.success) {
      alert('AI content generated successfully!');
      // Display the generated content
      alert(data.content); // You can display this content in a modal, div, or section instead of an alert
    } else {
      alert('Error generating content: ' + data.error);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to generate content. Please try again later.');
  }
});
