export default function AccessibilityDemo() {
  return (
    <form aria-label="Contact form" role="form" tabIndex={0}>
      {/* Use semantic elements and associate labels with inputs for screen readers */}
      <fieldset>
        <legend>Contact Us</legend>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="name">Name:</label>
          <input id="name" name="name" type="text" required aria-required="true" aria-label="Full Name" />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required aria-required="true" aria-describedby="email-desc" />
          <span id="email-desc" style={{ display: 'none' }}>We'll never share your email.</span>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows={4} aria-label="Your message" />
        </div>
        {/* Use button with type and clear text */}
        <button type="submit" aria-label="Send contact form">Send</button>
      </fieldset>
    </form>
  );
}
// Explanation:
// - Use <fieldset> and <legend> to group related fields for screen readers.
// - Use aria-label, aria-required, and aria-describedby for better accessibility.
// - Always associate <label> with input using htmlFor and id.
// - Use semantic HTML and clear button text.
// - Test with keyboard navigation (Tab, Shift+Tab) and screen readers.
// - Run: npx eslint . --ext .js,.jsx,.ts,.tsx --plugin jsx-a11y for accessibility linting.
