'use client'

export function Footer() {
  return (
    <footer className="footer-raimon">
      <div className="container">
        <div className="footer-raimon-content">
          <h3 className="footer-raimon-title">Connect with Raimon</h3>
          <ul className="social-grid">
            <li>
              <a href="https://x.com/raimonvibe/" target="_blank" rel="noopener noreferrer" 
                 className="social-link social-twitter">
                <i className="fa-brands fa-x-twitter"></i>
                <span className="sr-only">X</span>
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/channel/UCDGDNuYb2b2Ets9CYCNVbuA/videos/" target="_blank" rel="noopener noreferrer"
                 className="social-link social-youtube">
                <i className="fab fa-youtube"></i>
                <span className="sr-only">YouTube</span>
              </a>
            </li>
            <li>
              <a href="https://www.tiktok.com/@raimonvibe/" target="_blank" rel="noopener noreferrer"
                 className="social-link social-tiktok">
                <i className="fab fa-tiktok"></i>
                <span className="sr-only">TikTok</span>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/raimonvibe/" target="_blank" rel="noopener noreferrer"
                 className="social-link social-instagram">
                <i className="fab fa-instagram"></i>
                <span className="sr-only">Instagram</span>
              </a>
            </li>
            <li>
              <a href="https://medium.com/@raimonvibe/" target="_blank" rel="noopener noreferrer"
                 className="social-link social-medium">
                <i className="fab fa-medium"></i>
                <span className="sr-only">Medium</span>
              </a>
            </li>
            <li>
              <a href="https://github.com/raimonvibe/" target="_blank" rel="noopener noreferrer"
                 className="social-link social-github">
                <i className="fab fa-github"></i>
                <span className="sr-only">GitHub</span>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/raimonvibe/" target="_blank" rel="noopener noreferrer"
                 className="social-link social-linkedin">
                <i className="fab fa-linkedin-in"></i>
                <span className="sr-only">LinkedIn</span>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/profile.php?id=61563450007849" target="_blank" rel="noopener noreferrer"
                 className="social-link social-facebook">
                <i className="fab fa-facebook-f"></i>
                <span className="sr-only">Facebook</span>
              </a>
            </li>
          </ul>
          <div className="footer-copyright">
            <p>Built with ❤️ for learning • <a href="https://github.com/raimonvibe/setting-up-database-tutorial" target="_blank">View on GitHub</a></p>
          </div>
        </div>
      </div>
    </footer>
  )
}
