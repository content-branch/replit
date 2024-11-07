const contentfulManagement = require('contentful-management');
const path = require('path');
const dotenv = require('dotenv');
const envPath = path.resolve(__dirname, '../../.env'); // Adjust the relative path accordingly
dotenv.config({ path: envPath });

module.exports = function () {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
  });

  return contentfulClient
    .getSpace(process.env.CONTENTFUL_SPACE_ID) //process.env.CONTENTFUL_SPACE_ID
    .then(space => space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT)); //process.env.CONTENTFUL_ENVIRONMENT
};
