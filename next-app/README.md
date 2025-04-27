# Modern Web App Template

A secure, full-featured web application template with:
- Authentication (Google/Facebook/Apple)
- Stripe payments
- User profiles
- Usage metrics
- Responsive design

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (see `.env.example`)

3. Run development server:
```bash
npm run dev
```

## API Keys
1. Google - https://console.cloud.google.com/apis/dashboard
2. Facebook - https://developers.facebook.com
3. Apple - https://developer.apple.com
2. Stripe - https://dashboard.stripe.com

## Stripe Testing

Card: 4242 4242 4242 4242
Exp: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
Feedback submitted

## Custom Domain Support (ex: using appBase.local)

1. modify /etc/hosts
2. modify docker-config.yml
3. modify .env.local


## TODO
1. HTTPS
2. resolve npm warnings
3. apple/facebook login
4. show dynamic info on the profile page
5. backend
6. add more features
7. add more security features
8. add more performance features
9. add more accessibility features
10. add more SEO features
11. add more analytics features
12. add more monitoring features
13. add more backup features