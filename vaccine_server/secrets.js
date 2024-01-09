// These should represent the final URLs for your front- and backend projects
exports.DEPLOYED_URLS = {
    // TODO: change to Heroku and GitLab URLs, with a trailing slash
    SERVER: 'https://cryptic-savannah-96041.herokuapp.com/',
    VIEW: 'https://compsci290_2021spring.dukecs.io/portfolio_ey38/final_project/vaccine_ui/dist/'
}

// Not so secret, secret encryption key
exports.COOKIE_ENCRYPTION_KEY = 'THISISASECRETHEHE';


exports.OAUTH = {
    "web": {
        "client_id": "248783011061-qs71kbkse63d15v9l6vump1i5qs62lho.apps.googleusercontent.com",
        "project_id": "nodejs-api-auth",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_secret": "fh1LzSy0v2HejCjLBqNJfq5B",
        "redirect_uris": ["http://localhost:8080/api/auth/google/redirect", "https://cryptic-savannah-96041.herokuapp.com/api/auth/google/redirect"]
    }
};

exports.FIREBASE_CONFIG = {
    "type": "service_account",
    "project_id": "cs290-final-project-vaers",
    "private_key_id": "c27bb26fc7d5d8d75534d46597620e4018315ed0",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDPJHRKXuYKB/wD\nEwQq1uZVO+O1OB9kMgj8SAKa3Ty1m6LDIbsr7ZYEzxwZpXWiiUHeReg4Lk4Fxmou\nEXlLrfYQOrhogf4sKc9gu+5Rble8az+AmhZb8bRnH4iHL29PPw+jmQHa7LB2cRb0\nUCSatFsbVLQl+L2b7QkzhoWt2YCpPDg+o1BER01mGGqvmfO1r3N0TfgMz5BXx1JY\nJV9OTjOSyD96l+0oFhOHicxpx0uKequRQ2HPpTOUnFJNhkU7CQsd3sbf8YYPpEj2\ndVQqwAsFe/HzyEnH6ViGIGqCK8QjBKNt9SAzJ+Pcmn/mY5RSbl5sMheVQyi5DjRw\nU6moUWo/AgMBAAECggEAPvoRVQ8XF1OoHfMpIDEn5CAKMe13Nco0iycFi7nZnElO\nKc9WjZt1Mc8Z9v4kDp92ZDKS0InbdMwHOixb2VNxbSu9JyDmetzXTMy2PxGyIPnm\nW539UETjGTswEhGs4MYGZjG9q6asW8Y0OWEoT9Snol6VSroeQ4rEcmLiv6FSCaFW\nXKoe+rhIsBCHBigmQrIAtmV2ICjyavQIH76ycKK/egIHIDgRhUjRZOmJnFcYT2iK\nwwfuTWW5PcrrPS3IWb53WLmoqK5ZTig7Ar8mO3h2GvJC83k/lyyJspaTtGV0l5eI\nRMYv4n5nV7j+LFCBZN2/OAzppbLlB/5FETaVlC05kQKBgQDoXbIfP0+r+URXtb7r\n14o6+dN2DVc9gS9Jv+w2r3LBHk5o6fuvhL2XEVRfc5Bchv0wt1b10U28altW7Vjj\ndt2FWJkZP6wyekxwWRiv+Q6BdpsUOUKZ+341vmqxR/29M5vlux0Vuf7Ro2dpn9tI\nZqnyaL63J96kKzQ8VRyxSljgdwKBgQDkNf2r8KNapyF1I+E325KHF2DX4Unolcgp\nb/wtx/6jBjTUL0787hrYQKvT5ykJUftJfnlf/TXvtoCk7o9/JLAaDIp89zOVVXfM\nI7ADdJXHIluhvmztbQGaQPRhXyrrAKztl7p4AhRtH2iw4vaQOt8oa/tXClA4nCXJ\nFq8NTMG+eQKBgHRnk7bhoYj2a41A5+7/4CihRJTMJBsUn1rjwXK3u9YQ15jpNoN8\nDPoj3U+f9f7URPxlrDOi8b1kznMinbf9sQV/F9s1MY9sAuT5TUvCicjDYPblpH69\nJUHJLWu4M93Xf867SNu8fHIK2OBqC5EelR5x6LCaUYeOeTGMNb5/Dz0LAoGAWiyb\nV912LtPrfIX48EFq3MZ4FdWHhsfol7cQRmbIT1KcfVtUMs1C/kBPpSOqK2yhhqDb\nBPrg3R+YJZO+T9cHXsOl1Us4rsFe3OMdIcBnjpAc9QRxtj9kardP2Unpg4J40kkp\n/VGVEKlgjMSh+MvKcgZ5AiOpHzVUGOlFslOqGsECgYEA48Sybni+XTFcZlZ5N5ps\nV8+Mj3+qRcDw/VCjfT+/hmitFp/YmXS36l+uqNlb29I5a+ERM1SXcWQhz7ADAhtQ\ndkRBj1zhh2zC4KtiRDojOhBnss6Ja1LYEZfCjMZI/3M1hSUkD2ggaaJbO4O9Nesg\nMeOPYCjXnSW3sV0yTTTB3PQ=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-s1w8u@cs290-final-project-vaers.iam.gserviceaccount.com",
    "client_id": "113899112927002680594",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-s1w8u%40cs290-final-project-vaers.iam.gserviceaccount.com"
};
