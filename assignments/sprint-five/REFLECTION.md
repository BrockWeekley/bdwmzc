# SSO Reflections

After checking out the Flask app, I decided I would like to build my own SSO features into an app that is important to me. I began researching other types of authentication with Google's OAuth and I found Google's Firebase.

Firebase is a cloud solution to databases and authentication. They offer SSO from many popular sights such as Facebook, Twitter, and most importantly, Google.

I had some issues getting this to work at the start, because it requires a lot of different configurations within the Firebase console to host the authentication on a website, I was able to get a working version available at https://www.bdwmzc.com

The Firebase docs on authentication are a good place to start when looking for cloud SSO: https://firebase.google.com/docs/auth and I also found a website specifically detailing SSO through Firebase: https://howtofirebase.com/firebase-authentication-for-web-d58aad62cf6d?gi=bb2523668b16

I find SSO to be a powerful tool that apps should all look to be including. Firebase is a strong contendor with the abilities that they have to integrate into web and native apps. 

I currently have anonymous login and Google login available on my site, but I would like to add many more SSO providers such as Facebook and even my own database login. Then I would hope to lock down the rest of my app to only be available to logged in users.

By locking down the rest of the app to logged in users, I can begin advertising my site on Google and my professional profiles. This will allow me to collect data on the types of people that are looking at my app, as Firebase also comes with built in integration with Google Analytics.

In the future, I would like a dev only page that shows page hits and where users are coming from so that I can better manage my resume and my expectations in finding a job and professional employers.
