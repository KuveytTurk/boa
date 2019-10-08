/* eslint-disable */
export default {
  content: `
  # Introduction

  The world of finance is changing dramatically.  Technology is transforming the way financial service providers interact with their customers, just as it is also changing the way consumers’ access financial products. Be a leader in FinTech and help pave the way to re-imagine finance and banking.

  This is a document which you can use to provide a high-level overview of our APIs, including such topics as:

  •	Installing PostMan

  •	Importing Web Service Endpoints

  •	Sending a request

  In the case of this guide, we use PostMan. PostMan is an API testing tool. We will show you how to call our APIs using Postman.

  And also, you can download documentation file from [here](http://hackathon/doc.pdf)

  ## Postman
  ### Installing Postman

  You cen get the PostMan from [Postman](https://www.getpostman.com/app/download/win64) .

  The download should take a few minutes, depending on your internet connection. Once you’ve downloaded the app, you can launch Postman. After launching, you can select “Take me straight to the app. I'll create an account another time.” Option instead of Sign Up.


  ### Importing Web Service Endpoints

  You can use the Import button to import our web service endpoints.

  After clicking import button, you must choose a collection file. You can download the collection file from [here](http://hackathon/postman.zip)

  After Importing, you will see all API endpoints in the collections section.

  ### Sending A Request

  In the collections section, firstly you must select an endpoint. Using the send button , you can send a request to API Banking Web Service.

  If the body parameter and header are correct, the web service will send a respond to you as:

  You can find more information about Postman  [here](https://www.getpostman.com/docs/)

  # Authentication

  In order to use the hackathon APIs, you need to an API key. This key uniquely identifies the user who wants to use the hackathon APIs. Without this key, you will get a 401 (http unauthorized) error. The GenerateAPIKey API sends to you an API key. You should store this key to use other API request. To use other APIs you should add this API key to request header as a parameter.
  `
};
/* eslint-enable */
