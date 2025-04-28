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
    app id: 670809305561626
3. Apple - https://developer.apple.com
2. Stripe - https://dashboard.stripe.com

## Stripe Testing

* Card: 4242 4242 4242 4242
* Exp: Any future date
* CVC: Any 3 digits
* ZIP: Any 5 digits
* Feedback submitted

## SSL Self Signed Certificates

* mkdir -p /Users/dsa157/Development/appBase/next-app/certs
openssl genrsa -out /Users/dsa157/Development/appBase/next-app/certs/appbase.dsa157.com.key 2048
openssl req -new -x509 -key /Users/dsa157/Development/appBase/next-app/certs/appbase.dsa157.com.key -out /Users/dsa157/Development/appBase/next-app/certs/appbase.dsa157.com.crt -days 3650 -subj "/CN=appbase.dsa157.com"
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain certs/appbase.dsa157.com.crt



1. generate private key - openssl genrsa -out myapp.dsa157.com.key 2048
2. generate certificate - openssl req -new -x509 -key myapp.dsa157.com.key -out myapp.dsa157.com.crt -days 3650 -subj "/CN=myapp.dsa157.com"
3. add to docker-compose.yml
4. add to .env.local   
5. sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain certs/appbase.dsa157.com.crt 

## 
Let's Encrypt doesn't issue certificates for local development domains like appbase.dsa157.com. For local development, you have three good options:

* Use mkcert (recommended) - Creates locally-trusted certificates
* * brew install mkcert
* * mkcert -install
* * mkcert appbase.dsa157.com
* sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain certs/appbase.dsa157.com.crt
* Use a local domain name and add it to your hosts file
* * sudo nano /etc/hosts
* * 127.0.0.1 appbase.dsa157.com

## TODO
1. * HTTPS (still needs to be improved to not use self-signed certificate)
2. * resolve npm warnings
3. apple/facebook login
4. show dynamic info on the profile page
5. backend
6. test cloning to new app
7. add more features
8. add more security features
9. add more performance features
10. add more accessibility features
11. add more SEO features
11. add more analytics features
12. add more monitoring features
13. add more backup features