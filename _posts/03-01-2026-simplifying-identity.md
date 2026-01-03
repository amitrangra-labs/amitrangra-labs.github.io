# Simplifying Identity (and its validation)  

Hello lovely reader, hope you are having an amazing life so far which is going to become ever so enriching once to complete reading this article.  
  
Now before my grey cells decay to such an extent that I forget how much I wanted to write this article, in 2026, I've finally started to draft it.  
Now these are purely my thoughts witout any AI intervention.  
  
The notion of identity starts the moment someone is born. How the person is known and recoganised by different people, agencies, machines etc. may be the same  
or may be different. Your name, face, eye color, hair color, body etc are some of the traits that you have which identify you while birth certificate, passport,  
driving license etc are documents that you may get for some authority that can prove who you are to relevant entities.  

In today's digital world, I feel its becoming hard to retain and remember such varied identities whos loss can cause a lot of disruption in your daily life.  
If you cannot imagine a world wherein you have different identity card for each purpose then why is it that we need to identify differently to each website.  

I believe we have come to such a time wherein the investment is maintaining digital identities should be left to such players that have the right money, effort and  
will to do so. If you are someone who want to identify your users, I strongly feel that creating an identity and its validation system from scratch is not  
only a waster of financial and human resources but also way less secure as software security world is ever evolving and staying current with the security threats  
is something the bigger players can do but for a new company, startup, it can be more of a blocker than an enabler of anything.  
  
From my experience in the IT industry, following are the very high level identity scenarios that I will focus on here:  
- Employee identity
- Customer identity (if you have external customers)
- Application/service identity (if you host multiple apps/services)

If I were to start with implementing employee identity for my (small) company, I would start with investing in a secure email provider to begin with like zoho,  proton etc and enable multi factor authentication. With this, I have already invested in a secure system that will keep up with ever growing security threats  
and also which will be highly available.  
The next thing I will probably implement inhouse is a token generation mechanism, storing user/employee identities (emails) and email client.  
The login flow for any employee will be enter email, send token to their email, employee accessing their email, clicking link in email with token and logged in the  
company interanl sites. To keep things simple, the token and session cookie can be configured to live for 24 hours and every day the employee logins once and is able to access all internal sites (managing access is out of scope for this article).  

As the employee strength grows, further simpler login mehcanism like push based login can be configured alongwith the email and token based login.