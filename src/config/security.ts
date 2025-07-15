// Security configuration for production builds
export const SECURITY_CONFIG = {
  // Content Security Policy
  CSP_DIRECTIVES: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "cdn.emailjs.com"],
    styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
    fontSrc: ["'self'", "fonts.googleapis.com", "fonts.gstatic.com"],
    imgSrc: ["'self'", "data:", "https:"],
    connectSrc: ["'self'", "api.emailjs.com"],
    frameAncestors: ["'none'"],
    baseUri: ["'self'"],
    formAction: ["'self'"]
  },
  
  // Bot detection patterns
  BOT_USER_AGENTS: [
    'bot', 'crawler', 'spider', 'crawling', 'scraper', 'scraping',
    'headless', 'phantom', 'selenium', 'puppeteer', 'playwright',
    'wget', 'curl', 'httpie', 'insomnia', 'postman'
  ],
  
  // Blocked IP patterns (you can add specific IPs or ranges)
  BLOCKED_IPS: [],
  
  // Rate limiting
  RATE_LIMIT: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // limit each IP to 100 requests per windowMs
  },
  
  // File protection
  PROTECTED_EXTENSIONS: ['.pdf', '.doc', '.docx', '.xls', '.xlsx'],
  
  // Security headers
  SECURITY_HEADERS: {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), bluetooth=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
  }
};

// Console warning for developers
if (typeof window !== 'undefined') {
  console.warn(
    '%cWARNING!',
    'color: red; font-size: 50px; font-weight: bold;',
    '\nThis is a browser feature intended for developers. Do not paste any code here that someone told you to paste. This could allow attackers to steal your information or take control of your account.'
  );
}

export default SECURITY_CONFIG;
